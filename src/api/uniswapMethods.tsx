import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client
import { formatUnits } from 'viem'
import { pairAbi } from '@/abis/pair'
import { env } from '@/env.mjs'

const MAINNET = 1;
const GOERLI = 5;

export const fetchUsdcPrice = async () => {
  const publicClient = getPublicClient({ chainId: MAINNET });
  const [USDCReserve, WETHReserve] = await publicClient.readContract({
    address: env.NEXT_PUBLIC_USDC_POOL_CONTRACT_ADDRESS as `0x${string}`,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  const USDCReserveFloat = parseFloat(formatUnits(USDCReserve, 6))
  const WETHReserveFloat = parseFloat(formatUnits(WETHReserve, 18))

  return USDCReserveFloat / WETHReserveFloat
}

export const fetchMucusEthPrice = async () => {
  const publicClient = getPublicClient({ chainId: GOERLI });
  const [MUCUSReserve, WETHReserve] = await publicClient.readContract({
    address: env.NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS as `0x${string}`,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  const MUCUSReserveFloat = parseFloat(formatUnits(MUCUSReserve, 18))
  const WETHReserveFloat = parseFloat(formatUnits(WETHReserve, 18))

  return MUCUSReserveFloat / WETHReserveFloat
}

export const fetchMucusAmountOut = async (amountIn: bigint) => {
  const publicClient = getPublicClient({ chainId: GOERLI });
  const [MUCUSReserve, WETHReserve] = await publicClient.readContract({
    address: env.NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS as `0x${string}`,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  const amountInWithFee = amountIn * BigInt(997);
  const numerator = amountInWithFee * MUCUSReserve;
  const denominator = WETHReserve * BigInt(1000) + amountInWithFee;

  return numerator / denominator;
}  