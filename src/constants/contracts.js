// Smart Contract Constants for Base Sepolia Testnet (Chain ID: 84532)

// 1. Mock USD stablecoin used by UGF Testnet Faucet
export const MOCK_USD_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Base Sepolia USDC / Mock USD

// 2. GaslessBadge NFT Contract Address (Pre-deployed or user's custom deployed address)
export const NFT_CONTRACT_ADDRESS = "0x2F4E7501a3F49A6C8879685324D636e2fE746F97"; 

// Minimal ERC-20 ABI to query balance
export const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function approve(address spender, uint256 amount) external returns (bool)"
];

// Minimal ERC-721 ABI to mint and query details
export const ERC721_ABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function mintTo(address to, string memory tokenURI) external returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];
