import { createSignal } from 'solid-js';
import { Founder, GovernanceParams, VotingType } from '~/components/alpha/types';

export default function OnboardPage() {
  const [step, setStep] = createSignal(1);
  const [isDeploying, setIsDeploying] = createSignal(false);
  const [deploySuccess, setDeploySuccess] = createSignal(false);
  
  // Form states
  const [daoName, setDaoName] = createSignal('');
  const [mission, setMission] = createSignal('');
  const [founders, setFounders] = createSignal<Founder[]>([
    { address: '', initialZeit: 100 }
  ]);
  const [governance, setGovernance] = createSignal<GovernanceParams>({
    minVoters: 2,
    votingType: 'Majority',
    votingPeriod: 259200,
    quorum: 51
  });

  const addFounder = () => {
    setFounders([...founders(), { address: '', initialZeit: 100 }]);
  };

  const removeFounder = (index: number) => {
    const newFounders = [...founders()];
    newFounders.splice(index, 1);
    setFounders(newFounders);
  };

  const updateFounder = (index: number, field: keyof Founder, value: string | number) => {
    const newFounders = [...founders()];
    newFounders[index] = { ...newFounders[index], [field]: value };
    setFounders(newFounders);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeploying(false);
    setDeploySuccess(true);
  };

  const totalInitialZeit = () => {
    return founders().reduce((sum, f) => sum + f.initialZeit, 0);
  };

  const canProceed = () => {
    switch (step()) {
      case 1:
        return daoName().trim().length >= 3 && mission().trim().length >= 10;
      case 2:
        return founders().every(f => f.address.length === 42 && f.address.startsWith('0x'));
      case 3:
        return governance().minVoters >= 1 && governance().quorum >= 1 && governance().quorum <= 100;
      default:
        return true;
    }
  };

  if (deploySuccess()) {
    return (
      <div style={{ 'max-width': '600px', margin: '0 auto', 'text-align': 'center', padding: '3rem 0' }}>
        <div style={{ 'font-size': '5rem', 'margin-bottom': '1.5rem' }}>🎉</div>
        <h1 style={{ margin: '0 0 1rem 0' }}>DAO Created Successfully!</h1>
        <p style={{ color: '#9ca3af', 'margin-bottom': '2rem' }}>
          Your DAO "{daoName()}" has been deployed.
        </p>
        <div class="card" style={{ 'margin-bottom': '2rem', 'text-align': 'left', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>DAO Details</h4>
          <div style={{ display: 'grid', gap: '0.75rem', 'font-size': '0.875rem' }}>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Name:</span>
              <span style={{ color: '#fff' }}>{daoName()}</span>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Founders:</span>
              <span style={{ color: '#fff' }}>{founders().length}</span>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Initial Supply:</span>
              <span style={{ color: '#fff' }}>{totalInitialZeit()} ZEIT</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', 'justify-content': 'center' }}>
          <a href="/alpha/dashboard" class="btn btn-primary">Go to Dashboard</a>
          <a href="/alpha/explore" class="btn btn-secondary">Explore DAOs</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 'max-width': '800px', margin: '0 auto' }}>
      <div class="page-header">
        <h1>Create Your DAO</h1>
        <p>Set up a new decentralized organization with the Zoon protocol</p>
      </div>

      <div class="wizard-steps">
        {[1, 2, 3, 4].map((s) => (
          <div class={`wizard-step ${s < step() ? 'completed' : ''} ${s === step() ? 'active' : ''}`} />
        ))}
      </div>

      <div class="card">
        {step() === 1 && (
          <div>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>Step 1: DAO Information</h3>
            <div class="form-group">
              <label>DAO Name *</label>
              <input type="text" placeholder="e.g., SuperDAO Ventures" value={daoName()} onInput={(e) => setDaoName(e.currentTarget.value)} required />
            </div>
            <div class="form-group">
              <label>Mission Statement *</label>
              <textarea placeholder="Describe the purpose and goals of your DAO..." value={mission()} onInput={(e) => setMission(e.currentTarget.value)} required />
            </div>
            <div style={{ display: 'flex', 'justify-content': 'flex-end' }}>
              <button class="btn btn-primary" onClick={() => setStep(2)} disabled={!canProceed()}>Next: Founders →</button>
            </div>
          </div>
        )}

        {step() === 2 && (
          <div>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>Step 2: Founders</h3>
            <p style={{ color: '#9ca3af', 'margin-bottom': '1.5rem' }}>Add founder addresses and their initial ZEIT allocation.</p>
            <div class="founder-list">
              {founders().map((founder, index) => (
                <div class="founder-item">
                  <span style={{ color: '#6b7280', 'min-width': '80px' }}>Founder #{index + 1}</span>
                  <input type="text" placeholder="0x..." value={founder.address} onInput={(e) => updateFounder(index, 'address', e.currentTarget.value)} />
                  <input type="number" min="1" class="amount-input" value={founder.initialZeit} onInput={(e) => updateFounder(index, 'initialZeit', parseInt(e.currentTarget.value) || 0)} />
                  <span style={{ color: '#6b7280' }}>ZEIT</span>
                  {founders().length > 1 && <button class="remove-btn" onClick={() => removeFounder(index)}>Remove</button>}
                </div>
              ))}
            </div>
            <button class="btn btn-outline" onClick={addFounder} style={{ 'margin-bottom': '1.5rem' }}>+ Add Another Founder</button>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', 'border-radius': '0.5rem', 'margin-bottom': '1.5rem' }}>
              <div style={{ display: 'flex', 'justify-content': 'space-between', 'font-weight': 600 }}>
                <span>Total Initial ZEIT:</span>
                <span style={{ color: '#818cf8' }}>{totalInitialZeit()} ZEIT</span>
              </div>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <button class="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
              <button class="btn btn-primary" onClick={() => setStep(3)} disabled={!canProceed()}>Next: Governance →</button>
            </div>
          </div>
        )}

        {step() === 3 && (
          <div>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>Step 3: Governance Parameters</h3>
            <div class="form-group">
              <label>Voting Type</label>
              <select value={governance().votingType} onChange={(e) => setGovernance({ ...governance(), votingType: e.currentTarget.value as VotingType })}>
                <option value="Unanimity">Unanimity (100% agreement)</option>
                <option value="Majority">Majority (51%+)</option>
                <option value="SuperMajority">Super Majority (66%+)</option>
                <option value="Optimistic">Optimistic (default yes)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Minimum Voters Required</label>
              <input type="number" min="1" value={governance().minVoters} onInput={(e) => setGovernance({ ...governance(), minVoters: parseInt(e.currentTarget.value) || 1 })} />
            </div>
            <div class="form-group">
              <label>Quorum (%)</label>
              <input type="number" min="1" max="100" value={governance().quorum} onInput={(e) => setGovernance({ ...governance(), quorum: parseInt(e.currentTarget.value) || 51 })} />
            </div>
            <div class="form-group">
              <label>Voting Period</label>
              <select value={governance().votingPeriod} onChange={(e) => setGovernance({ ...governance(), votingPeriod: parseInt(e.currentTarget.value) })}>
                <option value="86400">1 day</option>
                <option value="172800">2 days</option>
                <option value="259200">3 days</option>
                <option value="604800">7 days</option>
                <option value="1209600">14 days</option>
              </select>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <button class="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
              <button class="btn btn-primary" onClick={() => setStep(4)}>Next: Review →</button>
            </div>
          </div>
        )}

        {step() === 4 && (
          <div>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>Step 4: Review & Deploy</h3>
            <div style={{ display: 'grid', gap: '1.5rem', 'margin-bottom': '2rem' }}>
              <div class="card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#818cf8' }}>DAO Information</h4>
                <div style={{ display: 'grid', gap: '0.5rem', 'font-size': '0.875rem' }}>
                  <div><strong>Name:</strong> {daoName()}</div>
                  <div><strong>Mission:</strong> {mission()}</div>
                </div>
              </div>
              <div class="card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#818cf8' }}>Founders</h4>
                <div style={{ display: 'grid', gap: '0.5rem', 'font-size': '0.875rem' }}>
                  {founders().map((founder, i) => (
                    <div><strong>Founder #{i + 1}:</strong> {founder.address.slice(0, 10)}...{founder.address.slice(-8)} - {founder.initialZeit} ZEIT</div>
                  ))}
                  <div style={{ 'margin-top': '0.5rem', 'padding-top': '0.5rem', 'border-top': '1px solid rgba(255,255,255,0.1)' }}>
                    <strong>Total Supply:</strong> {totalInitialZeit()} ZEIT
                  </div>
                </div>
              </div>
              <div class="card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#818cf8' }}>Governance</h4>
                <div style={{ display: 'grid', gap: '0.5rem', 'font-size': '0.875rem' }}>
                  <div><strong>Voting Type:</strong> {governance().votingType}</div>
                  <div><strong>Min Voters:</strong> {governance().minVoters}</div>
                  <div><strong>Quorum:</strong> {governance().quorum}%</div>
                  <div><strong>Voting Period:</strong> {governance().votingPeriod / 86400} days</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <button class="btn btn-outline" onClick={() => setStep(3)}>← Back</button>
              <button class="btn btn-primary" onClick={handleDeploy} disabled={isDeploying()}>
                {isDeploying() ? 'Deploying...' : '🚀 Deploy DAO'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
