import Image from "next/image"

// components
import Header from "@/components/Header"
import StakingForm from "@/components/StakingForm"

// images
import twinChibiImage from "@/images/twin-chibi.png"

export default function FroggyFriends() {
  return (
    <section className='relative min-h-screen bg-mc-rose-200 p-10'>
      <Header/>
      <StakingForm/>

      <div className='absolute top-1/2 -translate-y-1/2 right-16 w-[45vw]'>
        <Image
          className='w-full'
          src={twinChibiImage}
          alt=""
          unoptimized
        />
      </div>
    </section>
  )
}