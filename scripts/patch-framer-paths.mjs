/**
 * Patches HTTrack Framer HTML so it runs locally with animations.
 * - Fixes ../framerusercontent.com/ image paths (HTTrack hash suffixes)
 * - Points favicons to site assets
 * - Removes broken offline tracker scripts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARCHIVE_SITE = path.join(ROOT, "_archive", "www.rebelforce.nl");
const FRAMER_OUT = path.join(ROOT, "framer");
const IMAGES_SRC = path.join(ROOT, "_archive", "framerusercontent.com", "images");

function listHtmlFiles(dir, base = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
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
  const prefix = depth === 0 ? "" : "../".repeat(depth);
  const assetPrefix = depth === 0 ? "" : "../".repeat(depth);

  let out = html;

  // Broken offline trackers
  out = out.replace(
    /<script>function initApollo\(\)[\s\S]*?<\/script>\s*/g,
    ""
  );
  out = out.replace(
    /<script type="text\/javascript" id="hs-script-loader"[^>]*><\/script>\s*/g,
    ""
  );

  // Favicons → project assets
  out = out.replace(
    /<link href="\.\.\/framerusercontent\.com\/images\/[^"]+" rel="icon"[^>]*>\s*/g,
    ""
  );
  if (!out.includes("favicon-light.png")) {
    out = out.replace(
      /<meta name="viewport"/,
      `<link rel="icon" href="${assetPrefix}assets/images/favicon-light.png" media="(prefers-color-scheme: light)">\n  <link rel="icon" href="${assetPrefix}assets/images/favicon-dark.png" media="(prefers-color-scheme: dark)">\n  <meta name="viewport"`
    );
  }

  // Local framer images: ../framerusercontent.com/images/X → ../_archive/framerusercontent.com/images/X
  out = out.replace(
    /(\.\.\/)+(framerusercontent\.com\/images\/)([^"?\s]+)/g,
    (_, _dots, folder, file) => {
      const resolved = resolveFramerImage(file) ?? file;
      return `${assetPrefix}_archive/${folder}${resolved}`;
    }
  );

  // srcset: prefer https CDN entries embedded in broken srcset strings
  out = out.replace(
    /srcset="([^"]*)"/g,
    (m, srcset) => {
      const https = srcset.match(/https:\/\/framerusercontent\.com\/images\/[^\s,]+/);
      if (https) {
        const url = https[0].split("?")[0];
        return `srcset="${url}"`;
      }
      return m;
    }
  );

  return out;
}

function copyFramerSite() {
  if (!fs.existsSync(ARCHIVE_SITE)) {
    console.error("Archive missing:", ARCHIVE_SITE);
    process.exit(1);
  }

  fs.rmSync(FRAMER_OUT, { recursive: true, force: true });
  fs.mkdirSync(FRAMER_OUT, { recursive: true });

  const files = listHtmlFiles(ARCHIVE_SITE);
  for (const rel of files) {
    const src = path.join(ARCHIVE_SITE, rel);
    const dest = path.join(FRAMER_OUT, rel);
    const depth = rel.split("/").length - 1;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const html = fs.readFileSync(src, "utf8");
    fs.writeFileSync(dest, patchHtml(html, depth));
  }

  console.log(`Patched ${files.length} pages → framer/`);
  console.log("Preview: npx serve .  then open http://localhost:3000/framer/");
}

copyFramerSite();
