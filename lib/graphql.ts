/**
 * GraphQL fetch utility for WPGraphQL.
 *
 * This function sends a POST request to your WordPress GraphQL endpoint.
 * It's used by every page that needs WordPress data (stories, events, etc.).
 *
 * The `variables` parameter lets you pass dynamic values into queries
 * (e.g., a story slug to fetch a specific story).
 *
 * Next.js server components call this at build/request time — the browser
 * never sees your GraphQL URL directly, which is a nice security benefit
 * of the App Router's server-component model.
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
    next: { revalidate: 60 }, // revalidate cached data every 60 seconds
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
