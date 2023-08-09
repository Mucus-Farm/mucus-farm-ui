import { useContractWrite, useAccount } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'
import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client

// utils
import { env } from '@/env.mjs'
import { fndAbi, fndAbiTypings } from '@/abis/fnd'

// api
import { queryClient } from '@/components/Providers'
import { parseEther, type Log } from 'viem'

type Mint = {
  amount: number;
  value?: string;
}

export const useWhitelistMint = () => {
  const { address } = useAccount()
  const whitelistMint = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbi,
    functionName: 'whitelistMint',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ amount }: Mint) => {
    if (!whitelistMint.writeAsync || !address) return

    const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getProof`, {
      method: 'POST',
      body: JSON.stringify({ address }),
    })
    const { proof } = await (res.json() as Promise<{ proof: string[] }>)
    const tx = await whitelistMint.writeAsync({ args: [amount, proof] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getMinted'] })
    await queryClient.invalidateQueries({ queryKey: ['getOwnedNfts'] })

    return receipt
  }

  return {
    ...whitelistMint,
    write,
  }
}

export const useMint = () => {
  const mint = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbi,
    functionName: 'mint',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ amount, value }: Mint) => {
    if (!mint.writeAsync) return

    const tx = await mint.writeAsync({ args: [amount], value: parseEther(value!) }) 
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getMinted'] })
    await queryClient.invalidateQueries({ queryKey: ['getOwnedNfts'] })

    return receipt
  }

  return {
    ...mint,
    write,
  }
}

export const useBreedAndAdopt = () => {
  const { address } = useAccount()
  const breedAndAdopt = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbi,
    functionName: 'breedAndAdopt',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ amount }: Mint) => {
    if (!breedAndAdopt.writeAsync) return

    const minted = await getMinted()
    const tx = await breedAndAdopt.writeAsync({ args: [amount] })
    await waitForTransaction(tx)

    const tokenIds = await new Promise<{ stolen: boolean; tokenId: number; }[]>((resolve) => {
      const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
      
      const unwatch = publicClient.watchContractEvent({
        address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
        abi: fndAbi,
        eventName: 'Transfer',
        args: {
          from: '0x0000000000000000000000000000000000000000',
          tokenId: [...Array(amount).keys()].map(i => Number(minted) + i),
        },
        onLogs: logs => {
          console.log(logs)
          const tokenIds = logs.map((log) => {
            const { to, tokenId } = (log as Log & { args: { from: `0x${string}`, to: `0x${string}`, tokenId: bigint } })?.args
            return {
              stolen: to !== address,
              tokenId: Number(tokenId),
            }
          })
          unwatch()
          resolve(tokenIds)
        }
      })
    })

    await queryClient.invalidateQueries({ queryKey: ['getMinted'] })
    await queryClient.invalidateQueries({ queryKey: ['getOwnedNfts'] })

    return tokenIds
  }

  return {
    ...breedAndAdopt,
    write,
  }
}

type Transform = {
  tokenIds: bigint[];
  transformationType: number;
}
export const useTransform = () => {
  const { address } = useAccount()
  const transform = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbi,
    functionName: 'transform',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ tokenIds, transformationType }: Transform) => {
    if (!transform.writeAsync) return

    const gigaChadsMinted = await getGigaChadsMinted(transformationType)
    const tx = await transform.writeAsync({ args: [tokenIds, transformationType] })
    await waitForTransaction(tx)

    const transformSucceeded = await new Promise<boolean>((resolve) => {
      const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
      
      const unwatch = publicClient.watchContractEvent({
        address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
        abi: fndAbi,
        eventName: 'Transformation',
        args: {
          parent: address,
          tokenId: gigaChadsMinted,
        },
        onLogs: logs => {
          const transformSucceeded = logs[0]?.data.slice(-1) === '1'
          unwatch()
          resolve(transformSucceeded)
        }
      })
    })

    await queryClient.invalidateQueries({ queryKey: ['getOwnedNfts'] })

    return { transformSucceeded }
  }

  return {
    ...transform,
    write,
  }
}

export const getMinted = async () => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const minted = await publicClient.readContract({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbiTypings,
    functionName: 'minted',
  })

  return minted
}

export const getGigaChadsMinted = async (faction: number) => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const gigaChadsMinted = await publicClient.readContract({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbiTypings,
    functionName: faction === 0 ? 'chadsMinted' : 'gigasMinted',
  })

  return gigaChadsMinted
}

export const getPublicMintStarted = async () => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const publicMintStarted = await publicClient.readContract({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbiTypings,
    functionName: 'publicMintStarted',
  })

  return publicMintStarted
}
