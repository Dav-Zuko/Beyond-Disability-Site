/**
 * About Page — /about
 *
 * Sections:
 * 1. Hero banner — "About Us"
 * 2. Values grid — 4 cards (Our Mission, Inclusion, Support, Empowerment)
 * 3. Leadership Team — fetched from WordPress Team Member CPT
 * 4. Join CTA — "Join Our Community" call-to-action
 *
 * The values are hardcoded because they rarely change.
 * Team members come from WordPress so the club can update them each year.
 */

import Link from "next/link";
import { Target, Users, Heart, Sparkles } from "lucide-react";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_TEAM_MEMBERS } from "@/lib/queries";
import type { TeamMember } from "@/lib/types";
import HeroBanner from "@/components/HeroBanner";
import ValueCard from "@/components/ValueCard";
import TeamMemberCard from "@/components/TeamMemberCard";

// ── Placeholder team members (shown until WordPress CPT is set up) ──
const placeholderMembers: TeamMember[] = [
  {
    title: "Alex Johnson",
    slug: "alex-johnson",
    featuredImage: null,
    teamMemberFields: {
      memberRole: "Club President",
      memberBio:
        "Senior majoring in Psychology, passionate about accessibility advocacy.",
    },
  },
  {
    title: "Maria Santos",
    slug: "maria-santos",
    featuredImage: null,
    teamMemberFields: {
      memberRole: "Vice President",
      memberBio:
        "Junior in Social Work, dedicated to community outreach and support.",
    },
  },
  {
    title: "Jordan Lee",
    slug: "jordan-lee",
    featuredImage: null,
    teamMemberFields: {
      memberRole: "Events Coordinator",
      memberBio:
        "Sophomore in Education, organizing workshops and awareness events.",
    },
  },
];

export default async function AboutPage() {
  // ── Fetch team members from WordPress ──
  let teamMembers: TeamMember[] = [];

  try {
    const data = await fetchGraphQL<{ teamMembers: { nodes: TeamMember[] } }>(
      GET_TEAM_MEMBERS
    );
    teamMembers = data.teamMembers.nodes;
  } catch {
    // WordPress CPT not set up yet — will show placeholders
  }

  const displayMembers =
    teamMembers.length > 0 ? teamMembers : placeholderMembers;

  return (
    <>
      {/* ── Hero Banner ── */}
      <HeroBanner
        title="About Us"
        subtitle="Learn more about our mission, values, and the dedicated team making a difference at Gulf Coast State College."
      />

      {/* ═══════════════════════════════════════════
          SECTION: VALUES GRID
          2×2 grid with gold icons
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ValueCard
            icon={<Target size={24} />}
            title="Our Mission"
            description="To empower students by connecting them with essential services, fostering skill development, and promoting active community engagement."
          />
          <ValueCard
            icon={<Users size={24} />}
            title="Inclusion"
            description="Creating an environment where every student can thrive, participate fully, and feel supported throughout their college journey."
          />
          <ValueCard
            icon={<Heart size={24} />}
            title="Support"
            description="Building a community of mutual support, understanding, and advocacy for students with diverse abilities."
          />
          <ValueCard
            icon={<Sparkles size={24} />}
            title="Empowerment"
            description="Helping students develop skills, confidence, and connections that extend beyond the classroom."
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION: LEADERSHIP TEAM
          ═══════════════════════════════════════════ */}
      <section className="bg-light-gray px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            Leadership Team
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {displayMembers.map((member) => (
              <TeamMemberCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION: JOIN CTA
          ═══════════════════════════════════════════ */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Join Our Community
          </h2>
          <p className="mt-4 text-gray-600">
            Whether you&apos;re a student looking for support, interested in
            advocacy, or want to connect with others, we welcome you to be part
            of our inclusive community.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-navy px-8 py-3 font-semibold text-white transition-colors hover:bg-navy-dark"
          >
            Join the Club
          </Link>
        </div>
      </section>
    </>
  );
}
