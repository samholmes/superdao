// Zoon DAO Types

export type VotingType = 'Unanimity' | 'Majority' | 'SuperMajority' | 'Optimistic';

export interface DAO {
  address: string;
  name: string;
  mission: string;
  tokenAddress: string;
  founderCount: number;
  memberCount: number;
  taskCount: number;
  createdAt: number;
  governance: GovernanceParams;
}

export interface GovernanceParams {
  minVoters: number;
  votingType: VotingType;
  votingPeriod: number; // in seconds
  quorum: number; // percentage
}

export type TaskState = 'Proposed' | 'Active' | 'Completed' | 'Cancelled';
export type OutcomeState = 'Pending' | 'Accepted' | 'Rejected';

export interface Task {
  id: number;
  daoAddress: string;
  title: string;
  description: string;
  proposer: string;
  state: TaskState;
  createdAt: number;
  deadline: number;
  reward: string;
  outcomes: Outcome[];
  votes: Vote[];
}

export interface Outcome {
  id: number;
  taskId: number;
  description: string;
  proposer: string;
  state: OutcomeState;
  bidAmount: string;
  voteCount: number;
}

export interface Vote {
  voter: string;
  outcomeId: number;
  amount: string;
  timestamp: number;
}

export interface Founder {
  address: string;
  initialZeit: number;
}

// Form state types
export interface OnboardFormState {
  step: number;
  daoName: string;
  mission: string;
  founders: Founder[];
  initialZeitPerFounder: number;
  governance: GovernanceParams;
}

// Mock data for development
export const MOCK_DAOS: DAO[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    name: 'AlphaDAO',
    mission: 'Building the future of decentralized collaboration',
    tokenAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    founderCount: 3,
    memberCount: 12,
    taskCount: 5,
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
    governance: {
      minVoters: 2,
      votingType: 'Majority',
      votingPeriod: 86400 * 3, // 3 days
      quorum: 51,
    },
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    name: 'BetaLabs',
    mission: 'Research and development for Web3 infrastructure',
    tokenAddress: '0xbcdef1234567890abcdef1234567890abcdef123',
    founderCount: 5,
    memberCount: 28,
    taskCount: 12,
    createdAt: Date.now() - 86400000 * 14, // 14 days ago
    governance: {
      minVoters: 3,
      votingType: 'SuperMajority',
      votingPeriod: 86400 * 5, // 5 days
      quorum: 66,
    },
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    name: 'GammaGuild',
    mission: 'Creative collective for digital artists',
    tokenAddress: '0xcdef1234567890abcdef1234567890abcdef1234',
    founderCount: 2,
    memberCount: 45,
    taskCount: 23,
    createdAt: Date.now() - 86400000 * 3, // 3 days ago
    governance: {
      minVoters: 2,
      votingType: 'Unanimity',
      votingPeriod: 86400 * 2, // 2 days
      quorum: 100,
    },
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    daoAddress: '0x1234567890123456789012345678901234567890',
    title: 'Design new landing page',
    description: 'Create a modern, responsive landing page for our DAO portal',
    proposer: '0x1111111111111111111111111111111111111111',
    state: 'Active',
    createdAt: Date.now() - 86400000,
    deadline: Date.now() + 86400000 * 2,
    reward: '100 ZEIT',
    outcomes: [
      { id: 1, taskId: 1, description: 'Minimalist design with dark theme', proposer: '0xaaa...aaa', state: 'Pending', bidAmount: '80 ZEIT', voteCount: 3 },
      { id: 2, taskId: 1, description: 'Colorful animated design', proposer: '0xbbb...bbb', state: 'Pending', bidAmount: '100 ZEIT', voteCount: 1 },
    ],
    votes: [],
  },
  {
    id: 2,
    daoAddress: '0x1234567890123456789012345678901234567890',
    title: 'Smart contract audit',
    description: 'Security audit for our core Zoon contracts',
    proposer: '0x2222222222222222222222222222222222222222',
    state: 'Proposed',
    createdAt: Date.now() - 3600000,
    deadline: Date.now() + 86400000 * 5,
    reward: '500 ZEIT',
    outcomes: [],
    votes: [],
  },
  {
    id: 3,
    daoAddress: '0x1234567890123456789012345678901234567890',
    title: 'Community outreach campaign',
    description: 'Organize Twitter spaces and AMA sessions',
    proposer: '0x3333333333333333333333333333333333333333',
    state: 'Proposed',
    createdAt: Date.now() - 7200000,
    deadline: Date.now() + 86400000 * 3,
    reward: '200 ZEIT',
    outcomes: [],
    votes: [],
  },
];
