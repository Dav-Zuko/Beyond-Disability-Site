/**
 * Resources Page — /resources
 *
 * Sections:
 * 1. Hero banner — "Resources Directory"
 * 2. Filter tabs + resource cards grid
 *
 * Resources are fetched from WordPress on the server, then passed
 * to the ResourceFilter client component for interactive filtering.
 *
 * This is a great example of the "server fetch + client interactivity"
 * pattern in Next.js App Router:
 * - Server: fetches data (fast, no client JS needed)
 * - Client: handles tab switching (needs useState)
 */

import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_RESOURCES } from "@/lib/queries";
import type { Resource } from "@/lib/types";
import HeroBanner from "@/components/HeroBanner";
import ResourceFilter from "@/components/ResourceFilter";

// ── Placeholder resources (shown until WordPress CPT is set up) ──
const placeholderResources: Resource[] = [
  {
    title: "GCSC Student Accessibility Services",
    slug: "gcsc-accessibility",
    resourceFields: {
      resourceDescription:
        "On-campus support including accommodations, assistive technology, and academic support.",
      resourceUrl: "#",
      resourceCategory: "On-Campus",
      resourceIcon: "accessibility",
    },
  },
  {
    title: "Academic Support Center",
    slug: "academic-support",
    resourceFields: {
      resourceDescription:
        "Tutoring, study skills workshops, and academic coaching for all students.",
      resourceUrl: "#",
      resourceCategory: "On-Campus",
      resourceIcon: "accessibility",
    },
  },
  {
    title: "Bay County Disability Resource Center",
    slug: "bay-county-drc",
    resourceFields: {
      resourceDescription:
        "Local advocacy, information, and referral services for individuals with disabilities.",
      resourceUrl: "#",
      resourceCategory: "Community",
      resourceIcon: "document",
    },
  },
  {
    title: "ARC of the Bay",
    slug: "arc-of-bay",
    resourceFields: {
      resourceDescription:
        "Community-based services supporting individuals with developmental disabilities.",
      resourceUrl: "#",
      resourceCategory: "Community",
      resourceIcon: "heart",
    },
  },
  {
    title: "Division of Vocational Rehabilitation",
    slug: "dvr",
    resourceFields: {
      resourceDescription:
        "Statewide employment services, job training, and career development programs.",
      resourceUrl: "#",
      resourceCategory: "Vocational",
      resourceIcon: "building",
    },
  },
  {
    title: "CareerSource Gulf Coast",
    slug: "careersource",
    resourceFields: {
      resourceDescription:
        "Job placement assistance, resume help, and career counseling services.",
      resourceUrl: "#",
      resourceCategory: "Vocational",
      resourceIcon: "career",
    },
  },
];

export default async function ResourcesPage() {
  let resources: Resource[] = [];

  try {
    const data = await fetchGraphQL<{ resources: { nodes: Resource[] } }>(
      GET_ALL_RESOURCES
    );
    resources = data.resources.nodes;
  } catch {
    // WordPress CPT not set up yet — will show placeholders
  }

  const displayResources =
    resources.length > 0 ? resources : placeholderResources;

  return (
    <>
      <HeroBanner
        title="Resources Directory"
        subtitle="Discover services and support available to students and community members."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <ResourceFilter resources={displayResources} />
      </section>
    </>
  );
}
