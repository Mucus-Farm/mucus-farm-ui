// components
import { Container } from "@/components/Container"
import UserStats from './UserStats'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

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
      <UserStats faction={faction} />

      <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
        <Deposit faction={faction}/>

        <Withdraw faction={faction} />
      </div> 
    </Container>
  )
}

