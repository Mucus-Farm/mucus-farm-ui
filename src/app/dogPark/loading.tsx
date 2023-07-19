import Image from "next/image"

// components
import Header from "@/components/Header"
import { Layout as SkeletonLayout } from "@/components/StakingForm/Skeleton"

// images
import threeChibi from "@/images/three-chibi.png"
import weCanWin from "@/images/we-can-win-box.png"

export default function Loading() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-gray-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10'>
      <Header/>
      <SkeletonLayout faction='DOG' />

      <div className='absolute top-1/2 -translate-y-1/2 right-0 xl:right-4 2xl:right-16 w-[35vw] xl:w-[38vw] 2xl:w-[42vw]'>
        <Image
          className='w-full'
          src={threeChibi}
          alt=""
          unoptimized
          priority
          placeholder='blur'
        />
      </div>
      <div className='absolute bottom-[25vh] xl:bottom-[22vh] 2xl:bottom-[16vh] right-6 xl:right-12 2xl:right-24 w-[30vw] xl:w-[33vw] 2xl:w-[38vw] p-8 bg-gray-100/25 rounded-2xl'>
        <Image
          className='w-full'
          src={weCanWin}
          alt=""
          unoptimized
          placeholder='blur'
        />
      </div>
    </section>
  )
}