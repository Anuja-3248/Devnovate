import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { resolveAddress } from '@/lib/addressBook';

// Initialize Gemini using the key from .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `
You are Ghost, an AI blockchain assistant.
The user will give you a natural language command to execute on the blockchain.
Your job is to understand their intent and return ONLY a JSON object. Do not include any markdown formatting like \`\`\`json or conversational text. Return plain JSON only.

Extract the following:
- type: The type of action (either "Transfer" or "Mint NFT" or "Unknown")
- amount: The amount with its unit (e.g., "5.00 MockUSD" or "1 Badge")
- receiver: The target name only (e.g., "Rahul", "Pranay", "Gitcoin"). Do NOT include wallet addresses here.

If the command is unclear or not related to blockchain, return type "Unknown".

Example Input: "Send 5 MockUSD to Rahul"
Example Output:
{
  "type": "Transfer",
  "amount": "5.00 MockUSD",
  "receiver": "Rahul"
}
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add it to .env.local" },
        { status: 500 }
      );
    }

    // ✅ STEP 1: Call Gemini to parse the user's natural language
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const fullPrompt = `${systemPrompt}\n\nUser Command: "${message}"\nReturn ONLY the raw JSON object.`;
    const result = await model.generateContent(fullPrompt);
    const aiContent = result.response.text();

    // Clean up response in case Gemini adds ```json
    const cleanedJson = aiContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedAction = JSON.parse(cleanedJson || '{}');

    // ✅ STEP 2: Resolve the receiver name → real wallet address (Phase 2!)
    if (parsedAction.type === "Transfer" && parsedAction.receiver) {
      const resolvedUser = resolveAddress(parsedAction.receiver);
      if (resolvedUser) {
        // Attach the full user details to the action
        parsedAction.receiverAddress = resolvedUser.walletAddress;
        parsedAction.receiverAvatar = resolvedUser.avatar;
        parsedAction.receiverResolved = true;
      } else {
        // Receiver name not found in address book
        parsedAction.receiverResolved = false;
        parsedAction.receiverAddress = "Unknown Address";
      }
    }

    return NextResponse.json({ action: parsedAction });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: "Failed to process command. Make sure your Gemini API key is valid." },
      { status: 500 }
    );
  }
}
