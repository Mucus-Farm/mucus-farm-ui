'use client'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// utils
import type { Faction } from '@/utils/constants'
import { env } from '@/env.mjs'

// api
import { useClaim } from '@/api/dpsMethods'

export function ClaimDogTransaction({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/fe1ae1ca-efa9-4d6f-9c3a-e0e5d543bf00/public`} alt='froggyWait' />
      {status === 'PENDING' && <p className='text-mc-brown-500 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-mahogany-500 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function ClaimDogSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/fe1ae1ca-efa9-4d6f-9c3a-e0e5d543bf00/public`} alt='froggyWait' />
      <p className='text-mc-mahogany-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export function ClaimFrogTransaction({ status, retry }: StepElementProps) {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/c867e2fa-5b56-43f4-8c4f-f9757d29fe00/public`} alt='froggyWait' />
      {status === 'PENDING' && <p className='text-mc-mahogany-300 text-xl mt-6'>LOADING</p>}
      {status === 'FAILED' && (
        <Button className='bg-white/50 border-2 border-mc-mahogany-300 py-4 text-lg 2xl:text-2xl text-mc-mahogany-300 w-full mt-4' onClick={() => retry()}>
          RETRY
        </Button>
      )}
    </div>
  )
}

export function ClaimFrogSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-rose-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/c867e2fa-5b56-43f4-8c4f-f9757d29fe00/public`} alt='froggyWait' />
      <p className='text-mc-mahogany-300 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

type ClaimTransactionProps = { faction: Faction, onClose: () => void; }
export const ClaimTransaction = ({ faction, onClose }: ClaimTransactionProps) => {
  const claim = useClaim()

  const steps = [
    {
      stepElement: faction === 'DOG' ? ClaimDogTransaction : ClaimFrogTransaction,
      action: async () => claim.write(),
    },
    {
      stepElement: faction === 'DOG' ? ClaimDogSuccess : ClaimFrogSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!claim.writeAsync}
    Skeleton={Skeleton.AddFrogStakeTransaction}
  />
}
