# SuperDAO /alpha

The alpha version of SuperDAO - a DAO management platform built on the Zoon protocol.

## Features

### 1. DAO Explorer (`/alpha/explore`)
- Browse and discover DAOs in the ecosystem
- Search by name, address, or mission
- Sort by recent, popular, or name
- View DAO details (founders, members, tasks, governance params)

### 2. DAO Dashboard (`/alpha/dashboard`)
- View active tasks and proposals
- Vote on task outcomes
- Create new tasks/proposals
- Track voting progress

### 3. Onboarding Wizard (`/alpha/onboard`)
- 4-step DAO creation process:
  1. DAO name and mission
  2. Founder configuration (addresses + ZEIT allocation)
  3. Governance parameters (voting type, quorum, voting period)
  4. Review and deploy

## Tech Stack

- **Framework**: SolidJS + SolidStart (Vinxi)
- **Styling**: Custom CSS with dark theme
- **State**: SolidJS signals
- **Routing**: File-based routing via `@solidjs/start/router`

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:3000/alpha
```

## Routes

- `/` - Landing page
- `/alpha` - Alpha home
- `/alpha/explore` - DAO explorer
- `/alpha/dashboard` - DAO dashboard
- `/alpha/onboard` - Create DAO wizard

## Contract Integration (TODO)

Currently uses mock data. Contract integration planned:
- Connect wallet via wagmi/viem
- Read DAO data from Zoon contracts
- Submit transactions for voting, task creation, etc.
