import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ Make sure this file exists

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ Root element not found! Check your index.html.");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
