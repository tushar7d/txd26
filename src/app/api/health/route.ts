import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$queryRawUnsafe("SELECT 1");
    return NextResponse.json({
      status: "ok",
      db: "connected",
      env: {
        hasGithubId: !!process.env.GITHUB_ID,
        hasGithubSecret: !!process.env.GITHUB_SECRET,
        hasNextauthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextauthUrl: !!process.env.NEXTAUTH_URL,
        nextauthUrl: process.env.NEXTAUTH_URL,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { status: "error", db: "failed", error: message },
      { status: 500 }
    );
  }
}
