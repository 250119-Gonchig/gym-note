"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/workout", label: "Workout" },
  { href: "/progress", label: "Progress" },
  { href: "/profile", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl px-6 py-4 flex justify-between text-sm backdrop-blur-md shadow-2xl">
      {LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? "text-red-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
