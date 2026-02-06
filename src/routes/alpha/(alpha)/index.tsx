import { A } from '@solidjs/router';

export default function AlphaIndex() {
  return (
    <div>
      <div class="page-header">
        <h1>Welcome to SuperDAO /alpha</h1>
        <p>The next generation of DAO coordination and governance</p>
      </div>
      
      <div style={{ display: 'grid', 'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', 'margin-top': '2rem' }}>
        <A href="/alpha/explore" style={{ 'text-decoration': 'none' }}>
          <div class="card" style={{ height: '200px', display: 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center', 'text-align': 'center' }}>
            <div style={{ font-size: '3rem', margin-bottom: '1rem' }}>🔍</div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Explore DAOs</h3>
            <p style={{ color: '#9ca3af', margin: 0 }}>Discover and join existing DAOs in the ecosystem</p>
          </div>
        </A>
        
        <A href="/alpha/dashboard" style={{ 'text-decoration': 'none' }}>
          <div class="card" style={{ height: '200px', display: 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center', 'text-align': 'center' }}>
            <div style={{ font-size: '3rem', margin-bottom: '1rem' }}>📊</div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Dashboard</h3>
            <p style={{ color: '#9ca3af', margin: 0 }}>Manage tasks, vote on proposals, track activity</p>
          </div>
        </A>
        
        <A href="/alpha/onboard" style={{ 'text-decoration': 'none' }}>
          <div class="card" style={{ height: '200px', display: 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center', 'text-align': 'center' }}>
            <div style={{ font-size: '3rem', margin-bottom: '1rem' }}>🚀</div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Create DAO</h3>
            <p style={{ color: '#9ca3af', margin: 0 }}>Launch your own DAO with the Zoon protocol</p>
          </div>
        </A>
      </div>
      
      <div style={{ 'margin-top': '3rem', padding: '2rem', background: 'rgba(99, 102, 241, 0.1)', 'border-radius': '1rem', 'border-left': '4px solid #6366f1' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>About SuperDAO</h3>
        <p style={{ color: '#9ca3af', 'line-height': '1.6', margin: 0 }}>
          SuperDAO is a platform for tokenized ventures, enabling governance and ownership in the evolving 
          landscape of decentralized organizations. Built on the Zoon protocol, it features task-based 
          coordination, configurable voting mechanisms, and fair reward distribution using Zeit tokens.
        </p>
      </div>
    </div>
  );
}
