'use client'
// TokenInput.tsx
import React, { useState } from "react";
import { getToken, getBalance, GetTokenReturnType } from "@wagmi/core";
import config from "../wagmi";
import { useAccount } from "wagmi";
import "./TokenInput.css";

interface TokenInputProps {
  onTokenSubmit: (tokenAddress: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ onTokenSubmit }) => {
  const { address } = useAccount();

  const [tokenName, setTokenName] = useState<string>("");
  const [userBalance, setUserBalance] = useState<string | undefined>();
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tokenData = await fetchTokenInfo(tokenAddress);
      setTokenSymbol(tokenData.symbol || "");
      setTokenName(tokenData.name || "");

      // Invoke the callback with the token address
      onTokenSubmit(tokenAddress);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }

    try {
      const balance = await getBalanceForToken();
      setUserBalance(balance.formatted);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTokenInfo = async (tokenAddress: string): Promise<GetTokenReturnType> => {
    const parameters = {
      address: tokenAddress as `0x${string}`,
    };

    try {
      return await getToken(config, parameters);
    } catch (error) {
      console.error("Error fetching token info:", error);
      throw error;
    }
  };

  const getBalanceForToken = async () => {
    return await getBalance(config, {
      address: address as `0x${string}`,
      token: tokenAddress as `0x${string}`,
    });
  };

  return (
    <div className="token-input-container">
      <h1>Retrieve ERC20 Token Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="token-address">Token address:</label>
        <input
          id="token-address"
          type="text"
          value={tokenAddress}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      {tokenName && (
        <div className="token-info-container">
          <h2>Token Information</h2>
          <p><strong>Name:</strong> {tokenName}</p>
          <p><strong>Symbol:</strong> {tokenSymbol}</p>
          {userBalance !== undefined && (
            <p><strong>Balance:</strong> {userBalance} {tokenSymbol}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenInput;
