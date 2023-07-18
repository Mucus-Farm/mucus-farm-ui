'use client'

import { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { useQuery, useAccount, useBalance, useNetwork } from 'wagmi';
import { formatEther } from 'viem';

// components
import { Button } from "@/components/Button"
import Modal from '@/components/Modal'
import { SlippageDropdown } from './SlippageDropdown'
import { AddStakeTransaction, type AddStakeValues } from '@/components/transactions/AddStake'
import { ConnectWrapper } from '../ConnectWrapper';

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// api
import { fetchMucusEthPrice, fetchEthUsdcPrice } from '@/api/uniswapMethods';

const depositInputs = z.object({ 
  deposit: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO'),
  slippage: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO'),
})
export type DepositInputs = z.infer<typeof depositInputs>
export default function Deposit() {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const [show, setShow] = useState<boolean>(false)
  const [transactionValues, setTransactionValues] = useState<AddStakeValues | null>(null)
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()
  const { data: usdcPrice } = useQuery(['fetchEthUscPrice'], fetchEthUsdcPrice, { suspense: true, cacheTime: 0 })
  const { data: mucusEthPrice } = useQuery(['fetchMucusEthPrice'], fetchMucusEthPrice, { suspense: true, cacheTime: 0 })

  const methods = useForm<DepositInputs>({
    defaultValues: {
      deposit: '',
      slippage: '0.5',
    },
    resolver: zodResolver(depositInputs),
  })
  const { handleSubmit, register, watch, formState: { errors } } = methods
  const [deposit, slippage] = watch(['deposit', 'slippage'])

  const onSubmit: SubmitHandler<DepositInputs> = (data) => {
    if (depositValidation()) return
    const { deposit, slippage } = data
    setTransactionValues({ depositAmount: deposit, faction: 'FROG', slippage })
    setShow(true)
  }

  const depositMessage = () => {
    if (!balance || !chain) {
      return 'ISSUE WITH CONNECTING WALLET'
    }
    if (Number(deposit) > Number(formatEther(balance.value))) {
      return 'INSUFFICIENT BALANCE'
    }
    if (deposit === '') {
      return 'ENTER AMOUNT'
    }
    if (Number(deposit) <= 0) {
      return 'MUST BE GREATER THAN ZERO'
    }
    if (Number(slippage) > 69) {
      return 'SLIPPAGE TOO HIGH'
    }
    if (slippage === '') {
      return 'ENTER SLIPPAGE'
    }

    return 'DEPOSIT'
  }

  const depositValidation = () => {
    return !balance 
      || !chain 
      || Number(deposit) > Number(formatEther(balance.value)) 
      || Number(deposit) <= 0 
      || deposit === '' 
      || errors.deposit 
      || Number(slippage) > 69 
      || slippage === '' 
      || errors.slippage
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  if (!usdcPrice || !mucusEthPrice) return null
  return (
    <FormProvider {...methods} >
      <form className='flex flex-col p-4 rounded-xl text-mc-mahogany-300 bg-mc-rose-300' onSubmit={handleSubmit(onSubmit)} onKeyDown={e => handleKeyDown(e)}>
        <Modal open={show} onClose={() => setShow(false)}>
          <AddStakeTransaction {...transactionValues!} onClose={() => setShow(false)} />
        </Modal>

        <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>DEPOSIT</h3>

        <div className='flex flex-col gap-y-2 xl:text-sm 2xl:text-base'>
          <p className='text-md'>FROM</p>
          <div className='flex justify-between items-center rounded-xl px-4 2xl:h-16 h-12 bg-mc-mahogany-200'>
            <div className='flex flex-col'>
              <NumberInput name='deposit' register={register} />
              <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/.test(deposit) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                {currencyFormat.format(Number(deposit) * usdcPrice)}
              </div>
            </div>
            <div className='rounded-xl border border-white px-2 py-1 text-white text-sm 2xl:text-lg'>ETH</div>
          </div>
        </div>

        <div className='flex flex-col gap-y-2 mt-4 2xl:mt-8'>
          <p className='text-md'>TO</p>
          <div className='flex justify-between items-center rounded-xl px-4 h-12 2xl:h-16 bg-mc-green-100'>
            <div className='flex flex-col'>
              <div className='text-white text-lg 2xl:text-xl font-bold'>{Number(deposit) * mucusEthPrice}</div>
              <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/.test(deposit) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                {currencyFormat.format(Number(deposit) * usdcPrice)}
              </div>
            </div>
            <div className='rounded-xl border border-white px-2 py-1 text-white text-sm 2xl:text-lg'>MUCUS/ETH</div>
          </div>
        </div>

        <div className='text-mc-mahogany-300/60 mt-4 2xl:mt-8 text-sm'>
          <p>Est.Allocation</p>
          <div className='flex justify-between pl-4'>
            <p>MUCUS</p>
            <p>{Number(deposit) * mucusEthPrice}</p>
          </div>
          <div className='flex justify-between pl-4'>
            <p>ETH</p>
            <p>{deposit}</p>
          </div>
          <div className='w-full border-b border-b-mc-green-100 border-dashed mt-1' />
        </div>

        <div className='text-mc-mahogany-300/60 mt-4 2xl:mt-12 text-sm'>
          <div className='flex justify-between items-center'>
            <p>Slippage</p>
            <SlippageDropdown />
          </div>
          <div className='w-full border-b border-b-mc-green-100 border-dashed mt-2'></div>
        </div>

        <div className='flex-grow flex items-end'>
          <ConnectWrapper className='justify-self-end w-full mt-4'>
            <Button 
              className={`justify-self-end bg-white/50 border border-white text-mc-mahogany-300/60 w-full transition-all mt-4 ${depositValidation() ? 'opacity-60' : ''}`}
              type='submit'
            >
              {depositMessage()}
            </Button>
          </ConnectWrapper>
        </div> 
      </form>
    </FormProvider> 
  )
}
