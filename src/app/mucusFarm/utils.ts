import { env } from '@/env.mjs'
import type { Owner } from '@/db/schema'

export const factionColorPalette = {
  DOG: {
    text: 'text-mc-orange-400',
    bg: 'bg-mc-orange-400',
    border: 'border-mc-orange-400',
    accent: 'accent-mc-orange-400',
  },
  FROG: {
    text: 'text-mc-green-200',
    bg: 'bg-mc-green-200',
    border: 'border-mc-green-200',
    accent: 'accent-mc-green-200',
  },
}

export type Cursor = number | undefined
export const getOwnedNfts = async (address: `0x${string}`, type: 'DOG' | 'FROG' | 'CHAD' | 'GIGA', cursor: Cursor) => {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getOwnedNfts`, {
    method: 'POST',
    body: JSON.stringify({ address, type, cursor }),
  })

  return res.json() as Promise<{ nfts: Owner[], nextCursor: Cursor }>
}

const DAILY_MUCUS_RATE = 10000
export const getDailyYield = async (address: `0x${string}`) => {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getStakedNftCount`, {
    method: 'POST',
    body: JSON.stringify({ address }),
  })
  const { nfts, gigaChadNfts } = await (res.json() as Promise<{ nfts: string, gigaChadNfts: string }>) 

  const dailyYield = (Number(nfts) * DAILY_MUCUS_RATE) + (Number(gigaChadNfts) * DAILY_MUCUS_RATE * 3)

  return dailyYield
}

export const getTotalMucusFarmed = async (address: `0x${string}`) => {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getTotalMucusFarmed`, {
    method: 'POST',
    body: JSON.stringify({ address }),
  })

  return res.json() as Promise<{ amount: string | undefined }>
}

export const getNftImages = (Nfts: Owner[]) => Nfts.map(nft => ({
  ...nft,
  image: `${env.NEXT_PUBLIC_R2_WORKER_IMAGE_ENDPOINT}/${nft.id}`,
}))

export const getType = (faction, gigaOn) => {
  if (faction === 'DOG' && !gigaOn) return 'DOG'
  if (faction === 'FROG' && !gigaOn) return 'FROG'
  if (faction === 'DOG' && gigaOn) return 'CHAD'
  
  return 'GIGA'
}
