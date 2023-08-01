'use client'

// components
import { Button } from "@/components/Button"

// hooks
import useFaction from "@/hooks/useFaction";

// utils
import { factionColorPalette as fcp } from './utils';

export default function Support({ children }: { children: React.ReactNode}) {
  const faction = useFaction(state => state.faction)

  return (
    <div className='flex-grow flex flex-col justify-between p-4 rounded-xl bg-mc-black-500 text-white' >
      <h3 className={`2xl:text-lg xl:text-md font-bold tracking-tight ${fcp[faction].text}`}>SUPPORT</h3>
      {children}
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

