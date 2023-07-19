import { NextResponse } from 'next/server'
import { formatUnits } from 'viem';
import { publicClient } from '../../viem'
import { env } from '@/env.mjs';

import { dpsAbiTypings } from '@/abis/dps';

export const revalidate = 60;
 
export async function GET() {
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

  return NextResponse.json({
    totalDogFactionAmount: parseFloat(formatUnits(totalDogFactionAmount, 18)),
    totalFrogFactionAmount: parseFloat(formatUnits(totalFrogFactionAmount, 18)),
  })
}
