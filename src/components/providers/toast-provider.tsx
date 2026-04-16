"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      containerStyle={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      toastOptions={{
        style: {
          borderRadius: "18px",
          background: "#0f3d3e",
          color: "#ffffff",
          border: "1px solid rgba(201, 161, 74, 0.35)",
        },
      }}
    />
  );
}
