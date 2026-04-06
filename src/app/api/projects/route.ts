import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const project = await db.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      content: data.content,
      tags: data.tags ?? [],
      role: data.role || null,
      company: data.company || null,
      year: data.year || null,
      sortOrder: data.sortOrder ?? 0,
      published: data.published ?? false,
    },
  });

  return NextResponse.json(project);
}
