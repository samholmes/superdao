import { createSignal, createMemo } from 'solid-js';
import { type Address, formatEther } from 'viem';
import { getPublicClient, getWalletClient, CONTRACT_ADDRESSES } from './contracts';

// Wallet state
const [address, setAddress] = createSignal<Address | null>(null);
const [balance, setBalance] = createSignal<bigint>(0n);
const [isConnecting, setIsConnecting] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);
const [isMember, setIsMember] = createSignal(false);

// Derived signals
const isConnected = createMemo(() => address() !== null);
const formattedBalance = createMemo(() => {
  const bal = balance();
  return bal ? formatEther(bal) : '0';
});

// Connect wallet
export async function connectWallet(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.ethereum) {
    setError('No wallet found. Please install MetaMask or use a Web3 browser.');
    return false;
  }

  setIsConnecting(true);
  setError(null);

  try {
    const walletClient = getWalletClient();
    if (!walletClient) {
      throw new Error('Failed to create wallet client');
    }

    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    }) as Address[];

    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const userAddress = accounts[0];
    setAddress(userAddress);

    // Get balance
    await refreshBalance(userAddress);

    // Check if member of Zoon network
    await checkMembership(userAddress);

    // Listen for account changes
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    setIsConnecting(false);
    return true;
  } catch (err: any) {
    setError(err.message || 'Failed to connect wallet');
    setIsConnecting(false);
    return false;
  }
}

// Disconnect wallet
export function disconnectWallet() {
  setAddress(null);
  setBalance(0n);
  setIsMember(false);
  setError(null);
  
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
  }
}

// Refresh balance
export async function refreshBalance(userAddress?: Address) {
  const addr = userAddress || address();
  if (!addr) return;

  try {
    const publicClient = getPublicClient();
    const bal = await publicClient.getBalance({ address: addr });
    setBalance(bal);
  } catch (err) {
    console.error('Failed to get balance:', err);
  }
}

// Check if user is a member of Zoon network
export async function checkMembership(userAddress?: Address) {
  const addr = userAddress || address();
  if (!addr || !CONTRACT_ADDRESSES.zoon) {
    setIsMember(false);
    return;
  }

  try {
    const publicClient = getPublicClient();
    const memberStatus = await publicClient.readContract({
      address: CONTRACT_ADDRESSES.zoon,
      abi: [{ 
        "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }],
        "name": "isMember",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
      }],
      functionName: 'isMember',
      args: [addr],
    });
    setIsMember(memberStatus);
  } catch (err) {
    console.error('Failed to check membership:', err);
    setIsMember(false);
  }
}

// Handle account changes
function handleAccountsChanged(accounts: Address[]) {
  if (accounts.length === 0) {
    disconnectWallet();
  } else {
    setAddress(accounts[0]);
    refreshBalance(accounts[0]);
    checkMembership(accounts[0]);
  }
}

// Handle chain changes
function handleChainChanged() {
  // Reload the page on chain change
  window.location.reload();
}

// Export signals for use in components
export const walletStore = {
  address,
  balance,
  formattedBalance,
  isConnecting,
  isConnected,
  isMember,
  error,
  connect: connectWallet,
  disconnect: disconnectWallet,
  refreshBalance,
  checkMembership,
};

// Type augmentation for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}
