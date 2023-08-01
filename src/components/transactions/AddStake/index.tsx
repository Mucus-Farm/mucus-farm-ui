'use client'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// utils
import type { Faction } from '@/utils/constants'
import { env } from '@/env.mjs'

// api
import { useAddStake } from '@/api/dpsMethods'

export function AddDogStakeTransaction({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/2642e55e-56d3-4e20-80cb-b5e32a61ab00/public`} alt='doggySit' />
      {status === 'PENDING' && <p className='text-mc-brown-500 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-brown-500 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function AddDogStakeSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/2642e55e-56d3-4e20-80cb-b5e32a61ab00/public`} alt='doggySit' />
      <p className='text-mc-brown-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export function AddFrogStakeTransaction({ status, retry }: StepElementProps) {
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

export function AddFrogStakeSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/c369925e-f86b-4ec2-db09-eee1b6c7d400/public`} alt='froggyWait'  />
      <p className='text-mc-mahogany-300 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export type AddStakeValues = {
  depositAmount: string;
  faction: Faction;
  slippage: string;
}
type AddStakeTransactionProps = AddStakeValues & { onClose: () => void; }
export const AddStakeTransaction = ({ depositAmount, faction, slippage, onClose }: AddStakeTransactionProps) => {
  const addStake = useAddStake()

  const steps = [
    {
      stepElement: faction === 'DOG' ? AddDogStakeTransaction : AddFrogStakeTransaction,
      action: async () => addStake.write({ depositAmount, faction, slippage }),
    },
    {
      stepElement: faction === 'DOG' ? AddDogStakeSuccess : AddFrogStakeSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!addStake.writeAsync}
    Skeleton={Skeleton.AddFrogStakeTransaction}
  />
}
