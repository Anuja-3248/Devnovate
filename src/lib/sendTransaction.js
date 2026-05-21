import { ethers } from "ethers";

export async function sendMockUSD(
  recipient,
  amount,
  signer,
  contractAddress,
  abi
) {
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