# Aster Code Demo

A demo project showcasing EIP-712 message signing for Aster protocol using Wagmi (React Hooks for Ethereum) with React and Vite.

## Features

- 🔌 Wallet connection via injected connector (MetaMask, etc.)
- 📊 Display wallet address, chain ID, and balance
- ✍️ EIP-712 message signing for ApproveAgent and ApproveBuilder
- 🔗 API integration for agent and builder management
- ⚡ Fast development with Vite and Bun
- 🎨 Modern UI with responsive design
- 🌐 Support for Ethereum Mainnet and BSC chains

## Getting Started

### Prerequisites

This project uses [Bun](https://bun.sh) as the package manager and runtime. Make sure you have Bun installed.

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**

   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **Push to trigger deployment:**

   - The workflow automatically deploys when you push to `main` or `master` branch
   - You can also manually trigger it from the "Actions" tab

3. **Your site will be available at:**
   - `https://<username>.github.io/<repository-name>/`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

- Build the project using Bun
- Deploy the `dist` folder to GitHub Pages
- Automatically set the correct base path for your repository

## Project Structure

```
├── src/
│   ├── App.jsx          # Main app component with wagmi hooks and signing logic
│   ├── main.jsx         # React entry point with providers
│   ├── wagmi.js         # Wagmi configuration (chains and connectors)
│   ├── sign.js          # EIP-712 signing utilities and hooks
│   ├── api.js           # API client for agent/builder endpoints
│   └── index.css        # Styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## Wagmi Hooks Used

- `useConnection` - Get connected account information
- `useConnect` - Connect to wallets
- `useDisconnect` - Disconnect wallet
- `useBalance` - Get account balance
- `useChainId` - Get current chain ID
- `useConnectors` - Get available wallet connectors
- `useSignTypedData` - Sign EIP-712 typed data messages

## EIP-712 Signing

The project includes custom hooks for signing EIP-712 messages:

- **ApproveAgent**: Sign agent approval messages with parameters like agent name, address, IP whitelist, permissions, etc.
- **ApproveBuilder**: Sign builder approval messages with builder address and max fee rate

Both signing functions use the Aster protocol's EIP-712 domain:

- Domain name: `AsterSignTransaction`
- Version: `1`
- Chain ID: Dynamic (uses current connected chain)
- Verifying contract: `0x0000000000000000000000000000000000000000`

## API Integration

The project includes API client functions for interacting with the Aster protocol backend:

### Agent Endpoints

- `approveAgent` - Approve an agent
- `updateAgent` - Update agent settings
- `getAgents` - Get all agents
- `delAgent` - Delete an agent

### Builder Endpoints

- `approveBuilder` - Approve a builder
- `updateBuilder` - Update builder settings
- `getBuilders` - Get all builders
- `delBuilder` - Delete a builder

### Order Endpoints

- `placeOrder` - Place a trading order

Note: API calls are currently commented out in the UI. Uncomment the relevant sections in `App.jsx` to enable API submission.

## Learn More

- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [Vite Documentation](https://vitejs.dev)
- [Bun Documentation](https://bun.sh/docs)
- [EIP-712 Specification](https://eips.ethereum.org/EIPS/eip-712)
