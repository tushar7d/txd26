"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/generated/prisma/client";

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    tags: post?.tags.join(", ") ?? "",
    published: post?.published ?? false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = post ? `/api/posts/${post.id}` : "/api/posts";
    const method = post ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    router.push("/admin/posts");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => {
            update("title", e.target.value);
            if (!post) update("slug", autoSlug(e.target.value));
          }}
          className={inputClass}
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Slug</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Excerpt</label>
        <input
          type="text"
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Content (Markdown)</label>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={16}
          className={`${inputClass} font-mono`}
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Tags (comma-separated)</label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          className={inputClass}
          placeholder="design, code, music"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="rounded"
        />
        Published
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-accent-foreground transition-opacity disabled:opacity-50"
      >
        {post ? "Update" : "Create"} Post
      </button>
    </form>
  );
}
