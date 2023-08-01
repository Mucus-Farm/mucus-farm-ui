// components
import Header from "@/components/Header"
import StakingForm from "@/components/StakingForm"

// utils
import { env } from '@/env.mjs'

export default function FrogPond() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-rose-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10'>
      <Header/>
      <StakingForm faction='FROG' />

      <div className='absolute top-1/2 -translate-y-1/2 right-0 xl:right-4 2xl:right-16 w-[35vw] xl:w-[38vw] 2xl:w-[42vw]'>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/01f6f37e-f601-45ec-0e85-57a23a80da00/public`}
          alt=""
        />
      </div>
      <div className='absolute bottom-[25vh] xl:bottom-[22vh] 2xl:bottom-[16vh] right-6 xl:right-12 2xl:right-24 w-[30vw] xl:w-[33vw] 2xl:w-[38vw] p-8 bg-gray-100/25 rounded-2xl'>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/86e7fe03-f241-4580-09a9-37d9088f9900/public`}
          alt=""
        />
      </div>
    </section>
  )
}