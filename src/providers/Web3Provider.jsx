"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import {
  WagmiProvider,
} from "wagmi";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { baseSepolia, mainnet } from "wagmi/chains";
import { http } from "wagmi";

const config = getDefaultConfig({
  appName: "GhostPay",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo",
  chains: [baseSepolia, mainnet],
  transports: {
    [baseSepolia.id]: http(),
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`),
  },
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}