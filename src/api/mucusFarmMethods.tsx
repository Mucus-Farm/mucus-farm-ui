import { useContractWrite, useAccount } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

// utils
import { env } from '@/env.mjs'
import { mucusFarmAbi } from '@/abis/mucusFarm'

type AddManyToMucusFarm = {
  tokenIds: bigint[]
}
export const useAddManyToMucusFarm = () => {
  const { address } = useAccount()
  const addManyToMucusFarm = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: mucusFarmAbi,
    functionName: 'addManyToMucusFarm',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ tokenIds }: AddManyToMucusFarm) => {
    if (!addManyToMucusFarm.writeAsync || !address) return

    const tx = await addManyToMucusFarm.writeAsync({ args: [address, tokenIds] })
    const receipt = await waitForTransaction(tx)

    return receipt
  }

  return {
    ...addManyToMucusFarm,
    write,
  }
}

type ClaimMany = {
  tokenIds: bigint[]
}
export const useClaimMany = () => {
  const claimMany = useContractWrite({
    address: env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS as `0x${string}`,
    abi: mucusFarmAbi,
    functionName: 'claimMany',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ tokenIds }: ClaimMany) => {
    if (!claimMany.writeAsync) return

    const tx = await claimMany.writeAsync({ args: [tokenIds] })
    const receipt = await waitForTransaction(tx)

    return receipt
  }

  return {
    ...claimMany,
    write,
  }
}