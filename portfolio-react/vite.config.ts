import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
// Project Pages live under /Portfolio/, so use that base for production
// builds while keeping "/" for local dev.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Portfolio/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
