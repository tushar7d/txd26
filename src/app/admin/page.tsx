import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [postCount, projectCount, commentCount, guestbookCount] = await Promise.all([
    db.post.count(),
    db.project.count(),
    db.comment.count(),
    db.guestbookEntry.count(),
  ]);

  const stats = [
    { label: "Posts", count: postCount },
    { label: "Projects", count: projectCount },
    { label: "Comments", count: commentCount },
    { label: "Guestbook", count: guestbookCount },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {stats.map(({ label, count }) => (
        <div key={label} className="rounded-lg border border-border p-5">
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-1 text-2xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
}
