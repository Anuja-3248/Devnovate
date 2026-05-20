// =================================================
// GhostPay AI - Smart Contract Configuration
// These are the deployed contract addresses and ABIs
// that the frontend uses to talk to the blockchain.
// =================================================

// ✅ Contract Addresses (deployed on Base Sepolia)
// NOTE: The Remix VM address below is for local testing only.
// To go live, redeploy on Base Sepolia and update these addresses + .env.local
export const CONTRACT_ADDRESSES = {
  MOCK_USD: process.env.NEXT_PUBLIC_MOCK_USD_ADDRESS || "0xd9145CCE52D386f254917e481eB44e9943F39138",
  GHOST_BADGE: process.env.NEXT_PUBLIC_GHOST_BADGE_ADDRESS || "0x0000000000000000000000000000000000000000",
};

// ✅ MockUSD Token ABI (ERC20 + custom mint)
export const MOCK_USD_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  // Write functions
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function mint(address to, uint256 amount)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

// ✅ GhostBadge NFT ABI (ERC721 + custom safeMint)
export const GHOST_BADGE_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  // Write functions
  "function safeMint(address to)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
];

// ✅ Base Sepolia chain config
export const BASE_SEPOLIA = {
  chainId: 84532,
  name: "Base Sepolia Testnet",
  rpcUrl: "https://sepolia.base.org",
  blockExplorer: "https://sepolia.basescan.org",
};
