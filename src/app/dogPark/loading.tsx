// components
import Header from "@/components/Header"
import { Layout as SkeletonLayout } from "@/components/StakingForm/Skeleton"

// utils
import { env } from '@/env.mjs'

export default function Loading() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-gray-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10'>
      <Header/>
      <SkeletonLayout faction='DOG' />

      <div className='absolute top-1/2 -translate-y-1/2 right-0 xl:right-4 2xl:right-16 w-[35vw] xl:w-[38vw] 2xl:w-[42vw]'>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/6d69fd6a-1081-4ff1-cb56-653e4a8ad500/public`}
          alt=""
        />
      </div>
      <div className='absolute bottom-[25vh] xl:bottom-[22vh] 2xl:bottom-[16vh] right-6 xl:right-12 2xl:right-24 w-[30vw] xl:w-[33vw] 2xl:w-[38vw] p-8 bg-gray-100/25 rounded-2xl'>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/514cda6c-f538-4680-4b37-7f2c56364900/public`}
          alt=""
        />
      </div>
    </section>
  )
}