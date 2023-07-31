import { useContractWrite, useAccount } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'
import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client

// utils
import { env } from '@/env.mjs'
import { fndAbi, fndAbiTypings } from '@/abis/fnd'
import { computeMerkleProof } from '@/utils/helpers'

// api
import { queryClient } from '@/components/Providers'
import { parseEther } from 'viem'

type Mint = {
  amount: number;
  stake: boolean;
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

  const write = async ({ amount, stake }: Mint) => {
    if (!whitelistMint.writeAsync || !address) return

    const proof = computeMerkleProof(address)
    const tx = await whitelistMint.writeAsync({ args: [amount, stake, proof] })
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

  const write = async ({ amount, stake, value }: Mint) => {
    if (!mint.writeAsync) return

    const tx = await mint.writeAsync({ args: [amount, stake], value: parseEther(value!) }) 
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
  const breedAndAdopt = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbi,
    functionName: 'breedAndAdopt',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ amount, stake }: Mint) => {
    if (!breedAndAdopt.writeAsync) return

    const tx = await breedAndAdopt.writeAsync({ args: [amount, stake] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getMinted'] })
    await queryClient.invalidateQueries({ queryKey: ['getOwnedNfts'] })

    return receipt
  }

  return {
    ...breedAndAdopt,
    write,
  }
}

type Transform = {
  tokenIds: bigint[];
  transformationType: number;
  stake: boolean;
}
export const useTransform = () => {
  const transform = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbi,
    functionName: 'transform',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ tokenIds, transformationType, stake }: Transform) => {
    if (!transform.writeAsync) return

    console.log("tokenIds: ", tokenIds)
    console.log("transformation type: ", transformationType)
    console.log("stake: ", stake)

    const tx = await transform.writeAsync({ args: [tokenIds, transformationType, stake] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getOwnedNfts'] })

    return receipt
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

export const getPublicMintStarted = async () => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const publicMintStarted = await publicClient.readContract({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: fndAbiTypings,
    functionName: 'publicMintStarted',
  })

  return publicMintStarted
}
