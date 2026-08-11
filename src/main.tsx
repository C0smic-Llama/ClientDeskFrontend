import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { AuthProvider } from "@/features/auth/AuthProvider";
import { router } from "@/app/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);