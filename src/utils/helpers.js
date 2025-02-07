import { formatDistanceToNow, parseISO } from "date-fns";

/**
 * Formats a timestamp to a relative time string (e.g., "2 hours ago")
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} Relative time string
 */
export const formatTimeAgo = (timestamp) => {
  try {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  } catch (error) {
    console.error("Error formatting time:", error);

    return "some time ago";
  }
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}...`;
};

/**
 * Sorts notes by pinned status and date
 * @param {Array} notes - Array of note objects
 * @returns {Array} Sorted notes array
 */
export const sortNotes = (notes) => {
  return [...notes].sort((note1, note2) => {
    // First sort by pinned status
    if (note1.isPinned && !note2.isPinned) return -1;

    if (!note1.isPinned && note2.isPinned) return 1;

    // Then sort by update date
    return new Date(note2.updatedAt) - new Date(note1.updatedAt);
  });
};

/**
 * Generates a preview of the note body
 * @param {string} body - Full note body
 * @returns {string} Preview text
 */
export const generatePreview = (body) => {
  return truncateText(body, 100);
};

/**
 * Validates note data
 * @param {Object} note - Note object to validate
 * @returns {Object} Validation result
 */
export const validateNote = (note) => {
  const errors = {};

  if (!note.title.trim()) {
    errors.title = "Title is required";
  }

  if (!note.body.trim()) {
    errors.body = "Note content is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
