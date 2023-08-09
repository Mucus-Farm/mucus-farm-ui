import { NextResponse } from 'next/server'
import { db } from '@/db'
import { mucusFarmed } from '@/db/schema'
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function POST(request: Request) {
  const { address } = await (request.json() as Promise<{ address: string }>)
  const [totalMucusFarmed] = await db.select({ amount: mucusFarmed.amount }).from(mucusFarmed).where(eq(mucusFarmed.id, address)).limit(1);

  return NextResponse.json({ amount: totalMucusFarmed?.amount })
}
