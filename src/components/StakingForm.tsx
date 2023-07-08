'use client';

import { useState, useEffect, useRef } from 'react'
import { useForm, type SubmitHandler, type UseFormRegister } from 'react-hook-form'

// components
import { Container } from "@/components/Container"
import { Button } from "@/components/Button"

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// images
import ArrowDown from "@/images/icons/arrowDown"

const slippageInputs = [0.1, 0.3, 0.5]

const SlippageDropdown = ({ register }: { register: UseFormRegister<Inputs>}) => {
  const [showSlippageDropdown, setShowSlippageDropdown] = useState<boolean>(false)
  const slippageDropdownRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setShowSlippageDropdown(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (slippageDropdownRef.current && !slippageDropdownRef.current.contains(event.target as Node)) {
      setShowSlippageDropdown(false)
    }
  }

  const onChange = () => {
    setShowSlippageDropdown(false)
  }

  const slippage = '0.5';

  useEffect(() => {
    if (showSlippageDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSlippageDropdown])

  return (
    <div className='relative' ref={slippageDropdownRef}>
      <Button 
        className='flex items-center justify-between px-2 py-0 border border-mc-mahogany-300/60 text-sm font-normal text-mc-mahogany-300/60 rounded-full cursor-pointer' 
        onClick={() => setShowSlippageDropdown(prevShowSlippageDropdown => !prevShowSlippageDropdown)}
      >
        {slippage}%
        <ArrowDown className='w-[10px] h-[8px] fill-mc-mahogany-300/60 ml-1'/>
      </Button>

      <div className={`absolute transition-all duration-200 ease-linear ${showSlippageDropdown ? 'scale-y-100 z-100 opacity-100' : 'scale-y-0 -z-1 opacity-0'} mt-1 top-full origin-top right-0 px-4 py-2 rounded-xl bg-mc-rose-300 shadow-[0_2px_44px_0_rgba(0,0,0,0.15)]`}>
        <p className='text-sm'>Setting Slippage</p>
        <div className='flex gap-x-2 mt-1'>
          {slippageInputs.map((input, index) => (
            <Button className={`w-16 h-8 rounded-md border border-mc-mahogany-300/60 text-mc-mahogany-300/60`} onClick={() => onChange} key={index}>
              {input}%
            </Button>
          ))}
          <div className='flex justify-center items-center w-16 h-8 rounded-md border border-mc-mahogany-300/60 text-mc-mahogany-300 text-center bg-mc-rose-400'>
            <NumberInput onKeyDown={handleKeyDown} name='slippage' register={register} className='text-sm 2xl:text-sm text-center h-8 w-8 pl-[2px] pb-[0.25px] text-mc-mahogany-300/80 placeholder-mc-mahogany-300/80'/>
            <div className='ml-1 pl-1 border-l border-l-mc-mahogany-200'>%</div>
          </div>
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
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

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
  const [deposit, withdraw] = watch(['deposit', 'withdraw'])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex-grow flex flex-column'>
      <Container className='flex flex-col p-4 gap-y-6 2xl:gap-y-10 w-[65vw] xl:w-[60vw] 2xl:w-[50vw] mx-0 mr-auto mt-6 xl:mt-8 2xl:mt-12'>
        <div className='flex flex-col bg-mc-rose-300 rounded-xl p-6'>
          <h2 className='text-mc-mahogany-300 font-bold tracking-tight text-center 2xl:text-3xl xl:text-2xl'>LETS MAKE A PROMISE</h2>
          <p className='text-white text-center 2xl:text-lg xl:text-md'>PROTECT US AND WE OWE YOU</p>

          <div className='flex justify-between 2xl:mt-12 xl:mt-8 text-mc-mahogany-300 xl:text-sm'>
            <p>Total Deposited <span className='font-bold'>{currencyFormat.format(totalDeposited)}</span></p>
            <p>APR <span className='font-bold'>{APR}%</span></p>
            <p>Your Deposit <span className='font-bold'>{userDeposit}LP</span></p>
          </div>
        </div>

        <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
          <div className='flex flex-col p-4 rounded-xl text-mc-mahogany-300 bg-mc-rose-300'>
            <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>DEPOSIT</h3>

            <div className='flex flex-col gap-y-2 xl:text-sm 2xl:text-base'>
              <p className='text-md'>FROM</p>
              <div className='flex justify-between items-center rounded-xl px-4 2xl:h-16 h-12 bg-mc-mahogany-200'>
                <div className='flex flex-col'>
                  <NumberInput name='deposit' register={register} />
                  <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^(0|[1-9][0-9]*)$/.test(deposit) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                    {currencyFormat.format(Number(deposit) * 0.8)}
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
                    {currencyFormat.format(Number(deposit) * 0.8)}
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
                <SlippageDropdown register={register} />
              </div>
              <div className='w-full border-b border-b-mc-green-100 border-dashed mt-2'></div>
            </div>

            <div className='flex-grow flex items-end'>
              <Button className='justify-self-end bg-white/50 border border-white text-mc-mahogany-300/60 w-full mt-4'>
                CONNECT WALLET
              </Button>
            </div> 
          </div>

          <div className='flex flex-col text-mc-mahogany-300'>
            <div className='bg-mc-rose-300 p-4 rounded-xl'>
              <h3 className='text-md 2xl:text-lg font-bold tracking-tight'>WITHDRAW</h3>

              <p className='text-md'>AMOUNT</p>
              <div className='flex flex-col justify-center rounded-xl px-4 h-12 2xl:h-16 bg-mc-mahogany-200 mt-1'>
                <NumberInput name='withdraw' register={register} />
                <div className={`text-xs -mt-1 2xl:mt-0 text-white transition-all ease-linear duration-200 ${/^(0|[1-9][0-9]*)$/.test(withdraw) ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                  {currencyFormat.format(Number(withdraw) * 0.8)}
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
          </div>
        </div> 
      </Container>
    </form> 
  )
}