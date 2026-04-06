"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ id, resource }: { id: string; resource: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-destructive hover:underline"
    >
      Delete
    </button>
  );
}
