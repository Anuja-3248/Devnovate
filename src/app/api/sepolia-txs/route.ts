import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address query parameter." }, { status: 400 });
  }

  if (!ethers.isAddress(address)) {
    return NextResponse.json({ error: "Invalid Ethereum address." }, { status: 400 });
  }

  const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC || process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    ? `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
    : undefined;

  if (!rpcUrl) {
    return NextResponse.json({ error: "Sepolia RPC is not configured." }, { status: 500 });
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const latestBlock = await provider.getBlockNumber();
  const maxBlocks = 40;
  const results: Array<{
    id: string;
    type: "Sent" | "Received" | "Other";
    amount: string;
    address: string;
    time: string;
    status: string;
  }> = [];

  const normalizedAddress = address.toLowerCase();

  for (let i = 0; i < maxBlocks && results.length < 12; i++) {
    const blockNumberHex = ethers.toBeHex(latestBlock - i);
    const block = await provider.send("eth_getBlockByNumber", [blockNumberHex, true]) as any;
    if (!block?.transactions?.length) continue;

    const blockTimestamp = Number(block.timestamp);
    for (const tx of block.transactions) {
      const from = tx.from?.toLowerCase() ?? "";
      const to = tx.to?.toLowerCase() ?? "";
      if (from !== normalizedAddress && to !== normalizedAddress) continue;

      const amount = Number(ethers.formatEther(tx.value));
      results.push({
        id: tx.hash,
        type: from === normalizedAddress ? "Sent" : "Received",
        amount: `${amount.toFixed(4)} ETH`,
        address: from === normalizedAddress ? tx.to ?? "Unknown" : tx.from ?? "Unknown",
        time: new Date(blockTimestamp * 1000).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
        status: tx.blockNumber ? "Success" : "Pending",
      });

      if (results.length >= 12) break;
    }
  }

  return NextResponse.json({ address, transactions: results.slice(0, 12) });
}
