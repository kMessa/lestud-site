# Le Stud — Site vitrine

Site vitrine du studio audiovisuel Le Stud, basé à Narbonne (Occitanie).
Stack : HTML / CSS (OKLCH) / JS vanilla + Decap CMS.
Hébergé sur Netlify : [lestudpro.fr](https://www.lestudpro.fr)

---

## Structure du site

```
lestud-site/
├── index.html          — page principale (toutes les sections)
├── style.css           — feuille de styles globale
├── script.js           — logique JS (chargement données, portfolio, protection, formulaire)
├── data/
│   ├── portfolio.json  — projets du portfolio (vidéo + graphisme)
│   ├── content.json    — textes du site (hero, services, packs, à propos, contact, footer)
│   └── theme.json      — couleurs (accent, accent2, fond services)
├── images/             — visuels du site et du portfolio
├── admin/              — interface Decap CMS (accès /admin)
└── [dossiers SEO]/     — pages locales Narbonne, Carcassonne, Aude…
```

---

## Modifier les contenus

### Textes généraux (hero, services, packs, à propos, contact)
→ Éditer `data/content.json`

Chaque clé correspond à une section :
- `hero` : eyebrow, titre, sous-titre, description, CTAs
- `services` : titre, sous-titre, liste des 6 services
- `packs` : titre, 3 formules, note bas de page
- `about` : titre, paragraphes, highlights de compétences
- `contact` : titre, sous-titre, email, adresse, SIRET
- `footer` : copyright

### Couleurs du thème
→ Éditer `data/theme.json`

```json
{
  "accent_color":        "#e2c96b",   ← doré principal
  "accent2_color":       "#c4832a",   ← ambré secondaire
  "services_bg_color":   "#e5f0e7"    ← fond section services
}
```

---

## Portfolio — structure et catégories

Le portfolio est découpé en deux catégories : **Vidéo** et **Graphisme**.
Chaque catégorie a un encart principal et un accordéon "Voir plus".

### Fichier de données
→ `data/portfolio.json`

Chaque item suit cette structure :
```json
{
  "category":    "video",                     ← "video" ou "graphisme"
  "title":       "Nom du projet",
  "tag":         "Type court",
  "role":        "Rôle · missions",
  "image":       "/images/nom-du-fichier.webp",
  "alt":         "Description pour lecteurs d'écran",
  "description": "Texte descriptif complet.",
  "link":        "https://..."                ← optionnel
}
```

### Ajouter un projet vidéo
1. Ajouter l'image dans `/images/` (format `.webp` recommandé)
2. Ajouter un objet dans `data/portfolio.json` avec `"category": "video"`
3. Renseigner : title, tag, role, image, alt, description
4. Optionnel : ajouter un champ `"link"` avec l'URL du projet

### Ajouter un projet graphisme
Même procédure avec `"category": "graphisme"`.

---

## Encart principal Vidéo — tirage aléatoire

À chaque chargement de page, **un projet vidéo est tiré au hasard** parmi tous les items `category: "video"` et affiché dans l'encart principal.

Le tirage se fait dans `script.js` :
```js
const featuredVideo = videoItems[Math.floor(Math.random() * videoItems.length)];
```

Le projet change uniquement au rechargement. Il ne change pas pendant la navigation.
L'accordéon "Voir plus" affiche **tous** les projets vidéo (y compris celui de l'encart).

---

## Encart principal Graphisme — image générique

**Actuellement** : mosaïque 2×2 automatique avec les 4 premiers items graphisme.

**Quand une image générique sera disponible** : remplacer dans `script.js` la fonction
`renderFeaturedGraphisme()` — remplacer `<div class="graphisme-mosaic">...</div>`
par `<img src="/images/nom-image-generique.webp" alt="..." draggable="false" />`.

---

## Protection des images

- **Clic droit** bloqué uniquement sur les images et les encarts portfolio (pas sur le texte)
- **Drag** bloqué uniquement sur les balises `<img>`
- La **sélection et copie du texte** sont autorisées partout
- Un message fun s'affiche en cas de tentative : "Bien essayé", "non.", "Pourquoi faire ?"

---

## Formulaire de contact

Le formulaire envoie via `mailto:` — il ouvre le client mail de l'utilisateur avec les données pré-remplies. Aucun backend requis.

L'adresse de secours est visible dans la section Contact : `armeldali.pro@gmail.com`

---

## Comportement responsive

| Élément | Desktop | Mobile (≤ 768px) |
|---|---|---|
| Encart vidéo/graphisme | Texte au survol | Texte toujours visible |
| Items accordéon | Texte au survol | Texte toujours visible |
| Grille accordéon | 3 colonnes | 2 colonnes (1 col < 480px) |
| Images | Légère désaturation au repos | Assombries |

---

## Analyse approfondie du site

Pour toute analyse approfondie (performances, SEO, accessibilité, erreurs JS), préciser
quel outil est nécessaire :

- **Dépôt GitHub** (compte kMessa, repo `lestud-site`) : code source, historique git
- **Fichiers locaux** (`/Users/armeldali/lestud-site/`) : accès direct aux fichiers
- **Navigateur** (DevTools, console) : erreurs JS, rendu visuel, réseau
- **Lighthouse** : audit performances, SEO, accessibilité
- **Netlify dashboard** : logs de déploiement, analytics, redirections
- **Decap CMS** (`/admin`) : interface d'édition de contenu
