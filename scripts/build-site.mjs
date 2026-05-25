import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARCHIVE = path.join(ROOT, "_archive", "www.rebelforce.nl");
const SITE_DATA = path.join(ROOT, "scripts", "site-data.json");

function depthFrom(filePath) {
  const parts = filePath.split("/").filter(Boolean);
  return parts.length > 0 ? parts.length - 1 : 0;
}

function assetPrefix(depth) {
  return depth === 0 ? "" : "../".repeat(depth);
}

function layout({
  title,
  description,
  depth = 0,
  current = "",
  extraCss = "",
  body,
}) {
  const p = assetPrefix(depth);
  const nav = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["works.html", "Works"],
    ["blog.html", "Blog"],
    ["contact.html", "Contact"],
  ];
  const navHtml = nav
    .map(([href, label]) => {
      const cur = current === href ? ' aria-current="page"' : "";
      const link = depth === 0 ? href : p + href;
      return `<li><a href="${link}"${cur}>${label}</a></li>`;
    })
    .join("\n          ");

  const homeLink = depth === 0 ? "index.html" : p + "index.html";
  const blogCss = extraCss.includes("blog") ? `\n  <link rel="stylesheet" href="${p}css/blog.css">` : "";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="icon" href="${p}assets/images/favicon-light.png" media="(prefers-color-scheme: light)">
  <link rel="icon" href="${p}assets/images/favicon-dark.png" media="(prefers-color-scheme: dark)">
  <link rel="stylesheet" href="${p}css/main.css">${blogCss}
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="${homeLink}">Rebel <span>Force</span></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav aria-label="Hoofdnavigatie">
        <ul class="site-nav" id="site-nav">
          ${navHtml}
        </ul>
      </nav>
      <a class="btn btn-primary" href="${depth === 0 ? "contact.html" : p + "contact.html"}">Plan scoping</a>
    </div>
  </header>

  <main>
${body}
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <a class="logo" href="${homeLink}">Rebel <span>Force</span></a>
        <p class="footer-tagline">Beyond Systems. Built by Rebels.</p>
      </div>
      <div>
        <p class="section-label">Links</p>
        <ul class="footer-links">
          <li><a href="${p}about.html">About</a></li>
          <li><a href="${p}works.html">Works</a></li>
          <li><a href="${p}blog.html">Blog</a></li>
          <li><a href="${p}contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="section-label">Contact</p>
        <ul class="footer-links">
          <li><a href="mailto:info@rebelforce.nl">info@rebelforce.nl</a></li>
          <li><a href="tel:+31852502925">+31 85 250 2925</a></li>
          <li>Vondellaan 2, 3521 GD Utrecht</li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; <span id="year">2026</span> Rebel Force</span>
      <span>
        <a href="${p}legal/privacy-policy.html">Privacy</a> ·
        <a href="${p}legal/terms-of-service.html">Terms</a>
      </span>
    </div>
  </footer>
  <script src="${p}js/main.js" defer></script>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanTitle(raw) {
  return raw.replace(/\s*[-–]\s*Rebel Force™?/i, "").trim();
}

function extractArticle(html) {
  const contentMatch = html.match(
    /data-framer-name="Content"[^>]*>([\s\S]*?)<\/div><div class="framer-xu4mmk/
  );
  if (!contentMatch) {
    const alt = html.match(
      /data-framer-name="Content"[^>]*>([\s\S]*?)<\/div><div[^>]+class="framer-/
    );
    if (!alt) return null;
    return sanitizeArticleHtml(alt[1]);
  }
  return sanitizeArticleHtml(contentMatch[1]);
}

function sanitizeArticleHtml(fragment) {
  let out = fragment;
  out = out.replace(/<!--\$-->|<!\/--\$-->/g, "");
  out = out.replace(/\sclass="framer[^"]*"/g, "");
  out = out.replace(/\sdata-styles-preset="[^"]*"/g, "");
  out = out.replace(/\sdir="auto"/g, "");
  out = out.replace(/\sstyle="[^"]*"/g, "");
  out = out.replace(/srcset="[^"]*"/g, "");
  out = out.replace(
    /src="\.\.\/\.\.\/framerusercontent\.com\/images\/([^"?]+)[^"]*"/g,
    'src="https://framerusercontent.com/images/$1"'
  );
  out = out.replace(
    /src="\.\.\/framerusercontent\.com\/images\/([^"?]+)[^"]*"/g,
    'src="https://framerusercontent.com/images/$1"'
  );
  return out.trim();
}

