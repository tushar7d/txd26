import Link from "next/link";
import { db } from "@/lib/db";
import { DeleteButton } from "@/components/ui/delete-button";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, title: true, slug: true, published: true, company: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          New Project
        </Link>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div>
              <Link href={`/admin/projects/${project.id}/edit`} className="font-medium hover:underline">
                {project.title}
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className={project.published ? "text-green-500" : "text-yellow-500"}>
                  {project.published ? "Published" : "Draft"}
                </span>
                {project.company && (
                  <>
                    <span>·</span>
                    <span>{project.company}</span>
                  </>
                )}
              </div>
            </div>
            <DeleteButton id={project.id} resource="projects" />
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-muted">No projects yet.</p>}
      </div>
    </div>
  );
}
