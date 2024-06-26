'use client'

import { lazy, Suspense } from "react"

// components
import { Container } from "@/components/Container"
import * as Skeleton from "./Skeleton"
const UserStats = lazy(() => import("./UserStats"))
const Deposit = lazy(() => import("./Deposit"))
const Withdraw = lazy(() => import("./Withdraw"))

// utils
import type { Faction } from '@/utils/constants';

export const factionColorPalette = {
  FROG: {
    bg: 'bg-mc-rose-300',
    darkBg: 'bg-mc-rose-400',
    text: 'text-mc-mahogany-300',
    mucus: 'bg-mc-green-100'
  },
  DOG: {
    bg: 'bg-mc-purple-300',
    darkBg: 'bg-mc-purple-400',
    text: 'text-mc-brown-500',
    mucus: 'bg-mc-orange-350'
  }
}

export type StakingFormProps = { faction: Faction }
export default function StakingForm({ faction }: StakingFormProps) {
  return (
    <Container className='flex-grow flex flex-col p-4 gap-y-6 2xl:gap-y-10 w-[65vw] xl:w-[60vw] 2xl:w-[50vw] mx-0 mr-auto mt-6 xl:mt-8 2xl:mt-12'>
      <Suspense fallback={<Skeleton.UserStats faction={faction}/>}>
        <UserStats faction={faction} />
      </Suspense>

      <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
        <Suspense fallback={<Skeleton.Deposit faction={faction}/>}>
          <Deposit faction={faction}/>
        </Suspense> 

        <Suspense fallback={<Skeleton.Withdraw faction={faction}/>}>
          <Withdraw faction={faction} />
        </Suspense>
      </div> 
    </Container>
  )
}

