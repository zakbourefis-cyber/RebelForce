/** French Netosia copy + disable Framer hydration (stops English CMS overwrite) */

const REPLACEMENTS = [
  // —— Long phrases first (order matters for split/replace) ——
  [
    "Rebel Force helpt MKB-bedrijven AI structureel inzetten. Van constraint discovery tot meetbare procesverbetering. Plan een gratis demo.",
    "Netosia conçoit et développe des sites web sur mesure pour les entreprises françaises. De la stratégie au déploiement — demandez un devis gratuit.",
  ],
  [
    "Description: Rebel Force helpt MKB-bedrijven AI structureel inzetten. Van constraint discovery tot meetbare procesverbetering. Plan een gratis demo.",
    "Netosia conçoit et développe des sites web sur mesure pour les entreprises françaises. De la stratégie au déploiement — demandez un devis gratuit.",
  ],
  [
    "Rebel Force vervangt jouw mensen niet. Wij integreren met jouw teams en herstructureren de samenwerking rondom de bottleneck.",
    "Netosia ne remplace pas vos équipes. Nous collaborons avec vos équipes marketing et produit pour livrer un site aligné sur vos objectifs.",
  ],
  [
    "Together with Rebel Force and their team, we made tremendous progress on our new propositions. A reliable partner that truly thinks along and delivers momentum.",
    "Avec Netosia, nous avons fait d'énormes progrès sur nos nouveaux projets web. Un partenaire fiable qui réfléchit avec vous et livre des résultats.",
  ],
  [
    "Rebel Force is helping us build an AI-supported platform that integrates an online learning environment and athlete dashboards.",
    "Netosia nous accompagne sur la refonte de notre plateforme web et l'intégration de nos outils métier.",
  ],
  [
    "From day one, they've translated complex technical concepts into clear decisions, guiding us to make the right choices for Thriveos to grow to its full potential.",
    "Dès le premier jour, l'équipe traduit des enjeux techniques en décisions claires pour faire grandir le projet.",
  ],
  [
    "After merging several entities within our group, we were looking for synergy in our sales operations. Rebel Force, through their fractional leadership, achieved this by creating a unified approach — from strategy to reporting, all within one integrated system.",
    "Après la fusion de plusieurs entités, nous cherchions une synergie commerciale. Netosia a unifié notre approche — de la stratégie au reporting — dans un seul système.",
  ],
  [
    "AI FCTRY — data-infrastructuur en AI-implementatie voor het Nederlandse MKB",
    "Studio — conception UX/UI et développement sur mesure",
  ],
  [
    "Wij werken selectief. Een traject start altijd met een scoping call. Als de fit er niet is, zeggen we dat direct.",
    "Nous travaillons de façon sélective. Chaque projet commence par un appel découverte. Si ce n'est pas le bon fit, nous vous le disons clairement.",
  ],
  [
    "Wij zetten jouw data om naar dashboards en automatiseringen die omzet, kosten of snelheid verbeteren",
    "Boutiques en ligne performantes, paiement et catalogue adaptés à votre modèle",
  ],
  [
    "Wij verwijderen procesbottlenecks zodat teams sneller leveren met minder fouten",
    "Des sites clairs et rapides qui présentent votre activité et génèrent des leads",
  ],
  [
    "Wij leveren strategie, implementatie en bezetting voor AI-projecten die daadwerkelijk in productie draaien",
    "Direction artistique, design system et expérience utilisateur cohérente sur tous les supports",
  ],
  [
    "Wij implementeren AI-tools die repetitief werk automatiseren en besluitvorming ondersteunen",
    "Core Web Vitals, SEO technique et hébergement optimisé pour la vitesse",
  ],
  [
    "Data-gedreven talentontwikkeling voor organisaties die mensen en prestaties serieus nemen",
    "Mises à jour, sécurité et évolutions — votre site reste à jour après la mise en ligne",
  ],
  [
    "Drie gespecialiseerde labels. Één ecosysteem. Gebouwd voor ondernemers die resultaat boven ruis verkiezen.",
    "Trois expertises complémentaires. Une seule équipe. Pensée pour les marques qui veulent un site qui performe.",
  ],
  [
    "Have a project in mind? We'd love to hear about it. Let's create something great together!",
    "Un projet en tête ? Écrivez-nous. Créons ensemble un site qui vous ressemble.",
  ],
  [
    "Netosia is opgericht door Peter Grisel, voormalig Ranger. Wij geloven in discipline, structuur en resultaat. Geen hype, wel impact.",
    "Netosia est une agence web française. Nous croyons en la discipline, la structure et les résultats. Pas de hype, de l'impact.",
  ],
  [
    "Rebel Force is opgericht door Peter Grisel, voormalig Ranger. Wij geloven in discipline, structuur en resultaat. Geen hype, wel impact.",
    "Netosia est une agence web française. Nous croyons en la discipline, la structure et les résultats. Pas de hype, de l'impact.",
  ],
  [
    "Exitconditie: als wij vertrekken, kunnen jouw mensen het zelfstandig voortzetten.",
    "À la livraison, vous reprenez la main : CMS, documentation et formation inclus.",
  ],
  [
    "Elk traject begint met diagnose. Niet met een voorstel.",
    "Chaque projet commence par un brief. Pas par un devis générique.",
  ],
  [
    "Een scoping call kost je 45 minuten. En levert je een concreet plan op.",
    "Un appel découverte de 45 minutes pour obtenir un plan d'action concret.",
  ],
  [
    "Standardized AI templates, governance, and data checks turn ad-hoc workflows into repeatable systems that deliver measurable ROI for teams.",
    "Des modèles, une gouvernance et des contrôles qualité transforment vos processus en systèmes reproductibles et mesurables.",
  ],
  [
    "Close the AI talent gap by building cross-functional teams, aligning skills to business goals, and using role-based training and governance.",
    "Constituez des équipes pluridisciplinaires, alignez les compétences sur vos objectifs et structurez la montée en compétences.",
  ],
  [
    "How AI-driven predictive analytics reduces downtime, shortens cycle times, and embeds actionable forecasts into workflows.",
    "Comment l'analytique prédictive réduit les délais et intègre des prévisions actionnables dans vos processus.",
  ],
  [
    "Learn strategies to avoid enterprise AI failure, mitigate risks, and scale AI adoption effectively for transformative outcomes.",
    "Stratégies pour réussir vos projets digitaux, limiter les risques et déployer à l'échelle.",
  ],
  [
    "Discover how Strive integrates AI into large-scale systems to improve efficiency, reduce costs, and drive innovation for businesses.",
    "Découvrez comment structurer vos projets web pour gagner en efficacité, réduire les coûts et innover.",
  ],
  ["How to Operationalize AI for Real Business Impact", "Comment déployer le web au service de votre activité"],
  ["AI Talent Gap: Building Cross-Functional Teams", "Équipes pluridisciplinaires pour vos projets web"],
  ["AI Enablement Template Checklist for Teams", "Checklist projet web pour vos équipes"],
  ["AI in Process Optimization: Predictive Analytics", "Optimisation de processus et analytique"],
  ["How to Avoid Enterprise AI Failure: De-risk &amp; Scale", "Réussir vos projets digitaux : réduire les risques"],
  ["How to Avoid Enterprise AI Failure: De-risk & Scale", "Réussir vos projets digitaux : réduire les risques"],
  ["Rebel Force – AI Enablement voor Nederlandse MKB", "Netosia — Agence web en France"],
  ["GEEN GEEN AI-STRATEGIE. AI-STRATEGIE.", "PAS DE SITE VITRINE. UN VRAI SITE WEB."],
  ["GEEN GEEN AI-STRATEGIE. AI-STRATEGIE", "PAS DE SITE VITRINE. UN VRAI SITE"],
  ["EEN AI-SYSTEEM.", "UNE PRÉSENCE DIGITALE SUR MESURE."],
  ["Beyond Systems. Built by Rebels.", "Des sites qui convertissent. Conçus en France."],
  ["Beyond Systems. Built by Rebels", "Des sites qui convertissent. Conçus en France"],
  ["Data &amp; AI voor het Nederlandse MKB", "Création web pour les entreprises en France"],
  ["Data is the key to your business model, Rebel Force builds the system that unlocks it.", "Votre présence en ligne est le levier de croissance — Netosia conçoit le site qui le débloque."],
  ["PLAN UNE GRATIS AI DIAGNOSE", "RÉSERVER UN DIAGNOSTIC WEB GRATUIT"],
  ["PLAN A FREE AI DIAGNOSIS", "RÉSERVER UN DIAGNOSTIC WEB GRATUIT"],
  ["Kunnen jullie samenwerken met onze bestaande teams?", "Pouvez-vous travailler avec nos équipes existantes ?"],
  ["Wat doet Rebel Force precies?", "Que fait Netosia exactement ?"],
  ["Voor wie werken jullie?", "Pour qui travaillez-vous ?"],
  ["Wat kost een traject?", "Combien coûte un projet ?"],
  ["Wij brengen het systeem: cadans, tooling en meetlogica.", "Nous apportons la méthode : cadence, outils et suivi des performances."],
  ["Rebel Force is een AI enablement consultancy. Wij bouwen geen PowerPoints — wij bouwen werkende AI-systemen in jouw operatie. Dat doen we via drie gespecialiseerde labels: AI FCTRY — data-infrastructuur en AI-implementatie voor het Nederlandse MKB B2B Groeimachine — geautomatiseerde leadgeneratie en sales pipelines RebelHub — coworking en community voor ondernemers die bouwen Elk traject begint met diagnose. Niet met een voorstel.", "Netosia est une agence web. Nous concevons et développons des sites qui performent — vitrine, e-commerce, SEO et maintenance. Chaque projet commence par un brief, pas par un devis générique."],
  ["Voor ondernemers en MKB-directeuren die klaar zijn om AI écht in te zetten — niet te verkennen. Wij werken selectief. Een traject start altijd met een scoping call. Als de fit er niet is, zeggen we dat direct. Typisch profiel: bedrijf met 5–100 medewerkers, een herkenbare bottleneck in operations of sales, en een eigenaar die resultaten boven rapporten stelt.", "Pour les dirigeants de PME/TPE qui veulent un site professionnel et performant. Nous travaillons de façon sélective. Profil type : 5–100 collaborateurs, un objectif business clair, et un dirigeant qui veut des résultats."],
  ["Dat verschilt per label en per scope. AI FCTRY — projectmatig geprijsd. Maandelijkse investering voor een werkend systeem. B2B Groeimachine — opstartfee gevolgd door een maandelijkse retainer. Minimale afname van 6 maanden; dat bepaalt het maandbedrag. RebelHub — lidmaatschap op maand- of jaarbasis. Geen uurtje-factuurtje. Geen vage dagtarieven. Altijd op basis van scope en verwacht resultaat. Plan een scoping call — dan weet je binnen 45 minuten wat het traject inhoudt.", "Le tarif dépend du périmètre : site vitrine, e-commerce ou refonte complète. Pas de facturation à l'heure — toujours sur devis selon le scope et les résultats attendus. Planifiez un appel découverte pour une estimation en 45 minutes."],
  ["Sign up for our newsletter to get latest insights and updates", "Inscrivez-vous pour recevoir nos actualités web"],
  ["Monday - Friday 9:00 AM – 6:00 PM (GMT+1)", "Lundi – vendredi 9h – 18h (CET)"],
  ["ROI &amp; Compound Learning.", "SEO &amp; suivi des performances."],
  ["ROI &amp; doorlopend leren.", "Optimisation continue."],
  ["Dedicated Flow Execution.", "Développement dédié."],
  ["Dedicated uitvoering.", "Production dédiée."],
  ["Enablement Blueprint.", "Cahier des charges."],
  ["Constraint Discovery.", "Découverte du besoin."],
  ["Operational Excellence", "Performance web"],
  ["AI Enablement", "Création web"],
  ["LET'S WORK TOGETHER", "TRAVAILLONS ENSEMBLE"],
  ["LATEST INSIGHTS", "DERNIERS ARTICLES"],
  ["Available for Projects", "Disponible pour vos projets"],
  ["Execution Phase", "Phase livraison"],
  ["Design Phase", "Phase design"],
  ["Diagnose Phase", "Phase découverte"],
  ["Industrie 4.0 Automatisering", "Automatisation"],
  ["Maatwerk Automatisering", "Sur mesure"],
  ["Kwaliteitsautomatisering", "Qualité & tests"],
  ["Compliance Automatisering", "Conformité RGPD"],
  ["Outreach Automatisering", "Landing pages"],
  ["CRM Automatisering", "Intégration CRM"],
  ["Web Automatisering", "Sites corporate"],
  ["ESG Automatisering", "Accessibilité"],
  ["Knelpunten identificeren", "Identifier vos objectifs"],
  ["Mensen &amp; Cultuur Kompas", "Accompagnement"],
  ["Prestatieontwikkeling", "Formation CMS"],
  ["Workforce Optimalisatie", "Optimisation"],
  ["Talent Data Profiling", "Audit technique"],
  ["AI Talentontwikkeling", "Maintenance"],
  ["Fractional Leaders", "Direction de projet"],
  ["Interim Managers", "Migration"],
  ["AI-Engineering", "Identité & UX"],
  ["AI Data Platform", "Performance web"],
  ["Industriële AI", "E-commerce"],
  ["Commerciële AI", "Sites vitrines"],
  ["AI-Databeheer", "Analytics"],
  ["AI-Workflows", "Automatisations"],
  ["AI-Analytics", "Tableaux de bord"],
  ["AI Engineers", "Développeurs"],
  ["AI driven Online Academy", "Plateforme web sur mesure"],
  ["Business Automation", "Automatisation métier"],
  ["Big Stadion, Big Data", "Data & analytics"],
  ["New Business Development", "Développement commercial"],
  ["(Former) CFO @ Blijkgroep", "Directeur financier @ Blijkgroep"],
  ["Founder at Datahub", "Fondateur @ Datahub"],
  ["Founder @ Happybase", "Fondateur @ Happybase"],
  ["Founder @ Thriveos", "Fondateur @ Thriveos"],
  ["Pipeline op afspraak. Geautomatiseerd.", "Pipeline sur rendez-vous. Automatisé."],
  ["Een werkplek voor ondernemers die bouwen.", "Un espace pour les entrepreneurs qui construisent."],
  ["Elke bottleneck is anders. Jouw traject ook.", "Chaque projet est unique. Le vôtre aussi."],
  ["Geen vrijblijvend voorstel", "Pas de devis générique"],
  ["Geen one-size-fits-all", "Pas de solution unique"],
  ["Geen uurtje-factuurtje", "Pas de facturation à l'heure"],
  ["Geen vaste pakketten.", "Pas de forfaits rigides."],
  ["Hoe ziet de aanpak eruit?", "Comment se déroule la collaboration ?"],
  ["Ontwerp fase", "Phase design"],
  ["Plan een scoping call", "Planifier un appel découverte"],
  ["Plan a scoping", "Planifier un appel"],
  ["Boek je scoping nu", "Demander un devis"],
  ["Boek je scoping", "Demander un devis"],
  ["MEER PROJECTEN", "PLUS DE RÉALISATIONS"],
  ["GET IN TOUCH", "NOUS CONTACTER"],
  ["OUR WORKS", "NOS RÉALISATIONS"],
  ["OUR ECOSYSTEM", "NOTRE ÉCOSYSTÈME"],
  ["WAT WIJ DOEN", "CE QUE NOUS FAISONS"],
  ["HOW WE WORK", "NOTRE MÉTHODE"],
  ["HOWWEWORK", "NOTREMÉTHODE"],
  ["WHAT WE DO", "CE QUE NOUS FAISONS"],
  ["Built by Rebels.", "Conçu en France."],
  ["Beyond Systems.", "Au-delà du site vitrine."],
  ["All Rights Reserved", "Tous droits réservés"],
  ["Privacy Policy", "Politique de confidentialité"],
  ["Terms of Agreement", "Conditions générales"],
  ["Enter email address", "Votre e-mail"],
  ["(CONTACT US)", "(CONTACT)"],
  ["(ABOUT US)", "(À PROPOS)"],
  ["(INVESTERING)", "(INVESTISSEMENT)"],
  ["(ERVARINGEN)", "(TÉMOIGNAGES)"],
  ["(Office Hours)", "(Horaires)"],
  ["(Address)", "(Adresse)"],
  ["(SOCIALS)", "(RÉSEAUX)"],
  ["(LINKS)", "(LIENS)"],
  ["(phone)", "(téléphone)"],
  ["(email)", "(e-mail)"],
  ["B2B GROEIMACHINE", "GROWTH"],
  ["B2B Groeimachine", "Growth"],
  ["AI-STRATEGIE.", "SITE WEB."],
  ["AI-STRATEGIE", "SITE WEB"],
  ["PRÉSENCE DIGITALE.", "PRÉSENCE DIGITALE."],
  ["ONE FORCE.", "NETOSIA."],
  ["ONE FORCE", "NETOSIA"],
  ["Rebel Force", "Netosia"],
  ["Rebel Force™", "Netosia"],
  ["www.rebelforce.nl", "www.netosia.fr"],
  ["info@rebelforce. nl", "contact@netosia.fr"],
  ["info@rebelforce.nl", "contact@netosia.fr"],
  ["+31 85 250 2925", "+33 1 84 00 00 00"],
  ["Vondellaan 2, Utrecht, 3521 GD", "12 rue de la République, 75011 Paris"],
  ["https://aifctry.nl/", "contact.html"],
  ["https://aifctry.nl", "contact.html"],
  ["@2025 Rebel Force", "@2026 Netosia"],
  ["Neem contact op", "Contactez-nous"],
  ["Veg veelgestelde vragen", "Questions fréquentes"],
  ["FAQ", "FAQ"],
  ["Partners:", "Ils nous font confiance :"],
  ["SUBSCRIBE", "S'INSCRIRE"],
  ["Services", "Services"],
  ["Contact", "Contact"],
  ["Works", "Réalisations"],
  ["About", "À propos"],
  ["Home", "Accueil"],
  ["Blog", "Blog"],
  ["Website", "Site web"],
  ["Description: ", ""],
  ["AI FCTRY", "Studio Web"],
  ["RebelHub", "Support"],
  ["NetoHub", "Support"],
  ["Thriveos", "Thriveos"],
  ["Excelsior", "Excelsior"],
  ["Blijkgroep", "Blijkgroep"],
  ["Happybase", "Happybase"],
  ["Max van Genderen", "Max van Genderen"],
  ["Bastiaan Bruning", "Bastiaan Bruning"],
  ["Nik Korstanje", "Nik Korstanje"],
  ["Eva Meijer", "Eva Meijer"],
  ["Peter Grisel", "l'équipe Netosia"],
  ["STAP 1", "ÉTAPE 1"],
  ["STAP 2", "ÉTAPE 2"],
  ["STAP 3", "ÉTAPE 3"],
  ["STAP 4", "ÉTAPE 4"],
  ["STEP 1", "ÉTAPE 1"],
  ["STEP 2", "ÉTAPE 2"],
  ["STEP 3", "ÉTAPE 3"],
  ["STEP 4", "ÉTAPE 4"],
  ["Diagnose", "Découverte"],
  ["Jong Talent", "Intégrations"],
  ['lang="en"', 'lang="fr"'],
  ['lang="nl"', 'lang="fr"'],
  ["Hoofdnavigatie", "Navigation principale"],
  ["Mirrored from www.rebelforce.nl", ""],
  ["Mirrored from www.netosia.fr", ""],
  ["HTTrack Website Copier", ""],
  ["HTTrack Site web Copier", ""],
  ["@2025", "@2026"],
  ["Création web Template Checklist for Teams", "Checklist projet web pour vos équipes"],
  ["Création web Enablement Template Checklist for Teams", "Checklist projet web pour vos équipes"],
  [
    "Geen pilotje. Geen roadmap. Een werkend systeem binnen 90 dagen. Plan een gratis AI Diagnose en ontdek waar jouw eerste winst zit.",
    "Pas de site bâclé. Pas de refonte sans fin. Un site livré en quelques semaines. Réservez un diagnostic web gratuit.",
  ],
  [
    "We deliver data-driven and result-focused deliverables.",
    "Des livrables orientés performance, SEO et conversion.",
  ],
  ["DIT HEBBEN WIJ MOGELIJK GEMAAKT", "NOS RÉALISATIONS"],
  ["Wat onze klanten zeggen", "CE QUE DISENT NOS CLIENTS"],
  ["KLAAR OM AI IN TE ZETTEN?", "PRÊT POUR VOTRE PROJET ?"],
  ["FAQ LAATSTE INZICHTEN", "FAQ — DERNIERS ARTICLES"],
  [
    "Découverte — wij identificeren de dominante bottleneck. Geen aannames, alleen data en gesprekken.",
    "Découverte — nous clarifions vos objectifs, votre audience et ce qui vous différencie.",
  ],
  [
    "Ontwerp — wij bouwen een gericht enablement blueprint rondom die bottleneck.",
    "Design — nous définissons l'architecture, le parcours utilisateur et le design system.",
  ],
  [
    "Uitvoering — wij implementeren met dedicated specialisten in meetbare sprints.",
    "Production — nous développons en sprints mesurables avec une équipe dédiée.",
  ],
  [
    "Validatie — wij meten ROI, leggen leren vast en bereiden de volgende stap voor.",
    "Recette — nous testons, mesurons les performances et préparons la mise en ligne.",
  ],
  [
    "Resultaat: een werkend systeem, geen roadmap die in een la verdwijnt.",
    "Résultat : un site en ligne, pas un document qui finit dans un tiroir.",
  ],
  [
    "Typisch profiel: bedrijf met 5–100 medewerkers, een herkenbare bottleneck in operations of sales, en een eigenaar die resultaten boven rapporten stelt.",
    "Profil type : PME de 5 à 100 personnes, un objectif business clair, et un dirigeant qui privilégie les résultats.",
  ],
  [
    "Pas de facturation à l'heure. Geen vage dagtarieven. Altijd op basis van scope en verwacht resultaat.",
    "Pas de facturation à l'heure. Pas de tarifs journaliers vagues. Toujours sur la base du périmètre et des résultats attendus.",
  ],
  [
    "Planifier un appel découverte — dan weet je binnen 45 minuten wat het kost en wat het oplevert.",
    "Planifiez un appel découverte — vous saurez en 45 minutes ce que le projet comprend et ce qu'il apporte.",
  ],
  ["Uitvoerings phase", "Phase livraison"],
  ["Validatie phase.", "Phase validation"],
  ["Validatie phase", "Phase validation"],
  ["Découverte phase", "Phase découverte"],
  ["Ontwerp phase", "Phase design"],
  ["Uitvoeringsphase", "Phase livraison"],
  ["Validatiephase", "Phase validation"],
  ["Validation Phase", "Phase validation"],
  ["Execution phase", "Phase livraison"],
  ["Design phase", "Phase design"],
  ["Diagnose phase", "Phase découverte"],
  ["Découverte\nphase</p>", "Phase découverte</p>"],
  ["Découverte\r\nphase</p>", "Phase découverte</p>"],
  [">phase</p>", ">Phase découverte</p>"],
  [
    "Understanding your, goals, pain points, audience, and what sets you apart.",
    "Comprendre vos objectifs, contraintes, audience et positionnement.",
  ],
];

