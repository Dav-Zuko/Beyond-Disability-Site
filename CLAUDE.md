# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server at http://localhost:3000
npm run build    # Production build (runs TypeScript + Next.js compiler)
npm run start    # Serve the production build locally
npm run lint     # Run ESLint
```

There are no tests in this project.

## Environment Variables

Create a `.env.local` file with:

```
WORDPRESS_GRAPHQL_URL=https://wp.beyonddisabilityclub.com/graphql
REVALIDATION_SECRET=<secret>
CF7_FORM_ID=<contact-form-7-form-id>
GOOGLE_CALENDAR_ID=<google-calendar-id>
GOOGLE_CALENDAR_API_KEY=<google-calendar-api-key>
```

## Architecture

This is a **Next.js 16 App Router** site — a headless frontend for a **WordPress + WPGraphQL** backend at `wp.beyonddisabilityclub.com`.

### Data Flow

All content (stories, events, resources, team members) lives in WordPress as Custom Post Types with ACF fields. The frontend fetches it via GraphQL:

```
WordPress (wp.beyonddisabilityclub.com)
  └── WPGraphQL plugin exposes /graphql endpoint
        └── lib/graphql.ts  (fetchGraphQL utility, ISR revalidate: 60s)
              └── lib/queries.ts  (all query strings)
              └── lib/types.ts    (TypeScript interfaces matching WP response shapes)
```

Pages are statically generated (SSG) with **ISR** — 60s time-based fallback + on-demand revalidation via `/api/revalidate` (triggered by WordPress webhooks on publish/update/delete).

### Page → Data mapping

| Page | Content Type | GraphQL Query |
|------|-------------|---------------|
| `/` | Stories + Events | `GET_FEATURED_STORY`, `GET_RECENT_STORIES`, `GET_ALL_EVENTS` |
| `/stories` | Stories | `GET_ALL_STORIES` |
| `/stories/[slug]` | Single Story | `GET_STORY_BY_SLUG` |
| `/resources` | Resources | `GET_ALL_RESOURCES` |
| `/about` | Team Members | `GET_TEAM_MEMBERS` |
| `/events` | Events (WP) + Google Calendar | `GET_ALL_EVENTS_FULL` |

### Fallback / Placeholder Pattern

Every data-fetching page wraps `fetchGraphQL` in a `try/catch`. If WordPress isn't set up or returns an error, hardcoded placeholder arrays are shown instead. This lets the UI be developed and demoed without a live WordPress connection.

### API Routes

- `POST /api/revalidate?secret=&tag=` — On-demand ISR triggered by WordPress webhooks. Tags: `stories`, `events`, `resources`, `team`, `all`. Also accepts GET for browser testing.
- `POST /api/contact` — Proxies the contact form to WordPress Contact Form 7 REST API (avoids CORS, hides the CF7 form ID). CF7 expects `multipart/form-data` with fields `your-name`, `your-email`, `your-message`.
- `GET /api/calendar?timeMin=&timeMax=` — Server-side proxy to the Google Calendar REST API. Keeps `GOOGLE_CALENDAR_API_KEY` out of the browser. Called client-side by `GoogleCalendar.tsx` on each month navigation.

### Events Page dual-source architecture

`/events` combines two independent data sources:

1. **Google Calendar** (`GoogleCalendar.tsx`, `"use client"`) — fetches from `/api/calendar` for the displayed month, renders a custom month-grid, shows event details on day click. Handles all-day events (Google returns `start.date` as `YYYY-MM-DD`) by parsing date parts manually to avoid UTC midnight → day-shift in US timezones.

2. **WordPress CPT events** (fetched server-side in `app/events/page.tsx`) — filtered to only show past events (date < today) in `PastEventsList.tsx`. Past/future split is done in the page, not the component.

### Component Architecture

All shared UI lives in `components/`. Pages in `app/` are server components that fetch data and pass it as props to components.

Client components (marked `"use client"`) are used only when interactivity is needed:
- `Header.tsx` — mobile menu toggle
- `StoryList.tsx`, `ResourceFilter.tsx` — client-side category filtering
- `ContactForm.tsx` — form state/submission
- `GoogleCalendar.tsx` — month navigation, day selection, fetch on mount

### Design System

Tailwind v4 with custom theme tokens defined in `globals.css` via `@theme inline`. Key tokens:
- Colors: `navy` (#1e3a5f), `navy-dark`, `navy-light`, `gold` (#d4a843), `gold-light`, `gold-dark`, `cream`
- Fonts: `font-sans` (Geist), `font-serif` (Playfair Display)

WordPress post content is rendered as raw HTML and styled with `.wp-content` utility classes defined in `globals.css` (not Tailwind Typography).

### Image Handling

`next/image` is used throughout. Remote images from WordPress are allowlisted in `next.config.ts` for both `wp.beyonddisabilityclub.com` and `beyonddisabilityclub.com` (legacy URLs).

### ACF field group → GraphQL name mapping

WPGraphQL auto-generates the GraphQL field group name from the ACF group name: "Story Fields" → `storyFields`, "Event Fields" → `eventFields`, etc. If a field isn't appearing in the GraphQL schema, check that the ACF field group is set to "Show in GraphQL" in WordPress.
