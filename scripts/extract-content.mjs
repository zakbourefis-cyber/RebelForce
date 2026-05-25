import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "_archive", "www.rebelforce.nl");

function extractMeta(html, name) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    "i"
  );
  return html.match(re2)?.[1] ?? null;
}

function extractTitle(html) {
  return html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractMainText(html) {
  const main = html.match(/<div id="main"[^>]*>([\s\S]*)<\/div>\s*<script/s);
  if (!main) return "";
  const text = stripTags(main[1]);
  return text.slice(0, 8000);
}

function listHtmlFiles(dir, base = "") {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, ent.name);
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && !ent.name.startsWith("_https_")) {
      out.push(...listHtmlFiles(full, rel));
    } else if (ent.isFile() && ent.name.endsWith(".html")) {
      out.push(rel.replace(/\\/g, "/"));
    }
  }
  return out;
}

const pages = listHtmlFiles(SRC);
const blogPosts = pages.filter(
  (p) =>
    p.startsWith("blog/") &&
    !p.includes("e.html") &&
    !p.includes("o.html") &&
    !p.includes("_https_")
);

const mainPages = [
  "index.html",
  "about.html",
  "works.html",
  "blog.html",
  "contact.html",
  "legal/privacy-policy.html",
  "legal/terms-of-service.html",
];

const data = { main: {}, blog: [] };

for (const p of mainPages) {
  const full = path.join(SRC, p);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, "utf8");
  data.main[p] = {
    title: extractTitle(html),
    description: extractMeta(html, "description"),
    textPreview: extractMainText(html).slice(0, 2000),
  };
}

for (const p of blogPosts) {
  const html = fs.readFileSync(path.join(SRC, p), "utf8");
  data.blog.push({
    slug: p.replace("blog/", "").replace(".html", ""),
    path: p,
    title: extractTitle(html),
    description: extractMeta(html, "description"),
    textPreview: extractMainText(html).slice(0, 500),
  });
}

data.blog.sort((a, b) => a.title.localeCompare(b.title));

fs.mkdirSync(path.join(ROOT, "scripts"), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, "scripts", "site-data.json"),
  JSON.stringify(data, null, 2)
);
console.log("Main pages:", Object.keys(data.main).length);
console.log("Blog posts:", data.blog.length);
console.log("Written scripts/site-data.json");
