// Helper imports
import { ITEMS_PER_PAGE } from "../utils/constants";

// React imports
import { useState, useMemo } from "react";

export default function usePagination(items, itemsPerPage = ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    totalPages,
  };
}
