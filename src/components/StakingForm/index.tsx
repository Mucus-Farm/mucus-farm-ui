'use client';

import { Suspense } from 'react';

// components
import { Container } from "@/components/Container"
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import * as Skeleton from './Skeleton'

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