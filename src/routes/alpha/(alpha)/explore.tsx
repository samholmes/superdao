import { createSignal, createMemo } from 'solid-js';
import { DAO, MOCK_DAOS, VotingType } from '~/components/alpha/types';

export default function ExplorePage() {
  const [search, setSearch] = createSignal('');
  const [sortBy, setSortBy] = createSignal<'recent' | 'popular' | 'name'>('recent');

  const filteredDAOs = createMemo(() => {
    let result = [...MOCK_DAOS];
    
    // Filter by search
    if (search()) {
      const query = search().toLowerCase();
      result = result.filter(dao => 
        dao.name.toLowerCase().includes(query) ||
        dao.address.toLowerCase().includes(query) ||
        dao.mission.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortBy()) {
      case 'recent':
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'popular':
        result.sort((a, b) => b.memberCount - a.memberCount);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return result;
  });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const getVotingTypeLabel = (type: VotingType) => {
    const labels: Record<VotingType, string> = {
      'Unanimity': 'Unanimity (100%)',
      'Majority': 'Majority (51%+)', 
      'SuperMajority': 'Super Majority (66%+)',
      'Optimistic': 'Optimistic (Default Yes)'
    };
    return labels[type];
  };

  return (
    <div>
      <div class="page-header">
        <h1>Explore DAOs</h1>
        <p>Discover decentralized organizations in the SuperDAO ecosystem</p>
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Search by name, address, or mission..."
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
        <select 
          value={sortBy()} 
          onChange={(e) => setSortBy(e.currentTarget.value as 'recent' | 'popular' | 'name')}
        >
          <option value="recent">Recently Added</option>
          <option value="popular">Most Members</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <div class="card-grid">
        {filteredDAOs().map((dao) => (
          <div class="card dao-card">
            <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'flex-start' }}>
              <h3>{dao.name}</h3>
              <span style={{ 
                background: 'rgba(99, 102, 241, 0.2)', 
                color: '#818cf8',
                padding: '0.25rem 0.5rem',
                'border-radius': '0.25rem',
                'font-size': '0.75rem'
              }}>
                {formatAddress(dao.address)}
              </span>
            </div>
            
            <p class="mission">{dao.mission}</p>
            
            <div style={{ 
              display: 'flex', 
              'align-items': 'center', 
              gap: '0.5rem',
              'font-size': '0.75rem',
              color: '#6b7280'
            }}>
              <span style={{ color: '#a855f7', 'font-weight': 600 }}>
                {getVotingTypeLabel(dao.governance.votingType)}
              </span>
              <span>•</span>
              <span>{dao.governance.quorum}% quorum</span>
            </div>
            
            <div class="stats">
              <div class="stat">
                <span class="stat-value">{dao.founderCount}</span>
                <span>founders</span>
              </div>
              <div class="stat">
                <span class="stat-value">{dao.memberCount}</span>
                <span>members</span>
              </div>
              <div class="stat">
                <span class="stat-value">{dao.taskCount}</span>
                <span>tasks</span>
              </div>
              <div class="stat">
                <span>Created {formatDate(dao.createdAt)}</span>
              </div>
            </div>
            
            <button class="btn btn-primary" style={{ 'margin-top': 'auto' }}>
              View DAO
            </button>
          </div>
        ))}
      </div>

      {filteredDAOs().length === 0 && (
        <div style={{ 'text-align': 'center', padding: '3rem', color: '#6b7280' }}>
          <div style={{ 'font-size': '3rem', margin-bottom: '1rem' }}>🔍</div>
          <p>No DAOs found matching "{search()}"</p>
          <button 
            class="btn btn-secondary" 
            onClick={() => setSearch('')}
            style={{ 'margin-top': '1rem' }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
