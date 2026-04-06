"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function GuestbookForm() {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);
    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    setBody("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Leave a message..."
        className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
      />
      <button
        type="submit"
        disabled={loading || !body.trim()}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity disabled:opacity-50"
      >
        Sign
      </button>
    </form>
  );
}
