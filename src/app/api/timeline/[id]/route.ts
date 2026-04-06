import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

type Params = Promise<{ id: string }>;

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await db.timelineEntry.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
