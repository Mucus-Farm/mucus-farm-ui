import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client
import { formatUnits } from 'viem'
import { dpsAbiTypings } from '@/abis/dps'
import { env } from '@/env.mjs'

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

  console.log("total dog faction amount: ", totalDogFactionAmount)

  return {
    totalDogFactionAmount: parseFloat(formatUnits(totalDogFactionAmount, 18)),
    totalFrogFactionAmount: parseFloat(formatUnits(totalFrogFactionAmount, 18)),
  }
}
