'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { useQuery, useAccount, useBalance, useNetwork } from 'wagmi';

// components
import { Container } from "@/components/Container"
import { Button } from "@/components/Button"
import { SlippageDropdown } from './SlippageDropdown'
import { ConnectButton } from '@/components/ConnectButton'
import * as Skeleton from './Skeleton'

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// api
import { fetchUSDCPrice } from './uniswapMethods';

const UserStats = () => {
  const totalDeposited = 12490
  const APR = 640
  const userDeposit = 54
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className='flex flex-col bg-mc-rose-300 rounded-xl p-6'>
      <h2 className='text-mc-mahogany-300 font-bold tracking-tight text-center 2xl:text-3xl xl:text-2xl'>LETS MAKE A PROMISE</h2>
      <p className='text-white text-center 2xl:text-lg xl:text-md'>PROTECT US AND WE OWE YOU</p>

      <div className='flex justify-between 2xl:mt-12 xl:mt-8 text-mc-mahogany-300 xl:text-sm'>
        <p>Total Deposited <span className='font-bold'>{currencyFormat.format(totalDeposited)}</span></p>
        <p>APR <span className='font-bold'>{APR}%</span></p>
        <p>Your Deposit <span className='font-bold'>{userDeposit}LP</span></p>
      </div>
    </div>
  )
}

const ConnectWrapper = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount()
  if (address) return <>{children}</>

  return <ConnectButton className='justify-self-end bg-white/50 border border-white text-mc-mahogany-300/60 w-full mt-4' loadingClassName='bg-mc-rose-400'/> 
}), { 
  ssr: false,
  loading: () => <Skeleton.ConnectOrDepositButton />,
})

