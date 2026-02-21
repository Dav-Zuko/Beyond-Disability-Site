/**
 * FeaturedStory — the highlighted story on the homepage.
 *
 * Layout: image on the left, title + excerpt + "Read Full Story" on the right.
 * This fetches data from WordPress — whichever story is most recent
 * (or marked as featured) will appear here.
 *
 * If no stories exist in WordPress yet, we show placeholder content
 * so the page doesn't break while you're setting up WordPress.
 */

import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import type { Story } from "@/lib/types";

interface FeaturedStoryProps {
  story: Story | null;
}

export default function FeaturedStory({ story }: FeaturedStoryProps) {
  // Fallback content shown when no stories exist in WordPress yet
  const title = story?.title ?? "Breaking Barriers: How Our Club Changed My College Experience";
  const excerpt =
    story?.storyFields?.storyExcerpt ??
    "Meet Sarah, a sophomore at GCSC who discovered a supportive community that helped her navigate campus resources and connect with life-changing opportunities. Her journey from uncertainty to empowerment showcases the impact of our club's mission.";
  const slug = story?.slug ?? "#";
  const image = story?.featuredImage?.node;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="font-serif text-3xl font-bold text-gray-900">
        Featured Story
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* ── Image (left side) ── */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
          {image ? (
            <Image
              src={image.sourceUrl}
              alt={image.altText || title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <ImageIcon size={48} />
            </div>
          )}
        </div>

        {/* ── Content (right side) ── */}
        <div className="flex flex-col justify-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
          </h3>
          <p className="mt-4 text-gray-600 leading-relaxed line-clamp-6">{excerpt}</p>
          <div className="mt-6">
            <Link
              href={`/stories/${slug}`}
              className="inline-block rounded-md border-2 border-navy px-6 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
