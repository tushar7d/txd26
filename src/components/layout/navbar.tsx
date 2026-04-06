"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          txd
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-5 text-sm sm:flex">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition-colors hover:text-foreground ${
                    pathname === href
                      ? "text-foreground"
                      : "text-muted"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
