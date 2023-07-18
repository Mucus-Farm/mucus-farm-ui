import { Suspense } from 'react';

// components
import { Container } from "@/components/Container"
import UserStats from './UserStats'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import * as Skeleton from './Skeleton'

export default function StakingForm() {
  return (
    <Container className='flex-grow flex flex-col p-4 gap-y-6 2xl:gap-y-10 w-[65vw] xl:w-[60vw] 2xl:w-[50vw] mx-0 mr-auto mt-6 xl:mt-8 2xl:mt-12'>
      <Suspense fallback={<Skeleton.UserStats />}>
        <UserStats faction='FROG' />
      </Suspense>

      <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
        <Suspense fallback={<Skeleton.Deposit />}>
          <Deposit />
        </Suspense>

        <Suspense fallback={<Skeleton.Withdraw />}>
          <Withdraw faction='FROG' />
        </Suspense> 
      </div> 
    </Container>
  )
}