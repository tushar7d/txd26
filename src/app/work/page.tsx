import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Work</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="rounded-lg border border-border p-5 transition-colors hover:bg-card"
          >
            <h2 className="font-medium">{project.title}</h2>
            {project.company && (
              <p className="mt-1 text-xs text-muted-foreground">
                {project.company} {project.year && `· ${project.year}`}
              </p>
            )}
            {project.description && (
              <p className="mt-2 text-sm text-muted">{project.description}</p>
            )}
            {project.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-card px-2 py-0.5 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="text-muted">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
