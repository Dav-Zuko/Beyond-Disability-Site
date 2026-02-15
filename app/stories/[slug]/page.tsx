/**
 * Individual Story Page — /stories/[slug]
 *
 * DYNAMIC ROUTE: The [slug] in the folder name is a URL parameter.
 * When someone visits /stories/breaking-barriers, Next.js passes
 * { slug: "breaking-barriers" } to this component via the `params` prop.
 *
 * We use that slug to query WordPress for the specific story.
 *
 * Layout (matching Lovable design):
 * - "← Back to Stories" link + category badge
 * - Large title
 * - Author + date
 * - Featured image
 * - Full story content (HTML from WordPress)
 * - "← Read More Stories" link at bottom
 */

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, User, Calendar, ImageIcon } from "lucide-react";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_STORY_BY_SLUG } from "@/lib/queries";
import type { Story } from "@/lib/types";

// Category badge colors (same as StoryList)
function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Inspiration: "bg-gold text-navy",
    Resources: "bg-blue-100 text-blue-800",
    Tips: "bg-green-100 text-green-800",
    Community: "bg-purple-100 text-purple-800",
  };
  return colors[category] ?? "bg-gray-100 text-gray-800";
}

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;

  let story: Story | null = null;

  try {
    const data = await fetchGraphQL<{ story: Story | null }>(
      GET_STORY_BY_SLUG,
      { slug }
    );
    story = data.story;
  } catch {
    // Story not found or WordPress CPT not set up yet
  }

  // If no story found, show Next.js 404 page
  if (!story) {
    notFound();
  }

  const category = story.storyFields?.storyCategory;
  const image = story.featuredImage?.node;
  const formattedDate = new Date(story.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* ── Back Link + Category Badge ── */}
      <div className="flex items-center gap-3">
        <Link
          href="/stories"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-navy"
        >
          <ArrowLeft size={16} />
          Back to Stories
        </Link>
        {category && (
          <span
            className={`rounded px-2.5 py-1 text-xs font-semibold ${getCategoryColor(category)}`}
          >
            {category}
          </span>
        )}
      </div>

      {/* ── Title ── */}
      <h1 className="mt-6 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
        {story.title}
      </h1>

      {/* ── Author & Date ── */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {story.storyFields?.storyAuthorName && (
          <span className="flex items-center gap-1.5">
            <User size={15} />
            {story.storyFields.storyAuthorName}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar size={15} />
          {formattedDate}
        </span>
      </div>

      {/* ── Divider ── */}
      <hr className="mt-6 border-gray-200" />

      {/* ── Featured Image ── */}
      <div className="relative mt-8 aspect-video overflow-hidden rounded-lg bg-gray-200">
        {image ? (
          <Image
            src={image.sourceUrl}
            alt={image.altText || story.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <ImageIcon size={48} />
          </div>
        )}
      </div>

      {/* ── Story Content ──
          dangerouslySetInnerHTML renders the raw HTML from WordPress.
          This is safe because the content comes from YOUR WordPress admin
          (not user-generated input). The "wp-content" class applies our
          prose styles from globals.css.
      */}
      <div
        className="wp-content mt-8"
        dangerouslySetInnerHTML={{ __html: story.content }}
      />

      {/* ── Divider ── */}
      <hr className="mt-10 border-gray-200" />

      {/* ── Back to Stories Link ── */}
      <div className="mt-6">
        <Link
          href="/stories"
          className="flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-navy hover:text-navy"
        >
          <ArrowLeft size={16} />
          Read More Stories
        </Link>
      </div>
    </article>
  );
}
