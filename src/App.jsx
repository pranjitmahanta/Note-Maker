// React imports
import { useState, useEffect } from "react";

// Library imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component imports
import Header from "./components/Header";
import NoteGrid from "./components/NoteGrid";
import NoteModal from "./components/NoteModal";
import EmptyState from "./components/EmptyState";
import Pagination from "./components/Pagination";

// Custom hook imports
import useNotes from "./hooks/useNotes";
import usePagination from "./hooks/usePagination";

// Helper imports
import { sortNotes, validateNote } from "./utils/helpers";
import { TOAST_CONFIG } from "./utils/constants";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotes();

  // Sort notes to ensure pinned notes are always at the top
  const sortedNotes = sortNotes(notes);

  const {
    currentPage,
    setCurrentPage,
    paginatedItems: paginatedNotes,
    totalPages,
  } = usePagination(sortedNotes);

  useEffect(() => {
    const root = document.documentElement; // This targets <html>
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (note) => {
    const { isValid, errors } = validateNote(note);

    if (!isValid) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    try {
      if (selectedNote) {
        updateNote(selectedNote.id, note);
        toast.success(`${note.title.toUpperCase()} - note updated successfully!`);
      } else {
        addNote(note);
        toast.success(`${note.title.toUpperCase()} - note created successfully!`);
      }
    } catch (error) {
      toast.error("An error occurred while saving the note.");
    }
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        deleteNote(id);
        toast.success("Note deleted successfully!");
      } catch (error) {
        toast.error("An error occurred while deleting the note.");
      }
    }
  };

  const handlePinNote = (id) => {
    try {
      togglePin(id);
      toast.success("Note pin status updated!");
    } catch (error) {
      toast.error("An error occurred while updating pin status.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all">
      <Header onNewNote={handleNewNote} />
      
      {/* Dark Mode Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md transition-all"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notes.length === 0 ? (
          <EmptyState onNewNote={handleNewNote} />
        ) : (
          <>
            <NoteGrid
              notes={paginatedNotes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onPin={handlePinNote}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        onSave={handleSaveNote}
        initialNote={selectedNote}
      />

      <ToastContainer {...TOAST_CONFIG} />
    </div>
  );
}
