/**
 * Events Page — /events
 *
 * Displays a custom Google Calendar for browsing upcoming events,
 * and a simple bulleted list of past events pulled from WordPress.
 *
 * Past vs upcoming is determined by comparing the ACF eventDate field
 * (format: "Month D, YYYY", e.g. "March 25, 2025") against today.
 *
 * WordPress events are fetched via WPGraphQL (all events, no cap).
 * Google Calendar is fetched client-side via the /api/calendar proxy.
 */

import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_EVENTS_FULL } from "@/lib/queries";
import type { Event } from "@/lib/types";
import HeroBanner from "@/components/HeroBanner";
import GoogleCalendar from "@/components/GoogleCalendar";
// import PastEventsList from "@/components/PastEventsList";

const placeholderEvents: Event[] = [
  {
    title: "Monthly Club Meeting",
    slug: "monthly-meeting",
    eventFields: {
      eventDate: "January 25, 2025",
      eventStartTime: "5:00 PM",
      eventEndTime: "6:30 PM",
      eventLocation: "Student Center, Room 204",
      eventDescription: "Monthly meeting to discuss upcoming initiatives.",
    },
  },
  {
    title: "Accessibility Workshop",
    slug: "accessibility-workshop",
    eventFields: {
      eventDate: "February 2, 2025",
      eventStartTime: "3:00 PM",
      eventEndTime: "5:00 PM",
      eventLocation: "Library Conference Room",
      eventDescription: "Learn about assistive technologies on campus.",
    },
  },
];

export default async function EventsPage() {
  let allEvents: Event[] = [];

  try {
    const data = await fetchGraphQL<{ events: { nodes: Event[] } }>(
      GET_ALL_EVENTS_FULL
    );
    allEvents = data.events.nodes;
  } catch {
    // WordPress CPT not set up yet — will show placeholders
  }

  // const displayEvents = allEvents.length > 0 ? allEvents : placeholderEvents;

  // const today = new Date();
  // today.setHours(0, 0, 0, 0);

  // const pastEvents = displayEvents.filter((event) => {
  //   const d = new Date(event.eventFields.eventDate);
  //   return !isNaN(d.getTime()) && d < today;
  // });

  return (
    <>
      <HeroBanner
        title="Events"
        subtitle="Stay up to date with everything happening at the Beyond Disability Club."
      />

      {/* ── Google Calendar ── */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Club Calendar
        </h2>
        <p className="mt-2 text-gray-500">
          Click a date to see event details. Navigate months with the arrows.
        </p>
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <GoogleCalendar />
        </div>
      </section>

      {/* ── Past Events ── */}
      {/* <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Past Events
        </h2>
        <p className="mt-2 text-gray-500">
          A record of previous club events and activities.
        </p>
        <div className="mt-8">
          <PastEventsList events={pastEvents} />
        </div>
      </section> */}
    </>
  );
}
