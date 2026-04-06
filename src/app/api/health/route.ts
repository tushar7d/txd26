import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Test raw query to check connection
    await db.$queryRawUnsafe("SELECT 1");
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { status: "error", db: "failed", error: message },
      { status: 500 }
    );
  }
}
