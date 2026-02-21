/**
 * Homepage — the main landing page.
 *
 * This is a SERVER COMPONENT that fetches data at build time (SSG)
 * and re-fetches when revalidation is triggered (ISR).
 *
 * CACHING STRATEGY:
 * - Each fetch call includes cache tags (e.g., ["stories"])
 * - When WordPress content changes, the webhook hits /api/revalidate
 * - That calls revalidateTag("stories"), which rebuilds THIS page
 * - Fallback: time-based revalidation every 60 seconds
 *
 * Sections (matching the Lovable design):
 * 1. Hero — dark navy with club name and mission
 * 2. Featured Story — highlighted student story
 * 3. Quick Access Resources — 3 resource cards with gold icons
 * 4. Recent Stories — 3-card grid of latest stories
 * 5. Upcoming Events — stacked event cards
 */

import { fetchGraphQL } from "@/lib/graphql";
import { GET_FEATURED_STORY, GET_RECENT_STORIES, GET_ALL_EVENTS } from "@/lib/queries";
import type { Story, Event } from "@/lib/types";
import FeaturedStory from "@/components/FeaturedStory";
import StoryCard from "@/components/StoryCard";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import ResourceCard from "@/components/ResourceCard";

// ── Placeholder data (shown until WordPress CPTs are set up) ──

const placeholderStories: Story[] = [
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
        "Discover how our peer mentorship program helps students build independence and succeed academically.",
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
      storyCategory: "Inspiration",
      storyAuthorName: "Jessica Chen",
      storyExcerpt:
        "Learn how club members are making an impact by raising awareness and promoting inclusion on campus.",
      storyFeatured: false,
    },
  },
];

const placeholderEvents: Event[] = [
  {
    title: "Monthly Club Meeting",
    slug: "monthly-meeting",
    eventFields: {
      eventDate: "March 25, 2025",
      eventStartTime: "5:00 PM",
      eventEndTime: "6:30 PM",
      eventLocation: "Student Center, Room 204",
      eventDescription:
        "Join us for our regular meeting to discuss upcoming initiatives and connect with fellow members.",
    },
  },
  {
    title: "Accessibility Workshop",
    slug: "accessibility-workshop",
    eventFields: {
      eventDate: "April 2, 2025",
      eventStartTime: "3:00 PM",
      eventEndTime: "5:00 PM",
      eventLocation: "Library Conference Room",
      eventDescription:
        "Learn about assistive technologies and resources available to students on campus.",
    },
  },
  {
    title: "Community Awareness Day",
    slug: "community-awareness-day",
    eventFields: {
      eventDate: "April 15, 2025",
      eventStartTime: "10:00 AM",
      eventEndTime: "2:00 PM",
      eventLocation: "Campus Quad",
      eventDescription:
        "Join us for an outdoor event promoting disability awareness and inclusion in our community.",
    },
  },
];

export default async function HomePage() {
  let featuredStory: Story | null = null;
  let recentStories: Story[] = [];
  let events: Event[] = [];

  try {
    const storyData = await fetchGraphQL<{ allStory: { nodes: Story[] } }>(
      GET_FEATURED_STORY
    );
    featuredStory = storyData.allStory.nodes[0] ?? null;
  } catch {
    // WordPress CPT not set up yet — will show placeholder
  }

  try {
    const storiesData = await fetchGraphQL<{ allStory: { nodes: Story[] } }>(
      GET_RECENT_STORIES
    );
    recentStories = storiesData.allStory.nodes;
  } catch {
    // WordPress CPT not set up yet — will show placeholders
  }

  try {
    const eventsData = await fetchGraphQL<{ events: { nodes: Event[] } }>(
      GET_ALL_EVENTS
    );
    events = eventsData.events.nodes;
  } catch {
    // WordPress CPT not set up yet — will show placeholders
  }

  const displayStories = recentStories.length > 0 ? recentStories : placeholderStories;
  const displayEvents = events.length > 0 ? events : placeholderEvents;

  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════ */}
      <section className="bg-navy px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-bold md:text-6xl">
            Beyond Disability Club
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-gold" />
          <p className="mt-8 text-lg leading-relaxed text-gray-300">
            The Beyond Disability Club empowers students by connecting them with
            essential services, fostering skill development, and promoting
            active community engagement. Our mission is to create an inclusive
            environment where every student can thrive, participate fully, and
            feel supported both in college and beyond.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: FEATURED STORY
          ═══════════════════════════════════════════ */}
      <FeaturedStory story={featuredStory} />

      {/* ═══════════════════════════════════════════
          SECTION 3: QUICK ACCESS RESOURCES
          ═══════════════════════════════════════════ */}
      <section className="bg-light-gray px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            Quick Access Resources
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link href="/resources">
              <ResourceCard
                title="Student Accessibility Resources"
                description="On-campus support services for students with disabilities"
                iconType="accessibility"
              />
            </Link>
            <Link href="/resources">
              <ResourceCard
                title="Disability Resource Center"
                description="Local community resources and advocacy services"
                iconType="document"
              />
            </Link>
            <Link href="/resources">
              <ResourceCard
                title="Vocational Rehabilitation"
                description="Statewide employment and career development programs"
                iconType="building"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: RECENT STORIES
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Recent Stories
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: UPCOMING EVENTS
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Upcoming Events
        </h2>
        <div className="mt-8 space-y-6">
          {displayEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}
