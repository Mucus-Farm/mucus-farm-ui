'use client'

import { useAccount } from 'wagmi';
import { twMerge } from 'tailwind-merge';

import { ConnectButton } from '@/components/ConnectButton';

export const ConnectWrapperSkeleton = ({ className }: { className?: string }) => <div className={twMerge('h-9 w-full bg-mc-rose-400 rounded-lg animate-pulse', className)} /> 

export default function ConnectWrapper({ className, children }: { className?: string; children: React.ReactNode }) {
  const { address } = useAccount()
  if (address) return <>{children}</>

  return <ConnectButton className={twMerge('border border-white text-mc-mahogany-300/60', className)} loadingClassName='bg-mc-rose-400'/> 
}
