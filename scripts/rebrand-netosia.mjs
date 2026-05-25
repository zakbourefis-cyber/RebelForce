/**
 * Deploy Framer pages to site root + rebrand to Netosia (French web agency).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FRAMER = path.join(ROOT, "framer");

/** Longest-first replacements for visible copy & meta */
const REPLACEMENTS = [
  ["Rebel Force – AI Enablement voor Nederlandse MKB", "Netosia — Agence web en France"],
  ["Rebel Force helpt MKB-bedrijven AI structureel inzetten. Van constraint discovery tot meetbare procesverbetering. Plan een gratis demo.", "Netosia conçoit et développe des sites web sur mesure pour les entreprises françaises. De la stratégie au déploiement — demandez un devis gratuit."],
  ["Description: Rebel Force helpt MKB-bedrijven AI structureel inzetten. Van constraint discovery tot meetbare procesverbetering. Plan een gratis demo.", "Netosia conçoit et développe des sites web sur mesure pour les entreprises françaises. De la stratégie au déploiement — demandez un devis gratuit."],
  ["www.rebelforce.nl", "www.netosia.fr"],
  ["info@rebelforce. nl", "contact@netosia.fr"],
  ["info@rebelforce.nl", "contact@netosia.fr"],
  ["+31 85 250 2925", "+33 1 84 00 00 00"],
  ["Vondellaan 2, Utrecht, 3521 GD", "12 rue de la République, 75011 Paris"],
  ["Beyond Systems. Built by Rebels.", "Des sites qui convertissent. Conçus en France."],
  ["Beyond Systems. Built by Rebels", "Des sites qui convertissent. Conçus en France."],
  ["Rebel Force vervangt jouw mensen niet. Wij integreren met jouw teams en herstructureren de samenwerking rondom de bottleneck.", "Netosia ne remplace pas vos équipes. Nous collaborons avec vos équipes marketing et produit pour livrer un site aligné sur vos objectifs."],
  ["Exitconditie: als wij vertrekken, kunnen jouw mensen het zelfstandig voortzetten.", "À la livraison, vous reprenez la main : CMS, documentation et formation inclus."],
  ["Elk traject begint met diagnose. Niet met een voorstel.", "Chaque projet commence par un brief. Pas par un devis générique."],
  ["Drie gespecialiseerde labels. Één ecosysteem. Gebouwd voor ondernemers die resultaat boven ruis verkiezen.", "Trois expertises complémentaires. Une seule équipe. Pensée pour les marques qui veulent un site qui performe."],
  ["AI FCTRY — data-infrastructuur en AI-implementatie voor het Nederlandse MKB", "Studio — conception UX/UI et développement sur mesure"],
  ["Boek je scoping nu", "Demander un devis"],
  ["Boek je scoping", "Demander un devis"],
  ["Partners:", "Ils nous font confiance :"],
  ["Available for Projects", "Disponible pour vos projets"],
  ["WAT WIJ DOEN", "CE QUE NOUS FAISONS"],
  ["MEER PROJECTEN", "PLUS DE RÉALISATIONS"],
  ["GET IN TOUCH", "NOUS CONTACTER"],
  ["LET'S TALK", "PARLONS EN"],
  ["LET'S WORK TOGETHER", "TRAVAILLONS ENSEMBLE"],
  ["Constraint Discovery.", "Découverte du besoin."],
  ["Enablement Blueprint.", "Cahier des charges."],
  ["Design Phase", "Phase design"],
  ["Diagnose Phase", "Phase découverte"],
  ["Execution Phase", "Phase livraison"],
  ["Diagnose", "Découverte"],
  ["Ontwerp fase", "Phase design"],
  ["Dedicated Flow Execution.", "Développement dédié."],
  ["Dedicated uitvoering.", "Production dédiée."],
  ["ROI &amp; Compound Learning.", "SEO &amp; suivi des performances."],
  ["ROI &amp; doorlopend leren.", "Optimisation continue."],
  ["Knelpunten identificeren", "Identifier vos objectifs"],
  ["Commerciële AI", "Sites vitrines"],
  ["Wij verwijderen procesbottlenecks zodat teams sneller leveren met minder fouten", "Des sites clairs et rapides qui présentent votre activité et génèrent des leads"],
  ["Outreach Automatisering", "Landing pages"],
  ["CRM Automatisering", "Intégration CRM"],
  ["Web Automatisering", "Sites corporate"],
  ["Maatwerk Automatisering", "Sur mesure"],
  ["Industriële AI", "E-commerce"],
  ["Wij zetten jouw data om naar dashboards en automatiseringen die omzet, kosten of snelheid verbeteren", "Boutiques en ligne performantes, paiement et catalogue adaptés à votre modèle"],
  ["Compliance Automatisering", "Conformité RGPD"],
  ["ESG Automatisering", "Accessibilité"],
  ["Kwaliteitsautomatisering", "Qualité & tests"],
  ["Industrie 4.0 Automatisering", "Automatisation"],
  ["AI-Engineering", "Identité & UX"],
  ["Wij leveren strategie, implementatie en bezetting voor AI-projecten die daadwerkelijk in productie draaien", "Direction artistique, design system et expérience utilisateur cohérente sur tous les supports"],
  ["Fractional Leaders", "Direction de projet"],
  ["Jong Talent", "Intégrations"],
  ["Interim Managers", "Migration"],
  ["AI Engineers", "Développeurs"],
  ["AI Data Platform", "Performance web"],
  ["Wij implementeren AI-tools die repetitief werk automatiseren en besluitvorming ondersteunen", "Core Web Vitals, SEO technique et hébergement optimisé pour la vitesse"],
  ["AI-Databeheer", "Analytics"],
  ["AI-Workflows", "Automatisations"],
  ["AI-Analytics", "Tableaux de bord"],
  ["AI Talentontwikkeling", "Maintenance"],
  ["Data-gedreven talentontwikkeling voor organisaties die mensen en prestaties serieus nemen", "Mises à jour, sécurité et évolutions — votre site reste à jour après la mise en ligne"],
  ["Talent Data Profiling", "Audit technique"],
  ["Workforce Optimalisatie", "Optimisation"],
  ["Prestatieontwikkeling", "Formation CMS"],
  ["Mensen &amp; Cultuur Kompas", "Accompagnement"],
  ["ONE FORCE.", "NETOSIA."],
  ["ONE FORCE", "NETOSIA"],
  ["Rebel Force", "Netosia"],
  ["https://aifctry.nl/", "contact.html"],
  ["https://aifctry.nl", "contact.html"],
  ["Description: ", ""],
  ["WAT WIJ DOEN", "CE QUE NOUS FAISONS"],
  ["STAP 1", "ÉTAPE 1"],
  ["STAP 2", "ÉTAPE 2"],
  ["STAP 3", "ÉTAPE 3"],
  ["STAP 4", "ÉTAPE 4"],
  ["STEP 1", "ÉTAPE 1"],
  ["STEP 2", "ÉTAPE 2"],
  ["STEP 3", "ÉTAPE 3"],
  ["STEP 4", "ÉTAPE 4"],
  ["fase", "phase"],
  ["Website", "Site web"],
  ["GEEN GEEN AI-STRATEGIE. AI-STRATEGIE.", "PAS DE SITE VITRINE. UN VRAI SITE WEB."],
  ["GEEN", "NON"],
  [" AI-STRATEGIE.", " SITE VITRINE."],
  [" AI-STRATEGIE", " SITE VITRINE"],
  ["EEN AI-SYSTEEM.", "UNE PRÉSENCE DIGITALE SUR MESURE."],
  ["EEN ", "UNE "],
  ["AI-SYSTEEM.", "PRÉSENCE DIGITALE."],
  ["AI-SYSTEEM", "PRÉSENCE DIGITALE"],
  ["AI FCTRY", "Studio Web"],
  ["B2B Groeimachine", "Growth"],
  ["RebelHub", "Support"],
  ["NetoHub", "Support"],
  ["coworking en community voor ondernemers die bouwen", "accompagnement et maintenance pour vos sites"],
  ["lidmaatschap op maand- of jaarbasis", "forfait mensuel ou annuel"],
  ["(LINKS)", "(LIENS)"],
  ["(SOCIALS)", "(RÉSEAUX)"],
  ["(email)", "(e-mail)"],
  ["(phone)", "(téléphone)"],
  ["(Address)", "(Adresse)"],
  ["(Office Hours)", "(Horaires)"],
  ["Monday - Friday 9:00 AM – 6:00 PM (GMT+1)", "Lundi – vendredi 9h – 18h (CET)"],
  ["Sign up for our newsletter to get latest insights and updates", "Inscrivez-vous pour recevoir nos actualités web"],
  ["Enter email address", "Votre e-mail"],
  ["SUBSCRIBE", "S'INSCRIRE"],
  ["Privacy Policy", "Politique de confidentialité"],
  ["Terms of Agreement", "Conditions générales"],
  ["All Rights Reserved", "Tous droits réservés"],
  ["@2025 Rebel Force", "@2026 Netosia"],
  ["@2025", "@2026"],
  ["(BLOG)", "(BLOG)"],
  ["LATEST INSIGHTS", "DERNIERS ARTICLES"],
  ["L A T E S T", "D E R N I E R S"],
  ["OUR WORKS", "NOS RÉALISATIONS"],
  ["O U R W O R K S", "N O S  R É A L I S A T I O N S"],
  ["(ABOUT US)", "(À PROPOS)"],
  ["(CONTACT US)", "(CONTACT)"],
  ["Have a project in mind? We'd love to hear about it. Let's create something great together!", "Un projet en tête ? Écrivez-nous. Créons ensemble un site qui vous ressemble."],
  ["H a v e a p r o j e c t", "U n  p r o j e t"],
  ["Services", "Services"],
  ["Home", "Accueil"],
  ["About", "À propos"],
  ["Works", "Réalisations"],
  ["Contact", "Contact"],
  ["Blog", "Blog"],
  ["AI Enablement", "Création web"],
  ["Operational Excellence", "Performance"],
  ["Plan een scoping call", "Planifier un appel découverte"],
  ["Plan a scoping", "Planifier un appel"],
  ["lang=\"en\"", "lang=\"fr\""],
  ["lang=\"nl\"", "lang=\"fr\""],
  ["Hoofdnavigatie", "Navigation principale"],
  ["Mirrored from www.rebelforce.nl", "Netosia — site généré depuis archive Framer"],
];

