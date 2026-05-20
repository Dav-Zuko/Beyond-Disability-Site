/**
 * PastEventsList — renders a simple bulleted list of past WordPress events.
 *
 * "Past" is determined by comparing the ACF eventDate field (format: "Month D, YYYY")
 * against today's date. Events with a date before today are shown here.
 */

import type { Event } from "@/lib/types";
import { Calendar, Clock, MapPin } from "lucide-react";

interface PastEventsListProps {
  events: Event[];
}

export default function PastEventsList({ events }: PastEventsListProps) {
  if (events.length === 0) {
    return (
      <p className="text-gray-500">No past events to display.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {events.map((event) => {
        const { eventDate, eventStartTime, eventEndTime, eventLocation } =
          event.eventFields;

        return (
          <li key={event.slug} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
            <div>
              <p className="font-medium text-gray-800">{event.title}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                {eventDate && (
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-gold" />
                    {eventDate}
                  </span>
                )}
                {eventStartTime && (
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-gold" />
                    {eventStartTime}
                    {eventEndTime && ` – ${eventEndTime}`}
                  </span>
                )}
                {eventLocation && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-gold" />
                    {eventLocation}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
