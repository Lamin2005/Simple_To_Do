import { useEffect, useState } from "react";
import { Note } from "../types/note";
import { deleteNote, fetchNotes, updateNote } from "../services/notelist";
import { createNote } from "../services/notelist";

function Notelist() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [eidtId, setEditId] = useState<string>("");
  console.log("Current API_URL:", notes);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notes = await fetchNotes();
        console.log("Fetched notes:", notes);
        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      } finally {
        setLoading(false);
      }
    };
    getNotes();
  }, []);

  const submithandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") return;
    try {
      if (edit) {
        updatehandler(eidtId, title);
        setTitle("");
        return;
      }
      const newNote = await createNote(title);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setTitle("");
    } catch (error) {
      console.log("Error creating note:", error);
    }
  };

  const deletehandler = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error deleting note: ", error);
    }
  };

  const updatehandler = async (id: string, title: string) => {
    try {
      await updateNote(id, title);
      setNotes((prevNote) =>
        prevNote.filter((note) =>
          note._id === id ? (note.title = title) : note.title,
        ),
      );
      setEdit(false);
      setEditId("");
    } catch (error) {
      console.log("Error Updateing note: ", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl my-1.5">Notes List</h2>

      {loading && (
        <>
          <p className="text-gray-500 text-center italic">
            Loading Note Lists...
          </p>
        </>
      )}

      {!loading && notes.length !== 0 && (
        <>
          {notes.map((note) => (
            <div
              key={note._id}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center"
            >
              <p>{note.title}</p>
              <div>
                <button
                  onClick={() => deletehandler(note._id)}
                  className="px-2 bg-red-500 text-white cursor-pointer m-2 rounded-md py-1"
                >
                  Delete
                </button>
                <button
                  className="px-2 bg-blue-400 text-white cursor-pointer m-2 rounded-md py-1"
                  onClick={() => {
                    setEdit(true);
                    setTitle(note.title);
                    setEditId(note._id);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {!loading && notes.length == 0 && (
        <>
          <p className="text-gray-500 text-center italic">
            No Note List Available...
          </p>
        </>
      )}

      <form className="mt-4" onSubmit={submithandler}>
        <input
          type="text"
          placeholder="Enter note title"
          className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {edit ? "Update" : "Add"}
        </button>

        {edit && (
          <button
            onClick={() => {
              setEdit(false);
              setEditId("");
              setTitle("");
            }}
            className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md mx-2"
          >
            Cancle
          </button>
        )}
      </form>
    </div>
  );
}

export default Notelist;
