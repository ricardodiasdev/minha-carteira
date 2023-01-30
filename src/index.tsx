import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider } from "./hooks/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
