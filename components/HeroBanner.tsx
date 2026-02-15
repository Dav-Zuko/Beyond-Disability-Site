/**
 * HeroBanner — reusable dark navy hero section.
 *
 * Used on About, Resources, Stories, and Contact pages.
 * Each page passes different title and subtitle text.
 *
 * Props:
 * - title: the large heading (e.g., "About Us")
 * - subtitle: the descriptive text below the heading
 */

interface HeroBannerProps {
  title: string;
  subtitle: string;
}

export default function HeroBanner({ title, subtitle }: HeroBannerProps) {
  return (
    <section className="bg-navy px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">{subtitle}</p>
      </div>
    </section>
  );
}
