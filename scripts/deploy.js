// Standard Hardhat deployment script to compile and deploy the GaslessBadge ERC-721 contract
const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting GaslessBadge deployment process...");

  // Compile contract
  await hre.run("compile");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log(`👤 Deploying contract with the account: ${deployer.address}`);
  
  // Print account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`💰 Deployer Balance: ${hre.ethers.formatEther(balance)} ETH`);

  // Deploy GaslessBadge
  const GaslessBadge = await hre.ethers.getContractFactory("GaslessBadge");
  const contract = await GaslessBadge.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`\n======================================================`);
  console.log(`🎉 SUCCESS: GaslessBadge deployed successfully!`);
  console.log(`📍 Contract Address: ${address}`);
  console.log(`🔗 Basescan Link: https://sepolia.basescan.org/address/${address}`);
  console.log(`======================================================\n`);

  console.log("👉 Update 'NFT_CONTRACT_ADDRESS' in 'src/constants/contracts.js' with this address!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
