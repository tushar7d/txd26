import Link from "next/link";
import { db } from "@/lib/db";
import { DeleteButton } from "@/components/ui/delete-button";

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, published: true, createdAt: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Posts</h2>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          New Post
        </Link>
      </div>
      <div className="space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div>
              <Link href={`/admin/posts/${post.id}/edit`} className="font-medium hover:underline">
                {post.title}
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className={post.published ? "text-green-500" : "text-yellow-500"}>
                  {post.published ? "Published" : "Draft"}
                </span>
                <span>·</span>
                <time>{new Date(post.createdAt).toLocaleDateString()}</time>
              </div>
            </div>
            <DeleteButton id={post.id} resource="posts" />
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-muted">No posts yet.</p>}
      </div>
    </div>
  );
}
