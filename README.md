# Netosia — agence web

Site vitrine en français (export Framer rebrandé).

## Aperçu

```bash
npm run preview
```

→ [http://localhost:3000/](http://localhost:3000/) (nécessite internet pour les scripts Framer CDN)

## Structure

```
├── index.html          # Accueil (Framer + animations)
├── about.html
├── services.html
├── works.html
├── contact.html
├── blog.html           # Page blog (stub FR)
├── works/              # Études de cas
├── legal/
├── assets/
│   ├── images/         # Favicons
│   ├── framer/images/  # Images du site
│   └── site.css        # Styles pages simples
└── scripts/build.mjs   # Maintenance (chemins + texte FR)
```

## Maintenance

Après modification des textes dans `scripts/rebrand-lib.mjs` :

```bash
npm run build
```

## Notes

- Les articles de blog anglais ont été supprimés ; seule `blog.html` (stub) reste.
- L’archive HTTrack d’origine n’est plus incluse dans le dépôt.
