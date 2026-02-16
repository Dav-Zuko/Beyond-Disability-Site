"use client";

/**
 * ContactForm — the "Send us a message" form.
 *
 * "use client" because it needs:
 * - useState for form field values and submission status
 * - An onSubmit handler for form submission
 *
 * For now, this submits to a placeholder endpoint.
 * Once you set up Contact Form 7 in WordPress, we'll update the
 * submission URL to point to the WordPress REST API.
 *
 * The form follows the Lovable design:
 * - Name, Email, and Message fields
 * - Dark navy "Send Message" button
 */

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send");
      }

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
      <h2 className="font-serif text-2xl font-bold text-gray-900">
        Send us a message
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* ── Name Field ── */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
          />
        </div>

        {/* ── Email Field ── */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
          />
        </div>

        {/* ── Message Field ── */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none resize-y"
          />
        </div>

        {/* ── Submit Button ── */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {/* ── Status Messages ── */}
        {status === "sent" && (
          <p className="text-center text-sm font-medium text-green-600">
            Message sent successfully! We&apos;ll be in touch.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm font-medium text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
