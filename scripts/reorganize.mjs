import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARCHIVE_ROOT = path.join(ROOT, "_archive");

const MOVE_TO_ARCHIVE = [
  "www.rebelforce.nl",
  "hts-cache",
  "app.wrapifai.com",
  "assets.apollo.io",
  "framerusercontent.com",
  "js-eu1.hs-scripts.com",
  "unpkg.com",
  "backblue.gif",
  "fade.gif",
  "cookies.txt",
  "hts-log.txt",
];

fs.mkdirSync(ARCHIVE_ROOT, { recursive: true });

for (const name of MOVE_TO_ARCHIVE) {
  const src = path.join(ROOT, name);
  const dest = path.join(ARCHIVE_ROOT, name);
  if (!fs.existsSync(src)) continue;
  if (fs.existsSync(dest)) {
    console.log("Already archived:", name);
    continue;
  }
  fs.renameSync(src, dest);
  console.log("Archived:", name);
}

console.log("Reorganize complete.");
