'use client'

import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod';

// components
import { Button } from "@/components/Button"
import { ConnectWrapper } from '@/components/ConnectWrapper';
import { NumberInput } from "@/components/inputs/NumberInput";

// utils
import type { Faction } from "@/utils/constants";
import { factionColorPalette as fcp } from './utils';

const quantityInputs = z.object({ quantity: z.string().min(1).refine(value => Number(value) > 0, 'MUST BE GREATER THAN ZERO') })
type QuantityInputs = z.infer<typeof quantityInputs>
type QuantityProps = { faction: Faction }
export default function Quantity({ faction }: QuantityProps) {
  const minted = 424
  const totalSupply = 6000
  const ethMintPrice = 0.03;

  const { handleSubmit, register, watch, formState: errors } = useForm<QuantityInputs>({
    defaultValues: {
      quantity: '',
    },
    // resolver: zodResolver(quantityInputs),
  })
  const quantity = watch('quantity')

  const onSubmit: SubmitHandler<QuantityInputs> = (data) => {
    console.log("data: ", data)
  }

  return (
    <form className={`w-[48%] flex flex-col p-4 rounded-xl gap-y-6 bg-mc-black-500 ${fcp[faction].text}`} onSubmit={handleSubmit(onSubmit)}>
      <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>QUANTITY</h3>

      <div className='flex justify-between items-center rounded-xl px-4 2xl:h-16 h-12 bg-black/25'>
        <div className='flex flex-col'>
          <NumberInput name='deposit' register={register} />
          <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^\s*(?=.*[1-9])\d*(?:\.\d+)?\s*$/.test(quantity) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
            {ethMintPrice} ETH
          </div>
        </div>
        <div className='text-mc-gray-50/50 text-sm 2xl:text-lg'>{minted}/{totalSupply}</div>
      </div>

      <div className='flex justify-end'>
        <ConnectWrapper>
          <Button
            className={`px-2 ${fcp[faction].bg} border border-white text-white font-normal`}
            type='submit'
          >
            MINT
          </Button>
        </ConnectWrapper>
      </div>
    </form>
  )
}

