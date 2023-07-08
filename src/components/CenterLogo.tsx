'use client';

import { usePathname } from "next/navigation"
import Link from "next/link";
import Image from "next/image"

// logos
import mucusLogoBrown from "@/images/mucus-logo-brown.png"
import mucusLogoOrange from "@/images/mucus-logo-orange.png"
import mucusLogoGreen from "@/images/mucus-logo-green.png"

const paths = {
  '/about': mucusLogoBrown,
  '/whitepaper': mucusLogoBrown,
  '/doggyDomination': mucusLogoOrange,
  '/froggyFriends': mucusLogoGreen,
}

export default function CenterLogo() {
  const pathname = usePathname()
  
  if (pathname && pathname in paths) {
    return (
      <Link href='/' className='w-[125px] cursor-pointer'>
        <Image
          className='w-full'
          src={paths[pathname as keyof typeof paths]}
          alt=""
          unoptimized
        />
      </Link>
    )
  }

  return null
}