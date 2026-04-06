import Link from "next/link";
import { db } from "@/lib/db";

export default async function Home() {
  const [posts, projects] = await Promise.all([
    db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { title: true, slug: true, excerpt: true, createdAt: true },
    }),
    db.project.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
      select: { title: true, slug: true, description: true, company: true, year: true },
    }),
  ]);

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Tushar Debnath</h1>
        <p className="text-lg text-muted">
          Designer &amp; developer crafting digital experiences. Currently building
          products that people love to use.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Writing</h2>
          <Link href="/blog" className="text-sm text-muted hover:text-foreground">
            View all &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-border p-4 transition-colors hover:bg-card"
            >
              <h3 className="font-medium">{post.title}</h3>
              {post.excerpt && (
                <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
              )}
              <time className="mt-2 block text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-muted">No posts yet.</p>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Selected Work</h2>
          <Link href="/work" className="text-sm text-muted hover:text-foreground">
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="rounded-lg border border-border p-4 transition-colors hover:bg-card"
            >
              <h3 className="font-medium">{project.title}</h3>
              {project.company && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.company} {project.year && `· ${project.year}`}
                </p>
              )}
              {project.description && (
                <p className="mt-2 text-sm text-muted">{project.description}</p>
              )}
            </Link>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-muted">No projects yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
