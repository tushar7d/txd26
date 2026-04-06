import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

type Params = Promise<{ id: string }>;

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const comment = await db.comment.findUnique({ where: { id } });
  if (!comment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (comment.userId !== session.user.id && session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.comment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
