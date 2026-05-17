# Beyond Disability Site

The official website for the **Beyond Disability Club** at Gulf Coast State College. Built with a headless WordPress + Next.js architecture — content editors manage posts in WordPress while the public-facing site delivers a fast, SEO-optimized experience through Next.js.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![WordPress](https://img.shields.io/badge/WordPress-21759B?style=flat&logo=wordpress&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

**Live site:** [beyond-disability-site.vercel.app](https://beyond-disability-site.vercel.app)

---

## Architecture overview

```
WordPress (CMS / backend)          Next.js (frontend)
─────────────────────────          ──────────────────
Content editors write posts   →    WPGraphQL fetches content
ACF manages custom fields     →    at build time (SSG) or
                                   on revalidation (ISR)
                                        ↓
                                   Vercel serves static pages
                                   (fast, SEO-friendly)
```

WordPress runs on a subdomain as a headless CMS. The Next.js frontend never exposes WordPress to end users — it only consumes data via the WPGraphQL API.

---

## Features

- **Headless CMS** — WordPress handles content, Next.js handles presentation
- **Static Site Generation (SSG)** — pages are pre-built at deploy time for maximum performance
- **Incremental Static Regeneration (ISR)** — content updates in WordPress reflect on the live site without a full redeploy
- **WPGraphQL + ACF** — structured content queries with custom field support
- **TypeScript** — fully typed throughout
- **SEO-ready** — static HTML output, proper metadata, fast load times

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI library | React 19 |
| CMS | WordPress (headless) |
| CMS API | WPGraphQL |
| Custom fields | Advanced Custom Fields (ACF) |
| Styling | Tailwind CSS v4 |
| Deployment (frontend) | Vercel |
| Deployment (CMS) | WordPress on subdomain |

---

## Getting started

### Prerequisites

- Node.js v18+
- A running WordPress instance with WPGraphQL and ACF plugins installed
- (Optional) A Vercel account for deployment

### Installation

```bash
# Clone the repository
git clone https://github.com/Dav-Zuko/Beyond-Disability-Site.git
cd Beyond-Disability-Site

# Install dependencies
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
WORDPRESS_GRAPHQL_URL=https://wp.beyonddisabilityclub.com/graphql
REVALIDATION_SECRET=<secret>
CF7_FORM_ID=<contact-form-7-form-id>
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
beyond-disability-site/
├── app/                  # Next.js App Router pages and API routes
│   └── api/
│       ├── calendar/     # Google Calendar integration
│       ├── contact/      # Contact form proxy to CF7
│       └── revalidate/   # On-demand ISR webhook endpoint
├── components/           # Reusable React components
├── lib/                  # GraphQL queries, fetch utility, and TypeScript types
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── .env.local            # Environment variables (not committed)
```

---

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/revalidate` | `POST` | On-demand ISR triggered by WordPress webhooks. Accepts `?secret=&tag=` (tags: `stories`, `events`, `resources`, `team`, `all`) |
| `/api/contact` | `POST` | Proxies the contact form to the WordPress CF7 REST API (avoids CORS, hides CF7 form ID) |
| `/api/calendar` | `GET` | Google Calendar integration for the events page |

---

## Key concepts

### Why headless WordPress?

Content editors at the club are comfortable with WordPress. This architecture lets them keep that familiar experience while the public site benefits from the performance and developer experience of Next.js.

### ISR (Incremental Static Regeneration)

When a club member publishes a new post in WordPress, the relevant pages on the Next.js site automatically regenerate — no manual redeploy needed. Pages revalidate every 60 seconds as a time-based fallback, and instantly via the `/api/revalidate` webhook on publish/update/delete. This means the site stays fast (pre-rendered) while content stays fresh.

### WPGraphQL

Instead of the traditional WordPress REST API, this project uses WPGraphQL to fetch exactly the data needed for each page — nothing more. This reduces payload sizes and keeps queries explicit and type-safe.

### Fallback / placeholder pattern

Every data-fetching page wraps `fetchGraphQL` in a `try/catch`. If WordPress is unavailable, hardcoded placeholder arrays are shown instead — so the UI can be developed and demoed without a live WordPress connection.

---

## Deployment

The frontend is deployed on **Vercel**. On every push to `main`, Vercel rebuilds and deploys automatically. ISR handles content updates between deploys.

```bash
# Build for production
npm run build

# Start production server locally
npm start
```

---

## Background

Built for the Beyond Disability Club at Gulf Coast State College to replace a static site with a maintainable, content-driven platform that club members could update themselves without developer involvement.

---

## License

This project is open source and available under the [MIT License](LICENSE).
