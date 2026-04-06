import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">New Project</h2>
      <ProjectForm />
    </div>
  );
}
