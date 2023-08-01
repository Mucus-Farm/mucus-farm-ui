// components
import { Container } from "@/components/Container";

// utils
import { env } from '@/env.mjs'

const Body = () => {
  return (
    <Container className='flex p-12'>
      <div className='w-[48vw] xl:w-[45vw]'>
        <h1 className='text-4xl 2xl:text-6xl font-bold tracking-tight text-mc-orange-300 text-center'>
          WHAT IS MUCUS?
        </h1>

        <div className='flex flex-col gap-y-4 xl:gap-y-6 2xl:gap-y-12 mt-4'>
          <p className='text-base 2xl:text-2xl indent-4 text-mc-brown-300'>
            Step into the world of endless excitement and boundless possibilities with our native token, &quot;Mucus.&quot;
            Brace yourself for an exhilarating journey as we unveil a series of groundbreaking projects, each offering irresistible rewards. 
          </p>

          <p className='text-base 2xl:text-2xl indent-4 text-mc-brown-300'>
            We&apos;re here to revolutionize the web3 landscape by infusing proven models from successful ventures with 
            our unique twist. As a hub for both web2 and web3 hybrid products, we&apos;re creating an all-encompassing 
            platform that brings together the best of both worlds. Whether you choose to dive in headfirst or take 
            your time, we guarantee rewards for every participant in our game.
          </p>

          <p className='text-base 2xl:text-2xl indent-4 text-mc-brown-300'>
            So, forget about the big picture for now and immerse yourself in a vibrant and genuinely enjoyable community, 
            where every step is filled with new and exciting opportunities. Get ready to unleash your dopamine and let the adventure begin!
          </p>
        </div> 
      </div> 
    </Container>
  )
}

export default function About() {
  return (
    <section className="relative min-h-screen bg-mc-orange-200 px-3 py-6 xl:py-8 xl:px-8 2xl:px-10 2xl:py-10 overflow-x-hidden overflow-y-hidden pt-[75px] xl:pt-[75px] 2xl:pt-[75px]"> 
      <Body />

      <div className='absolute top-1/2 -translate-y-1/2 right-0 w-[45vw] xl:w-[42vw] mt-6 xl:mt-0'>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/46f095e9-fb3c-401d-368a-4c4433c1c900/public`}
          alt=""
        />
      </div>
    </section>
  )
}