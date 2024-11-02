import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <App />
        <Toaster />
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
