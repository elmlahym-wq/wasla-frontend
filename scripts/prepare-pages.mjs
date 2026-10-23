import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (entry.name.endsWith(".css")) {
      const css = await readFile(path, "utf8");
      await writeFile(path, css.replace(/url\((["']?)\/(fonts|media)\//g, (_, quote, folder) => `url(${quote}${prefix}/${folder}/`));
    }
  }
}
await visit("out");
await writeFile("out/.nojekyll", "");
