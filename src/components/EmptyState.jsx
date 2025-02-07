import { DocumentPlusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function EmptyState({ onNewNote }) {
  return (
    <section className="text-center py-12 mt-8">
      <DocumentPlusIcon className="w-16 h-16 text-dark-400 mx-auto mb-4" />

      <h2 className="text-xl font-semibold text-dark-200 mb-2">No notes yet</h2>

      <p className="text-dark-400 mb-6">
        Create your first note to get started
      </p>

      <button
        onClick={onNewNote}
        aria-label="Create new note"
        className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center space-x-2"
      >
        <PlusIcon className="w-5 h-5" />
        <span>New Note</span>
      </button>
    </section>
  );
}
