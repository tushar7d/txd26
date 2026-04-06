import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-helpers";
import { GuestbookForm } from "@/components/guestbook/guestbook-form";

export const metadata: Metadata = {
  title: "Guestbook",
};

export default async function GuestbookPage() {
  const [entries, user] = await Promise.all([
    db.guestbookEntry.findMany({
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: "desc" },
    }),
    getCurrentUser(),
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Guestbook</h1>
        <p className="text-muted">Leave a message! Say hi, share a thought, or just sign your name.</p>
      </div>

      {user ? (
        <GuestbookForm />
      ) : (
        <p className="text-sm text-muted">
          <a href="/api/auth/signin" className="text-accent hover:underline">Sign in</a> to leave a message.
        </p>
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-lg border border-border p-4">
            <p className="text-sm">{entry.body}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-muted">{entry.user.name ?? "Anonymous"}</span>
              <span>·</span>
              <time>
                {new Date(entry.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-sm text-muted">No messages yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
