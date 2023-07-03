import Head from "next/head";
import Image from "next/image"

// components
import Header from "@/components/Header";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

// images
import frogBigGirl from "@/images/frogs-big-girl.png"
import dogBigGirl from "@/images/dogs-big-girl.png"
import frogDogLogo from "@/images/frogs-vs-dogs-logo.png"
import footer from "@/images/footer.png"

const Body = () => {
  return (
    <Container className='flex-grow flex flex-col gap-y-1 justify-center items-center z-50'>
      <p className='text-xs text-white xl:text-base'>{'FROGS'} ARE WINNING</p>
      <Button className='bg-rose-500 border-2 border-white cursor-pointer'>
        <p className='text-white font-bold text-lg xl:text-2xl xl:px-4 xl:py-2'>JOIN THE BATTLE</p>
      </Button>
    </Container>
  )
}

const FactionMeter = () => {
  // place logic here for Faction Meter

  return (
    <div className='flex h-2 mr-2 mt-6 w-full'>
      <div className={`h-full w-[70%] bg-green-400/90`}/>
      <div className={`h-full w-[30%] bg-orange-500/90`}/>
    </div>
  )
}

const Footer = () => (
  <footer className='relative z-50 gap-y-2'>
    <Container className='mx-0 ml-auto flex flex-col items-end mb-10 w-[50vw]'>
      <Image
        className='w-full'
        src={frogDogLogo}
        alt=""
        unoptimized
      />
      <FactionMeter />
    </Container> 
  </footer>
)

export default function Home() {

  return (
    <>
      <Head>
        <title>Mucus Farm</title>
        <meta name="description" content="Farm Mucus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center bg-rose-200 py-12 px-16 xl:py-18 overflow-x-hidden">
        <section className='relative flex-grow flex flex-col'>
          <div className='absolute inset-0'>
            <div className="relative h-full max-w-7xl xl:max-w-[1600px] mx-auto">
              <div className='absolute bottom-0 left-0 w-[40vw]'>
                <Image
                  className='w-full'
                  src={frogBigGirl}
                  alt=""
                  unoptimized
                />
              </div>

              <div className='absolute -top-8 -right-6 xl:top-12 w-[40vw]'>
                <Image
                  className='w-full'
                  src={dogBigGirl}
                  alt=""
                  unoptimized
                />
              </div> 
            </div> 
          </div> 

          <Header />
          <Body />
          <Footer />
        </section>
        <div className='absolute bottom-0 left-0 w-100'>
          <Image className='object-contain' src={footer} alt='' unoptimized />
        </div>
      </main>
    </>
  )
}
