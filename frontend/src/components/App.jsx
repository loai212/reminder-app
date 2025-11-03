import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://your-railway-backend-url/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div>
      <Header />
      {notes.map(note => (
        <Note key={note.id} title={note.title} content={note.content} />
      ))}
      <Footer />
    </div>
  );
}

export default App;