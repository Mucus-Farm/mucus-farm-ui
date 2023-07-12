import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'

export const fetchUSDCPrice = async () => {
  const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)

  const pair = await Fetcher.fetchPairData(USDC, WETH[USDC.chainId])

  const route = new Route([pair], WETH[USDC.chainId])

  return route.midPrice.toSignificant(6);
}