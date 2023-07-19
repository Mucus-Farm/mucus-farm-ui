// components
// import FactionMeter from "@/components/FactionMeter";
import { Button } from "@/components/Button"

// utils
import type { Faction } from "@/utils/constants";
import { factionColorPalette as fcp } from './utils';

type SupportProps = { faction: Faction }
export default function Support({ faction }: SupportProps) {
  return (
    <div className='flex-grow flex flex-col justify-between p-4 rounded-xl bg-mc-black-500 text-white' >
      <h3 className={`2xl:text-lg xl:text-md font-bold tracking-tight ${fcp[faction].text}`}>SUPPORT</h3>
      {/* <FactionMeter /> */}
      <div className='flex gap-x-10 justify-between'>
        <div className='flex flex-col gap-y-2'>
          <p className='text-sm'>HELP US PLEASE!</p>
          <Button className='border border-white text-white bg-mc-green-200' href='/froggyFriends'>
            FROG POND
          </Button>
        </div>

        <div className='flex flex-col gap-y-2'>
          <p className='text-sm'>WE CAN WIN!</p>
          <Button className='border border-white text-white bg-mc-orange-400' href='doggyDomination'>
            DOG PARK
          </Button>
        </div>
      </div>
    </div>
  ) 
}

