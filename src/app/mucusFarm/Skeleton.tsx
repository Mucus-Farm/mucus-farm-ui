'use client'

// components
import { Button } from '@/components/Button';

// hooks
import useFaction from '@/hooks/useFaction';

// utils
import { factionColorPalette as fcp } from './utils';

export const Quantity = () => {
  const faction = useFaction(state => state.faction)

  return (
    <div className={`w-[48%] flex flex-col p-4 rounded-xl gap-y-6 bg-mc-black-500 ${fcp[faction].text}`} >

      <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>QUANTITY</h3>

      <div className='rounded-xl px-4 2xl:h-16 h-12 bg-black/40 animate-pulse' />

      <div className={`ml-auto h-9 w-24 px-2 bg-black/40 rounded-lg animate-pulse`} /> 
    </div>
  ) 
}

export const Support = () => {
  const faction = useFaction(state => state.faction)

  return (
    <div className='flex-grow flex flex-col justify-between p-4 rounded-xl bg-mc-black-500 text-white' >
      <h3 className={`2xl:text-lg xl:text-md font-bold tracking-tight ${fcp[faction].text}`}>SUPPORT</h3>

      <div className='h-2 w-full bg-black/40 animate-pulse'/>

      <div className='flex gap-x-10 justify-between'>
        <div className='flex flex-col gap-y-2'>
          <p className='text-sm'>HELP US PLEASE!</p>
          <Button className='border border-white text-white bg-mc-green-200' href='/frogPond'>
            FROG POND
          </Button>
        </div>

        <div className='flex flex-col gap-y-2'>
          <p className='text-sm'>WE CAN WIN!</p>
          <Button className='border border-white text-white bg-mc-orange-400' href='dogPark'>
            DOG PARK
          </Button>
        </div>
      </div>
    </div>
  ) 
}

export const Collection = () => {
  const faction = useFaction(state => state.faction)

  return (
    <div className={`flex-grow relative flex flex-col items-center p-4 rounded-xl bg-mc-black-500 ${fcp[faction].text}`} >
      <div className='absolute top-4 inset-x-0 flex justify-between px-4'>
        <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>Collection</h3>

        <div className={`gap-x-1 px-1 py-0 rounded-xl h-5 w-10 bg-black/40 animate-pulse`} />
      </div>

      <div className='z-10 flex gap-x-16 mt-6'>
        <h2 className={`text-2xl font-bold underline ${faction === 'FROG' ? fcp[faction].text : 'text-white/60' }`}>FROGS</h2>
        <h2 className={`text-2xl font-bold underline ${faction === 'DOG' ? fcp[faction].text : 'text-white/60' }`}>DOGS</h2>
      </div>

      <div className='flex flex-grow px-4 mt-6 w-full'>
        <div className='h-[350px] relative flex-grow flex flex-wrap p-10 gap-8 bg-black/25 rounded-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-rounded-lg scrollbar-track-transparent'>
          {[...Array(20).keys()].map((_, i) => (
            <div className='w-[100px] h-[100px] bg-black/40 animate-pulse' key={i}/>
          ))}
          <div className={`absolute bottom-4 right-10 `}/>
        </div>
      </div> 

      <div className={`p-4 bg-black/25 rounded-xl gap-y-2 w-[400px] mt-2 text-sm ${fcp[faction].text}`}>
        <p>Mucus Generated</p>
        <div className='flex justify-between ml-4'>
          <p>Daily</p>
          <div className={`h-3 w-8 rounded-full bg-black/40 animate-pulse`}/>
        </div>
        <div className='flex justify-between ml-4'>
          <p>Total</p>
          <div className={`h-3 w-8 rounded-full bg-black/40 animate-pulse`}/>
        </div>
      </div>

      <div className='flex justify-between w-[400px] px-4 mt-4'>
        <div className={`h-9 w-16 bg-black/40 animate-pulse rounded-lg`}/>
        <div className={`h-9 w-16 bg-black/40 animate-pulse rounded-lg`}/>
        <div className={`h-9 w-16 bg-black/40 animate-pulse rounded-lg`}/>
        <div className={`h-9 w-16 bg-black/40 animate-pulse rounded-lg`}/>
      </div>
    </div>
  ) 
}
