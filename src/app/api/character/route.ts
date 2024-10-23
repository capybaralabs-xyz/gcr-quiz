import { NextResponse } from 'next/server';
import { sql  } from '@vercel/postgres';

interface Character {
  walletAddress?: string; 
  character: string;
}


export async function POST(req: Request) {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS Character (
      id SERIAL PRIMARY KEY,
      walletAddress VARCHAR(255) UNIQUE,
      character VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    const data: Character = await req.json();

    const result = await sql`
      INSERT INTO Character (walletAddress, character, created_at, updated_at)
      VALUES (${data.walletAddress || null}, ${data.character}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (walletAddress) 
      DO UPDATE SET 
        character = EXCLUDED.character,
        updated_at = CURRENT_TIMESTAMP
      WHERE EXCLUDED.walletAddress IS NOT NULL
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
    const result = await sql`SELECT * FROM Character`
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
  }
}
