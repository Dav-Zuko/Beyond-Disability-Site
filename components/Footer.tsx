/**
 * Footer component — appears at the bottom of every page.
 *
 * This is a server component (no "use client" needed) because it has
 * no interactivity — it's just static HTML. Server components are
 * faster because they don't send JavaScript to the browser.
 *
 * Layout from the Lovable design:
 * - 3 columns: Club Info | Contact | Follow Us
 * - Dark navy background with copyright bar at bottom
 */

import Link from "next/link";
import { Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* ── Column 1: Club Info ── */}
          <div>
            <h3 className="font-serif text-lg font-bold">
              Beyond Disability Club
            </h3>
            <p className="mt-3 text-sm text-gray-300">Gulf Coast State College</p>
            <p className="text-sm text-gray-300">Panama City, FL</p>
          </div>

          {/* ── Column 2: Contact ── */}
          <div>
            <h3 className="font-serif text-lg font-bold">Contact</h3>
            <a
              href="mailto:info@beyonddisability.club"
              className="mt-3 flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-gold"
            >
              <Mail size={16} />
              info@beyonddisability.club
            </a>
          </div>

          {/* ── Column 3: Social Links ── */}
          <div>
            <h3 className="font-serif text-lg font-bold">Follow Us</h3>
            <div className="mt-3 flex gap-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-gray-300 transition-colors hover:text-gold"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-300 transition-colors hover:text-gold"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-gray-300 transition-colors hover:text-gold"
              >
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="border-t border-navy-light py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Beyond Disability Club. All rights
        reserved.
      </div>
    </footer>
  );
}
