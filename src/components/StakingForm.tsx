'use client';

import { Dispatch, SetStateAction, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// components
import { Container } from "@/components/Container"
import { Button } from "@/components/Button"

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// images
import ArrowDown from "@/images/icons/arrowDown"

const slippageInputs = [0.1, 0.3, 0.5]

type SlippageDropdownProps = {
  showSlippageDropdown: boolean;
  setShowSlippageDropdown: Dispatch<SetStateAction<boolean>>;
}
const SlippageDropdown = ({ showSlippageDropdown, setShowSlippageDropdown }: SlippageDropdownProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setShowSlippageDropdown(false)
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowSlippageDropdown(false)
  }

  return (
    <div className={`absolute transition-all duration-200 ease-linear ${showSlippageDropdown ? 'scale-y-100 z-100 opacity-100' : 'scale-y-0 -z-1 opacity-0'} mt-1 top-full origin-top right-0 px-4 py-2 rounded-xl bg-mc-rose-300 shadow-[0_2px_44px_0_rgba(0,0,0,0.15)]`}>
      <p className='text-sm'>Setting Slippage</p>
      <div className='flex gap-x-2 mt-1'>
        {slippageInputs.map((input, index) => (
          <Button className={`w-16 h-8 rounded-md border border-mc-mahogany-300/60 text-mc-mahogany-300/60`} onClick={onChange} key={index}>
            {input}%
          </Button>
        ))}
        <div className='flex justify-center items-center w-16 h-8 rounded-md border border-mc-mahogany-300/60 text-mc-mahogany-300 text-center bg-mc-rose-400'>
          <NumberInput onKeyDown={handleKeyDown} className='text-sm text-center h-8 w-8 pl-[2px] pb-[0.25px] text-mc-mahogany-300/80 placeholder-mc-mahogany-300/80'/>
          <div className='ml-1 pl-1 border-l border-l-mc-mahogany-200'>%</div>
        </div>
      </div>
    </div>
  )
}

type Inputs = {
  deposit: string;
  withdraw: string;
  slippage: number;
}
export default function StakingForm() {
  const totalDeposited = 12490
  const APR = 640
  const userDeposit = 54
  const lpTokenAmount = 0.000
  const mucusAmount = 0.000
  const ethAmount = 0.000
  const currencyFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' })

  const [showSlippageDropdown, setShowSlippageDropdown] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      deposit: '',
      withdraw: '',
      slippage: 0.5,
    },
  })
  const slippage = watch('slippage')

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className='flex flex-col p-4 gap-16 basis-1/2'>
        <div className='flex flex-col bg-mc-rose-300 rounded-xl p-6'>
          <h2 className='text-mc-mahogany-300 text-3xl font-bold tracking-tight text-center'>LETS MAKE A PROMISE</h2>
          <p className='text-white text-lg text-center'>PROTECT US AND WE OWE YOU</p>

          <div className='flex justify-between mt-12 text-mc-mahogany-300'>
            <p>Total Deposited <span className='font-bold'>${currencyFormat.format(totalDeposited)}</span></p>
            <p>APR <span className='font-bold'>{APR}%</span></p>
            <p>Your Deposit <span className='font-bold'>{userDeposit}LP</span></p>
          </div>
        </div>

        <div className='flex flex-col p-6 rounded-xl text-mc-mahogany-300 bg-mc-rose-300'>
          <div className='flex flex-col gap-y-4'>
            <h3 className='text-lg font-bold tracking-tight'>DEPOSIT</h3>
            <p className='text-md'>FROM</p>
            <div className='flex justify-between items-center rounded-xl p-4 bg-mc-mahogany-200'>
              <div className='flex flex-col'>
                <NumberInput />
                <div className={`text-lg text-white transition-all ease-linear duration-200 ${true ? 'opacity-0 h-0' : 'opacity-100 h-auto mt-2'}`}></div>
              </div>
              <div className='rounded-xl border border-white px-2 py-1 text-white text-lg'>ETH</div>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 mt-8'>
            <p className='text-md'>TO</p>
            <div className='flex justify-between items-center rounded-xl p-4 bg-mc-green-100'>
              <div className='flex flex-col'>
                <div className='text-white text-xl font-bold'>{lpTokenAmount}</div>
                <div className={`text-lg text-white transition-all ease-linear duration-200 ${true ? 'opacity-0 h-0' : 'opacity-100 h-auto mt-2'}`}></div>
              </div>
              <div className='rounded-xl border border-white px-2 py-1 text-white text-lg'>MUCUS/ETH</div>
            </div>
          </div>

          <div className='text-mc-mahogany-300/60 mt-8'>
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

          <div className='text-mc-mahogany-300/60 mt-16'>
            <div className='flex justify-between items-center'>
              <p>Slippage</p>
              <div className='relative'>
                <Button 
                  className='flex items-center justify-between px-2 py-0 border border-mc-mahogany-300/60 text-sm font-normal text-mc-mahogany-300/60 rounded-full cursor-pointer' 
                  onClick={() => setShowSlippageDropdown(prevShowSlippageDropdown => !prevShowSlippageDropdown)}
                >
                  {slippage}%
                  <ArrowDown className='w-[10px] h-[8px] fill-mc-mahogany-300/60 ml-1'/>
                </Button>
                <SlippageDropdown showSlippageDropdown={showSlippageDropdown} setShowSlippageDropdown={setShowSlippageDropdown} />
              </div>
            </div>
            <div className='w-full border-b border-b-mc-green-100 border-dashed mt-2'></div>
          </div>
        </div>

        <div className='flex flex-col bg-mc-rose-300 rounded-xl p-6'></div>
      </Container>
    </form> 
  )
}