import { useAccount, useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'
import { queryClient } from '@/components/Providers'

// utils
import { env } from '@/env.mjs'
import { mucusFarmAbi } from '@/abis/mucusFarm'

type AddManyToMucusFarm = {
  tokenIds: bigint[];
  selectAll: boolean;
}
export const useAddManyToMucusFarm = () => {
  const { address } = useAccount()
  const addManyToMucusFarm = useContractWrite({
    address: env.NEXT_PUBLIC_MUCUS_FARM_CONTRACT_ADDRESS as `0x${string}`,
    abi: mucusFarmAbi,
    functionName: 'addManyToMucusFarm',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ tokenIds, selectAll }: AddManyToMucusFarm) => {
    if (!addManyToMucusFarm.writeAsync) return
    let selectedTokenIds: bigint[] | number[] = tokenIds;
    if (selectAll) {
      const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getAllOwnedNfts`, {
        method: 'POST',
        body: JSON.stringify({ address, staked: false })
      })
      const { nfts } = await (res.json() as Promise<{ nfts: { tokenId: number }[] }>)
      const nftIds = nfts.map(({ tokenId }) => tokenId)
      selectedTokenIds = nftIds
    }

    console.log("selectedTokenIds: ", selectedTokenIds)

    const tx = await addManyToMucusFarm.writeAsync({ args: [selectedTokenIds] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries(['getOwnedNfts'])
    await queryClient.invalidateQueries(['getDailyYield'])

    return receipt
  }

  return {
    ...addManyToMucusFarm,
    write,
  }
}

type ClaimMany = {
  tokenIds: bigint[];
  unStake: boolean;
  selectAll: boolean;
}
export const useClaimMany = () => {
  const { address } = useAccount()
  const claimMany = useContractWrite({
    address: env.NEXT_PUBLIC_MUCUS_FARM_CONTRACT_ADDRESS as `0x${string}`,
    abi: mucusFarmAbi,
    functionName: 'claimMany',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ tokenIds, unStake, selectAll }: ClaimMany) => {
    if (!claimMany.writeAsync) return
    let selectedTokenIds: bigint[] | number[] = tokenIds;
    if (selectAll) {
      const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getAllOwnedNfts`, {
        method: 'POST',
        body: JSON.stringify({ address, staked: true })
      })
      const { nfts } = await (res.json() as Promise<{ nfts: { tokenId: number }[] }>)
      const nftIds = nfts.map(({ tokenId }) => tokenId)
      selectedTokenIds = nftIds
    }

    const tx = await claimMany.writeAsync({ args: [selectedTokenIds, unStake] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries(['getOwnedNfts'])
    await queryClient.invalidateQueries(['getDailyYield'])
    await queryClient.invalidateQueries(['getTotalMucusFarmed'])

    return receipt
  }

  return {
    ...claimMany,
    write,
  }
}