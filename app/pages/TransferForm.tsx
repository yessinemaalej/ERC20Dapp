"use client";
import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getBalance } from "@wagmi/core";
import { abi } from "../components/erc20_abi";
import config from "../wagmi";
import "./TransferForm.css";


interface TransferFormProps {
  selectedTokenAddress: string;
}

function TransferForm({ selectedTokenAddress }: TransferFormProps) {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [transferSuccess, setTransferSuccess] = useState<boolean>(false);
  const [senderBalance, setSenderBalance] = useState<string | undefined>();
  const [recipientBalance, setRecipientBalance] = useState<
    string | undefined
  >();
  const [transactionHash, setTransactionHash] = useState<string | undefined>();

  // Initialize useWaitForTransactionReceipt hook
  const { data: transactionReceipt, status: transactionStatus } =
    useWaitForTransactionReceipt({
      hash: transferSuccess ? (transactionHash as `0x${string}`) : undefined,
    });


  // UseEffect to update balances after successful transfer
  useEffect(() => {
    if (transferSuccess && transactionStatus === "success") {
      // Fetch and display updated balances
      const fetchBalances = async () => {
        try {
          const senderBalance = await getBalance(config, {
            address: address as `0x${string}`,
            token: selectedTokenAddress as `0x${string}`,
          });
          setSenderBalance(senderBalance.formatted);

          const recipientBalance = await getBalance(config, {
            address: recipientAddress as `0x${string}`,
            token: selectedTokenAddress as `0x${string}`,
          });
          setRecipientBalance(recipientBalance.formatted);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };

      fetchBalances();
    }
  }, [
    transferSuccess,
    transactionStatus,
    selectedTokenAddress,
    address,
    recipientAddress,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("Submitting transfer...");

      const result = await writeContractAsync({
        abi,
        address: selectedTokenAddress as `0x${string}`,
        functionName: "transfer",
        args: [recipientAddress, BigInt(tokenAmount)],
      });
      console.log("Write Contract Result:", result);
      setTransactionHash(result);

      // Check if the result indicates a successful transaction
      if (result) {
        console.log("Transaction sent. Waiting for confirmation...");
        setTransferSuccess(true);
      } else {
        console.error("Transaction failed:", result);
      }
    } catch (error) {
      console.error("Error during transfer:", error);
    }
  };

  return (
    <div className="transfer-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Transfer your ERC20 Token</h1>
        <div className="form-input">
          <label htmlFor="recipient-address">Recipient Address:</label>
          <input
            id="recipient-address"
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="token-amount">Token Amount:</label>
          <input
            id="token-amount"
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <button type="submit">Submit</button>
        </div>
      </form>

      {transferSuccess && (
        <div className="success-message">
          {transactionHash && <span>Transaction hash: {transactionHash}</span>}
        </div>
      )}

      {transferSuccess && (
        <div className="balance-info">
          <p>Updated Balances:</p>
          <p>Sender Balance: {senderBalance}</p>
          <p>Recipient Balance: {recipientBalance}</p>
        </div>
      )}
    </div>
  );
};

export default TransferForm;