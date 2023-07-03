import Image from "next/image"

// components
import { Container } from "@/components/Container";
import Header from "@/components/Header";

// images
import frogGrid from "@/images/frog-grid.png"

const Body = () => {
  return (
    <Container className='flex p-12'>
      <div className='flex flex-col gap-y-6 w-[45vw]'>
        <h1 className='text-4xl 2xl:text-6xl font-bold tracking-tight text-orange-400 text-center'>
          WHAT IS MUCUS?
        </h1>

        <p className='text-base 2xl:text-2xl indent-4 text-amber-900'>
          Step into the world of endless excitement and boundless possibilities with our native token, "Mucus." 
          Brace yourself for an exhilarating journey as we unveil a series of groundbreaking projects, each offering irresistible rewards. 
        </p>

        <p className='text-base 2xl:text-2xl indent-4 text-amber-900'>
          We're here to revolutionize the web3 landscape by infusing proven models from successful ventures with 
          our unique twist. As a hub for both web2 and web3 hybrid products, we're creating an all-encompassing 
          platform that brings together the best of both worlds. Whether you choose to dive in headfirst or take 
          your time, we guarantee rewards for every participant in our game.
        </p>

        <p className='text-base 2xl:text-2xl indent-4 text-amber-900'>
          So, forget about the big picture for now and immerse yourself in a vibrant and genuinely enjoyable community, 
          where every step is filled with new and exciting opportunities. Get ready to unleash your dopamine and let the adventure begin!
        </p>
      </div> 
    </Container>
  )
}

export default function About() {
  return (
    <section className='relative min-h-screen bg-orange-200 p-10'>
      <Header />
      <Body />

      <div className='absolute top-1/2 -translate-y-1/2 right-0 w-[42vw]'>
        <Image
          className='w-full'
          src={frogGrid}
          alt=""
          unoptimized
        />
      </div>
    </section>
  )
}