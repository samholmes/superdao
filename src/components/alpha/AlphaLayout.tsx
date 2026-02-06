import { A, useLocation } from '@solidjs/router';
import './alpha.css';

export default function AlphaLayout(props: { children?: any }) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
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
          <button class="connect-btn">Connect Wallet</button>
        </div>
      </nav>
      <main class="alpha-main">
        {props.children}
      </main>
    </div>
  );
}
