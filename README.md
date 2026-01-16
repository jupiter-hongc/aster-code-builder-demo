# Wagmi Demo Project

A demo project showcasing Wagmi (React Hooks for Ethereum) with React and Vite.

## Features

- 🔌 Multiple wallet connectors (MetaMask, WalletConnect, Safe, Injected)
- 📊 Display wallet address, chain ID, and balance
- ⚡ Fast development with Vite
- 🎨 Modern UI with responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Configure WalletConnect (Optional)

If you want to use WalletConnect, you'll need to:

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a project and get your Project ID
3. Update `src/wagmi.js` and replace `YOUR_PROJECT_ID` with your actual project ID

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── App.jsx          # Main app component with wagmi hooks
│   ├── main.jsx         # React entry point with providers
│   ├── wagmi.js         # Wagmi configuration
│   └── index.css        # Styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## Wagmi Hooks Used

- `useAccount` - Get connected account information
- `useConnect` - Connect to wallets
- `useDisconnect` - Disconnect wallet
- `useBalance` - Get account balance
- `useChainId` - Get current chain ID

## Learn More

- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [Vite Documentation](https://vitejs.dev)
