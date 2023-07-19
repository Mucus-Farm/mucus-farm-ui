import Image from "next/image"

// components
import Header from "@/components/Header"
import { Container } from "@/components/Container"
import Quantity from "./Quantity"
import Support from "./Support"
import Collection from "./Collection"

// images
import fndTrading from "@/images/fnd-trading.png"

export default function MucusFarm() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-brown-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10 overflow-hidden'>
      <Header/>
      <Container className='flex-grow flex items-end mx-0 mr-auto mt-6'>
        <div className='z-10 flex flex-col gap-y-4 2xl:gap-y-6 w-[65vw] xl:w-[60vw] 2xl:w-[50vw] mx-0'>
          <div className='flex gap-x-10'>
            <Quantity faction='DOG' />
            <Support faction='DOG' />
          </div> 

          <Collection faction='DOG' />
        </div>
      </Container> 

      <div className='absolute bottom-0 -right-[200px] xl:-right-[200px] 2xl:-right-24 w-[53vw] xl:w-[63vw] 2xl:w-[56vw]'>
        <Image
          className='w-full'
          src={fndTrading}
          alt=""
          unoptimized
          priority
        />
      </div>
    </section>
  )
}
