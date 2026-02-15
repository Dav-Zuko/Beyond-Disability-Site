/**
 * ResourceCard — displays a resource with icon, title, description, and link.
 *
 * Used on:
 * - Homepage "Quick Access Resources" section
 * - Resources page (full directory)
 *
 * The icon is a gold circle with an icon inside, matching the Lovable design.
 * The `iconType` prop determines which icon to show — this maps to the
 * ACF select field value chosen in WordPress.
 *
 * The `showLink` prop controls whether the "Visit Site" link appears
 * (hidden on homepage quick access, shown on resources page).
 */

import {
  Accessibility,
  FileText,
  Building,
  Heart,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  url?: string;
  iconType?: string;
  showLink?: boolean;
}

// Maps ACF select values to Lucide icons
function getIcon(iconType: string) {
  const iconMap: Record<string, React.ReactNode> = {
    accessibility: <Accessibility size={24} />,
    document: <FileText size={24} />,
    building: <Building size={24} />,
    heart: <Heart size={24} />,
    briefcase: <Briefcase size={24} />,
    career: <GraduationCap size={24} />,
  };
  return iconMap[iconType] ?? <Accessibility size={24} />;
}

export default function ResourceCard({
  title,
  description,
  url,
  iconType = "accessibility",
  showLink = false,
}: ResourceCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      {/* ── Gold Icon Circle ── */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light text-gold-dark">
        {getIcon(iconType)}
      </div>

      {/* ── Title & Description ── */}
      <h3 className="mt-4 font-serif text-lg font-bold text-gray-900">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-gray-600">{description}</p>

      {/* ── Visit Site Link (optional) ── */}
      {showLink && url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-navy hover:text-navy"
        >
          <ExternalLink size={14} />
          Visit Site
        </a>
      )}
    </div>
  );
}
