// React imports
import { useState, useEffect } from "react";

// Library imports
import { XMarkIcon } from "@heroicons/react/24/outline";

// Helper imports
import { DEFAULT_NOTE, MODAL_TITLES } from "../utils/constants";

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  initialNote = null,
}) {
  const [note, setNote] = useState(DEFAULT_NOTE);

  const isEditMode = Boolean(initialNote);

  useEffect(() => {
    // Reset form when modal opens/closes
    if (!isOpen) {
      setNote(DEFAULT_NOTE);

      return;
    }

    // Only set note data if we are in edit mode
    if (isEditMode) setNote(initialNote);
    else setNote(DEFAULT_NOTE);
  }, [isOpen, initialNote, isEditMode]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(note);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        className="bg-dark-800 rounded-lg p-6 w-[85%] max-w-2xl shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <section className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-white">
            {isEditMode ? MODAL_TITLES.edit : MODAL_TITLES.create}
          </h2>

          <button
            onClick={onClose}
            className="text-dark-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={(event) =>
                setNote({ ...note, title: event.target.value })
              }
              className="w-full bg-dark-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              required
            />

            <input
              type="text"
              placeholder="Tagline"
              value={note.tagline}
              onChange={(event) =>
                setNote({ ...note, tagline: event.target.value })
              }
              className="w-full bg-dark-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />

            <textarea
              placeholder="Note body"
              value={note.body}
              onChange={(event) =>
                setNote({ ...note, body: event.target.value })
              }
              className="w-full bg-dark-700 text-white rounded-lg px-4 py-2 h-40 md:h-48 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
              required
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
