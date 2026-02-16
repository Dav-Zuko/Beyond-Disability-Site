/**
 * GraphQL fetch utility for WPGraphQL — with ISR caching.
 *
 * HOW CACHING/REVALIDATION WORKS:
 *
 * 1. SSG (Static Site Generation):
 *    Pages are pre-built into static HTML at build time.
 *    Search engines can crawl them immediately → great for SEO.
 *
 * 2. ISR (Incremental Static Regeneration) — TWO layers:
 *
 *    a) TIME-BASED (fallback): `revalidate: 60` means after 60 seconds,
 *       the next visitor triggers a background page rebuild. Worst case,
 *       content is 60 seconds stale. This is the safety net.
 *
 *    b) ON-DEMAND (primary): When you publish/edit/delete content in
 *       WordPress, a webhook hits /api/revalidate which calls
 *       revalidatePath(). This INSTANTLY rebuilds the affected pages.
 *
 * The combination means:
 * - Publish a new story → webhook fires → page rebuilds INSTANTLY
 * - If the webhook fails → time-based catches it within 60 seconds
 * - Delete a story → webhook fires → page rebuilds with it gone
 * - Search engines always see fully rendered static HTML
 */

const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL!;

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 60, // Time-based ISR: rebuild every 60 seconds as fallback
    },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message ?? "Unknown GraphQL error");
  }

  return json.data as T;
}
