import { useEffect, useState } from "react";
import { Note } from "../types/note";
import { deleteNote, fetchNotes, updateNote } from "../services/notelist";
import { createNote } from "../services/notelist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

function Notelist() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [eidtId, setEditId] = useState<string>("");
  console.log("Current API_URL:", notes);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

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
      toast.success("Note created successfully.");
    } catch (error) {
      console.log("Error creating note:", error);
      toast.error("Failed to create note.");
    }
  };

  const deletehandler = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.log("Error deleting note: ", error);
      toast.error("Failed to delete note.");
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
      toast.success("Note updated successfully.");
    } catch (error) {
      console.log("Error Updateing note: ", error);
      toast.error("Failed to update note.");
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
            <div key={note._id}>
              {note.userId === userInfo?._id ? (
                <div
                  key={note._id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-between  bg-blue-50 rounded-md p-3 mb-3"
                >
                  <p>{note.title}</p>
                  <div className="flex items-center justify-end">
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
              ) : (
                <div
                  key={note._id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-between  bg-gray-100 rounded-md p-3 mb-3"
                >
                  <p>{note.title}</p>
                </div>
              )}
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

      {userInfo ? (
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
      ) : (
        <>
          <p className="text-gray-500 text-center italic">
            Please Login to Create Note List...
            <span>Click the </span>
            <Link to={"/login"} className="text-blue-500 underline">
              here
            </Link>
            <span> to login.</span>
          </p>
        </>
      )}
    </div>
  );
}

export default Notelist;