/** Replace text built from per-letter <span>X</span> animations */
function replaceLetterAnimatedPhrase(html, fromPhrase, toPhrase) {
  const buildPattern = (phrase) =>
    phrase
      .split("")
      .map((ch) => {
        const esc = ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return `<span style="display:inline-block;[^"]*">${esc}</span>`;
      })
      .join("\\s*");

  try {
    const re = new RegExp(buildPattern(fromPhrase), "g");
    const toSpans = toPhrase
      .split("")
      .map(
        (ch) =>
          `<span style="display:inline-block;opacity:0.001;transform:translateX(0px) translateY(100px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)">${ch}</span>`
      )
      .join("");
    return html.replace(re, toSpans);
  } catch {
    return html;
  }
}

const HERO_PHRASES = [
  ["GEEN GEEN AI-STRATEGIE. AI-STRATEGIE.", "PAS DE SITE VITRINE. UN VRAI SITE."],
  ["EEN AI-SYSTEEM.", "UNE PRÉSENCE DIGITALE."],
  ["HOW WE WORK", "NOTRE MÉTHODE"],
  ["HOWWEWORK", "NOTREMÉTHODE"],
];

function rebrand(html) {
  let out = html;
  for (const [from, to] of HERO_PHRASES) {
    out = replaceLetterAnimatedPhrase(out, from.replace(/\s/g, ""), to.replace(/\s/g, ""));
    out = replaceLetterAnimatedPhrase(out, from, to);
  }
  for (const [from, to] of REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

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

function deployToRoot() {
  if (!fs.existsSync(FRAMER)) {
    console.error("Run: npm run patch:framer  first");
    process.exit(1);
  }

  const rootPages = [
    "index.html",
    "about.html",
    "contact.html",
    "works.html",
    "blog.html",
    "services.html",
  ];

  for (const file of rootPages) {
    const src = path.join(FRAMER, file);
    if (!fs.existsSync(src)) continue;
    const html = rebrand(fs.readFileSync(src, "utf8"));
    fs.writeFileSync(path.join(ROOT, file), html);
    console.log("→", file);
  }

  const blogFramer = path.join(FRAMER, "blog");
  const blogOut = path.join(ROOT, "blog");
  if (fs.existsSync(blogFramer)) {
    const posts = listHtmlFiles(blogFramer);
    for (const rel of posts) {
      const src = path.join(blogFramer, rel);
      const dest = path.join(blogOut, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, rebrand(fs.readFileSync(src, "utf8")));
    }
    console.log(`→ blog/ (${posts.length} pages)`);
  }

  const worksFramer = path.join(FRAMER, "works");
  const worksOut = path.join(ROOT, "works");
  if (fs.existsSync(worksFramer)) {
    const cases = listHtmlFiles(worksFramer);
    for (const rel of cases) {
      const src = path.join(worksFramer, rel);
      const dest = path.join(worksOut, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, rebrand(fs.readFileSync(src, "utf8")));
    }
    console.log(`→ works/ (${cases.length} pages)`);
  }

  const legalFramer = path.join(FRAMER, "legal");
  const legalOut = path.join(ROOT, "legal");
  if (fs.existsSync(legalFramer)) {
    for (const rel of listHtmlFiles(legalFramer)) {
      const src = path.join(legalFramer, rel);
      const dest = path.join(legalOut, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, rebrand(fs.readFileSync(src, "utf8")));
    }
    console.log("→ legal/");
  }

  console.log("Netosia rebrand complete.");
}

deployToRoot();
