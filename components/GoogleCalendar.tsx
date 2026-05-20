"use client";

/**
 * GoogleCalendar — fetches events from the Google Calendar API and renders
 * a custom month-view calendar styled with the site's navy/gold design system.
 *
 * Fetches events for the currently displayed month. Users can navigate
 * forward and backward through months with prev/next buttons.
 *
 * Google Calendar API endpoint used:
 *   GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events
 *   Params: key, timeMin, timeMax, singleEvents=true, orderBy=startTime
 */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function GoogleCalendar() {
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      setSelectedDay(null);

      const timeMin = new Date(displayYear, displayMonth, 1).toISOString();
      const timeMax = new Date(displayYear, displayMonth + 1, 0, 23, 59, 59).toISOString();

      const url = new URL("/api/calendar", window.location.origin);
      url.searchParams.set("timeMin", timeMin);
      url.searchParams.set("timeMax", timeMax);

      try {
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
        const data = await res.json();
        console.log("Calendar events:", data.items);
        setEvents(data.items ?? []);
      } catch (err) {
        setError("Unable to load calendar events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [displayMonth, displayYear]);

  function prevMonth() {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear((y) => y - 1);
    } else {
      setDisplayMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear((y) => y + 1);
    } else {
      setDisplayMonth((m) => m + 1);
    }
  }

  // ── Build the calendar grid ──
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  // Map day-of-month → events on that day.
  // All-day events use start.date ("YYYY-MM-DD") which JavaScript parses as
  // UTC midnight — causing a day shift in US timezones. Parse those manually.
  const eventsByDay: Record<number, GoogleEvent[]> = {};
  for (const event of events) {
    let day: number, eventMonth: number, eventYear: number;

    if (event.start.dateTime) {
      // Timed event — includes timezone offset, parses correctly
      const d = new Date(event.start.dateTime);
      day = d.getDate();
      eventMonth = d.getMonth();
      eventYear = d.getFullYear();
    } else if (event.start.date) {
      // All-day event — parse YYYY-MM-DD parts directly to avoid UTC shift
      const [y, m, d] = event.start.date.split("-").map(Number);
      eventYear = y;
      eventMonth = m - 1;
      day = d;
    } else {
      continue;
    }

    if (eventMonth === displayMonth && eventYear === displayYear) {
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(event);
    }
  }

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] ?? []) : [];

  function formatTime(dateTimeStr?: string): string {
    if (!dateTimeStr) return "";
    return new Date(dateTimeStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    displayMonth === today.getMonth() &&
    displayYear === today.getFullYear();

  // Converts event descriptions to safe HTML with clickable links.
  // Handles two formats Google Calendar may return:
  //   HTML  — user pasted a URL and Google auto-linked it; normalise existing <a> tags to site styles.
  //   Plain text — Outlook-style "Label<url>" or bare https:// URLs; linkify them.
  function formatDescription(text: string): string {
    const isHtml = /<a[\s>]/i.test(text);

    if (isHtml) {
      // Already HTML — normalise existing <a> tags and do NOT re-linkify
      // (re-linkifying corrupts hrefs by appending encoded HTML to the URL).
      return text
        .replace(
          /<a\s+href="([^"]+)"[^>]*>/gi,
          (_, url) =>
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-gold underline">`
        )
        .replace(/\n/g, "<br />");
    }

    // Plain text — linkify Outlook "Label<url>" and bare https:// URLs.
    // [^\s<>"] in the URL character class stops before any HTML tag so the
    // regex can never consume </a> or other markup.
    return text
      .replace(
        /([^<\n\r]+?)<(https?:\/\/[^>\s]+)>/g,
        (_, label, url) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-gold underline">${label.trim()}</a>`
      )
      .replace(
        /(?<!href=")(https?:\/\/[^\s<>"]+)/g,
        (url) => {
          let display: string;
          try {
            display = new URL(url).hostname;
          } catch {
            display = url;
          }
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-gold underline">${display}</a>`;
        }
      )
      .replace(/\n/g, "<br />");
  }

  return (
    <div>
      {/* ── Month Navigation ── */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-md p-2 text-navy transition-colors hover:bg-gold/10"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-serif text-xl font-bold text-navy">
          {MONTH_NAMES[displayMonth]} {displayYear}
        </h3>
        <button
          onClick={nextMonth}
          className="rounded-md p-2 text-navy transition-colors hover:bg-gold/10"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ── Day-of-week headers ── */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* ── Calendar Grid ── */}
      {loading ? (
        <div className="flex h-48 items-center justify-center text-gray-400">
          Loading events…
        </div>
      ) : error ? (
        <div className="flex h-48 items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before the 1st */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasEvents = !!eventsByDay[day];
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`relative flex flex-col items-center rounded-md py-2 text-sm transition-colors
                  ${isSelected ? "bg-navy text-white" : "hover:bg-gold/10"}
                  ${isToday(day) && !isSelected ? "font-bold text-gold" : ""}
                  ${!isSelected && !isToday(day) ? "text-gray-700" : ""}
                `}
              >
                <span>{day}</span>
                {hasEvents && (
                  <span
                    className={`mt-1 h-1.5 w-1.5 rounded-full ${
                      isSelected ? "bg-gold" : "bg-gold"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Selected Day Events ── */}
      {selectedDay && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h4 className="font-serif text-lg font-bold text-navy">
            {MONTH_NAMES[displayMonth]} {selectedDay}
          </h4>
          {selectedEvents.length === 0 ? (
            <p className="mt-2 text-sm text-gray-500">No events this day.</p>
          ) : (
            <div className="mt-3 space-y-4">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <p className="font-semibold text-navy">{event.summary}</p>
                  {event.start.dateTime && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock size={14} className="text-gold" />
                      {formatTime(event.start.dateTime)}
                      {event.end.dateTime && ` – ${formatTime(event.end.dateTime)}`}
                    </p>
                  )}
                  {event.location && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} className="text-gold" />
                      {event.location}
                    </p>
                  )}
                  {event.description && (
                    <p
                      className="mt-2 text-sm leading-relaxed text-gray-600 break-words"
                      dangerouslySetInnerHTML={{ __html: formatDescription(event.description) }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
