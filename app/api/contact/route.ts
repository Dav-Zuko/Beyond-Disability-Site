/**
 * Contact Form API Route — /api/contact
 *
 * This acts as a proxy between your Next.js frontend and the WordPress
 * Contact Form 7 REST API. Why a proxy instead of calling CF7 directly?
 *
 * 1. CORS — The frontend (beyonddisabilityclub.com) and WordPress
 *    (wp.beyonddisabilityclub.com) are different origins. Browsers
 *    block cross-origin requests unless the server sends CORS headers.
 *    By proxying through our own API route, the browser only talks to
 *    our own domain — no CORS issues.
 *
 * 2. Security — We keep the WordPress URL and form ID server-side.
 *    Nobody can see them in the browser's network tab.
 *
 * CF7 REST API endpoint format:
 *   POST /wp-json/contact-form-7/v1/contact-forms/{form-id}/feedback
 *
 * CF7 expects FormData (not JSON) with field names matching your CF7 form template.
 */

import { NextRequest, NextResponse } from "next/server";

const WP_URL = process.env.WORDPRESS_GRAPHQL_URL?.replace("/graphql", "") ?? "";
const CF7_FORM_ID = process.env.CF7_FORM_ID ?? "";

export async function POST(request: NextRequest) {
  // ── 1. Parse the incoming JSON from the frontend ──
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  // ── 2. Basic validation ──
  if (!name || !email) {
    return NextResponse.json(
      { message: "Name and email are required" },
      { status: 400 }
    );
  }

  // ── 3. Check that CF7 is configured ──
  if (!CF7_FORM_ID) {
    console.error("CF7_FORM_ID environment variable is not set");
    return NextResponse.json(
      { message: "Contact form is not configured" },
      { status: 500 }
    );
  }

  // ── 4. Build FormData for CF7 (it expects multipart/form-data) ──
  // CF7 requires a _wpcf7_unit_tag to identify the form instance
  const formData = new FormData();
  formData.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
  formData.append("your-name", name);
  formData.append("your-email", email);
  formData.append("your-subject", "Website Contact Form");
  formData.append("your-message", message ?? "");

  // ── 5. Forward to WordPress CF7 REST API ──
  try {
    const cf7Url = `${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;

    const response = await fetch(cf7Url, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    // CF7 returns { status: "mail_sent" } on success
    if (result.status === "mail_sent") {
      return NextResponse.json({ message: "Message sent successfully" });
    } else {
      console.error("CF7 error:", result);
      return NextResponse.json(
        { message: result.message || "Failed to send message" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
