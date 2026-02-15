/**
 * ValueCard — displays a value/mission item on the About page.
 *
 * Each card has a gold icon circle, a title, and a description.
 * These are hardcoded (not from WordPress) because they rarely change.
 *
 * The `icon` prop accepts a React node — we pass Lucide icons from
 * the parent component. This keeps the card component generic.
 */

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {/* ── Gold Icon Circle ── */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light text-gold-dark">
        {icon}
      </div>

      <h3 className="mt-4 font-serif text-xl font-bold text-gray-900">
        {title}
      </h3>
      <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
