// components
import Quantity from "./Quantity"
import Support from "./Support"
import Collection from "./Collection"
import FactionMeter from "@/components/FactionMeter";

// utils
import { env } from '@/env.mjs'

export default function MucusFarm() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-brown-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10 overflow-hidden pt-[75px] xl:pt-[75px] 2xl:pt-[75px]'> 
      <div className='flex-grow z-10 flex flex-col gap-y-4 2xl:gap-y-6 mx-0 mr-auto mt-6 w-[65vw] xl:w-[60vw] 2xl:w-[50vw]'>
        <div className='flex gap-x-10'>
          <Quantity />
          <Support >
            <FactionMeter />
          </Support>
        </div> 

        <Collection />
      </div>

      <div className='absolute bottom-0 -right-[200px] xl:-right-[200px] 2xl:-right-24 w-[53vw] xl:w-[63vw] 2xl:w-[56vw]'>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a21f163c-093e-45a2-2a43-0e89470cf400/public`}
          alt=""
        />
      </div>
    </section>
  )
}
