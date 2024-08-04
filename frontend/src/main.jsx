import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./Context/UserContext";

const root = document.getElementById("root");
const rootContainer = createRoot(root);
rootContainer.render(
  <UserProvider>
    <App />
  </UserProvider>
);
