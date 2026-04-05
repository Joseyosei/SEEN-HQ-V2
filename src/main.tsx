import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { Component, type ErrorInfo, type ReactNode } from "react";
import App from "./App.tsx";
import "./index.css";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p style={{ color: "#888", marginTop: "1rem" }}>
            {(this.state.error as Error).message}
          </p>
          <button
            style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);