const depositInputs = z.object({ 
  deposit: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO'),
  slippage: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO'),
})
export type DepositInputs = z.infer<typeof depositInputs>
const Deposit = () => {
  const lpTokenAmount = 0.000
  const mucusAmount = 0.000
  const ethAmount = 0.000
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()
  const { data: USDCPrice } = useQuery(['fetchUSDCPrice'], fetchUSDCPrice, { suspense: true, cacheTime: 0 })

  const methods = useForm<DepositInputs>({
    defaultValues: {
      deposit: '',
      slippage: '0.5',
    },
    resolver: zodResolver(depositInputs),
  })
  const { handleSubmit, register, watch, formState: { errors } } = methods
  const deposit = watch('deposit')

  const onSubmit: SubmitHandler<DepositInputs> = (data) => {
    if (depositValidation()) return
    console.log("gets in here")
    console.log(data)
  }

  console.log("errors: ", errors)

  const depositMessage = () => {
    if (!balance || !chain) {
      return 'ISSUE WITH CONNECTING WALLET'
    }
    if (Number(deposit) > balance.value) {
      return 'INSUFFICIENT BALANCE'
    }
    if (deposit === '') {
      return 'ENTER AMOUNT'
    }
    if (Number(deposit) <= 0) {
      return 'MUST BE GREATER THAN ZERO'
    }

    return 'DEPOSIT'
  }

  const depositValidation = () => {
    if (!balance || !chain || Number(deposit) > balance.value || Number(deposit) <= 0 || deposit === '' || errors.deposit) {
      return true
    }

    return false
  }

  if (!USDCPrice) return null
  return (
    <FormProvider {...methods} >
      <form className='flex flex-col p-4 rounded-xl text-mc-mahogany-300 bg-mc-rose-300' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>DEPOSIT</h3>

        <div className='flex flex-col gap-y-2 xl:text-sm 2xl:text-base'>
          <p className='text-md'>FROM</p>
          <div className='flex justify-between items-center rounded-xl px-4 2xl:h-16 h-12 bg-mc-mahogany-200'>
            <div className='flex flex-col'>
              <NumberInput name='deposit' register={register} />
              <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^(0|[1-9][0-9]*)$/.test(deposit) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                {currencyFormat.format(Number(deposit) * USDCPrice)}
              </div>
            </div>
            <div className='rounded-xl border border-white px-2 py-1 text-white text-sm 2xl:text-lg'>ETH</div>
          </div>
        </div>

        <div className='flex flex-col gap-y-2 mt-4 2xl:mt-8'>
          <p className='text-md'>TO</p>
          <div className='flex justify-between items-center rounded-xl px-4 h-12 2xl:h-16 bg-mc-green-100'>
            <div className='flex flex-col'>
              <div className='text-white text-lg 2xl:text-xl font-bold'>{lpTokenAmount}</div>
              <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^(0|[1-9][0-9]*)$/.test(deposit) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                {currencyFormat.format(Number(deposit) * USDCPrice)}
              </div>
            </div>
            <div className='rounded-xl border border-white px-2 py-1 text-white text-sm 2xl:text-lg'>MUCUS/ETH</div>
          </div>
        </div>

        <div className='text-mc-mahogany-300/60 mt-4 2xl:mt-8 text-sm'>
          <p>Est.Allocation</p>
          <div className='flex justify-between pl-4'>
            <p>MUCUS</p>
            <p>{mucusAmount}</p>
          </div>
          <div className='flex justify-between pl-4'>
            <p>ETH</p>
            <p>{ethAmount}</p>
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
          <ConnectWrapper>
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

type WithdrawInputs = { withdraw: string }
export const Withdraw = () => {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const { data: USDCPrice  } = useQuery(['fetchUSDCPrice'], fetchUSDCPrice, { suspense: true, cacheTime: 0 })

  const { handleSubmit, register, watch } = useForm<WithdrawInputs>({
    defaultValues: {
      withdraw: '',
    }
  })
  const withdraw = watch('withdraw')

  const onSubmit: SubmitHandler<WithdrawInputs> = (data) => {
    console.log(data)
  }

  if (!USDCPrice) return null
  return (
    <form className='flex flex-col text-mc-mahogany-300' onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-mc-rose-300 p-4 rounded-xl'>
        <h3 className='text-md 2xl:text-lg font-bold tracking-tight'>WITHDRAW</h3>

        <p className='text-md'>AMOUNT</p>
        <div className='flex flex-col justify-center rounded-xl px-4 h-12 2xl:h-16 bg-mc-mahogany-200 mt-1'>
          <NumberInput name='withdraw' register={register} />
          <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^(0|[1-9][0-9]*)$/.test(withdraw) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
            {currencyFormat.format(Number(withdraw) * USDCPrice)}
          </div>
        </div>

        <div className='flex justify-end gap-x-3 mt-4 2xl:mt-6'>
          <Button className='p-2 font-normal border border-white rounded-xl text-white bg-mc-mahogany-300/60'>MAX</Button>
          <Button className='p-2 font-normal border border-white rounded-xl text-mahogany/60 bg-white/50'>WITHDRAW</Button>
        </div>
      </div>
      <p className='text-sm 2xl:text-lg text-center whitespace-nowrap text-mc-mahogany-300 mt-6'>
        YOU MAY QUALIFY FOR A FREE MINT
      </p>
      <Button className='bg-white/50 border border-white py-4 text-lg 2xl:text-2xl text-mc-mahogany-300 w-full mt-1'>
        MUCUS GENERATOR
      </Button>
    </form>
  )
}

export default function StakingForm() {

  return (
    <Container className='flex-grow flex flex-col p-4 gap-y-6 2xl:gap-y-10 w-[65vw] xl:w-[60vw] 2xl:w-[50vw] mx-0 mr-auto mt-6 xl:mt-8 2xl:mt-12'>
      <Suspense fallback={<Skeleton.UserStats />}>
        <UserStats />
      </Suspense>

      <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
        <Suspense fallback={<Skeleton.Deposit />}>
          <Deposit />
        </Suspense>

        <Suspense fallback={<Skeleton.Withdraw />}>
          <Withdraw />
        </Suspense> 
      </div> 
    </Container>
  )
}