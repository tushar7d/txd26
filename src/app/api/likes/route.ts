import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await req.json();
  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  const existing = await db.like.findUnique({
    where: { postId_userId: { postId, userId: session.user.id } },
  });

  if (existing) {
    await db.like.delete({ where: { id: existing.id } });
  } else {
    await db.like.create({ data: { postId, userId: session.user.id } });
  }

  const count = await db.like.count({ where: { postId } });
  return NextResponse.json({ liked: !existing, count });
}
