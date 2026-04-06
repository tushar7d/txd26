"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/generated/prisma/client";

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    content: project?.content ?? "",
    tags: project?.tags.join(", ") ?? "",
    role: project?.role ?? "",
    company: project?.company ?? "",
    year: project?.year ?? "",
    sortOrder: project?.sortOrder ?? 0,
    published: project?.published ?? false,
  });

  function update(field: string, value: string | boolean | number) {
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

    const url = project ? `/api/projects/${project.id}` : "/api/projects";
    const method = project ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    router.push("/admin/projects");
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
            if (!project) update("slug", autoSlug(e.target.value));
          }}
          className={inputClass}
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Slug</label>
        <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Role</label>
          <input type="text" value={form.role} onChange={(e) => update("role", e.target.value)} className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Company</label>
          <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Year</label>
          <input type="text" value={form.year} onChange={(e) => update("year", e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Description</label>
        <input type="text" value={form.description} onChange={(e) => update("description", e.target.value)} className={inputClass} />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Content (Markdown)</label>
        <textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={16} className={`${inputClass} font-mono`} required />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Tags (comma-separated)</label>
        <input type="text" value={form.tags} onChange={(e) => update("tags", e.target.value)} className={inputClass} />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Sort Order</label>
        <input type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", parseInt(e.target.value) || 0)} className={inputClass} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="rounded" />
        Published
      </label>
      <button type="submit" disabled={loading} className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-accent-foreground transition-opacity disabled:opacity-50">
        {project ? "Update" : "Create"} Project
      </button>
    </form>
  );
}
