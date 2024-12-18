import { NextResponse } from 'next/server';
import { sql  } from '@vercel/postgres';

interface Character {
  walletAddress?: string;
  character: string;
}


export async function POST(req: Request) {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      wallet_address VARCHAR(255) UNIQUE,
      character VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    const data: Character = await req.json();

    const result = await sql`
      INSERT INTO users (wallet_address, character, created_at, updated_at)
      VALUES (${data.walletAddress || null}, ${data.character}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (wallet_address) 
      DO UPDATE SET 
        character = EXCLUDED.character,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

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
    const result = await sql`SELECT * FROM users`
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
  }
}
