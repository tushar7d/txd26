"use client";

import { useState, useOptimistic } from "react";

export function LikeButton({
  postId,
  initialCount,
  initialLiked,
}: {
  postId: string;
  initialCount: number;
  initialLiked: boolean;
}) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);

  async function handleToggle() {
    setOptimisticLiked(!optimisticLiked);
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });
    const data = await res.json();
    setLiked(data.liked);
    setCount(data.count);
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
    >
      <svg
        className={`h-5 w-5 ${optimisticLiked ? "fill-red-500 text-red-500" : "fill-none"}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{count}</span>
    </button>
  );
}