const SORTED_REPLACEMENTS = [...REPLACEMENTS].sort((a, b) => b[0].length - a[0].length);

/** Headings rendered as per-letter spans (often still Dutch/EN after plain replace) */
const LETTER_ANIMATED_PHRASES = [
  ["GEEN GEEN AI-STRATEGIE. AI-STRATEGIE.", "PAS DE SITE VITRINE. UN VRAI SITE."],
  ["EEN AI-SYSTEEM.", "UNE PRÉSENCE DIGITALE."],
  ["HOW WE WORK", "NOTRE MÉTHODE"],
  ["WHAT WE DO", "CE QUE NOUS FAISONS"],
  ["HOWWEWORK", "NOTREMÉTHODE"],
  ["WHATWEDO", "CEQUENOUSFAISONS"],
  ["WAT WIJ DOEN", "CE QUE NOUS FAISONS"],
  ["WATWIJDOEN", "CEQUENOUSFAISONS"],
  ["HOE WIJ WERKEN", "NOTRE MÉTHODE"],
  ["HOEWIJWERKEN", "NOTREMÉTHODE"],
  ["DIT HEBBEN WIJ MOGELIJK GEMAAKT", "NOS RÉALISATIONS"],
  ["DITHEBBENWIJMOGELIJK GEMAAKT", "NOSRÉALISATIONS"],
  ["Wat onze klanten zeggen", "CE QUE DISENT NOS CLIENTS"],
  ["Watonzeklantenzeggen", "CEQUEDISENTNOSCLIENTS"],
  [
    "We deliver data-driven and result-focused deliverables.",
    "Des livrables orientés performance et résultats.",
  ],
  [
    "Wedeliverdata-drivenandresult-focuseddeliverables.",
    "Deslivrablesorientésperformanceetrésultats.",
  ],
  ["FAQ LAATSTE INZICHTEN", "FAQ — DERNIERS ARTICLES"],
  ["FAQLAATSTEINZICHTEN", "FAQDERNIERSARTICLES"],
  ["LAATSTE INZICHTEN", "DERNIERS ARTICLES"],
  ["LAATSTEINZICHTEN", "DERNIERSARTICLES"],
  [
    "WatonzeklantenzeggenWedeliverdata-drivenandresult-focuseddeliverables.",
    "CEQUEDISENTNOSCLIENTSDESLIVRABLESORIENTÉSRÉSULTATS.",
  ],
  ["KLAAR OM AI IN TE ZETTEN?", "PRÊT POUR VOTRE PROJET ?"],
  ["KLAAROMAIINTEZETTEN?", "PRÊTPOURVOTREPROJET?"],
  [
    "Geen pilotje. Geen roadmap. Een werkend systeem binnen 90 dagen. Plan een gratis AI Diagnose en ontdek waar jouw eerste winst zit.",
    "Pas de site bâclé. Pas de refonte sans fin. Un site livré rapidement. Réservez un diagnostic web gratuit.",
  ],
  [
    "Geenpilotje.Geenroadmap.Eenwerkendsysteembinnen90dagen.PlaneengratisAIDiagnoseenontdekwaarjouweerstewinstzit.",
    "Pasdesitebâclé.Pasderefontesansfin.Unsitelivrérapidement.Réservezundiagnosticwebgratuit.",
  ],
];

