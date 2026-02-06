import { createSignal, createMemo } from 'solid-js';
import { MOCK_TASKS, Task, TaskState, Outcome } from '~/components/alpha/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = createSignal<'tasks' | 'proposals' | 'outcomes'>('tasks');
  const [showCreateForm, setShowCreateForm] = createSignal(false);
  const [newTaskTitle, setNewTaskTitle] = createSignal('');
  const [newTaskDescription, setNewTaskDescription] = createSignal('');
  const [newTaskReward, setNewTaskReward] = createSignal('100');

  const activeTasks = createMemo(() => MOCK_TASKS.filter(t => t.state === 'Active'));
  const proposedTasks = createMemo(() => MOCK_TASKS.filter(t => t.state === 'Proposed'));
  const allOutcomes = createMemo(() => MOCK_TASKS.flatMap(t => t.outcomes));

  const handleCreateTask = (e: Event) => {
    e.preventDefault();
    // Mock task creation
    console.log('Creating task:', {
      title: newTaskTitle(),
      description: newTaskDescription(),
      reward: newTaskReward()
    });
    setShowCreateForm(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskReward('100');
  };

  const handleVote = (taskId: number, outcomeId: number) => {
    console.log('Voting for outcome:', outcomeId, 'on task:', taskId);
  };

  const handlePropose = (taskId: number) => {
    console.log('Supporting proposal:', taskId);
  };

  return (
    <div>
      <div class="page-header">
        <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
          <div>
            <h1>DAO Dashboard</h1>
            <p>Manage tasks, vote on proposals, and coordinate with your DAO</p>
          </div>
          <button 
            class="btn btn-primary"
            onClick={() => setShowCreateForm(!showCreateForm())}
          >
            {showCreateForm() ? 'Cancel' : '+ Create Task'}
          </button>
        </div>
      </div>

      {showCreateForm() && (
        <div class="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Create New Task</h3>
          <form onSubmit={handleCreateTask}>
            <div class="form-group">
              <label>Task Title</label>
              <input
                type="text"
                placeholder="e.g., Design new landing page"
                value={newTaskTitle()}
                onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
                required
              />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe what needs to be done..."
                value={newTaskDescription()}
                onInput={(e) => setNewTaskDescription(e.currentTarget.value)}
                required
              />
            </div>
            <div class="form-group">
              <label>Reward (ZEIT)</label>
              <input
                type="number"
                min="1"
                value={newTaskReward()}
                onInput={(e) => setNewTaskReward(e.currentTarget.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" class="btn btn-primary">
                Submit Proposal
              </button>
              <button 
                type="button" 
                class="btn btn-outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        'border-bottom': '1px solid rgba(255,255,255,0.1)',
        'margin-bottom': '1.5rem'
      }}>
        {(['tasks', 'proposals', 'outcomes'] as const).map((tab) => (
          <button
            class="btn"
            style={{
              'border-radius': 0,
              'border-bottom': activeTab() === tab ? '2px solid #6366f1' : '2px solid transparent',
              'margin-bottom': '-1px',
              background: activeTab() === tab ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab() === tab ? '#fff' : '#9ca3af'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span style={{ 
              'margin-left': '0.5rem',
              padding: '0.125rem 0.5rem',
              'border-radius': '9999px',
              'font-size': '0.75rem',
              background: 'rgba(255,255,255,0.1)'
            }}>
              {tab === 'tasks' ? activeTasks().length : 
               tab === 'proposals' ? proposedTasks().length : 
               allOutcomes().length}
            </span>
          </button>
        ))}
      </div>

      {/* Active Tasks Tab */}
      {activeTab() === 'tasks' && (
        <div>
          {activeTasks().length === 0 ? (
            <div style={{ 'text-align': 'center', padding: '3rem', color: '#6b7280' }}>
              <div style={{ 'font-size': '3rem', margin-bottom: '1rem' }}>📋</div>
              <p>No active tasks</p>
            </div>
          ) : (
            activeTasks().map((task) => (
              <TaskCard 
                task={task} 
                onVote={handleVote}
              />
            ))
          )}
        </div>
      )}

      {/* Proposals Tab */}
      {activeTab() === 'proposals' && (
        <div>
          {proposedTasks().length === 0 ? (
            <div style={{ 'text-align': 'center', padding: '3rem', color: '#6b7280' }}>
              <div style={{ 'font-size': '3rem', margin-bottom: '1rem' }}>📋</div>
              <p>No pending proposals</p>
            </div>
          ) : (
            proposedTasks().map((task) => (
              <ProposalCard 
                task={task} 
                onPropose={handlePropose}
              />
            ))
          )}
        </div>
      )}

      {/* Outcomes Tab */}
      {activeTab() === 'outcomes' && (
        <div>
          {allOutcomes().length === 0 ? (
            <div style={{ 'text-align': 'center', padding: '3rem', color: '#6b7280' }}>
              <div style={{ 'font-size': '3rem', margin-bottom: '1rem' }}>🎯</div>
              <p>No outcomes to vote on</p>
            </div>
          ) : (
            MOCK_TASKS.filter(t => t.outcomes.length > 0).map((task) => (
              <div class="card" style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 1rem 0' }}>{task.title}</h4>
                <p style={{ color: '#9ca3af', 'font-size': '0.875rem', margin: '0 0 1rem 0' }}>
                  {task.description}
                </p>
                <div class="outcome-list">
                  {task.outcomes.map((outcome) => (
                    <OutcomeItem 
                      outcome={outcome}
                      onVote={() => handleVote(task.id, outcome.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function TaskCard(props: { task: Task; onVote: (taskId: number, outcomeId: number) => void }) {
  const formatTimeLeft = (deadline: number) => {
    const hours = Math.floor((deadline - Date.now()) / 3600000);
    if (hours < 0) return 'Expired';
    if (hours < 24) return `${hours}h left`;
    return `${Math.floor(hours / 24)}d left`;
  };

  return (
    <div class="card task-card">
      <div class="task-card-header">
        <div>
          <h4>{props.task.title}</h4>
          <span class="badge badge-active">Active</span>
        </div>
        <span style={{ color: '#10b981', 'font-weight': 600 }}>
          {props.task.reward}
        </span>
      </div>
      
      <p>{props.task.description}</p>
      
      {props.task.outcomes.length > 0 && (
        <div class="outcome-list">
          <h5 style={{ margin: '0 0 0.75rem 0', 'font-size': '0.875rem', color: '#d1d5db' }}>
            Proposed Outcomes:
          </h5>
          {props.task.outcomes.map((outcome) => (
            <OutcomeItem 
              outcome={outcome}
              onVote={() => props.onVote(props.task.id, outcome.id)}
            />
          ))}
        </div>
      )}
      
      <div class="task-meta">
        <span>Proposed by {props.task.proposer.slice(0, 6)}...{props.task.proposer.slice(-4)}</span>
        <span>•</span>
        <span style={{ color: '#fbbf24' }}>{formatTimeLeft(props.task.deadline)}</span>
      </div>
    </div>
  );
}

function ProposalCard(props: { task: Task; onPropose: (taskId: number) => void }) {
  return (
    <div class="card task-card">
      <div class="task-card-header">
        <div>
          <h4>{props.task.title}</h4>
          <span class="badge badge-proposed">Proposed</span>
        </div>
        <span style={{ color: '#a855f7', 'font-weight': 600 }}>
          {props.task.reward}
        </span>
      </div>
      
      <p>{props.task.description}</p>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        'margin-top': '1rem'
      }}>
        <button 
          class="btn btn-primary"
          onClick={() => props.onPropose(props.task.id)}
        >
          👍 Support This Task
        </button>
        <button class="btn btn-outline">
          👎 Pass
        </button>
      </div>
      
      <div class="task-meta">
        <span>Proposed by {props.task.proposer.slice(0, 6)}...{props.task.proposer.slice(-4)}</span>
      </div>
    </div>
  );
}

function OutcomeItem(props: { outcome: Outcome; onVote: () => void }) {
  return (
    <div class="outcome-item">
      <div style={{ flex: 1 }}>
        <div style={{ color: '#fff', 'margin-bottom': '0.25rem' }}>
          {props.outcome.description}
        </div>
        <div style={{ 'font-size': '0.75rem', color: '#6b7280' }}>
          Bid: <span style={{ color: '#10b981' }}>{props.outcome.bidAmount}</span>
          {' • '}
          by {props.outcome.proposer}
          {' • '}
          {props.outcome.voteCount} votes
        </div>
      </div>
      <button 
        class="btn btn-primary"
        style={{ padding: '0.5rem 1rem', 'font-size': '0.875rem' }}
        onClick={props.onVote}
      >
        Vote
      </button>
    </div>
  );
}
