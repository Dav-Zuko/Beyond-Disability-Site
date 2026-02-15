/**
 * Contact Page — /contact
 *
 * Layout (matching Lovable design):
 * 1. Hero banner — "Contact Us"
 * 2. Two-column layout:
 *    - Left: Contact form (Name, Email, Message)
 *    - Right top: "Get in touch" with email, phone, location
 *    - Right bottom: Embedded Google Map
 *
 * The "Get in touch" info is hardcoded since it rarely changes.
 * The contact form is a client component (needs interactivity).
 */

import { Mail, Phone, MapPin } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <HeroBanner
        title="Contact Us"
        subtitle="Have questions? Want to get involved? We'd love to hear from you."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ── Left Column: Contact Form ── */}
          <ContactForm />

          {/* ── Right Column: Info + Map ── */}
          <div className="space-y-8">
            {/* ── Get in Touch Card ── */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Get in touch
              </h2>

              <div className="mt-6 space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light text-gold-dark">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a
                      href="mailto:info@beyonddisability.club"
                      className="text-sm text-gray-600 hover:text-navy"
                    >
                      info@beyonddisability.club
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light text-gold-dark">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a
                      href="tel:+18505551234"
                      className="text-sm text-gray-600 hover:text-navy"
                    >
                      (850) 555-1234
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light text-gold-dark">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">
                      Gulf Coast State College
                      <br />
                      5230 W US Highway 98
                      <br />
                      Panama City, FL 32401
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Campus Map Card ── */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Campus Map
              </h2>
              <div className="mt-4 aspect-[4/3] overflow-hidden rounded-lg">
                {/* Google Maps embed for Gulf Coast State College */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.7!2d-85.727!3d30.205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8893e1a5c0b0b0b1%3A0x1234567890abcdef!2sGulf+Coast+State+College!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gulf Coast State College campus map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
