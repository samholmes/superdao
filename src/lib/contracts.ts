import { createPublicClient, createWalletClient, custom, http, type Address, type Chain } from 'viem';
import { anvil as anvilChain } from 'viem/chains';

// Anvil local network config
export const anvil: Chain = {
  ...anvilChain,
  id: 31337,
  name: 'Anvil Local',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] },
    public: { http: ['http://localhost:8545'] },
  },
};

// Contract addresses (loaded from localStorage if available)
export const CONTRACT_ADDRESSES: {
  zoon: Address | null;
  zeitToken: Address | null;
  bridge: Address | null;
} = {
  zoon: '0x5b73c5498c1e3b4dba84de0f1833c4a029d90519',
  zeitToken: '0xc7f2cf4845c6db0e1a1e91ed41bcd0fcc1b0e141',
  bridge: '0xdae97900d4b184c5d2012dcdb658c008966466dd',
};

// Load addresses from localStorage on init
export function loadContractAddresses() {
  if (typeof window !== 'undefined') {
    CONTRACT_ADDRESSES.zoon = localStorage.getItem('zoonAddress') as Address || null;
    CONTRACT_ADDRESSES.zeitToken = localStorage.getItem('zeitTokenAddress') as Address || null;
    CONTRACT_ADDRESSES.bridge = localStorage.getItem('bridgeAddress') as Address || null;
  }
}

export function saveContractAddresses(addresses: { zoon: Address; zeitToken: Address; bridge: Address }) {
  CONTRACT_ADDRESSES.zoon = addresses.zoon;
  CONTRACT_ADDRESSES.zeitToken = addresses.zeitToken;
  CONTRACT_ADDRESSES.bridge = addresses.bridge;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('zoonAddress', addresses.zoon);
    localStorage.setItem('zeitTokenAddress', addresses.zeitToken);
    localStorage.setItem('bridgeAddress', addresses.bridge);
  }
}

export function clearContractAddresses() {
  CONTRACT_ADDRESSES.zoon = null;
  CONTRACT_ADDRESSES.zeitToken = null;
  CONTRACT_ADDRESSES.bridge = null;
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('zoonAddress');
    localStorage.removeItem('zeitTokenAddress');
    localStorage.removeItem('bridgeAddress');
  }
}

// Zoon Contract ABI (simplified for common functions)
export const ZOON_ABI = [
  {
    "inputs": [],
    "name": "initialized",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "zeitToken",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bridge",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "taskCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "join",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "leave",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_description", "type": "string" },
      { "internalType": "uint256", "name": "_zeitBudget", "type": "uint256" },
      { "internalType": "uint64", "name": "_deadline", "type": "uint64" },
      { "internalType": "uint8", "name": "_voting", "type": "uint8" }
    ],
    "name": "createTask",
    "outputs": [{ "internalType": "bytes32", "name": "taskId", "type": "bytes32" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes32", "name": "_taskId", "type": "bytes32" }],
    "name": "resolveTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }],
    "name": "isMember",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTaskCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes32", "name": "_taskId", "type": "bytes32" }],
    "name": "getTask",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "taskIds",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "zeitToken", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "bridge", "type": "address" }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "taskId", "type": "bytes32" },
      { "indexed": true, "internalType": "address", "name": "proposer", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "description", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "zeitBudget", "type": "uint256" }
    ],
    "name": "TaskCreated",
    "type": "event"
  },
] as const;

// ZeitToken Contract ABI
export const ZEIT_TOKEN_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "_member", "type": "address" }],
    "name": "isMember",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "memberCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

// Create public client for reading
export function getPublicClient() {
  return createPublicClient({
    chain: anvil,
    transport: http('http://localhost:8545'),
  });
}

// Create wallet client for writing
export function getWalletClient() {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }
  return createWalletClient({
    chain: anvil,
    transport: custom(window.ethereum),
  });
}

// Initialize addresses
loadContractAddresses();
