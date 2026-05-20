// =================================================
// GhostPay AI - Address Book (Phase 2)
// This acts as our "database" mapping names to 
// real blockchain wallet addresses on Base Sepolia.
// =================================================
import fs from 'fs';
import path from 'path';

export interface User {
  name: string;
  username: string;
  walletAddress: string;
  avatar: string; // initials for UI display
}

// Hardcoded address book for hackathon demo
// In a real production app, this would be a MongoDB/Postgres table
export const addressBook: User[] = [
  {
    name: "Rahul",
    username: "rahul",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    avatar: "RA",
  },
  {
    name: "Pranay",
    username: "pranay",
    walletAddress: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    avatar: "PR",
  },
  {
    name: "Anuja",
    username: "anuja",
    walletAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    avatar: "AN",
  },
  {
    name: "John",
    username: "john",
    walletAddress: "0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6",
    avatar: "JO",
  },
  {
    name: "Gitcoin",
    username: "gitcoin",
    walletAddress: "0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6",
    avatar: "GC",
  },
];

// Helper function to resolve a name to a wallet address
// Checks both the hardcoded list AND newly registered users from disk
export function resolveAddress(name: string): User | null {
  const normalizedName = name.toLowerCase().trim();

  // Check hardcoded address book first
  const hardcodedMatch = addressBook.find(
    (user) =>
      user.name.toLowerCase() === normalizedName ||
      user.username.toLowerCase() === normalizedName
  );
  if (hardcodedMatch) return hardcodedMatch;

  // Check registered users from disk
  try {
    const usersFilePath = path.join(process.cwd(), 'src', 'lib', 'registeredUsers.json');
    if (fs.existsSync(usersFilePath)) {
      const registeredUsers: User[] = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      return registeredUsers.find(
        (user) =>
          user.name.toLowerCase() === normalizedName ||
          user.username.toLowerCase() === normalizedName
      ) || null;
    }
  } catch (e) {
    console.error('Error reading registered users:', e);
  }

  return null;
}
