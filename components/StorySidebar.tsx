"use client";

/**
 * StorySidebar — category filter sidebar for the Stories page.
 *
 * Shows a list of story categories that filter the story list.
 * "use client" because it uses onClick handlers for filtering.
 *
 * The categories are hardcoded to match the ACF select field options
 * we defined for the Story CPT (Inspiration, Resources, Tips, Community).
 */

const CATEGORIES = ["All", "Inspiration", "Resources", "Tips", "Community"];

interface StorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function StorySidebar({
  activeCategory,
  onCategoryChange,
}: StorySidebarProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="font-serif text-lg font-bold text-gray-900">Categories</h3>
      <ul className="mt-4 space-y-2">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left text-sm transition-colors ${
                activeCategory === category
                  ? "font-semibold text-navy"
                  : "text-gray-600 hover:text-navy"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
