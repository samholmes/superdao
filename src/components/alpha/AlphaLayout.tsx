import { A, useLocation } from '@solidjs/router';
import { Show } from 'solid-js';
import { walletStore } from '~/lib/wallet';
import './alpha.css';

export default function AlphaLayout(props: { children?: any }) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div class="alpha-container">
      <nav class="alpha-nav">
        <div class="alpha-logo">
          <A href="/">SuperDAO</A>
          <span class="alpha-badge">/alpha</span>
        </div>
        <div class="alpha-links">
          <A 
            href="/alpha/explore" 
            class={isActive('/alpha/explore') ? 'active' : ''}
          >
            Explore
          </A>
          <A 
            href="/alpha/dashboard" 
            class={isActive('/alpha/dashboard') ? 'active' : ''}
          >
            Dashboard
          </A>
          <A 
            href="/alpha/onboard" 
            class={isActive('/alpha/onboard') ? 'active' : ''}
          >
            Create DAO
          </A>
        </div>
        <div class="alpha-wallet">
          <Show 
            when={walletStore.isConnected()} 
            fallback={
              <button 
                class="connect-btn" 
                onClick={() => walletStore.connect()}
                disabled={walletStore.isConnecting()}
              >
                {walletStore.isConnecting() ? 'Connecting...' : 'Connect Wallet'}
              </button>
            }
          >
            <div style={{ display: 'flex', 'align-items': 'center', gap: '0.75rem' }}>
              <div style={{ 'text-align': 'right' }}>
                <div style={{ 'font-size': '0.875rem', 'font-weight': 600 }}>
                  {formatAddress(walletStore.address()!)}
                </div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>
                  {parseFloat(walletStore.formattedBalance()).toFixed(4)} ETH
                </div>
              </div>
              <button 
                class="btn btn-outline" 
                style={{ padding: '0.5rem 0.75rem', 'font-size': '0.875rem' }}
                onClick={() => walletStore.disconnect()}
              >
                Disconnect
              </button>
            </div>
          </Show>
        </div>
      </nav>
      <main class="alpha-main">
        {props.children}
      </main>
    </div>
  );
}
