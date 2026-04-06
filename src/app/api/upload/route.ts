import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const now = new Date();
  const dir = path.join(process.cwd(), "uploads", String(now.getFullYear()));
  await mkdir(dir, { recursive: true });

  const ext = path.extname(file.name) || ".bin";
  const name = `${Date.now()}${ext}`;
  const filepath = path.join(dir, name);
  await writeFile(filepath, buffer);

  const url = `/uploads/${now.getFullYear()}/${name}`;
  return NextResponse.json({ url });
}
