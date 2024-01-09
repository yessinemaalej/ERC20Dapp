'use client'
import App from "./components/App";
import TokenInput from "./pages/Erc20Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import TransferForm from "./pages/TransferForm";
import config from "./wagmi";
import React from "react";
// Import statements...

function Home() {
  const queryClient = new QueryClient();
  const [selectedTokenAddress, setSelectedTokenAddress] = React.useState<string | null>(null);

  // Function to handle token selection
  const handleTokenSelect = (tokenAddress: string) => {
    setSelectedTokenAddress(tokenAddress);
  };

  return (
    
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div>
          <App />
          <TokenInput onTokenSubmit={handleTokenSelect} />
            {selectedTokenAddress && <TransferForm selectedTokenAddress={selectedTokenAddress} />}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Home;

