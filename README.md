# Wagmi ERC20 DApp

This Next.js DApp allows users to retrieve information about ERC20 tokens based on their address and transfer tokens from one account to another. It is developed using the Wagmi library.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#Technical-Explanation)
  - [Metamask wallet connection](#metamask-wallet-connection)
  - [Retrieve Token Information](#retrieve-token-information)
  - [Transfer Tokens](#transfer-tokens)


## Introduction

This DApp provides a user-friendly interface for interacting with ERC20 tokens. Users can easily retrieve information about a specific token and transfer tokens between accounts.

## Features

- Retrieve ERC20 token information by providing the token address.
- Transfer ERC20 tokens from connected account to another.

## Getting Started

### Prerequisites

Before running the DApp, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yessinemaalej/ERC20Dapp.git
cd interview
npm install
```
### Launch 
```bash
npm start dev
```
## Technical explanation 

### Metamask wallet connection
To connect to metamask I used wagmi library.
```bash
npm install wagmi
```
In my Dapp I've imported necessary functions from wagmi to handle metamask integrations

### Retrieve Token Information
This  component is designed to facilitate the retrieval of information for ERC-20 tokens within a decentralized application (DApp). Here’s a breakdown of the key functionalities:

	Component Structure:
		The TokenInput component is a React functional component that manages the input and display of ERC-20 token information.
		It imports required functions from @wagmi/core and configuration details from the wagmi module.
	State Management:
		Utilizes React hooks (useState) to manage the component’s state, including tokenName, userBalance, tokenSymbol, and tokenAddress.
		handleChange function updates the tokenAddress state based on user input.
	Token Retrieval:
		On form submission (handleSubmit), it fetches token information using the fetchTokenInfo function, passing the tokenAddress.
		Invokes the onTokenSubmit callback with the tokenAddress.
	Fetching Token Information:
	    The fetchTokenInfo function utilizes the getToken function from @wagmi/core to retrieve details like token name and symbol.
	Balance Retrieval:
	    After token retrieval, it fetches the user’s balance for the specified token using getBalanceForToken.
	User Interface:
	    Renders a form allowing users to input the token address.
	    Displays token information, including name, symbol, and user balance upon successful retrieval.
		The UI updates dynamically based on user interactions.
	Error Handling:
		Catches and logs errors during token and balance retrieval to the console.

### Transfer Tokens
	Component Structure:
		The TransferForm component is a React functional component designed for initiating token transfers.
		It imports required functions from @wagmi/core, the ERC-20 token ABI (Application Binary Interface), configuration details from the wagmi module, and the component’s stylesheet.
	State Management:
		Utilizes React hooks (useState, useEffect) to manage component state, including recipientAddress, tokenAmount, transferSuccess, senderBalance, recipientBalance, and transactionHash.
	Token Transfer Process:
		Upon form submission (handleSubmit), it uses the writeContractAsync function from @wagmi/core to invoke the transfer method on the selected ERC-20 token contract.
		The transaction result and hash are logged, and if successful, transferSuccess is set to true.
	Balances Update:
		Utilizes the useEffect hook to update sender and recipient balances after a successful transfer.
		Fetches and displays updated balances using the getBalance function from @wagmi/core.
	UI Elements:
    	Renders a form allowing users to input the recipient address and token amount for the transfer.
		Displays transaction details, including the transaction hash and updated balances upon a successful transfer.
	
	Error Handling:
		Catches and logs errors during the transfer process to the console.