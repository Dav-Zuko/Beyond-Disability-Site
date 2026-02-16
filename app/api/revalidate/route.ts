/**
 * On-Demand Revalidation API Route — /api/revalidate
 *
 * HOW THIS WORKS:
 *
 * 1. You install a webhook plugin in WordPress (like "WP Webhooks").
 *
 * 2. When you publish/update/delete content, WordPress sends a POST to:
 *    https://beyonddisabilityclub.com/api/revalidate?secret=YOUR_SECRET&tag=stories
 *
 * 3. This route validates the secret, then calls revalidatePath() to
 *    rebuild the affected pages with fresh data from WordPress.
 *
 * 4. The next visitor sees the updated content immediately.
 *
 * WHY revalidatePath instead of revalidateTag:
 * Next.js 16 changed the revalidateTag API. revalidatePath is simpler —
 * it directly says "rebuild this page." We map each content type to
 * the pages it affects:
 *
 * - "stories"   → rebuilds / (homepage) and /stories
 * - "events"    → rebuilds / (homepage)
 * - "resources" → rebuilds /resources
 * - "team"      → rebuilds /about
 * - "all"       → rebuilds everything
 *
 * EXAMPLE WEBHOOK URLS to configure in WordPress:
 * - Story changed:    POST https://beyonddisabilityclub.com/api/revalidate?secret=xxx&tag=stories
 * - Event changed:    POST https://beyonddisabilityclub.com/api/revalidate?secret=xxx&tag=events
 * - Resource changed: POST https://beyonddisabilityclub.com/api/revalidate?secret=xxx&tag=resources
 * - Team changed:     POST https://beyonddisabilityclub.com/api/revalidate?secret=xxx&tag=team
 * - Everything:       POST https://beyonddisabilityclub.com/api/revalidate?secret=xxx&tag=all
 */

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Maps content types to the pages they affect
const TAG_TO_PATHS: Record<string, string[]> = {
  stories: ["/", "/stories"],
  events: ["/"],
  resources: ["/resources"],
  team: ["/about"],
};

const VALID_TAGS = ["stories", "events", "resources", "team", "all"];

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");

  // ── Security check ──
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // ── Validate the tag ──
  if (!tag || !VALID_TAGS.includes(tag)) {
    return NextResponse.json(
      { message: `Invalid tag. Use one of: ${VALID_TAGS.join(", ")}` },
      { status: 400 }
    );
  }

  // ── Revalidate affected paths ──
  const revalidatedPaths: string[] = [];

  if (tag === "all") {
    // Nuclear option: rebuild the entire site layout (affects all pages)
    revalidatePath("/", "layout");
    revalidatedPaths.push("/ (layout — all pages)");
  } else {
    const paths = TAG_TO_PATHS[tag] ?? [];
    for (const path of paths) {
      revalidatePath(path);
      revalidatedPaths.push(path);
    }
  }

  return NextResponse.json({
    revalidated: true,
    tag,
    paths: revalidatedPaths,
    now: Date.now(),
  });
}

// Support GET requests for easy testing in the browser
export async function GET(request: NextRequest) {
  return POST(request);
}
