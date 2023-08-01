'use client'

import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
import { twMerge } from 'tailwind-merge';

import { ConnectButton } from '@/components/ConnectButton';

export const Skeleton = () => <div className='h-6 w-full bg-mc-rose-400 rounded-full animate-pulse' /> 

export const ConnectWrapper = dynamic(() => Promise.resolve(({ className, children }: { className?: string; children: React.ReactNode }) => {
  const { address } = useAccount()
  if (address) return <>{children}</>

  return <ConnectButton className={twMerge('border border-white text-mc-mahogany-300/60', className)} loadingClassName='bg-mc-rose-400'/> 
}), { 
  loading: () => <Skeleton />,
})
