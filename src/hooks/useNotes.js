// React imports
import { useState, useEffect } from "react";

// Helper imports
import { NOTE_STORAGE_KEY } from "../utils/constants";

export default function useNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem(NOTE_STORAGE_KEY);

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
    };
    const updatedNotes = [newNote, ...notes];

    setNotes(updatedNotes);
    localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const updateNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    );

    setNotes(updatedNotes);
    localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
    localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
  };
}
