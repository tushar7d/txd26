"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TimelineForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
    date: "",
    category: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.date) return;
    setLoading(true);
    await fetch("/api/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", body: "", date: "", category: "" });
    setLoading(false);
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-border p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} required />
        <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} required />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="text" placeholder="Body (optional)" value={form.body} onChange={(e) => update("body", e.target.value)} className={inputClass} />
        <input type="text" placeholder="Category (work, education...)" value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass} />
      </div>
      <button type="submit" disabled={loading} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity disabled:opacity-50">
        Add Entry
      </button>
    </form>
  );
}
