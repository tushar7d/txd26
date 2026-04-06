import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Timeline",
};

export default async function TimelinePage() {
  const entries = await db.timelineEntry.findMany({
    orderBy: [{ date: "desc" }, { sortOrder: "asc" }],
  });

  const grouped = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const year = new Date(entry.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
      {Object.keys(grouped).length === 0 && (
        <p className="text-muted">Nothing here yet.</p>
      )}
      <div className="space-y-10">
        {Object.entries(grouped).map(([year, items]) => (
          <section key={year} className="space-y-4">
            <h2 className="text-lg font-semibold text-muted">{year}</h2>
            <div className="space-y-3 border-l-2 border-border pl-6">
              {items.map((entry) => (
                <div key={entry.id} className="relative">
                  <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-border" />
                  <h3 className="font-medium">{entry.title}</h3>
                  {entry.body && (
                    <p className="mt-1 text-sm text-muted">{entry.body}</p>
                  )}
                  <time className="mt-1 block text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
