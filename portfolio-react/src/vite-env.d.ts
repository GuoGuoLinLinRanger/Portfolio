/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form id (the part after /f/). Optional — see .env.example. */
  readonly VITE_FORMSPREE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
