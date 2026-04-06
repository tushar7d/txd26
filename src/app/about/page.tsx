import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted">
        <p>
          Hi, I&apos;m Tushar Debnath — a designer and developer who loves building
          things for the web. I focus on creating intuitive, polished digital
          experiences that solve real problems.
        </p>
        <p>
          I&apos;ve worked across product design, frontend engineering, and
          everything in between. My work spans from early-stage startups to
          established companies, always with a focus on craft and user impact.
        </p>
        <p>
          When I&apos;m not designing or coding, you&apos;ll find me exploring
          music, reading, or experimenting with new tools and technologies.
        </p>
      </div>
    </div>
  );
}
