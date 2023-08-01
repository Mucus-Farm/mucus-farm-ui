'use client'

import Image from 'next/image'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useTransform } from '@/api/fndMethods'

// utils
import type { Faction } from '@/utils/constants'

// images
import fndTrading from '@/images/fnd-trading.png'


export function TransformTransactionStep({ status, retry }: StepElementProps) {
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

export function TransformSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <Image width={200} height={200} src={fndTrading} alt='fndTrading' unoptimized />
      <p className='text-mc-brown-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export type TransformValues = {
  tokenIds: number[];
  transformationType: Faction;
  stake: boolean;
}
type TransformTransactionProps = TransformValues & { onClose: () => void; }
export const TransformTransaction = ({ tokenIds, transformationType, stake, onClose }: TransformTransactionProps) => {
  const transform = useTransform()

  const steps = [
    {
      stepElement: TransformTransactionStep,
      action: () => transform.write({ 
        tokenIds: tokenIds.map(id => BigInt(id)),
        transformationType: transformationType === 'DOG' ? 0 : 1,
        stake,
      })
    },
    {
      stepElement: TransformSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!transform.writeAsync}
    Skeleton={Skeleton.TransformTransaction}
  />
}
