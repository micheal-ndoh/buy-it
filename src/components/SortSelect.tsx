"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortSelectProps {
  currentSort: string;
  searchQuery?: string;
  currentPage?: number;
}

export function SortSelect({
  currentSort,
  searchQuery,
  currentPage,
}: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }

    // Preserve search query if it exists
    if (searchQuery) {
      params.set("search", searchQuery);
    }

    // Reset to page 1 when sorting changes
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary"
        htmlFor="sort"
      >
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="form-select block w-48 rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:border-primary focus:ring-primary text-sm cursor-pointer"
      >
        <option value="newest">Newest Arrivals</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
