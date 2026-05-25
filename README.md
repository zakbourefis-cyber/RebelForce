# Netosia — site web

Site statique basé sur un export Framer (archive rebelforce.nl), rebrandé pour **Netosia**, agence web française.

## Aperçu local

```bash
npm run preview
```

Ouvrir **http://localhost:3000/** — page d’accueil Framer complète (animations, sections, etc.).

Connexion internet requise pour les scripts Framer (`framerusercontent.com`).

## Structure

```
├── index.html          # Accueil Framer (animations)
├── about.html          # À propos
├── services.html       # Services
├── works.html          # Réalisations
├── blog.html           # Blog
├── contact.html        # Contact
├── blog/               # Articles
├── works/              # Études de cas
├── legal/              # Mentions légales
├── css/                # Styles simplifiés (pages legacy si utilisées)
├── assets/images/      # Favicons
├── framer/             # Copie Framer patchée (générée)
├── scripts/            # patch-framer-paths, rebrand-netosia
└── _archive/           # Miroir HTTrack d’origine
```

## Mettre à jour le contenu Netosia

1. Modifier les textes dans `scripts/rebrand-netosia.mjs` (tableau `REPLACEMENTS`).
2. Régénérer tout le site :

```bash
npm run build:site
```

Cela recopie `_archive` → `framer/`, applique les corrections d’assets, puis déploie + rebrand vers la racine.

## Notes

- Les articles de blog conservent en grande partie le texte anglais d’origine ; seuls l’en-tête / pied de page Framer sont en français.
- Pour un site 100 % sur mesure sans Framer, éditer `css/main.css` et les pages HTML simples — ou republier depuis Framer avec le vrai projet Netosia.
