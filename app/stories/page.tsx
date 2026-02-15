/**
 * Stories Listing Page — /stories
 *
 * Shows all student stories with a category sidebar.
 * Data is fetched on the server and passed to the StoryList
 * client component for interactive category filtering.
 */

import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_STORIES } from "@/lib/queries";
import type { Story } from "@/lib/types";
import HeroBanner from "@/components/HeroBanner";
import StoryList from "@/components/StoryList";

// ── Placeholder stories ──
const placeholderStories: Story[] = [
  {
    title: "Breaking Barriers: How Our Club Changed My College Experience",
    slug: "breaking-barriers",
    date: "2025-03-18T00:00:00",
    content: "",
    featuredImage: null,
    storyFields: {
      storyCategory: "Inspiration",
      storyAuthorName: "Sarah Martinez",
      storyExcerpt:
        "When I first arrived at GCSC, I felt overwhelmed by the challenges ahead. Finding the Beyond Disability Club was a turning point in my college journey...",
      storyFeatured: true,
    },
  },
  {
    title: "Navigating Campus Life with Confidence",
    slug: "navigating-campus-life",
    date: "2025-03-15T00:00:00",
    content: "",
    featuredImage: null,
    storyFields: {
      storyCategory: "Tips",
      storyAuthorName: "Emily Rodriguez",
      storyExcerpt:
        "The peer mentorship program helped me build independence and succeed academically. Here's how connecting with other students made all the difference...",
      storyFeatured: false,
    },
  },
  {
    title: "Technology Tools That Make a Difference",
    slug: "technology-tools",
    date: "2025-03-10T00:00:00",
    content: "",
    featuredImage: null,
    storyFields: {
      storyCategory: "Resources",
      storyAuthorName: "Marcus Thompson",
      storyExcerpt:
        "Explore the assistive technologies available to students and how they enhance learning experiences.",
      storyFeatured: false,
    },
  },
  {
    title: "From Student to Advocate",
    slug: "student-to-advocate",
    date: "2025-03-05T00:00:00",
    content: "",
    featuredImage: null,
    storyFields: {
      storyCategory: "Community",
      storyAuthorName: "Jessica Chen",
      storyExcerpt:
        "Learn how club members are making an impact by raising awareness and promoting inclusion on campus.",
      storyFeatured: false,
    },
  },
];

export default async function StoriesPage() {
  let stories: Story[] = [];

  try {
    const data = await fetchGraphQL<{ allStory: { nodes: Story[] } }>(
      GET_ALL_STORIES
    );
    stories = data.allStory.nodes;
  } catch {
    // WordPress CPT not set up yet — will show placeholders
  }

  const displayStories = stories.length > 0 ? stories : placeholderStories;

  return (
    <>
      <HeroBanner
        title="Student Stories"
        subtitle="Real experiences from our community members sharing their journeys and insights."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <StoryList stories={displayStories} />
      </section>
    </>
  );
}
