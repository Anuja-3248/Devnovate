# GhostPay AI 👻

**GhostPay AI** is an invisible Web3 gasless payments and AI assistant platform. It allows users to perform blockchain transactions using conversational AI, abstracting away the complexity of RPCs, wallet signatures, and gas fees. Powered by the Universal Gas Fund (UGF), all gas fees are covered automatically, making Web3 completely gasless and seamless.

🌐 **Live Demo:** [https://devnovate.vercel.app/](https://devnovate.vercel.app/)

## ✨ Key Features

- 🤖 **AI Transactions:** Command your wallet in plain English. Our AI translates natural language prompts into secure blockchain calls (e.g., "Donate 5 USD" or "Transfer 10 USDC to vitalik.eth").
- ⛽ **Gasless Payments:** Say goodbye to native chain gas tokens. The Universal Gas Fund (UGF) handles 100% of network fees seamlessly via meta-transactions.
- 🏅 **NFT Badge Minting:** Mint achievement certificates, event logs, and participation badges gaslessly.
- 📊 **Activity Dashboard:** Review historic AI executions, sponsored gas credits, pending transactions, and an address book directory.
- 👁️ **Smart Transaction Preview:** See a transparent, human-readable cost breakdown and exact transaction details before confirming.
- 🔗 **Cross-Chain Routing:** Deploy transactions across Ethereum, Polygon, Arbitrum, and Base without switching networks in your wallet.

## 🚀 Tech Stack

GhostPay AI is built using cutting-edge Web3 and AI technologies:

- **Frontend:** [Next.js](https://nextjs.org/) (React 19), Tailwind CSS, Framer Motion
- **Web3 & Blockchain:** `ethers.js`, `viem`, `wagmi`, `@solana/web3.js`, `@mysten/sui`, RainbowKit
- **Gasless Infrastructure:** `@tychilabs/ugf-sdk` (Universal Gas Fund)
- **AI Integration:** Google Generative AI (`@google/generative-ai`), OpenAI
- **Backend/Auth:** Firebase & Firebase Admin

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js (v20+) and npm/pnpm/yarn installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anuja-3248/Devnovate.git
   cd Devnovate
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your API keys and configuration (e.g., UGF API keys, OpenAI/Gemini keys, Firebase config, WalletConnect Project ID).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 How It Works

1. **Type Command:** Describe what you want to do in plain English. The GhostPay AI interprets the intent, targets, and assets.
2. **Confirm & Sponsor:** Review the human-readable transaction preview. The UGF automatically sponsors 100% of your gas fees.
3. **Execute:** Approve the execution. The transaction is instantly broadcasted, confirmed, and finalized securely on-chain.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
