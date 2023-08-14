'use client'

import { QueryClient } from "@tanstack/react-query";
import NextTopLoader from 'nextjs-toploader'
import { useMediaQuery } from 'react-responsive'
import '@rainbow-me/rainbowkit/styles.css';
import { env } from "@/env.mjs";

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import MobileNotReady from "./MobileNotReady";

// components & hooks
import useTransactions from '@/hooks/useTransactions';
import { SuccessToast, FailToast } from "@/components/Toast";

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    publicProvider(),
    alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Mucus Farm',
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains
});

export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

const wagmiConfig = createConfig({
  autoConnect: true,
  queryClient,
  connectors,
  publicClient
})


export function Providers({ children }: { children: React.ReactNode }) {
  const { transactionState, errorMessage } = useTransactions((state) => state)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  if (isMobile) {
    return <MobileNotReady />
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <NextTopLoader color='#EC9244' />
        {children}
        {transactionState === 'SUCCESS' && <SuccessToast />}
        {transactionState === 'FAILED' && <FailToast errorMessage={errorMessage}/>}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
