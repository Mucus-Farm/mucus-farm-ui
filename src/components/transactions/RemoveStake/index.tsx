'use client'

import Image from 'next/image'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useRemoveStake } from '@/api/mucusMethods'

// images
import frogBigGirl from '@/images/frog-big-girl.png'

export function RemoveFrogStakeTransaction({ status, retry }: StepElementProps) {
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

export function RemoveFrogStakeSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <Image width={200} height={200} src={frogBigGirl} alt='froggyWait' unoptimized />
      <p className='text-mc-mahogany-300 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export type RemoveStakeValues = {
  withdrawAmount: string;
  faction: 'FROG' | 'DOG';
}
type RemoveStakeTransactionProps = RemoveStakeValues & { onClose: () => void; }
export const RemoveStakeTransaction = ({ withdrawAmount, faction, onClose }: RemoveStakeTransactionProps) => {
  const removeStake = useRemoveStake()

  const steps = [
    {
      stepElement: RemoveFrogStakeTransaction,
      action: async () => removeStake.write({ withdrawAmount, faction }),
    },
    {
      stepElement: RemoveFrogStakeSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!removeStake.writeAsync}
    Skeleton={Skeleton.AddFrogStakeTransaction}
  />
}
