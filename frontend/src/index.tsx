import React from "react";
import ReactDOM from "react-dom";

import { QueryClientProvider, QueryClient } from "react-query";
import ThemeProvider from "./contexts/ThemeProvider";
import DashboardPage from "./pages/Dashboard";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <DashboardPage />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
