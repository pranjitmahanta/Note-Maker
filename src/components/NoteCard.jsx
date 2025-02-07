// Library imports
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { VscPinned } from "react-icons/vsc";

// Helper function imports
import { formatTimeAgo, generatePreview } from "../utils/helpers";

export default function NoteCard({ note, onEdit, onDelete, onPin }) {
  const timeAgo = formatTimeAgo(note.updatedAt);

  return (
    <section
      onClick={() => onEdit(note)}
      role="button"
      tabIndex={0}
      aria-label={`Note: ${note.title}`}
      className={`bg-dark-800 rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow relative group ${
        note.isPinned ? "border-2 border-primary-500" : ""
      }`}
    >
      <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onPin(note.id);
          }}
          aria-label={note.isPinned ? "Unpin note" : "Pin note"}
          title={note.isPinned ? "Unpin note" : "Pin note"}
          className="text-dark-400 hover:text-primary-500 transition-colors"
        >
          <VscPinned
            className={`w-5 h-5 ${note.isPinned ? "text-primary-500" : ""}`}
          />
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            onEdit(note);
          }}
          aria-label="Edit note"
          title="Edit note"
          className="text-dark-400 hover:text-primary-500 transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-white capitalize mb-1 pr-16">
        {note.title}
      </h3>

      {note.tagline && (
        <p className="text-dark-300 text-sm mb-2">{note.tagline}</p>
      )}

      <p className="text-dark-400 line-clamp-3">{generatePreview(note.body)}</p>

      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="text-dark-400">{timeAgo}</span>

        <button
          onClick={(event) => {
            event.stopPropagation();
            onDelete(note.id);
          }}
          aria-label="Delete note"
          title="Delete note"
          className="text-dark-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
