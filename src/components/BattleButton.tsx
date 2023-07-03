'use client';

import { useState } from "react";

// components
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import BattleChoice from "@/components/BattleChoice";

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

