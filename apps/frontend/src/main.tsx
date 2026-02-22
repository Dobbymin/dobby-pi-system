import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { ApplicationProviders } from "./apps/providers";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.VITE_API_MOCKING !== "enabled") {
    return;
  }
  const { worker } = await import("./shared/mocks/config/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <ApplicationProviders>
      <App />
    </ApplicationProviders>,
  );
});
