import React from "react";

function Note(props) {
  function handleDelete() {
    props.onDelete(props.id); 
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "6px 10px",
          cursor: "pointer",
          borderRadius: "4px"
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Note;