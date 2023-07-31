import { NextResponse } from 'next/server'
import { db } from '@/db'
import { owners, type Owner } from '@/db/schema'
import { sql, asc } from "drizzle-orm";

type Cursor = number | undefined;

const getTypeFilter = (address: string) => ({
  'DOG': sql`${owners.address} = ${address} AND ${owners.id} % 2 = 0 AND ${owners.id} < 6000`,
  'FROG': sql`${owners.address} = ${address} AND ${owners.id} % 2 != 0 AND ${owners.id} < 6000`,
  'CHAD': sql`${owners.address} = ${address} AND ${owners.id} >= 6000 AND ${owners.id} % 2 = 0`,
  'GIGA': sql`${owners.address} = ${address} AND ${owners.id} >= 6000 AND  ${owners.id} % 2 != 0`,
})

type Nfts = Owner[]
export async function POST(request: Request) {
  const limit = 30;
  const { address, type, cursor } = await (request.json() as Promise<{ address: string, type: keyof ReturnType<typeof getTypeFilter>, cursor: Cursor }>)
  const typeFilter = getTypeFilter(address)[type]
  if (cursor) {
    typeFilter.append(sql` AND ${owners.id} > ${cursor}`)   
  }

  const nfts: Nfts = await db
    .select()
    .from(owners)
    .where(typeFilter)
    .orderBy(asc(owners.id))
    .limit(limit + 1)
  
  let nextCursor: Cursor
  if (nfts.length > limit) {
    const nextNft = nfts.pop()
    nextCursor = nextNft!.id
  }

  return NextResponse.json({ nfts, nextCursor })
}
