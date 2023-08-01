// components
import Header from "@/components/Header"
import StakingForm from "@/components/StakingForm"

export default function FrogPond() {
  return (
    <section className='relative min-h-screen flex flex-col bg-mc-rose-200 px-3 py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10'>
      <Header/>
      <StakingForm faction='FROG' />

      <div className='absolute top-1/2 -translate-y-1/2 right-0 xl:right-4 2xl:right-16 w-[35vw] xl:w-[38vw] 2xl:w-[42vw]'>
        <img
          className='w-full'
          src='https://mucus-images.0xmucushq.workers.dev/twin-chibi-image.png'
          alt=""
        />
      </div>
      <div className='absolute bottom-[25vh] xl:bottom-[22vh] 2xl:bottom-[16vh] right-6 xl:right-12 2xl:right-24 w-[30vw] xl:w-[33vw] 2xl:w-[38vw] p-8 bg-gray-100/25 rounded-2xl'>
        <img
          className='w-full'
          src='https://mucus-images.0xmucushq.workers.dev/help-us-please-box.png'
          alt=""
        />
      </div>
    </section>
  )
}