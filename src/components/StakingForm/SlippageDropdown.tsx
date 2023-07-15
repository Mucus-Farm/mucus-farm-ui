'use client'

import { useState, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import type { DepositInputs } from './index'

// components
import { Button } from "@/components/Button"

// inputs
import { NumberInput } from "@/components/inputs/NumberInput"

// images
import ArrowDown from "@/images/icons/arrowDown"

const slippageInputs = ['0.1', '0.3', '0.5']

export function SlippageDropdown() {
  const [showSlippageDropdown, setShowSlippageDropdown] = useState<boolean>(false)
  const slippageDropdownRef = useRef<HTMLDivElement>(null)

  const { register, setValue, watch } = useFormContext<DepositInputs>()
  const slippage = watch('slippage')

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

  const onChange = (value: string) => {
    setValue('slippage', value)
    setShowSlippageDropdown(false)
  }

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
        className='flex items-center justify-between w-[70px] px-2 py-0 border border-mc-mahogany-300/60 text-sm font-normal text-mc-mahogany-300/60 rounded-full cursor-pointer' 
        onClick={() => setShowSlippageDropdown(prevShowSlippageDropdown => !prevShowSlippageDropdown)}
      >
        {slippage}%
        <ArrowDown className='w-[10px] h-[8px] fill-mc-mahogany-300/60 ml-1'/>
      </Button>

      <div className={`absolute transition-all duration-200 ease-linear ${showSlippageDropdown ? 'scale-y-100 z-100 opacity-100' : 'scale-y-0 -z-1 opacity-0'} mt-1 top-full origin-top right-0 px-4 py-2 rounded-xl bg-mc-rose-300 shadow-[0_2px_44px_0_rgba(0,0,0,0.15)]`}>
        <p className='text-sm'>Setting Slippage</p>
        <div className='flex gap-x-2 mt-1'>
          {slippageInputs.map((input, index) => (
            <Button className={`w-16 h-8 rounded-md border border-mc-mahogany-300/60 text-mc-mahogany-300/60`} onClick={() => onChange(input)} key={index}>
              {input}%
            </Button>
          ))}
          <div className='flex justify-center items-center w-16 h-8 rounded-md border border-mc-mahogany-300/60 text-mc-mahogany-300 text-center bg-mc-rose-400'>
            <NumberInput onKeyDown={handleKeyDown} name='slippage' register={register} className='text-sm xl:text-sm 2xl:text-sm text-center h-8 w-8 pl-[2px] pb-[0.25px] text-mc-mahogany-300/80 placeholder-mc-mahogany-300/80'/>
            <div className='ml-1 pl-1 border-l border-l-mc-mahogany-200'>%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

