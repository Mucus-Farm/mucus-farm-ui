'use client'

import { twMerge } from 'tailwind-merge';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/Button';

export const ConnectButton = ({ className, loadingClassName }: { className?: string, loadingClassName: string }) => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected =
          ready &&
          account &&
          chain

        if (!ready) {
          <div className={twMerge('w-full h-4 rounded-full animate-pulse', loadingClassName)}/>
        }

        if (!connected) {
          return (
            <Button className={className} onClick={openConnectModal} >
              Connect Wallet
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button className={className} onClick={openChainModal} >
              Wrong network
            </Button>
          );
        }

        return (
          <Button onClick={openAccountModal} className={className}>
            {account.displayName}
            {account.displayBalance
              ? ` (${account.displayBalance})`
              : ''}
          </Button>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};