"use client";

import { useRouter } from "next/navigation";

type Comment = {
  id: string;
  body: string;
  createdAt: Date;
  user: { name: string | null; image: string | null; id: string };
};

export function CommentList({
  comments,
  currentUserId,
}: {
  comments: Comment[];
  currentUserId?: string;
}) {
  const router = useRouter();

  async function handleDelete(id: string) {
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (comments.length === 0) {
    return <p className="text-sm text-muted">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-lg border border-border p-4">
          <p className="text-sm">{comment.body}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-muted">
                {comment.user.name ?? "Anonymous"}
              </span>
              <span>·</span>
              <time>
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            {currentUserId === comment.user.id && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-xs text-destructive hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
