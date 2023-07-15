import { getPublicClient } from 'wagmi/actions' // TODO: if shifting this over as an api route, initialize own viem client
import { formatUnits } from 'viem'
import { pairAbi } from '@/abis/pair'

// USDC/WETH pair address
// 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc

const MAINNET = 1;

export const fetchUSDCPrice = async () => {
  const publicClient = getPublicClient({ chainId: MAINNET });
  const [USDCReserve, WETHReserve] = await publicClient.readContract({
    address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
    abi: pairAbi,
    functionName: 'getReserves',
  })

  const USDCReserveFloat = parseFloat(formatUnits(USDCReserve, 6))
  const WETHReserveFloat = parseFloat(formatUnits(WETHReserve, 18))

  return USDCReserveFloat / WETHReserveFloat
}