function extractBlogMeta(html) {
  const title =
    html.match(/data-framer-name="Title"[^>]*>[\s\S]*?<h1[^>]*>([^<]+)</)?.[1] ||
    cleanTitle(html.match(/<title>([^<]+)<\/title>/i)?.[1] || "Blog");
  const date =
    html.match(/<time[^>]*datetime="([^"]+)"[^>]*>([^<]*)</)?.[2]?.trim() || "";
  const category =
    html.match(/data-framer-name="Category"[^>]*>[\s\S]*?<h6[^>]*>([^<]+)</)?.[1] ||
    "";
  const heroFromSrcset = html.match(
    /data-framer-name="Banner"[\s\S]*?srcset="(https:\/\/framerusercontent\.com\/images\/[^"?]+\.(?:jpg|png|webp))/
  )?.[1];
  const heroFromSrc = html.match(
    /data-framer-name="Banner"[\s\S]*?src="([^"]+\.(?:jpg|png|webp)[^"]*)"/i
  )?.[1];
  let heroUrl = heroFromSrcset || heroFromSrc || "";
  if (heroUrl && !heroUrl.startsWith("http")) {
    const idMatch = heroUrl.match(/\/images\/([A-Za-z0-9_-]+)/);
    if (idMatch) {
      heroUrl = `https://framerusercontent.com/images/${idMatch[1].replace(/[a-f0-9]{4,5}(\.(?:jpg|png|webp))$/i, "$1")}`;
    }
  }
  heroUrl = heroUrl.split("?")[0];
  return { title, date, category, heroUrl };
}

function buildBlogPosts() {
  const data = JSON.parse(fs.readFileSync(SITE_DATA, "utf8"));
  const blogDir = path.join(ROOT, "blog");
  fs.mkdirSync(blogDir, { recursive: true });

  const posts = [];

  for (const post of data.blog) {
    const archivePath = path.join(ARCHIVE, post.path);
    if (!fs.existsSync(archivePath)) continue;

    const html = fs.readFileSync(archivePath, "utf8");
    const meta = extractBlogMeta(html);
    const articleHtml = extractArticle(html);
    if (!articleHtml) {
      console.warn("Skip (no content):", post.slug);
      continue;
    }

    const displayTitle = meta.title || cleanTitle(post.title);
    const desc =
      post.description && !post.description.startsWith("Data is the key")
        ? post.description
        : articleHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);

    posts.push({
      slug: post.slug,
      title: displayTitle,
      description: desc,
      date: meta.date,
      category: meta.category,
      heroUrl: meta.heroUrl,
      articleHtml,
    });
  }

  posts.sort((a, b) => {
    const da = Date.parse(a.date) || 0;
    const db = Date.parse(b.date) || 0;
    return db - da;
  });

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const prev = posts[i - 1];
    const next = posts[i + 1];
    const heroBlock = post.heroUrl
      ? `      <img class="article-hero-img" src="${escapeHtml(post.heroUrl)}" alt="" loading="lazy">\n`
      : "";

    const navParts = [];
    if (prev)
      navParts.push(
        `<a href="${prev.slug}.html">‹ ${escapeHtml(prev.title)}</a>`
      );
    else navParts.push("<span></span>");
    if (next)
      navParts.push(
        `<a href="${next.slug}.html">${escapeHtml(next.title)} ›</a>`
      );

    const body = `
    <article class="container">
      <header class="article-header">
        ${post.category ? `<p class="article-category">${escapeHtml(post.category)}</p>` : ""}
        <h1>${escapeHtml(post.title)}</h1>
        ${post.date ? `<p class="article-date">${escapeHtml(post.date)}</p>` : ""}
      </header>
${heroBlock}      <div class="article-content">
        ${post.articleHtml}
      </div>
      <nav class="article-nav" aria-label="Artikel navigatie">
        ${navParts.join("\n        ")}
      </nav>
    </article>`;

    const page = layout({
      title: `${post.title} – Rebel Force`,
      description: post.description,
      depth: 1,
      current: "",
      extraCss: "blog",
      body,
    });

    fs.writeFileSync(path.join(blogDir, `${post.slug}.html`), page);
  }

  console.log(`Built ${posts.length} blog posts`);
  return posts;
}

function buildBlogIndex(posts) {
  const cards = posts
    .map(
      (p) => `
        <a class="card" href="blog/${p.slug}.html">
          <div class="card-body">
            <p class="card-meta">${escapeHtml(p.category || "Insight")}${p.date ? ` · ${escapeHtml(p.date)}` : ""}</p>
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.description.slice(0, 120))}…</p>
          </div>
        </a>`
    )
    .join("");

  const body = `
    <section class="hero">
      <div class="container">
        <p class="hero-eyebrow">Blog</p>
        <h1>Latest insights</h1>
        <p class="hero-lead">Praktische kennis over AI-implementatie, procesoptimalisatie en digitale transformatie voor het Nederlandse MKB.</p>
      </div>
    </section>
    <section class="section blog-listing">
      <div class="container card-grid card-grid--3">
        ${cards}
      </div>
    </section>`;

  fs.writeFileSync(
    path.join(ROOT, "blog.html"),
    layout({
      title: "AI Insights & Updates – Rebel Force Blog",
      description:
        "Praktische kennis over AI-implementatie, procesoptimalisatie en digitale transformatie voor het Nederlandse MKB.",
      current: "blog.html",
      extraCss: "blog",
      body,
    })
  );
}

// Run after archive is in place
if (!fs.existsSync(ARCHIVE)) {
  console.error("Archive not found at", ARCHIVE);
  console.error("Run reorganize first or copy www.rebelforce.nl to _archive/");
  process.exit(1);
}

const posts = buildBlogPosts();
buildBlogIndex(posts);
console.log("Done.");
