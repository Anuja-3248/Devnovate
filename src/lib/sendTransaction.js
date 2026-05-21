import { ethers } from "ethers";

export async function sendMockUSD(
  recipient,
  amount,
  signer,
  contractAddress,
  abi
) {
  if (!contractAddress) {
    throw new Error("Missing contract address. Set NEXT_PUBLIC_TOKEN_ADDRESS in .env.local.");
  }

  if (!abi) {
    throw new Error("Missing contract ABI.");
  }

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  const tx = await contract.transfer(
    recipient,
    ethers.parseUnits(amount.toString(), 18)
  );

  await tx.wait();

  return tx.hash;
}