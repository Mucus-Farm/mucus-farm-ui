import { useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'
import { parseEther } from 'viem'
import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client
import { formatUnits } from 'viem'

// utils
import { env } from '@/env.mjs'
import { dpsAbi } from '@/abis/dps'
import { dpsAbiTypings } from '@/abis/dps'
import { getBasisPointsMultiplier } from '@/utils/helpers'
import { factionEnum } from '@/utils/constants'
import type { Faction } from '@/utils/constants'

// api
import { fetchMucusAmountOut } from '@/api/uniswapMethods'
import { queryClient } from '@/components/Providers'

type AddStake = {
  depositAmount: string;
  faction: Faction;
  slippage: string;
}
export function useAddStake() {
  const addStake = useContractWrite({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbi,
    functionName: 'addStake',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ depositAmount, faction, slippage }: AddStake) => {
    if (!addStake.writeAsync) return
    const tokenAmountOut = await fetchMucusAmountOut(parseEther(depositAmount))

    const tokenAmountOutMin = tokenAmountOut 
      * BigInt(Number(slippage) * 10 ** getBasisPointsMultiplier(slippage)) 
      / BigInt(100 * 10 ** getBasisPointsMultiplier(slippage))

    const tx = await addStake.writeAsync({ args: [factionEnum[faction], tokenAmountOutMin], value: parseEther(depositAmount) })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getStaker'] })

    return receipt
  }

  return {
    ...addStake,
    write,
  }
}

type RemoveStake = {
  withdrawAmount: string;
  faction: Faction;
}
export function useRemoveStake() {
  const removeStake = useContractWrite({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbi,
    functionName: 'removeStake',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ withdrawAmount, faction }: RemoveStake) => {
    if (!removeStake.writeAsync) return
    const tx = await removeStake.writeAsync({ args: [parseEther(withdrawAmount), factionEnum[faction]] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getStaker'] })

    return receipt
  }

  return {
    ...removeStake,
    write,
  }
}

export function useClaim() {
  const claim = useContractWrite({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbi,
    functionName: 'claim',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async () => {
    if (!claim.writeAsync) return
    const tx = await claim.writeAsync()
    const receipt = await waitForTransaction(tx)

    return receipt
  }

  return {
    ...claim,
    write,
  }
}

type Vote = {
  amount: bigint;
  faction: Faction;
}
export function useVote() {
  const vote = useContractWrite({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbi,
    functionName: 'vote',
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
  })

  const write = async ({ amount, faction }: Vote) => {
    if (!vote.writeAsync) return
    const tx = await vote.writeAsync({ args: [amount, faction === 'DOG' ? 0 : 1] })
    const receipt = await waitForTransaction(tx)
    await queryClient.invalidateQueries({ queryKey: ['getStaker'] })

    return receipt
  }

  return {
    ...vote,
    write,
  }
}

export const getStaker = async (stakerAddress: `0x${string}`) => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const [
    totalAmount,
    frogFactionAmount,
    dogFactionAmount,
    previousDividendsPerFrog,
    previousDividendsPerDog,
    lockingEndDate,
  ] = await publicClient.readContract({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbiTypings,
    functionName: 'stakers',
    args: [stakerAddress],
  })

  return {
    totalAmount,
    frogFactionAmount,
    dogFactionAmount,
    previousDividendsPerFrog,
    previousDividendsPerDog,
    lockingEndDate,
  }
}

export const getTotalStaked = async () => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const totalDogFactionAmountPromise = publicClient.readContract({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbiTypings,
    functionName: 'totalDogFactionAmount',
  })
  const totalFrogFactionAmountPromise = publicClient.readContract({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbiTypings,
    functionName: 'totalFrogFactionAmount',
  })

  const [totalDogFactionAmount, totalFrogFactionAmount] = await Promise.all([
    totalDogFactionAmountPromise,
    totalFrogFactionAmountPromise,
  ])

  return {
    totalDogFactionAmount: parseFloat(formatUnits(totalDogFactionAmount, 18)),
    totalFrogFactionAmount: parseFloat(formatUnits(totalFrogFactionAmount, 18)),
  }
}
