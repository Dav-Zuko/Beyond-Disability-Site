/**
 * Google Calendar API Proxy — /api/calendar
 *
 * Proxies requests to the Google Calendar API so the API key
 * stays server-side and never appears in the browser.
 *
 * Query params:
 *   timeMin — ISO string for the start of the range
 *   timeMax — ISO string for the end of the range
 */

import { NextRequest, NextResponse } from "next/server";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY!;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const timeMin = searchParams.get("timeMin");
  const timeMax = searchParams.get("timeMax");

  if (!timeMin || !timeMax) {
    return NextResponse.json(
      { message: "timeMin and timeMax are required" },
      { status: 400 }
    );
  }

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`
  );
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("timeMax", timeMax);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      const error = await res.json();
      console.error("Google Calendar API error:", error);
      return NextResponse.json(
        { message: "Failed to fetch calendar events" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Calendar proxy error:", err);
    return NextResponse.json(
      { message: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}
