import { NextResponse } from 'next/server';
import { sql  } from '@vercel/postgres';

interface Wallet {
  walletAddress: string;
  character: string;
}


export async function POST(req: Request) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Wallet (
        id SERIAL PRIMARY KEY,
        walletAddress VARCHAR(255) UNIQUE NOT NULL,
        character VARCHAR(255) NOT NULL
      )
    `;

    const data: Wallet = await req.json();

    const result = await sql`INSERT INTO Wallet (walletAddress, character) VALUES (${data.walletAddress}, ${data.character}) RETURNING *`

    const newWallet = result.rows[0];
    return NextResponse.json(newWallet, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
  }
}

export async function GET() {

  try {
    const result = await sql`SELECT * FROM Wallet`
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
  }
}
