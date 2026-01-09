import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { EventsProvider } from "./lib/EventsContext"; // <-- ADD THIS

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EventsProvider>     {/* <-- WRAP APP */}
      <App />
    </EventsProvider>
  </React.StrictMode>
);
