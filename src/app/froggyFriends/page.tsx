import Image from "next/image"

// components
import Header from "@/components/Header"
import StakingForm from "@/components/StakingForm"

// images
import twinChibiImage from "@/images/twin-chibi.png"

export default function FroggyFriends() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-rose-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10'>
      <Header/>
      <StakingForm/>

      <div className='absolute top-1/2 -translate-y-1/2 right-0 xl:right-4 2xl:right-16 w-[35vw] xl:w-[38vw] 2xl:w-[42vw]'>
        <Image
          className='w-full'
          src={twinChibiImage}
          alt=""
          unoptimized
          priority
        />
      </div>
    </section>
  )
}