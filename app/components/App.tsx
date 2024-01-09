"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { ConnectWallet } from "./ConnectWallet";
import config from "../wagmi";
import { Account } from "./Account";
import { WalletOptions } from "../wallet-options";

export default function App() {
  return (
    
        <ConnectWallet />
      
  );
}
