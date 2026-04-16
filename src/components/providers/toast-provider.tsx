"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
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
