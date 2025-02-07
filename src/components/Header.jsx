import { PlusIcon } from "@heroicons/react/24/outline";

export default function Header({ onNewNote }) {
  return (
    <header className="bg-dark-900 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-500">
            Note Maker
          </h1>

          <button
            onClick={onNewNote}
            aria-label="Create new note"
            title="Create new note"
            className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md md:rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />

            <span className="hidden md:inline">New Note</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
