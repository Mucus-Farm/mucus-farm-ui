'use client'

import Image from 'next/image'

// components
import TransactionSteps, { type StepElementProps } from '@/components/TransactionSteps'
import * as Skeleton from './skeleton'
import { Button } from '@/components/Button'

// api
import { useWhitelistMint, useMint, useBreedAndAdopt } from '@/api/fndMethods'

// images
import fndTrading from '@/images/fnd-trading.png'

export function MintTransactionStep({ status, retry }: StepElementProps) {
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

export function MintSuccess() {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg bg-mc-gray-200 p-8 max-w-[500px] border-2 border-white'>
      <Image width={200} height={200} src={fndTrading} alt='fndTrading' unoptimized />
      <p className='text-mc-brown-500 text-lg mt-6'>SUCCESS</p>
    </div>
  )
}

const tokensPaidInEth = 2000;

type MintAction = {
  amount: number;
  stake: boolean;
  value?: string;
}
export type MintValues = MintAction & {
  publicMintStarted: boolean;
  minted: number;
}
type MintTransactionProps = MintValues & { onClose: () => void; }

const useMintAction = ({ publicMintStarted, minted }: { publicMintStarted: boolean, minted: number }) => {
  const whitelistMint = useWhitelistMint()
  const breedAndAdopt = useBreedAndAdopt()
  const mint = useMint()

  if (!publicMintStarted) return whitelistMint

  if (minted > tokensPaidInEth) return breedAndAdopt

  return mint
}

export const MintTransaction = ({ amount, stake, value, publicMintStarted, minted, onClose }: MintTransactionProps) => {
  const mint = useMintAction({ publicMintStarted, minted })

  const steps = [
    {
      stepElement: MintTransactionStep,
      action: () => mint.write({ amount, stake, value })
    },
    {
      stepElement: MintSuccess,
    }
  ]

  return <TransactionSteps
    steps={steps}
    onClose={onClose}
    isLoading={!mint.writeAsync}
    Skeleton={Skeleton.MintTransaction}
  />
}
