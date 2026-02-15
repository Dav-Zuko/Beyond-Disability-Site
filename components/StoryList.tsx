"use client";

/**
 * StoryList — interactive story listing with category filtering.
 *
 * This wraps the story cards and sidebar into one client component
 * so they can share the filter state. When you click a category
 * in the sidebar, the story list updates to show only matching stories.
 *
 * The design from Lovable shows:
 * - Left: list of story cards (with category badge, thumbnail, title, etc.)
 * - Right: category sidebar
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon, User, Calendar } from "lucide-react";
import StorySidebar from "./StorySidebar";
import type { Story } from "@/lib/types";

interface StoryListProps {
  stories: Story[];
}

// Category badge colors
function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Inspiration: "bg-gold text-navy",
    Resources: "bg-blue-100 text-blue-800",
    Tips: "bg-green-100 text-green-800",
    Community: "bg-purple-100 text-purple-800",
  };
  return colors[category] ?? "bg-gray-100 text-gray-800";
}

export default function StoryList({ stories }: StoryListProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStories =
    activeCategory === "All"
      ? stories
      : stories.filter(
          (s) => s.storyFields?.storyCategory === activeCategory
        );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
      {/* ── Story Cards (left column) ── */}
      <div className="space-y-6">
        {filteredStories.map((story) => {
          const image = story.featuredImage?.node;
          const category = story.storyFields?.storyCategory;
          const formattedDate = new Date(story.date).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          );

          return (
            <div
              key={story.slug}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
                {/* Thumbnail */}
                <div className="relative aspect-square bg-gray-200 md:aspect-auto">
                  {image ? (
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText || story.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[150px] items-center justify-center text-gray-400">
                      <ImageIcon size={32} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {category && (
                    <span
                      className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${getCategoryColor(category)}`}
                    >
                      {category}
                    </span>
                  )}

                  <h3 className="mt-2 font-serif text-lg font-bold text-gray-900">
                    {story.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    {story.storyFields?.storyAuthorName && (
                      <span className="flex items-center gap-1">
                        <User size={13} />
                        {story.storyFields.storyAuthorName}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {formattedDate}
                    </span>
                  </div>

                  {story.storyFields?.storyExcerpt && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {story.storyFields.storyExcerpt}
                    </p>
                  )}

                  <Link
                    href={`/stories/${story.slug}`}
                    className="mt-3 inline-block text-sm font-semibold text-navy hover:text-gold"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {filteredStories.length === 0 && (
          <p className="text-center text-gray-500">
            No stories found in this category.
          </p>
        )}
      </div>

      {/* ── Sidebar (right column) ── */}
      <aside>
        <StorySidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </aside>
    </div>
  );
}
