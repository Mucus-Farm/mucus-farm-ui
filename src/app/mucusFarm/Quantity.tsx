'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod'
import { useQuery, useNetwork } from 'wagmi';
import { zodResolver } from '@hookform/resolvers/zod';

// components
import { Button } from "@/components/Button"
import Modal from '@/components/Modal'
import { ConnectWrapperSkeleton } from '@/components/ConnectWrapper';
const ConnectWrapper = dynamic(() => import('@/components/ConnectWrapper'), { loading: () => <ConnectWrapperSkeleton className='bg-black/40 w-24'/>})
import { MintTransaction, type MintValues  } from '@/components/transactions/Mint'

// inputs
import { NumberInput } from "@/components/inputs/NumberInput";

// hooks
import useFaction from '@/hooks/useFaction';

// utils
import { factionColorPalette as fcp } from './utils';
import { env } from '@/env.mjs';

// api
import { getMinted, getPublicMintStarted } from '@/api/fndMethods';

const quantityInputs = z.object({ 
  quantity: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO'),
})
type QuantityInputs = z.infer<typeof quantityInputs>
export default function Quantity() {
  const [show, setShow] = useState<boolean>(false)
  const [transactionValues, setTransactionValues] = useState<MintValues | null>(null)
  const faction = useFaction(state => state.faction)
  const { chain } = useNetwork()
  const minted = useQuery(['getMinted'], getMinted, { cacheTime: 0, suspense: true })
  const publicMintStarted = useQuery(['getPublicMintStarted'], getPublicMintStarted, { cacheTime: 0, suspense: true })

  const whitelistMintCap = 1000;
  const tokensPaidInEth = 2000;
  const totalSupply = publicMintStarted.data ? 6000 : 1000;
  const ethMintPrice = 0.001;
  const mucusMintPrice = 6262;

  const { handleSubmit, register, watch, formState: { errors } } = useForm<QuantityInputs>({
    defaultValues: {
      quantity: '',
    },
    resolver: zodResolver(quantityInputs),
  })
  const quantity = watch('quantity')

  const onSubmit: SubmitHandler<QuantityInputs> = (data) => {
    if (mintValidation()) return
    const { quantity } = data
    setTransactionValues({
      amount: Number(quantity),
      value: String(ethMintPrice * Number(quantity)),
      publicMintStarted: publicMintStarted.data!,
      minted: Number(minted.data!),
    })
    setShow(true)
  }

  const mintMessage = () => {
    if (!chain) {
      return 'ISSUE WITH CONNECTING WALLET'
    }
    if (chain.id !== Number(env.NEXT_PUBLIC_CHAIN_ID)) {
      return 'WRONG NETWORK'
    }
    if (quantity === '') {
      return 'ENTER AMOUNT'
    }
    if (Number(quantity) <= 0) {
      return 'MUST BE GREATER THAN ZERO'
    }
    if (!publicMintStarted.data && Number(minted.data) >= whitelistMintCap) {
      return 'HIT WHITELIST SALE LIMIT'
    }
    if (Number(minted.data) < tokensPaidInEth && Number(quantity) + Number(minted.data) > tokensPaidInEth) {
      return 'HIT ETH TOKEN SALE LIMIT'
    }
    if (Number(quantity) + Number(minted.data) > totalSupply) {
      return 'HIT SALE LIMIT'
    }
    if (Number(quantity) > 10) {
      return 'MAX 10'
    }

    return 'MINT'
  }

  const mintValidation = () => {
    return !chain
      || chain.id !== Number(env.NEXT_PUBLIC_CHAIN_ID)
      || quantity === ''
      || Number(quantity) <= 0
      || !publicMintStarted.data && Number(minted.data) >= whitelistMintCap
      || Number(minted.data) < tokensPaidInEth && Number(quantity) + Number(minted.data) > tokensPaidInEth
      || Number(quantity) + Number(minted.data) > totalSupply
      || Number(quantity) > 10
      || errors.quantity
  }
  return (
    <form className={`w-[48%] flex flex-col p-4 rounded-xl gap-y-6 bg-mc-black-500 ${fcp[faction].text}`} onSubmit={handleSubmit(onSubmit)}>
      <Modal open={show} onClose={() => setShow(false)}>
        <MintTransaction {...transactionValues!} onClose={() => setShow(false)} />
      </Modal>

      <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>QUANTITY</h3>

      <div className='flex justify-between items-center rounded-xl px-4 2xl:h-16 h-12 bg-black/25'>
        <div className='flex flex-col'>
          <NumberInput name='quantity' register={register} />
          <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/.test(quantity) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
            {minted.data && minted.data >= 2000 ? `${mucusMintPrice * Number(quantity)} MUCUS` : `${ethMintPrice * Number(quantity)} ETH`}
          </div>
        </div>
        <div className='text-mc-gray-50/50 text-sm 2xl:text-lg'>{Number(minted.data)}/{totalSupply}</div>
      </div>

      <div className='flex justify-end'>
        <ConnectWrapper className={`bg-transparent ${fcp[faction].text}`}>
          <Button
            className={`px-2 ${fcp[faction].bg} border border-white text-white font-normal ${mintValidation() ? 'opacity-60' : ''}`}
            type='submit'
          >
            {mintMessage()}
          </Button>
        </ConnectWrapper>
      </div>
    </form>
  )
}

