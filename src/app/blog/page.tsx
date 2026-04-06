import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { title: true, slug: true, excerpt: true, tags: true, createdAt: true },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-border p-5 transition-colors hover:bg-card"
          >
            <h2 className="font-medium">{post.title}</h2>
            {post.excerpt && (
              <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <time className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-card px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-muted">No posts yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
