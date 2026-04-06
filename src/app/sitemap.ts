export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://tushardebnath.com";

  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const projects = await db.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/timeline`, lastModified: new Date() },
    { url: `${baseUrl}/guestbook`, lastModified: new Date() },
    ...posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
    })),
    ...projects.map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
