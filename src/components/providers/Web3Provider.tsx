"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { injected, coinbaseWallet, walletConnect } from "wagmi/connectors";

// Provide a default Project ID for WalletConnect if missing (demo ID)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3fcc6bba6f1de962d911bb5b5c3dba68";

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "GhostPay AI" }),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
