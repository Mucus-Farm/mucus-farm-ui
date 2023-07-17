'use client'

import Image from 'next/image'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useAddStake } from '@/api/mucusMethods'

// images
import frogBigGirl from '@/images/frog-big-girl.png'

export function AddFrogStakeTransaction({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <Image width={200} height={200} src={frogBigGirl} alt='froggyWait' unoptimized />
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
      <Image width={200} height={200} src={frogBigGirl} alt='froggyWait' unoptimized />
      <p className='text-mc-mahogany-300 text-lg'>SUCCESS</p>
    </div>
  )
}

export type AddStakeValues = {
  depositAmount: string;
  faction: 'FROG' | 'DOG';
  slippage: string;
}
type AddStakeTransactionProps = AddStakeValues & { onClose: () => void; }
export const AddStakeTransaction = ({ depositAmount, faction, slippage, onClose }: AddStakeTransactionProps) => {
  const addStake = useAddStake()

  const steps = [
    {
      stepElement: AddFrogStakeTransaction,
      action: async () => addStake.write({ depositAmount, faction, slippage }),
    },
    {
      stepElement: AddFrogStakeSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!addStake.writeAsync}
    Skeleton={Skeleton.AddFrogStakeTransaction}
  />
}
