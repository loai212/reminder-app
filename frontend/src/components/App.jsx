import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://backend-delicate-night-9290.fly.dev/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Fetch failed:", err));
  }, []);

  function addNote(e) {
    e.preventDefault();
    fetch("https://backend-delicate-night-9290.fly.dev/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(newNote => {
        setNotes(prev => [...prev, newNote]);
        setTitle("");
        setContent("");
      })
      .catch(err => console.error("Add failed:", err));
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
    fetch(`https://backend-delicate-night-9290.fly.dev/notes/${id}`, {
      method: "DELETE"
    }).catch(err => console.error("Delete failed:", err));
  }

  return (
    <div>
      <Header />

      {/* Styled Form */}
      <form onSubmit={addNote} className="note-form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Notes Grid */}
      <div className="notes-container">
        {notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default App;