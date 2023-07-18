import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client
import { formatUnits } from 'viem'
import { pairAbi } from '@/abis/pair'
import { env } from '@/env.mjs'

const MAINNET = 1;

export const fetchEthUsdcPrice = async () => {
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
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const [MUCUSReserve, WETHReserve] = await publicClient.readContract({
    address: env.NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS as `0x${string}`,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  const MUCUSReserveFloat = parseFloat(formatUnits(MUCUSReserve, 18))
  const WETHReserveFloat = parseFloat(formatUnits(WETHReserve, 18))

  return MUCUSReserveFloat / WETHReserveFloat
}

export const fetchLPTokenUsdcPrice = async () => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
  const mucusPoolReservesPromise = publicClient.readContract({
    address: env.NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS as `0x${string}`,
    abi: pairAbi,
    functionName: 'getReserves',
  })
  const lpTokenTotalSupplyPromise = publicClient.readContract({
    address: env.NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS as `0x${string}`,
    abi: pairAbi,
    functionName: 'totalSupply',
  })

  const ethUsdcPricePromise = fetchEthUsdcPrice()
  const mucusEthPricePromise = fetchMucusEthPrice()

  const [[MUCUSReserve, WETHReserve], lpTokenTotalSupply, ethUsdcPrice, mucusEthPrice] = await Promise.all([
    mucusPoolReservesPromise,
    lpTokenTotalSupplyPromise,
    ethUsdcPricePromise,
    mucusEthPricePromise,
  ])

  const mucusUsdcPrice = ethUsdcPrice / mucusEthPrice
  const totalReserveUsdcValue = mucusUsdcPrice * parseFloat(formatUnits(MUCUSReserve, 18)) + ethUsdcPrice * parseFloat(formatUnits(WETHReserve, 18))
  
  return totalReserveUsdcValue / parseFloat(formatUnits(lpTokenTotalSupply, 18))
}

export const fetchMucusAmountOut = async (amountIn: bigint) => {
  const publicClient = getPublicClient({ chainId: Number(env.NEXT_PUBLIC_CHAIN_ID) });
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
