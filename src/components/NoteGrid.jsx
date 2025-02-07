import NoteCard from "./NoteCard";

export default function NoteGrid({ notes, onEdit, onDelete, onPin }) {
  const pinnedNotes = notes.filter((note) => note.isPinned);
  const unpinnedNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="space-y-8">
      {pinnedNotes.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-dark-200 mb-4">
            Pinned Notes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onPin={onPin}
              />
            ))}
          </div>
        </section>
      )}

      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
            <h2 className="text-lg font-semibold text-dark-200 mb-4">
              Other Notes
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onPin={onPin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
