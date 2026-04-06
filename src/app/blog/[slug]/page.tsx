import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { CommentList } from "@/components/comments/comment-list";
import { CommentForm } from "@/components/comments/comment-form";
import { LikeButton } from "@/components/likes/like-button";
import { getCurrentUser } from "@/lib/auth-helpers";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug }, select: { title: true, excerpt: true } });
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug, published: true },
    include: {
      comments: {
        include: { user: { select: { name: true, image: true, id: true } } },
        orderBy: { createdAt: "asc" },
      },
      _count: { select: { likes: true } },
    },
  });

  if (!post) notFound();

  const user = await getCurrentUser();
  const userLiked = user
    ? !!(await db.like.findUnique({
        where: { postId_userId: { postId: post.id, userId: user.id } },
      }))
    : false;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted">
          <time>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags.length > 0 && (
            <div className="flex gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-card px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <LikeButton postId={post.id} initialCount={post._count.likes} initialLiked={userLiked} />
      </div>

      <section className="space-y-6 border-t border-border pt-6">
        <h2 className="text-lg font-semibold">Comments</h2>
        <CommentList comments={post.comments} currentUserId={user?.id} />
        {user ? (
          <CommentForm postId={post.id} />
        ) : (
          <p className="text-sm text-muted">
            <a href="/api/auth/signin" className="text-accent hover:underline">Sign in</a> to leave a comment.
          </p>
        )}
      </section>
    </article>
  );
}
