"use client";

/**
 * ResourceFilter — client-side filter tabs for the Resources page.
 *
 * "use client" is required because we use useState to track which
 * filter tab is currently selected. When you click a tab, it filters
 * the resource list WITHOUT making a new server request — the filtering
 * happens entirely in the browser using JavaScript.
 *
 * This is a common pattern: fetch ALL data on the server, then let
 * the client filter/sort it interactively.
 */

import { useState } from "react";
import ResourceCard from "./ResourceCard";
import type { Resource } from "@/lib/types";

const FILTER_TABS = ["All Resources", "On-Campus", "Community", "Vocational"];

interface ResourceFilterProps {
  resources: Resource[];
}

export default function ResourceFilter({ resources }: ResourceFilterProps) {
  const [activeFilter, setActiveFilter] = useState("All Resources");

  // Filter resources based on the active tab
  const filteredResources =
    activeFilter === "All Resources"
      ? resources
      : resources.filter(
          (r) => r.resourceFields?.resourceCategory === activeFilter
        );

  return (
    <>
      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap justify-center gap-3">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeFilter === tab
                ? "bg-navy text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:border-navy hover:text-navy"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Resource Cards Grid ── */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.slug}
            title={resource.title}
            description={resource.resourceFields?.resourceDescription ?? ""}
            url={resource.resourceFields?.resourceUrl}
            iconType={resource.resourceFields?.resourceIcon}
            showLink={true}
          />
        ))}
      </div>

      {/* ── Empty State ── */}
      {filteredResources.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No resources found in this category.
        </p>
      )}
    </>
  );
}
