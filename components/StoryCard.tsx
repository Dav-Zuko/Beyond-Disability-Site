/**
 * StoryCard — a card displaying a story preview.
 *
 * Used in:
 * - Homepage "Recent Stories" section (3-card grid)
 * - Stories listing page
 *
 * Shows: featured image, title, author, date, and excerpt.
 * The entire card is clickable and links to the full story.
 */

import Image from "next/image";
import Link from "next/link";
import { ImageIcon, User, Calendar } from "lucide-react";
import type { Story } from "@/lib/types";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const image = story.featuredImage?.node;

  // Format the date from WordPress (comes as ISO string like "2025-03-15T00:00:00")
  const formattedDate = new Date(story.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/10] bg-gray-200">
        {image ? (
          <Image
            src={image.sourceUrl}
            alt={image.altText || story.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <ImageIcon size={32} />
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-navy">
          {story.title}
        </h3>

        {/* Author & Date */}
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {story.storyFields?.storyAuthorName && (
            <span className="flex items-center gap-1">
              <User size={14} />
              {story.storyFields.storyAuthorName}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formattedDate}
          </span>
        </div>

        {/* Excerpt */}
        {story.storyFields?.storyExcerpt && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {story.storyFields.storyExcerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
