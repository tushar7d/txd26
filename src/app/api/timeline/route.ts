import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const entry = await db.timelineEntry.create({
    data: {
      title: data.title,
      body: data.body || null,
      date: new Date(data.date),
      category: data.category || null,
    },
  });

  return NextResponse.json(entry);
}
