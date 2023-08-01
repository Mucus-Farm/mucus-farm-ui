'use client'

import Image from 'next/image'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useAddManyToMucusFarm } from '@/api/mucusFarmMethods'

// images
import fndTrading from '@/images/fnd-trading.png'

export function AddManyToMucusFarmTransactionStep({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <Image width={200} height={200} src={fndTrading} alt='fndTrading' unoptimized />
      {status === 'PENDING' && <p className='text-mc-brown-500 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-brown-500 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function AddManyToMucusFarmSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <Image width={200} height={200} src={fndTrading} alt='fndTrading' unoptimized />
      <p className='text-mc-brown-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export type AddManyToMucusFarmValues = {
  tokenIds: number[];
}
type AddManyToMucusFarmTransactionProps = AddManyToMucusFarmValues & { onClose: () => void; }
export const AddManyToMucusFarmTransaction = ({ tokenIds, onClose }: AddManyToMucusFarmTransactionProps) => {
  const addManyToMucusFarm = useAddManyToMucusFarm()

  const steps = [
    {
      stepElement: AddManyToMucusFarmTransactionStep,
      action: () => addManyToMucusFarm.write({ tokenIds: tokenIds.map(id => BigInt(id)) })
    },
    {
      stepElement: AddManyToMucusFarmSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!addManyToMucusFarm.writeAsync}
    Skeleton={Skeleton.AddManyToMucusFarmTransaction}
  />
}
