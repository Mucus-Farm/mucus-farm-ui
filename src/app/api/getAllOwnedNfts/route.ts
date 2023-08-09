import { NextResponse } from 'next/server'
import { db } from '@/db'
import { owners, type Owner } from '@/db/schema'
import { eq, and } from "drizzle-orm";

export const runtime = 'edge';

type Nfts = { tokenId: number }[]
export async function POST(request: Request) {
  const { address, staked } = await (request.json() as Promise<{ address: string, staked: boolean }>)

  const nfts: Nfts = await db
    .select({ tokenId: owners.id })
    .from(owners)
    .where(and(eq(owners.address, address), eq(owners.staked, staked)))

  return NextResponse.json({ nfts })
}
