import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { body } = await req.json();
  if (!body?.trim()) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  const entry = await db.guestbookEntry.create({
    data: { body: body.trim(), userId: session.user.id },
  });

  return NextResponse.json(entry);
}
