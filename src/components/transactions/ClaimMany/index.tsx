'use client'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useClaimMany } from '@/api/mucusFarmMethods'
import { env } from '@/env.mjs'

export function ClaimManyTransactionStep({ status, retry }: StepElementProps) {
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

export function ClaimManySuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <img width={200} height={200} src={`${env.NEXT_PUBLIC_CF_IMAGES_URL_BASE}/a21f163c-093e-45a2-2a43-0e89470cf400/public`} alt='fndTrading' />
      <p className='text-mc-brown-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

export type ClaimManyValues = {
  tokenIds: number[];
  unStake: boolean;
}
type ClaimManyTransactionProps = ClaimManyValues & { onClose: () => void; }
export const ClaimManyTransaction = ({ tokenIds, unStake, onClose }: ClaimManyTransactionProps) => {
  const claimMany = useClaimMany()

  const steps = [
    {
      stepElement: ClaimManyTransactionStep,
      action: () => claimMany.write({ tokenIds: tokenIds.map(id => BigInt(id)), unStake })
    },
    {
      stepElement: ClaimManySuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!claimMany.writeAsync}
    Skeleton={Skeleton.ClaimManyTransaction}
  />
}
