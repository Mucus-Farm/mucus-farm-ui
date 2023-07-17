
import { useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'
import { parseEther } from 'viem'

// utils
import { env } from '@/env.mjs'
import { dpsAbi } from '@/abis/dps'
import { getBasisPointsMultiplier } from '@/utils/helpers'
import { factionEnum } from '@/utils/constants'

// api
import { fetchMucusAmountOut } from '@/api/uniswapMethods'

type AddStake = {
  depositAmount: string;
  faction: 'FROG' | 'DOG',
  slippage: string;
}
export function useAddStake() {
  const addStake = useContractWrite({
    address: env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS as `0x${string}`,
    abi: dpsAbi,
    functionName: 'addStake',
  })

  const write = async ({ depositAmount, faction, slippage }: AddStake) => {
    if (!addStake.writeAsync) return
    const tokenAmountOut = await fetchMucusAmountOut(parseEther(depositAmount))

    const tokenAmountOutMin = tokenAmountOut 
      * BigInt(Number(slippage) * 10 ** getBasisPointsMultiplier(slippage)) 
      / BigInt(100 * 10 ** getBasisPointsMultiplier(slippage))

    const tx = await addStake.writeAsync({ args: [factionEnum[faction], tokenAmountOutMin], value: parseEther(depositAmount) })
    const receipt = await waitForTransaction(tx)

    return receipt
  }

  return {
    ...addStake,
    write,
  }
}
