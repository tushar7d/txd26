import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProjectForm } from "@/components/admin/project-form";

type Params = Promise<{ id: string }>;

export default async function EditProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Project</h2>
      <ProjectForm project={project} />
    </div>
  );
}
