import React from "react";

/**
 * CategoryCard
 * - Expects category to have: { _id, name, iconUrl }
 * - If you stored Flaticon URLs in category.iconUrl they will be used.
 * - Otherwise a fallback SVG is shown.
 */
export default function CategoryCard({ category }) {
  const icon = category?.iconUrl || null;

  return (
    <a
      href={`/listings?category=${category._id}`}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition"
    >
      <div className="h-12 w-12 flex items-center justify-center rounded-md bg-slate-50 border">
        {icon ? (
          <img src={icon} alt={category.name} className="h-8 w-8 object-contain" onError={(e) => (e.target.src = "/cat-placeholder.png")} />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary-600">
            <path d="M3 7h18" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M3 12h18" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M3 17h18" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div>
        <div className="text-sm font-medium text-slate-800">{category.name}</div>
      </div>
    </a>
  );
}
