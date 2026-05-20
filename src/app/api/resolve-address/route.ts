import { NextResponse } from 'next/server';
import { resolveAddress, addressBook } from '@/lib/addressBook';

// GET /api/resolve-address?name=Rahul
// Resolves a name to a wallet address
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name query parameter is required' }, { status: 400 });
  }

  const user = resolveAddress(name);

  if (!user) {
    return NextResponse.json(
      { error: `Could not find wallet address for "${name}". Are they registered?` },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

// GET /api/resolve-address/all
// Returns all registered users (for the dashboard/contacts list)
export async function POST() {
  return NextResponse.json({ users: addressBook });
}
