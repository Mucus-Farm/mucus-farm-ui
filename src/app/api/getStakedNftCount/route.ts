import { NextResponse } from 'next/server'
import { db } from '@/db'
import { owners } from '@/db/schema'
import { eq, lt, gte, and, sql } from "drizzle-orm";

export const runtime = 'edge';

type Count = { count: number }[]
export async function POST(request: Request) {
  const { address } = await (request.json() as Promise<{ address: string }>)

  const [nfts]: Count = await db
    .select({ count: sql<number>`count(*)` })
    .from(owners)
    .where(and(eq(owners.address, address), eq(owners.staked, true), lt(owners.id, 6000) ))

  const [gigaChadNfts]: Count = await db
    .select({ count: sql<number>`count(*)` })
    .from(owners)
    .where(and(eq(owners.address, address), eq(owners.staked, true), gte(owners.id, 6000) ))

  return NextResponse.json({ nfts: nfts?.count, gigaChadNfts: gigaChadNfts?.count })
}
