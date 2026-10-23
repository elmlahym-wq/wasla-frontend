/** Prefix local URLs when hosted below a GitHub Pages repository path. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function sitePath(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}
