/**
 * Build Netosia site: patch Framer HTML from source → root (French only).
 * Requires _archive/www.rebelforce.nl only when rebuilding from mirror.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { rebrand } from "./rebrand-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "_archive", "www.rebelforce.nl");
const IMAGES_SRC = path.join(ROOT, "assets", "framer", "images");

const ROOT_PAGES = [
  "index.html",
  "about.html",
  "contact.html",
  "works.html",
  "services.html",
  "legal/privacy-policy.html",
  "legal/terms-of-service.html",
];

const WORKS_PAGES = ["happybase.html", "happybase-2.html", "excelsior.html", "thriveos.html"];

function listHtmlFiles(dir, base = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, ent.name).replace(/\\/g, "/");
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && !ent.name.startsWith("_https_")) {
      out.push(...listHtmlFiles(full, rel));
    } else if (ent.isFile() && ent.name.endsWith(".html")) {
      out.push(rel);
    }
  }
  return out;
}

function resolveFramerImage(filename) {
  if (!filename || !fs.existsSync(IMAGES_SRC)) return null;
  const exact = path.join(IMAGES_SRC, filename);
  if (fs.existsSync(exact)) return filename;
  const base = filename.replace(/[a-f0-9]{4,5}(\.(jpg|jpeg|png|webp|gif))$/i, "$1");
  if (base !== filename && fs.existsSync(path.join(IMAGES_SRC, base))) return base;
  const stem = filename.replace(/\.[^.]+$/, "");
  const ext = path.extname(filename);
  const files = fs.readdirSync(IMAGES_SRC);
  const match = files.find(
    (f) => f.startsWith(stem) && f.endsWith(ext) && /^[a-z0-9]+$/i.test(f.slice(stem.length, -ext.length))
  );
  return match ?? null;
}

function patchHtml(html, depth) {
  const assetPrefix = depth === 0 ? "" : "../".repeat(depth);
  let out = html;

  out = out.replace(/<script>function initApollo\(\)[\s\S]*?<\/script>\s*/g, "");
  out = out.replace(
    /<script type="text\/javascript" id="hs-script-loader"[^>]*><\/script>\s*/g,
    ""
  );
  out = out.replace(
    /<link href="\.\.\/framerusercontent\.com\/images\/[^"]+" rel="icon"[^>]*>\s*/gi,
    ""
  );
  out = out.replace(
    /<link rel="apple-touch-icon" href="\.\.\/framerusercontent\.com\/images\/[^"]+"\s*>\s*/gi,
    ""
  );
  out = out.replace(
    /<link rel="apple-touch-icon" href="[^"]*_archive\/framerusercontent[^"]+"\s*>\s*/gi,
    ""
  );

  if (!out.includes("favicon-light.png")) {
    out = out.replace(
      /<meta name="viewport"/,
      `<link rel="icon" href="${assetPrefix}assets/images/favicon-light.png" media="(prefers-color-scheme: light)">\n  <link rel="icon" href="${assetPrefix}assets/images/favicon-dark.png" media="(prefers-color-scheme: dark)">\n  <meta name="viewport"`
    );
  }

  const imageBase = `${assetPrefix}assets/framer/images/`;

  out = out.replace(/(\.\.\/)+_archive\/framerusercontent\.com\/images\/([^"?\s]+)/g, (_, _d, file) => {
    const resolved = resolveFramerImage(file) ?? file;
    return imageBase + resolved;
  });

  out = out.replace(
    /(\.\.\/)+(framerusercontent\.com\/images\/)([^"?\s]+)/g,
    (_, _dots, _folder, file) => {
      const resolved = resolveFramerImage(file) ?? file;
      return imageBase + resolved;
    }
  );

  out = out.replace(/srcset="([^"]*)"/g, (m, srcset) => {
    const https = srcset.match(/https:\/\/framerusercontent\.com\/images\/[^\s,]+/);
    if (https) return `srcset="${https[0].split("?")[0]}"`;
    return m;
  });

  return out;
}

function writeBlogStub() {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog — Netosia</title>
  <meta name="description" content="Actualités et conseils web par Netosia, agence web en France.">
  <link rel="icon" href="assets/images/favicon-light.png">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="index.html">Neto<span>sia</span></a>
      <nav>
        <a href="index.html">Accueil</a>
        <a href="about.html">À propos</a>
        <a href="services.html">Services</a>
        <a href="works.html">Réalisations</a>
        <a href="blog.html" aria-current="page">Blog</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>
  <main class="wrap page">
    <h1>Blog</h1>
    <p class="lead">Articles à venir — conseils sur la création de sites, le SEO et la performance web.</p>
    <p><a href="index.html">← Retour à l'accueil</a></p>
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <p>© ${new Date().getFullYear()} Netosia · <a href="mailto:contact@netosia.fr">contact@netosia.fr</a></p>
    </div>
  </footer>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, "blog.html"), html);
}

function buildFromSource() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source mirror missing:", SOURCE);
    console.error("Run from existing HTML or restore _archive/www.rebelforce.nl");
    process.exit(1);
  }

  for (const rel of ROOT_PAGES) {
    const src = path.join(SOURCE, rel);
    if (!fs.existsSync(src)) continue;
    const depth = rel.split("/").length - 1;
    const html = rebrand(patchHtml(fs.readFileSync(src, "utf8"), depth));
    const dest = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);
    console.log("✓", rel);
  }

  for (const file of WORKS_PAGES) {
    const rel = `works/${file}`;
    const src = path.join(SOURCE, rel);
    if (!fs.existsSync(src)) continue;
    const html = rebrand(patchHtml(fs.readFileSync(src, "utf8"), 1));
    const dest = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);
    console.log("✓", rel);
  }

  writeBlogStub();
  console.log("✓ blog.html (stub FR)");
}

function fixPathsInPlace() {
  const htmlFiles = listHtmlFiles(ROOT).filter(
    (f) =>
      !f.startsWith("_archive") &&
      !f.startsWith("framer") &&
      !f.startsWith("blog/")
  );
  for (const rel of htmlFiles) {
    const full = path.join(ROOT, rel);
    const depth = rel.split("/").length - 1;
    const html = rebrand(patchHtml(fs.readFileSync(full, "utf8"), depth));
    fs.writeFileSync(full, html);
  }
  console.log(`Patched ${htmlFiles.length} pages`);
}

if (process.argv.includes("--fix-paths")) {
  fixPathsInPlace();
  writeBlogStub();
} else {
  buildFromSource();
}
