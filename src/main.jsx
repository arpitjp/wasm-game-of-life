import React from "react";
import ReactDOM from "react-dom/client";
import SnackbarProvider from 'react-simple-snackbar'
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
