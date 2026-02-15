/**
 * EventCard — displays an upcoming event.
 *
 * Used on the homepage "Upcoming Events" section.
 * Shows event title, date, time range, location, description,
 * and a "Learn More" button.
 *
 * The design is a horizontal card with a subtle border,
 * matching the Lovable design's stacked event list.
 */

import { Calendar, Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { eventDate, eventStartTime, eventEndTime, eventLocation, eventDescription } =
    event.eventFields;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <h3 className="font-serif text-xl font-bold text-navy">{event.title}</h3>

      {/* ── Meta Info (date, time, location) ── */}
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
        {eventDate && (
          <span className="flex items-center gap-1.5">
            <Calendar size={15} className="text-gold" />
            {eventDate}
          </span>
        )}
        {eventStartTime && (
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-gold" />
            {eventStartTime}
            {eventEndTime && ` - ${eventEndTime}`}
          </span>
        )}
        {eventLocation && (
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-gold" />
            {eventLocation}
          </span>
        )}
      </div>

      {/* ── Description ── */}
      {eventDescription && (
        <p className="mt-4 text-gray-600">{eventDescription}</p>
      )}

      {/* ── Button ── */}
      <div className="mt-4">
        <button className="rounded-md border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white">
          Learn More
        </button>
      </div>
    </div>
  );
}
