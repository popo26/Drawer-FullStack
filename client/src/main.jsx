import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { ErrorBoundary } from "react-error-boundary";

import { AuthContextProvider } from "./context/AuthContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
      <AuthContextProvider>

        <App />

        </AuthContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
