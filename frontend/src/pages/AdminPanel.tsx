import { useState } from "react";
import { createEvent } from "../api/events";

export default function AdminPanel() {
  const [title, setTitle] = useState("");

  const submit = async (e : any) => {
    e.preventDefault();
    await createEvent({ title });
    alert("Event Created!");
  };

  return (
    <form onSubmit={submit}>
      <input 
        className="border p-2"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 ml-2">
        Add Event
      </button>
    </form>
  );
}
