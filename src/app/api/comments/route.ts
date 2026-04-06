import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId, body } = await req.json();
  if (!postId || !body?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const comment = await db.comment.create({
    data: { body: body.trim(), postId, userId: session.user.id },
  });

  return NextResponse.json(comment);
}
