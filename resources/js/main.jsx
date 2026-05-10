import "../css/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error(
        "Element #root tidak ditemukan. Periksa resources/views/app.blade.php",
    );
}

createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
