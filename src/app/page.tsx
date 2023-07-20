import Image from "next/image"

// components
import Header from "@/components/Header";
import { Container } from "@/components/Container";
import BattleButton from "@/components/BattleButton";
import FactionMeter from "@/components/FactionMeter"

// images
import frogBigGirl from "@/images/frog-big-girl.png"
import dogBigGirl from "@/images/dog-big-girl.png"
import frogDogLogo from "@/images/frogs-vs-dogs-logo.png"
import footer from "@/images/footer.png"

const MainLogo = () => (
  <footer className='relative z-50 gap-y-2'>
    <Container className='mx-0 ml-auto flex flex-col items-end mb-12 w-[50vw]'>
      <Image
        className='w-full'
        src={frogDogLogo}
        alt=""
        unoptimized
      />
      <FactionMeter className='mt-6'/>
    </Container> 
  </footer>
)

export default function Page() {
  return (
      <main className="min-h-screen flex flex-col justify-center bg-mc-pink-200 px-3 py-6 xl:py-8 xl:px-8 2xl:px-10 2xl:py-10 overflow-x-hidden">
        <section className='relative flex-grow flex flex-col'>
          <div className='absolute inset-0'>
            <div className="relative h-full max-w-7xl xl:max-w-[1600px] mx-auto">
              <div className='absolute bottom-6 left-10 w-[40vw] 2xl:left-0'>
                <Image
                  className='w-full'
                  src={frogBigGirl}
                  alt=""
                  unoptimized
                />
              </div>

              <div className='absolute top-12 right-16 xl:top-20 xl:right-12 w-[32vw]'>
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
          <Container className='flex-grow flex flex-col gap-y-1 justify-center items-center z-20'>
            <BattleButton />
          </Container>
          <MainLogo />
        </section>
        <div className='absolute bottom-0 left-0 w-100'>
          <Image className='object-contain' src={footer} alt='' unoptimized />
        </div>
      </main>
  )
}
