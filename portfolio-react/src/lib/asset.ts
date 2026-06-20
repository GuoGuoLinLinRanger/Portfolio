/**
 * Resolve a public asset path against Vite's base URL so images work both
 * locally ("/") and on GitHub Pages ("/Portfolio/"). Pass a root-relative
 * path like "/img/foo.png".
 */
export function asset(p: string): string {
  return import.meta.env.BASE_URL + p.replace(/^\//, "")
}
