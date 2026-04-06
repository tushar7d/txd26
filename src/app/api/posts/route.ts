import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const post = await db.post.create({
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
