'use client'

import { useQuery, useAccount  } from 'wagmi'
import { formatEther } from 'viem'

// api
import { getStaker, getTotalStaked } from '@/api/dpsMethods';
import { fetchLPTokenUsdcPrice } from '@/api/uniswapMethods';

// utils
import type { Faction } from '@/utils/constants';
import { factionColorPalette as fcp } from './index';

export type UserStatsProps = { faction: Faction }
export default function UserStats({ faction }: UserStatsProps) {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const { address } = useAccount()
  const { data: lpTokenUsdcPrice } = useQuery(['getLPTokenUsdcPrice'], fetchLPTokenUsdcPrice, { suspense: true, cacheTime: 0 })
  const { data: totalStaked }= useQuery(['getTotalStaked'], getTotalStaked, { suspense: true, cacheTime: 0 })
  const { data: staker }= useQuery(['getStaker', address], () => getStaker(address!), { suspense: true, cacheTime: 0, enabled: !!address })

  const totalDeposited = faction === 'DOG' ? totalStaked?.totalDogFactionAmount : totalStaked?.totalFrogFactionAmount
  const userDeposit = faction === 'DOG' ? staker?.dogFactionAmount : staker?.frogFactionAmount
  const stakerTradingRewards = 4

  return (
    <div className={`flex flex-col ${fcp[faction].bg} rounded-xl p-6`}>
      <h2 className={`${fcp[faction].text} font-bold tracking-tight text-center 2xl:text-3xl xl:text-2xl`}>LETS MAKE A PROMISE</h2>
      <p className='text-white text-center 2xl:text-lg xl:text-md'>PROTECT US AND WE OWE YOU</p>

      <div className={`flex justify-between mt-6 2xl:mt-12 xl:mt-8 ${fcp[faction].text} text-sm`}>
        <p>Total Deposited <span className='font-bold'>{totalDeposited && lpTokenUsdcPrice ? currencyFormat.format(totalDeposited * lpTokenUsdcPrice) : 'N/A'}</span></p>
        <p>Staker Trading Rewards <span className='font-bold'>{staker ? `${stakerTradingRewards} %` : 'N/A'}</span></p>
        <p>Your Deposit <span className='font-bold'>{userDeposit ? `${Math.floor(Number(formatEther(userDeposit)))} LP` : 'N/A'}</span></p>
      </div>
    </div>
  )
}

