/**
 * SurveyAnnouncement — callout card for the Widener University
 * disability & sexuality education research survey.
 *
 * Sits centered beneath the "Quick Access Resources" card grid on the
 * homepage. This is hardcoded (not WordPress-driven) since it's a
 * one-off, time-sensitive announcement. Once Ricky-Ann confirms
 * recruitment has ended, remove this component's import and JSX line
 * from app/page.tsx — there's no WordPress entry to clean up.
 */

import { ExternalLink } from "lucide-react";

export default function SurveyAnnouncement() {
  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-lg border-2 border-gold bg-white p-8 text-center">
      <span className="inline-block rounded-full bg-gold-light px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gold-dark">
        Research Study
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold text-gray-900">
        Share Your Experience: Disability &amp; Sexuality Education Survey
      </h3>
      <p className="mt-3 text-sm text-gray-600">
        A PhD researcher at Widener University is inviting disabled adults
        (born 1990 or later, disabled since before age 19, and raised in
        the U.S.) to share what they learned about sexuality education
        growing up. The anonymous survey takes 10&ndash;20 minutes, and
        participants can opt into a raffle for a $25 gift card.
      </p>
      <a
        href="https://tinyurl.com/DisabledSexEduSurvey"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-md border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Take the Survey
        <ExternalLink size={16} />
      </a>
      <p className="mt-3 text-xs text-gray-400">
        IRB-approved study &mdash; Widener University Protocol #925
      </p>
    </div>
  );
}
