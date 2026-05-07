import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { get, set, del } from "idb-keyval";


const cachedTime = 1000 * 60 * 60 * 24; // 24 hours
const staleTime = 1000 * 60 * 5; // 5 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: cachedTime,
      staleTime: staleTime,
    },
  },
});

// Persister that will use localStorage to persist the cached data in browser
const indexedDBPersister = createAsyncStoragePersister({
  storage: {
    getItem: (key: string) => get(key),
    setItem: (key: string, value: string) => set(key, value),
    removeItem: (key: string) => del(key),
  }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: indexedDBPersister,
            maxAge: cachedTime,
          }}
        >
          <App />
        </PersistQueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
