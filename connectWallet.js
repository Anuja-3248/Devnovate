import { ethers } from "ethers";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send(
      "eth_requestAccounts",
      []
    );

    const walletAddress = accounts[0];

    return walletAddress;

  } catch (error) {
    console.log(error);
    return null;
  }
};