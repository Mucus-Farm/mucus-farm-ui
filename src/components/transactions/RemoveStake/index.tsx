'use client'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// utils
import type { Faction } from '@/utils/constants'
import { env } from '@/env.mjs'

// api
import { useRemoveStake } from '@/api/dpsMethods'

export function RemoveDogStakeTransaction({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/2642e55e-56d3-4e20-80cb-b5e32a61ab00/public`} alt='froggyWait' />
      {status === 'PENDING' && <p className='text-mc-brown-500 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-mahogany-500 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function RemoveDogStakeSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/2642e55e-56d3-4e20-80cb-b5e32a61ab00/public`} alt='froggyWait' />
      <p className='text-mc-mahogany-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export function RemoveFrogStakeTransaction({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/c369925e-f86b-4ec2-db09-eee1b6c7d400/public`} alt='froggyWait' />
      {status === 'PENDING' && <p className='text-mc-mahogany-300 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-mahogany-300 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function RemoveFrogStakeSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/c369925e-f86b-4ec2-db09-eee1b6c7d400/public`} alt='froggyWait' />
      <p className='text-mc-mahogany-300 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export type RemoveStakeValues = {
  withdrawAmount: string;
  faction: Faction;
}
type RemoveStakeTransactionProps = RemoveStakeValues & { onClose: () => void; }
export const RemoveStakeTransaction = ({ withdrawAmount, faction, onClose }: RemoveStakeTransactionProps) => {
  const removeStake = useRemoveStake()

  const steps = [
    {
      stepElement: faction === 'DOG' ? RemoveDogStakeTransaction : RemoveFrogStakeTransaction,
      action: async () => removeStake.write({ withdrawAmount, faction }),
    },
    {
      stepElement: faction === 'DOG' ? RemoveDogStakeSuccess : RemoveFrogStakeSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!removeStake.writeAsync}
    Skeleton={Skeleton.AddFrogStakeTransaction}
  />
}