function textToLetterSpans(text) {
  return text
    .split("")
    .map(
      (ch) =>
        `<span style="display:inline-block;opacity:1;transform:none">${ch}</span>`
    )
    .join("");
}

/** Map compact or spaced source heading text → French replacement */
function buildLetterPhraseMap() {
  const map = new Map();
  for (const [from, to] of LETTER_ANIMATED_PHRASES) {
    const compact = from.replace(/\s+/g, "");
    map.set(compact, to);
    map.set(compact.toUpperCase(), to);
    map.set(from, to);
    map.set(from.toUpperCase(), to);
  }
  return map;
}

const LETTER_PHRASE_MAP = buildLetterPhraseMap();

function lookupLetterPhrase(compact) {
  return (
    LETTER_PHRASE_MAP.get(compact) ??
    LETTER_PHRASE_MAP.get(compact.toUpperCase())
  );
}

function rebrandAnimatedBlock(_full, open, inner, close) {
  const letters = [
    ...inner.matchAll(/<span style="display:inline-block;[^"]*">([^<])<\/span>/g),
  ];
  if (letters.length < 5) return open + inner + close;

  const compact = letters.map((m) => m[1]).join("");
  const to = lookupLetterPhrase(compact);
  if (!to) return open + inner + close;

  const spans = textToLetterSpans(to.replace(/\s+/g, ""));
  const body = /<span style="white-space:nowrap"/.test(inner)
    ? `<span style="white-space:nowrap">${spans}</span>`
    : spans;
  return open + body + close;
}

