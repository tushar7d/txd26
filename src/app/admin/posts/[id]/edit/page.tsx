import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PostForm } from "@/components/admin/post-form";

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Post</h2>
      <PostForm post={post} />
    </div>
  );
}
