import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Blog posts (migrated from old MDX content)
  const posts = [
    {
      title: "MIDI",
      slug: "midi",
      excerpt: "Exploring the world of MIDI and music technology.",
      content: `# MIDI

This post is about MIDI — the Musical Instrument Digital Interface. A protocol that has shaped how we create and perform music for decades.

*Content migrated from the original site. Edit this post in the admin panel to update.*`,
      tags: ["music", "technology"],
      published: true,
    },
    {
      title: "One",
      slug: "one",
      excerpt: "Thoughts and reflections.",
      content: `# One

A reflection on design, creativity, and the pursuit of simplicity.

*Content migrated from the original site. Edit this post in the admin panel to update.*`,
      tags: ["design", "thoughts"],
      published: true,
    },
    {
      title: "Pyramid",
      slug: "pyramid",
      excerpt: "On building things that last.",
      content: `# Pyramid

Thoughts on building systems and designs that stand the test of time.

*Content migrated from the original site. Edit this post in the admin panel to update.*`,
      tags: ["design", "systems"],
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`  Post: ${post.title}`);
  }

  // Portfolio projects (migrated from old MDX content)
  const projects = [
    {
      title: "Building Snap",
      slug: "building-snap",
      description: "Designing and building the Snap experience.",
      content: "Case study about building Snap.\n\n*Content migrated from the original site. Edit in admin to update.*",
      tags: ["design", "product"],
      company: "Snap",
      published: true,
      sortOrder: 0,
    },
    {
      title: "Zomato",
      slug: "zomato",
      description: "Product design work at Zomato.",
      content: "Case study about product design at Zomato.\n\n*Content migrated from the original site. Edit in admin to update.*",
      tags: ["design", "product"],
      company: "Zomato",
      published: true,
      sortOrder: 1,
    },
    {
      title: "Expedia",
      slug: "expedia",
      description: "Design work at Expedia.",
      content: "Case study about design at Expedia.\n\n*Content migrated from the original site. Edit in admin to update.*",
      tags: ["design", "travel"],
      company: "Expedia",
      published: true,
      sortOrder: 2,
    },
    {
      title: "Wealth Pro",
      slug: "wealth-pro",
      description: "Fintech product design.",
      content: "Case study about Wealth Pro.\n\n*Content migrated from the original site. Edit in admin to update.*",
      tags: ["design", "fintech"],
      published: true,
      sortOrder: 3,
    },
    {
      title: "Expansion India",
      slug: "expansion-india",
      description: "Expanding product reach in India.",
      content: "Case study about expansion into India.\n\n*Content migrated from the original site. Edit in admin to update.*",
      tags: ["product", "growth"],
      published: true,
      sortOrder: 4,
    },
    {
      title: "Partner App",
      slug: "partner-app",
      description: "Building the partner application.",
      content: "Case study about the partner app.\n\n*Content migrated from the original site. Edit in admin to update.*",
      tags: ["design", "product"],
      published: true,
      sortOrder: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log(`  Project: ${project.title}`);
  }

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