/** Section titles use per-letter spans inside h1–h3 (and some framer paragraphs) */
function rebrandAnimatedHeadings(html) {
  let out = html;
  for (const tag of ["h1", "h2", "h3"]) {
    const re = new RegExp(`(<${tag}[^>]*>)([\\s\\S]*?)(<\\/${tag}>)`, "gi");
    out = out.replace(re, rebrandAnimatedBlock);
  }
  const pRe =
    /(<p[^>]*class="[^"]*framer-text[^"]*"[^>]*>)([\s\S]*?)(<\/p>)/gi;
  out = out.replace(pRe, rebrandAnimatedBlock);
  return out;
}

/** Stops React from replacing French SSR text with English CMS data */
export function disableFramerHydration(html) {
  let out = html;
  out = out.replace(/\s*data-framer-hydrate-v2="[^"]*"/g, "");
  out = out.replace(
    /<script type="framer\/handover" id="__framer__handoverData">[\s\S]*?<\/script>\s*/g,
    ""
  );
  out = out.replace(
    /<script type="module" async data-framer-bundle="main"[^>]*><\/script>\s*/g,
    ""
  );
  out = out.replace(
    /<link rel="modulepreload"[^>]*framerusercontent\.com\/sites\/[^>]*>\s*/g,
    ""
  );
  return out;
}

export function rebrand(html) {
  let out = html;
  for (const [from, to] of SORTED_REPLACEMENTS) {
    if (from) out = out.split(from).join(to);
  }
  out = rebrandAnimatedHeadings(out);
  out = out.replace(/href="blog\/[^"]+\.html"/gi, 'href="blog.html"');
  out = disableFramerHydration(out);
  return out;
}
