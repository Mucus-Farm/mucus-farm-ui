'use client';

import { usePathname } from "next/navigation"
import Link from "next/link";
import { env } from '@/env.mjs'

const paths = {
  '/about': `${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a52d6b4e-8e3b-4cb0-476f-7a1cf1ce0800/public`,
  '/whitepaper': `${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a52d6b4e-8e3b-4cb0-476f-7a1cf1ce0800/public`,
  '/dogPark': `${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a3e88a44-4dac-499d-752f-ae55f20cdc00/public`,
  '/frogPond': `${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/522b2270-c136-42ef-5830-3b72aee41400/public`,
  '/mucusFarm': `${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/f042ed78-73cd-4bf6-b8dd-6e63a2800600/public`,
}

export default function CenterLogo() {
  const pathname = usePathname()
  
  if (pathname && pathname in paths) {
    return (
      <Link href='/' className='w-[125px] cursor-pointer'>
        <img
          className='w-full'
          src={paths[pathname as keyof typeof paths]}
          alt=""
        />
      </Link>
    )
  }

  return null
}