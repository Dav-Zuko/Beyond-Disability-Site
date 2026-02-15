"use client";

/**
 * Header component — the sticky navigation bar.
 *
 * "use client" is needed because we use useState for the mobile
 * menu toggle. In Next.js App Router, components are server components
 * by default (they render on the server). But if a component needs
 * interactivity (click handlers, state), it must be a client component.
 *
 * The header matches the Lovable design:
 * - Dark navy background
 * - Logo + site name on the left
 * - Nav links in the center/right
 * - Gold-outlined "Join the Club" CTA button
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ── Logo & Site Name ── */}
        <Link href="/" className="flex items-center gap-3">
          {/* Placeholder circle for logo — replace with actual logo later */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy font-bold text-sm">
            BDC
          </div>
          <span className="text-xl font-bold text-white">
            Beyond Disability Club
          </span>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md border-2 border-gold px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            Join the Club
          </Link>
        </nav>

        {/* ── Mobile Menu Button ── */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Navigation Dropdown ── */}
      {mobileMenuOpen && (
        <nav className="border-t border-navy-light bg-navy px-6 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 block rounded-md border-2 border-gold px-5 py-2 text-center text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            Join the Club
          </Link>
        </nav>
      )}
    </header>
  );
}
