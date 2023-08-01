'use client'

import { Container } from "@/components/Container"
import type { UserStatsProps } from "./UserStats"
import type { DepositProps } from './Deposit'
import type { WithdrawProps } from './Withdraw'
import { factionColorPalette as fcp } from "./index"
import type { Faction } from "@/utils/constants"

export const UserStats = ({ faction }: UserStatsProps) => {
  return (
    <div className={`flex flex-col ${fcp[faction].bg} rounded-xl p-6`}>
      <h2 className={`${fcp[faction].text} font-bold tracking-tight text-center 2xl:text-3xl xl:text-2xl`}>LETS MAKE A PROMISE</h2>
      <p className='text-white text-center 2xl:text-lg xl:text-md'>PROTECT US AND WE OWE YOU</p>

      <div className={`flex justify-between 2xl:mt-12 xl:mt-8 ${fcp[faction].text} xl:text-sm`}>
        <p>Total Deposited <span className='font-bold'>N/A</span></p>
        <p>Staker Trading Rewards <span className='font-bold'>N/A</span></p>
        <p>Your Deposit <span className='font-bold'>N/A</span></p>
      </div>
    </div>
  )
}

export const Deposit = ({ faction }: DepositProps) => {
  return (
    <div className={`w-1/2 flex flex-col p-4 rounded-xl ${fcp[faction].text} ${fcp[faction].bg}`}>
      <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>DEPOSIT</h3>

      <div className='flex flex-col gap-y-2 xl:text-sm 2xl:text-base'>
        <p className='text-md'>FROM</p>
        <div className='rounded-xl 2xl:h-16 h-12 w-full bg-mc-mahogany-200 animate-pulse' />
      </div>

      <div className='flex flex-col gap-y-2 mt-4 2xl:mt-8'>
        <p className='text-md'>TO</p>
        <div className={`rounded-xl h-12 2xl:h-16 w-full ${fcp[faction].mucus} animate-pulse`} />
      </div>

      <div className={`${fcp[faction].text}/60 mt-4 2xl:mt-8 text-sm`}>
        <p>Est.Allocation</p>
        <div className='flex justify-between pl-4'>
          <p>MUCUS</p>
          <p>0</p>
        </div>
        <div className='flex justify-between pl-4'>
          <p>ETH</p>
          <p>0</p>
        </div>
        <div className='w-full border-b border-b-mc-green-100 border-dashed mt-1' />
      </div>

      <div className={`${fcp[faction].text}/60 mt-4 2xl:mt-12 text-sm`}>
        <div className='flex justify-between items-center'>
          <p>Slippage</p>
          <div className={`h-4 w-10 ${fcp[faction].darkBg} rounded-full animate-pulse`}/>
        </div>
        <div className='w-full border-b border-b-mc-green-100 border-dashed mt-2'></div>
      </div>

      <div className='flex-grow flex items-end'>
        <div className={`h-6 w-full ${fcp[faction].darkBg} rounded-full animate-pulse`} /> 
      </div> 
    </div>
  )
}

export const Withdraw = ({ faction }: WithdrawProps) => {
  return (
    <div className='w-1/2 flex gap-x-6 2xl:gap-x-10'>
      <div className={`flex flex-col ${fcp[faction].text}`}>
        <div className={`${fcp[faction].bg} p-4 rounded-xl`}>
          <h3 className='text-md 2xl:text-lg font-bold tracking-tight'>WITHDRAW</h3>

          <p className='text-md'>AMOUNT</p>
          <div className='flex rounded-xl h-12 2xl:h-16 bg-mc-mahogany-200 mt-1 animate-pulse' />

          <div className='flex justify-end gap-x-3 mt-4 2xl:mt-6'>
            <div className={`h-6 w-12 ${fcp[faction].darkBg} rounded-full animate-pulse`} />
            <div className={`h-6 w-24 ${fcp[faction].darkBg} rounded-full animate-pulse`} />
          </div>
        </div>
        <p className={`text-sm 2xl:text-lg text-center whitespace-nowrap ${fcp[faction].text} mt-6`}>
          YOU MAY QUALIFY FOR A FREE MINT
        </p>
        <div className={`text-center rounded-lg bg-white/50 border border-white p-4 text-lg 2xl:text-2xl ${fcp[faction].text} w-full mt-1`}>
          MUCUS GENERATOR
        </div>
      </div>
    </div> 
  )
}

export const Layout = ({ faction }: { faction: Faction }) => {
  return (
    <Container className='flex-grow flex flex-col p-4 gap-y-6 2xl:gap-y-10 w-[65vw] xl:w-[60vw] 2xl:w-[50vw] mx-0 mr-auto mt-6 xl:mt-8 2xl:mt-12'>
      <UserStats faction={faction} />

      <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
        <Deposit faction={faction} />

        <Withdraw faction={faction} />
      </div> 
    </Container>
  )
}
