'use client'

import SocialLinks from "./SocialLinks"

// utils
import { env } from "@/env.mjs"

export default function MobileNotReady() {
  return (
    <div className='relative min-h-screen bg-[#eaf9e1] flex flex-col justify-center items-center'>
      <div className='absolute top-4 left-4 inset-x-0 flex gap-x-2'>
        <SocialLinks iconHolderClassName="bg-[#8FC072]/90 hover:bg-[#8FC072]/80 active:bg-[#8FC072]"/>
      </div>

      <img
        className='w-24 h-24'
        src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/5b36deee-0a38-4246-3b10-cebe92c31a00/public`}
        alt=""
      />
      <p className='font-semibold text-xl text-center mt-4 text-[#8FC072]'>
        MOBILE IS NOT READY YET! PLEASE CHECK BACK ON DESKTOP
      </p>
    </div>
  ) 
}