import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// Collect letter-animation sequences (opacity:0.001 spans)
const re =
  /(<span style="display:inline-block;opacity:0\.001[^"]*">)([^<])(<\/span>)/g;
let m;
const chunks = [];
let current = "";
let lastIndex = 0;
while ((m = re.exec(html))) {
  if (m.index - lastIndex > 500 && current.length > 3) {
    chunks.push(current);
    current = "";
  }
  current += m[2];
  lastIndex = m.index;
}
if (current.length > 3) chunks.push(current);

console.log("Letter-animation phrases:");
[...new Set(chunks)].sort((a, b) => b.length - a.length).forEach((c) => console.log("-", c, `(${c.length})`));
