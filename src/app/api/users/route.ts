import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { addressBook, User } from '@/lib/addressBook';

// Path to the persistent users JSON file
const usersFilePath = path.join(process.cwd(), 'src', 'lib', 'registeredUsers.json');

// Load registered users from disk (persists across server restarts)
function loadRegisteredUsers(): User[] {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading registered users:', e);
  }
  return [];
}

// Save registered users to disk
function saveRegisteredUsers(users: User[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

// GET /api/users — Returns ALL users (hardcoded + registered)
export async function GET() {
  const registered = loadRegisteredUsers();
  const allUsers = [...addressBook, ...registered];
  return NextResponse.json({ users: allUsers });
}

// POST /api/users — Register a new user
export async function POST(req: Request) {
  try {
    const { name, walletAddress } = await req.json();

    // Basic validation
    if (!name || !walletAddress) {
      return NextResponse.json(
        { error: 'Name and wallet address are required.' },
        { status: 400 }
      );
    }

    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return NextResponse.json(
        { error: 'Please enter a valid Ethereum wallet address (starts with 0x, 42 chars).' },
        { status: 400 }
      );
    }

    const allUsers = [...addressBook, ...loadRegisteredUsers()];

    // Check if name already exists
    const nameExists = allUsers.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );
    if (nameExists) {
      return NextResponse.json(
        { error: `The name "${name}" is already registered.` },
        { status: 409 }
      );
    }

    // Check if wallet already registered
    const walletExists = allUsers.find(
      (u) => u.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
    if (walletExists) {
      return NextResponse.json(
        { error: `This wallet address is already registered to "${walletExists.name}".` },
        { status: 409 }
      );
    }

    // Create the new user
    const newUser: User = {
      name: name.trim(),
      username: name.trim().toLowerCase().replace(/\s+/g, ''),
      walletAddress: walletAddress.trim(),
      avatar: name.trim().substring(0, 2).toUpperCase(),
    };

    // Save to disk
    const registeredUsers = loadRegisteredUsers();
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    return NextResponse.json(
      { message: `✅ "${name}" has been registered successfully! They can now receive transactions.`, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ error: 'Failed to register user.' }, { status: 500 });
  }
}
