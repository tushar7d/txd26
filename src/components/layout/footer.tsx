import Link from "next/link";

const socials = [
  { href: "https://github.com/tushar7d", label: "GitHub" },
  { href: "https://linkedin.com/in/tushardebnath", label: "LinkedIn" },
  { href: "https://dribbble.com/tushar7d", label: "Dribbble" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Tushar Debnath</p>
        <ul className="flex gap-4">
          {socials.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
