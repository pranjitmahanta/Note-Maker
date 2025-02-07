import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2 rounded-lg text-dark-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <span className="text-dark-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2 rounded-lg text-dark-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
