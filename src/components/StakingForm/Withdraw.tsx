'use client'

import { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useQuery, useNetwork } from 'wagmi';

// components
import { Button } from "@/components/Button"
import Modal from '@/components/Modal'
import { ConnectWrapper } from '@/components/ConnectWrapper';
import { RemoveStakeTransaction, type RemoveStakeValues } from '@/components/transactions/RemoveStake'

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// api
import { fetchLPTokenUsdcPrice } from '@/api/uniswapMethods';

const withdrawInputs = z.object({ withdraw: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO') })
type WithdrawInputs = z.infer<typeof withdrawInputs>
export default function Withdraw() {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const [show, setShow] = useState<boolean>(false)
  const [transactionValues, setTransactionValues] = useState<RemoveStakeValues | null>(null)
  const { chain } = useNetwork()

  const { data: lpTokenUsdcPrice } = useQuery(['fetchLPTokenUsdcPrice'], fetchLPTokenUsdcPrice, { suspense: true, cacheTime: 0 })

  const { handleSubmit, register, watch, formState: { errors } } = useForm<WithdrawInputs>({
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
    setTransactionValues({ withdrawAmount: withdraw, faction: 'FROG' })
    setShow(true)
  }

  const withdrawMessage = () => {
    if (!chain) {
      return 'ISSUE WITH CONNECTING WALLET'
    }
    if (withdraw === '') {
      return 'ENTER AMOUNT'
    }
    if (Number(withdraw) <= 0) {
      return 'MUST BE GREATER THAN ZERO'
    }

    return 'WITHDRAW'
  }

  const withdrawValidation = () => {
    return !chain 
      || Number(withdraw) <= 0 
      || withdraw === '' 
      || errors.withdraw
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <form className='flex flex-col text-mc-mahogany-300' onSubmit={handleSubmit(onSubmit)} onKeyDown={e => handleKeyDown(e)}>
      <Modal open={show} onClose={() => setShow(false)}>
        <RemoveStakeTransaction {...transactionValues!} onClose={() => setShow(false)}/>
      </Modal>

      <div className='bg-mc-rose-300 p-4 rounded-xl'>
        <h3 className='text-md 2xl:text-lg font-bold tracking-tight'>WITHDRAW</h3>

        <p className='text-md'>AMOUNT</p>
        <div className='flex flex-col justify-center rounded-xl px-4 h-12 2xl:h-16 bg-mc-mahogany-200 mt-1'>
          <NumberInput name='withdraw' register={register} />
          {lpTokenUsdcPrice && (
            <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/.test(withdraw) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
              {currencyFormat.format(Number(withdraw) * lpTokenUsdcPrice)}
            </div>
          )} 
        </div>

        <div className='flex justify-end gap-x-3 mt-4 2xl:mt-6'>
          <Button className='p-2 font-normal border border-white rounded-xl text-white bg-mc-mahogany-300/60'>MAX</Button>
          <ConnectWrapper>
            <Button 
              className={`p-2 font-bold border border-white rounded-xl text-mahogany/60 bg-white/50 ${withdrawValidation() ? 'opacity-60' : ''}`}
              type='submit'
            >
              {withdrawMessage()}
            </Button>
          </ConnectWrapper> 
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

