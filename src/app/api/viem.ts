import { createPublicClient, http } from 'viem'
import { mainnet, goerli } from 'viem/chains'
import { env } from '@/env.mjs'

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http(env.ALCHEMY_RPC_URL),
})
