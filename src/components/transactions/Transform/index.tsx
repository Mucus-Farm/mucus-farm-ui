'use client'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useTransform } from '@/api/fndMethods'

// utils
import type { Faction } from '@/utils/constants'
import { env } from '@/env.mjs'

export function TransformTransactionStep({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a21f163c-093e-45a2-2a43-0e89470cf400/public`} alt='fndTrading' />
      {status === 'PENDING' && <p className='text-mc-brown-500 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-brown-500 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function TransformSuccess({ transformSucceeded }) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a21f163c-093e-45a2-2a43-0e89470cf400/public`} alt='fndTrading' />
      <p className='text-mc-brown-500 text-lg mt-6'>{transformSucceeded ? 'SUCCESS' : 'FAILED'}</p>
    </div>
  )
}

export type TransformValues = {
  tokenIds: number[];
  transformationType: Faction;
}
type TransformTransactionProps = TransformValues & { onClose: () => void; }
export const TransformTransaction = ({ tokenIds, transformationType, onClose }: TransformTransactionProps) => {
  const transform = useTransform()

  const steps = [
    {
      stepElement: TransformTransactionStep,
      action: () => transform.write({ 
        tokenIds: tokenIds.map(id => BigInt(id)),
        transformationType: transformationType === 'DOG' ? 0 : 1,
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
