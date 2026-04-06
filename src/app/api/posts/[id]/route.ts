import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

type Params = Promise<{ id: string }>;

export async function PUT(req: Request, { params }: { params: Params }) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const data = await req.json();
  const post = await db.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      tags: data.tags ?? [],
      published: data.published ?? false,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await db.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
