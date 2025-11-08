
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Here you would typically send an email or save the message to a database
  console.log({ name, email, message });

  return NextResponse.json({ message: 'Message sent successfully!' });
}
