import { NextResponse } from 'next/server'
import { db } from '@/db'
import { owners, type Owner } from '@/db/schema'
import { eq } from "drizzle-orm";

type Nfts = Owner[]
export async function GET(request: Request, { params }: { params: { address: `0x${string}` } }) {
  const nfts: Nfts = await db.select().from(owners).where(eq(owners.address, params.address))

  return NextResponse.json(nfts)
}
