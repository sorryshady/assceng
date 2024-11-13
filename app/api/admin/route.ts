
import { NextResponse } from 'next/server';

// fetch Verified Users
export async function GET(request: Request) {
  return NextResponse.json({ message: 'GET request to /api/admin' });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'User created', data });
}
