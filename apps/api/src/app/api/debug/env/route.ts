import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasTelegramToken: !!process.env.TELEGRAM_BOT_TOKEN,
    hasTelegramChatId: !!process.env.TELEGRAM_CHAT_ID,
    nodeEnv: process.env.NODE_ENV,
  });
}
