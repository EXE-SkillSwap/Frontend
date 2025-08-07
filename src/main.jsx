import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";
import "moment/locale/vi";
import { Provider } from "react-redux";
import store from "./redux/storeConfig.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <Toaster position="top-center" richColors />
      </Provider>
    </QueryClientProvider>
  </>
);
