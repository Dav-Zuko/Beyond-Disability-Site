/**
 * TeamMemberCard — displays a team member on the About page.
 *
 * Shows a circular photo (or placeholder), name, role (in gold),
 * and a short bio. Data comes from the Team Member CPT in WordPress.
 */

import Image from "next/image";
import { User } from "lucide-react";
import type { TeamMember } from "@/lib/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const image = member.featuredImage?.node;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
      {/* ── Circular Photo ── */}
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-gray-200">
        {image ? (
          <Image
            src={image.sourceUrl}
            alt={image.altText || member.title}
            width={112}
            height={112}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <User size={40} />
          </div>
        )}
      </div>

      {/* ── Name & Role ── */}
      <h3 className="mt-4 font-serif text-lg font-bold text-gray-900">
        {member.title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-gold-dark">
        {member.teamMemberFields?.memberRole}
      </p>

      {/* ── Bio ── */}
      <p className="mt-3 text-sm text-gray-600">
        {member.teamMemberFields?.memberBio}
      </p>
    </div>
  );
}
