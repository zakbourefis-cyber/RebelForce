import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARCHIVE = path.join(ROOT, "_archive", "www.rebelforce.nl", "works");

const CASES = [
  { file: "happybase.html", slug: "happybase", title: "Happybase", tag: "Business Development" },
  { file: "happybase-2.html", slug: "happybase-2", title: "Blijkgroep", tag: "Automation" },
  { file: "excelsior.html", slug: "excelsior", title: "Excelsior", tag: "Data & Analytics" },
];

function layoutCase({ title, tag, body, depth }) {
  const p = depth ? "../" : "";
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} – Rebel Force Works</title>
  <link rel="icon" href="${p}assets/images/favicon-light.png" media="(prefers-color-scheme: light)">
  <link rel="stylesheet" href="${p}css/main.css">
  <link rel="stylesheet" href="${p}css/blog.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="${p}index.html">Rebel <span>Force</span></a>
      <button class="nav-toggle" type="button" aria-expanded="false">Menu</button>
      <nav aria-label="Hoofdnavigatie">
        <ul class="site-nav" id="site-nav">
          <li><a href="${p}index.html">Home</a></li>
          <li><a href="${p}about.html">About</a></li>
          <li><a href="${p}works.html" aria-current="page">Works</a></li>
          <li><a href="${p}blog.html">Blog</a></li>
          <li><a href="${p}contact.html">Contact</a></li>
        </ul>
      </nav>
      <a class="btn btn-primary" href="${p}contact.html">Plan scoping</a>
    </div>
  </header>
  <main>
    <article class="container">
      <header class="article-header">
        <p class="article-category">${tag}</p>
        <h1>${title}</h1>
      </header>
      <div class="article-content">${body}</div>
      <p style="margin-top: 2rem;"><a href="${p}works.html">← Alle cases</a></p>
    </article>
  </main>
  <footer class="site-footer">
    <div class="container footer-bottom">
      <span>&copy; <span id="year">2026</span> Rebel Force</span>
    </div>
  </footer>
  <script src="${p}js/main.js" defer></script>
</body>
</html>`;
}

function extractContent(html) {
  const m = html.match(/data-framer-name="Content"[^>]*>([\s\S]*?)<\/div><div/);
  if (!m) return "<p>Case study content — bewerk dit bestand in <code>works/</code>.</p>";
  return m[1]
    .replace(/<!--\$-->|<!\/--\$-->/g, "")
    .replace(/\sclass="framer[^"]*"/g, "")
    .replace(/\sstyle="[^"]*"/g, "")
    .replace(/src="\.\.\/\.\.\/framerusercontent[^"]+"/g, "")
    .trim();
}

const outDir = path.join(ROOT, "works");
fs.mkdirSync(outDir, { recursive: true });

// Thriveos - may not exist in archive, create stub
fs.writeFileSync(
  path.join(outDir, "thriveos.html"),
  layoutCase({
    title: "Thriveos",
    tag: "AI Enablement",
    depth: 1,
    body: "<p>AI-driven online academy — case study. Voeg hier je projectdetails toe.</p>",
  })
);

for (const c of CASES) {
  const src = path.join(ARCHIVE, c.file);
  const body = fs.existsSync(src)
    ? extractContent(fs.readFileSync(src, "utf8"))
    : `<p>Case: ${c.title}</p>`;
  fs.writeFileSync(
    path.join(outDir, `${c.slug}.html`),
    layoutCase({ title: c.title, tag: c.tag, body, depth: 1 })
  );
}

console.log("Built works pages");
