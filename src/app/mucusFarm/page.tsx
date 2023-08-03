
// components
import FactionMeter from "@/components/FactionMeter";
import MintAndStake from "./MintAndStake";

// utils
import { env } from '@/env.mjs'

export const runtime = 'edge';

export default function MucusFarm() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-brown-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10 overflow-hidden pt-[75px] xl:pt-[75px] 2xl:pt-[75px]'> 
      <MintAndStake>
        <FactionMeter />
      </MintAndStake>

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
