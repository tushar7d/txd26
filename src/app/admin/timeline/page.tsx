import { db } from "@/lib/db";
import { TimelineForm } from "@/components/admin/timeline-form";
import { DeleteButton } from "@/components/ui/delete-button";

export default async function AdminTimelinePage() {
  const entries = await db.timelineEntry.findMany({
    orderBy: [{ date: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Timeline</h2>
      <TimelineForm />
      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div>
              <p className="font-medium">{entry.title}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <time>{new Date(entry.date).toLocaleDateString()}</time>
                {entry.category && (
                  <>
                    <span>·</span>
                    <span>{entry.category}</span>
                  </>
                )}
              </div>
            </div>
            <DeleteButton id={entry.id} resource="timeline" />
          </div>
        ))}
      </div>
    </div>
  );
}
