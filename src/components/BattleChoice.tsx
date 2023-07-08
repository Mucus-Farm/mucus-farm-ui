import Image from "next/image"

// components
import { Button } from "@/components/Button"

// icons
import XMark from "@/images/XMark.png"

export default function BattleChoice({ onClose }: { onClose: () => void }) {
  return (
    <div className='relative flex flex-col p-24'>
      <div className='absolute top-4 right-4 cursor-pointer w-12' onClick={() => onClose()}>
        <Image
          className='w-full'
          src={XMark}
          alt=""
          unoptimized
        />
      </div> 
      <h3 className='text-white font-bold text-4xl tracking-tight'>WHAT WILL YOU CHOOSE</h3>

      <div className='flex gap-x-16 mt-16'>
        <div className='flex flex-col'>
          <p className='text-white text-sm'>HELP US PLEASE!</p>
          <Button className='px-8 py-4 bg-mc-green-200 border-2 border-white' href='/froggyFriends'>
            <p className='text-white font-bold text-3xl'>FROG POND</p>
          </Button>
        </div>

        <div className='flex flex-col'>
          <p className='text-white text-sm'>WE CAN WIN!</p>
          <Button className='px-8 py-4 bg-mc-orange-300 border-2 border-white' href='/doggyDomination'>
            <p className='text-white font-bold text-3xl'>DOG PARK</p>
          </Button>
        </div>
      </div> 
    </div> 
  )
}