'use client';

import { useState } from "react";
import dynamic from "next/dynamic";

// components
import { Button } from "@/components/Button";
const Modal = dynamic(() => import("@/components/Modal"));

// utils
import { env } from '@/env.mjs'

const BattleChoice = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='relative flex flex-col p-24 rounded-lg bg-mc-pink-300 border-2 border-white'>
      <div className='absolute top-4 right-4 cursor-pointer w-12' onClick={() => onClose()}>
        <img
          className='w-full'
          src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/b12020e5-debf-40b6-e623-84c5c183cf00/public`}
          alt=""
        />
      </div> 
      <h3 className='text-white font-bold text-4xl tracking-tight'>WHAT WILL YOU CHOOSE</h3>

      <div className='flex gap-x-16 mt-16'>
        <div className='flex flex-col'>
          <p className='text-white text-sm'>HELP US PLEASE!</p>
          <Button className='px-8 py-4 bg-mc-green-200 border-2 border-white' href='/frogPond'>
            <p className='text-white font-bold text-3xl'>FROG POND</p>
          </Button>
        </div>

        <div className='flex flex-col'>
          <p className='text-white text-sm'>WE CAN WIN!</p>
          <Button className='px-8 py-4 bg-mc-orange-300 border-2 border-white' href='/dogPark'>
            <p className='text-white font-bold text-3xl'>DOG PARK</p>
          </Button>
        </div>
      </div> 
    </div> 
  )
}

export default function Body() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Modal open={show} onClose={() => setShow(false)}>
        <BattleChoice onClose={() => setShow(false)} />
      </Modal>

      <p className='text-xs text-white xl:text-base'>{'FROGS'} ARE WINNING</p>
      <Button className='bg-mc-pink-300 border-2 border-white cursor-pointer rounded-xl' onClick={() => setShow(true)}>
        <p className='text-white font-bold text-lg xl:text-2xl xl:px-3 xl:py-1'>JOIN THE BATTLE</p>
      </Button>
    </> 
  )
}

