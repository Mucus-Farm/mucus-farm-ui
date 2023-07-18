'use client'

import { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useQuery, useAccount, useNetwork } from 'wagmi';
import { formatEther } from 'viem';

// components
import { Button } from "@/components/Button"
import Modal from '@/components/Modal'
import { ConnectWrapper } from '@/components/ConnectWrapper';
import { RemoveStakeTransaction, type RemoveStakeValues } from '@/components/transactions/RemoveStake'

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// api
import { fetchLPTokenUsdcPrice } from '@/api/uniswapMethods'
import { getStaker } from '@/api/dpsMethods'

// utils
import { factionColorPalette as fcp } from './index';
import type { Faction } from '@/utils/constants'

const withdrawInputs = z.object({ withdraw: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO') })
type WithdrawInputs = z.infer<typeof withdrawInputs>
export type WithdrawProps = { faction: Faction }
export default function Withdraw({ faction }: WithdrawProps) {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const [show, setShow] = useState<boolean>(false)
  const [transactionValues, setTransactionValues] = useState<RemoveStakeValues | null>(null)
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { data: lpTokenUsdcPrice } = useQuery(['fetchLPTokenUsdcPrice'], fetchLPTokenUsdcPrice, { suspense: true, cacheTime: 0 })
  const { data: staker }= useQuery(['getStaker', address], () => getStaker(address!), { suspense: true, cacheTime: 0, enabled: !!address })
  const userDeposit = faction === 'DOG' ? staker?.dogFactionAmount : staker?.frogFactionAmount

  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<WithdrawInputs>({
    defaultValues: {
      withdraw: '',
    },
    resolver: zodResolver(withdrawInputs)
  })
  const withdraw = watch('withdraw')

  const onSubmit: SubmitHandler<WithdrawInputs> = (data, e) => {
    e?.preventDefault()
    if (withdrawValidation()) return
    const { withdraw } = data
    setTransactionValues({ withdrawAmount: withdraw, faction })
    setShow(true)
  }

  const withdrawMessage = () => {
    if (!chain || !address) {
      return 'ISSUE WITH CONNECTING WALLET'
    }
    if (!staker) {
      return 'FETCHING DATA'
    }
    if (withdraw === '') {
      return 'ENTER AMOUNT'
    }
    if (Number(withdraw) <= 0) {
      return 'MUST BE GREATER THAN ZERO'
    }
    if (Number(withdraw) > Number(formatEther(staker.frogFactionAmount))) {
      return 'INSUFFICIENT BALANCE'
    }

    return 'WITHDRAW'
  }

  const withdrawValidation = () => {
    return !chain
      || !address
      || !staker
      || Number(withdraw) <= 0 
      || Number(withdraw) > Number(formatEther(staker.frogFactionAmount))
      || withdraw === '' 
      || errors.withdraw
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <form className={`w-1/2 flex flex-col ${fcp[faction].text}`} onSubmit={handleSubmit(onSubmit)} onKeyDown={e => handleKeyDown(e)}>
      <Modal open={show} onClose={() => setShow(false)}>
        <RemoveStakeTransaction {...transactionValues!} onClose={() => setShow(false)}/>
      </Modal>

      <div className={`${fcp[faction].bg} p-4 rounded-xl`}>
        <h3 className='text-md 2xl:text-lg font-bold tracking-tight'>WITHDRAW</h3>

        <p className='text-md'>AMOUNT</p>
        <div className='flex flex-col justify-center rounded-xl px-4 h-12 2xl:h-16 bg-black/25 mt-1'>
          <NumberInput name='withdraw' register={register} />
          {lpTokenUsdcPrice && (
            <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/.test(withdraw) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
              {currencyFormat.format(Number(withdraw) * lpTokenUsdcPrice)}
            </div>
          )} 
        </div>

        <div className='flex justify-end gap-x-3 mt-4 2xl:mt-6'>
          <Button
            className={`p-2 font-normal border border-white rounded-xl text-white bg-mc-mahogany-300/60 ${!userDeposit ? 'opacity-60' : ''}`}
            onClick={() => userDeposit && setValue('withdraw', Math.floor(Number(formatEther(userDeposit))).toString())}
          >
            MAX
          </Button>
          <ConnectWrapper>
            <Button 
              className={`p-2 font-bold border border-white rounded-xl text-mahogany/60 bg-white/50 w-full transition-all ${withdrawValidation() ? 'opacity-60' : ''}`}
              type='submit'
            >
              {withdrawMessage()}
            </Button>
          </ConnectWrapper> 
        </div>
      </div>
      <p className={`text-sm 2xl:text-lg text-center whitespace-nowrap ${fcp[faction].text} mt-6`}>
        YOU MAY QUALIFY FOR A FREE MINT
      </p>
      <Button className={`bg-white/50 border border-white py-4 text-lg 2xl:text-2xl ${fcp[faction].text} w-full mt-1`}>
        MUCUS GENERATOR
      </Button>
    </form>
  )
}

