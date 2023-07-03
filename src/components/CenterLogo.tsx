'use client';

import { useRouter } from "next/router"
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
  const { pathname } = useRouter()
  
  if (pathname in paths) {
    return (
      <div className='w-[125px]'>
        <Image
          className='w-full'
          src={paths[pathname as keyof typeof paths]}
          alt=""
          unoptimized
        />
      </div>
    )
  }

  return null
}