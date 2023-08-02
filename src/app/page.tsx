// components
import { Container } from "@/components/Container";
import BattleButton from "@/components/BattleButton";
import FactionMeter from "@/components/FactionMeter"
import { env } from "@/env.mjs";

export const runtime = 'edge';

const MainLogo = () => (
  <footer className='relative z-50 gap-y-2'>
    <Container className='mx-0 ml-auto flex flex-col items-end mb-12 w-[50vw]'>
      <img
        className='w-full'
        src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/0a29e3d4-0333-4052-e778-9f5ed9c86f00/public`}
        alt=""
      />
      <FactionMeter className='mt-6'/>
    </Container> 
  </footer>
)

export default function Page() {
  return (
      <main className="min-h-screen flex flex-col justify-center bg-mc-pink-200 px-3 py-6 xl:py-8 xl:px-8 2xl:px-10 2xl:py-10 overflow-x-hidden pt-[75px] xl:pt-[75px] 2xl:pt-[75px]"> 
        <section className='relative flex-grow flex flex-col'>
          <div className='absolute inset-0'>
            <div className="relative h-full max-w-7xl xl:max-w-[1600px] mx-auto">
              <div className='absolute bottom-6 left-10 w-[40vw] 2xl:left-0'>
                <img
                  className='w-full'
                  src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/c369925e-f86b-4ec2-db09-eee1b6c7d400/public`}
                  alt=""
                />
              </div>

              <div className='absolute top-12 right-16 xl:top-20 xl:right-12 w-[32vw]'>
                <img
                  className='w-full'
                  src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/2642e55e-56d3-4e20-80cb-b5e32a61ab00/public`}
                  alt=""
                />
              </div> 
            </div> 
          </div> 

          <Container className='flex-grow flex flex-col gap-y-1 justify-center items-center z-20'>
            <BattleButton />
          </Container>
          <MainLogo />
        </section>
        <div className='absolute bottom-0 left-0 w-100'>
          <img className='object-contain' src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/d4513c1c-26fe-41ec-32fa-76d4e0f8df00/public`} alt='' />
        </div>
      </main>
  )
}
