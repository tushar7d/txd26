import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({ where: { slug }, select: { title: true, description: true } });
  if (!project) return {};
  return { title: project.title, description: project.description ?? undefined };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug, published: true },
  });

  if (!project) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted">
          {project.role && <span>{project.role}</span>}
          {project.company && (
            <>
              {project.role && <span>·</span>}
              <span>{project.company}</span>
            </>
          )}
          {project.year && (
            <>
              <span>·</span>
              <span>{project.year}</span>
            </>
          )}
        </div>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-card px-2 py-0.5 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{project.content}</Markdown>
      </div>
    </article>
  );
}
