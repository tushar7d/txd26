import { requireAdmin } from "@/lib/auth-helpers";
import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/timeline", label: "Timeline" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-lg font-semibold">Admin</h1>
        <nav className="flex gap-4 text-sm">
          {adminLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-muted hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
