'use client'

import { QueryClient } from "@tanstack/react-query";
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

const { chains, publicClient } = configureChains(
  [mainnet, goerli],
  [
    publicProvider(),
    // alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    // alchemy
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Mucus Farm',
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains
});

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

const wagmiConfig = createConfig({
  autoConnect: true,
  queryClient,
  connectors,
  publicClient
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
