import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const texts = new Set();
const re = />([^<]{12,120})</g;
let m;
while ((m = re.exec(html))) {
  const t = m[1].replace(/\s+/g, " ").trim();
  if (/[a-zA-Z]{4}/.test(t) && !t.includes("{") && !t.includes("var(")) texts.add(t);
}
[...texts].sort().forEach((t) => console.log(t));
