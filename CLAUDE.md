# CLAUDE.md — Le Stud site

## Workflow obligatoire pour chaque modification

1. Développer sur la branche désignée (`claude/...`)
2. Committer avec un message clair en français
3. Pusher : `git push -u origin <branche>`
4. **Toujours créer une PR** vers `main` immédiatement après le push — sans attendre que l'utilisateur le demande

## Images

- Format cible : **WebP** pour toutes les images du portfolio et du site
- Conversion PNG/JPEG → WebP avec Pillow (qualité 88, method 6) avant tout commit
- Nommage SEO : `sujet-lieu-contexte-le-stud.webp` (minuscules, tirets, pas d'accents, suffixe `-le-stud`)
- Toujours mettre à jour les références JSON/HTML après renommage ou conversion

## Portfolio (`data/portfolio.json`)

Chaque item peut avoir les champs suivants :

```json
{
  "title": "Titre affiché",
  "tag": "Catégorie courte",
  "role": "Rôle · contribution",
  "image": "/images/nom-seo-le-stud.webp",
  "alt": "Description SEO de l'image",
  "description": "Texte long pour l'overlay ou les métadonnées.",
  "link": "https://..." 
}
```

- `link` est optionnel : quand présent, la carte portfolio devient cliquable et ouvre le lien dans un **nouvel onglet** (`window.open(_blank`)
- Toutes les cartes ont la même structure HTML (`<div>`) — pas de mélange `<div>`/`<a>`

## Déploiement

Le site est déployé automatiquement sur Cloudflare Workers depuis `main`. Merger la PR suffit.
