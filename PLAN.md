# Plan d'exécution (phases 2 à 7), mode autonome

Décidé le 27/09/2026 après GO et délégation complète (voir journal dans `CLAUDE.md`).

## Décisions de design

| Sujet | Décision | Raison |
|---|---|---|
| Direction | **« Signal souverain »** : base B « Signal » (centre de commandement épuré, lignes de flux, labels mono) + trame C « Souverain » (zellige line-art) en texture très discrète, 2 usages max | Raconte la chaîne Détecter → Corriger, crédibilité RSSI/DSI, ancrage marocain sans folklore ; A « Vault Noir » trop muet pour un portefeuille de 9 produits |
| Fond | Near-black `#070B10`, alt `#0B121A`, surfaces `#101923` / `#152231`, filets 1px `#1E2C3A` | Conserve l'identité sombre existante |
| Accent | **Un seul** : bleu BlackVault, teinte 206°. `#1F74B5` (logo, UI), `#2485D0` (texte AA sur sombre), `#5EAAE3` (liens et labels sur sombre) | Converge avec les logos BlackVault, IA Orchestrator et ASTRO |
| Spectre 4 couleurs, couleurs produit | Retirés de l'UI. Glyphes produit monochromes. Couleurs sémantiques limitées : `signal` (ambre, état d'alerte réel) et `error` (formulaires) | Brief : un seul accent, pas de vert Matrix ni de néon |
| Typo | **Sora** 400 / 500 / 600 (titres, texte, UI) + **IBM Plex Mono** 500 (labels, données). Latin + latin-ext, woff2 auto-hébergés, tailles fluides `clamp()` | 2 familles, 4 graisses ; Sora proche du logotype |
| Icônes | **Lucide** (ISC), trait unique 1,75, SVG inline, remplacement des 33 glyphes Font Awesome au rendu | Une seule famille, souveraineté, suppression de Font Awesome |
| Glyphes produit | 9 glyphes line-art maison (7 produits + IA Orchestrator + ASTRO), même grille 24 px que Lucide | Brief ; BlackTrace garde son hélice ADN |
| Visuels | Hero, écosystème, souveraineté refaits en **SVG inline** (lignes de flux, nœuds, trame) | LCP actuel 3,2 à 7,2 s ; Magnific sans crédit ; Unsplash bloqué |
| Rayons | 4 px (champs, badges), 8 px (boutons), 12 px (cartes) | Institutionnel, précis |
| Motion | 150 à 400 ms, reveal une fois, compteurs, flux animé sur le pipeline, bloc ASTRO en conversation ; coupé sous `prefers-reduced-motion` ; JS vanilla < 6 Ko | Brief |

## Architecture technique

Plugin maison `blackvault-design` (seul plugin autorisé), versionné dans `plugin/blackvault-design/` :

- `tokens.css` : variables `--bvd-*` et surcharge des `--e-global-*` sur `body.elementor-kit-1685`
- `base.css` : Theme Style sombre (corrige les contrastes 1,05:1 et 2,17:1), focus visibles, typo fluide, hairlines
- `components.css` : boutons, cartes, stats, badges, nav et sous-menus, footer, formulaires CF7, pipeline, bloc ASTRO
- `fonts/` + `fonts.css` : Sora et Plex Mono subsettés, preload des 2 fichiers critiques
- `bvd.js` : reveal, compteurs, flux, ASTRO, accessibilité des menus (Échap, flèches)
- `icons/` + filtre `elementor/widget/render_content` : Font Awesome remplacé par Lucide, icônes produit raster remplacées par les glyphes SVG, visuels lourds remplacés par du SVG inline
- Landmark `<main id="content">` via `elementor/page_templates/header-footer/before_content` et `after_content` (répare le lien d'évitement)
- Dequeue : Font Awesome UAE, polices Google locales d'Elementor, TablePress et CF7 hors des pages qui les utilisent
- Filtre `novamira_design_authority` renvoyant `hybrid` (Elementor = source de vérité)
- Mode aperçu : chargé seulement pour les admins ou avec un jeton d'aperçu, jusqu'à l'ouverture au public (option `bvd_public`)

## Ordre de déploiement

1. Plugin en mode aperçu, captures « after » via loopback avec jeton, comparaison avec la baseline
2. check-design, axe, Lighthouse sur la copie « after »
3. Écriture dans le Kit (couleurs, typo, Theme Style) ; snapshot du Kit déjà pris
4. Ouverture au public (`bvd_public = 1`), purge Elementor, Autoptimize, WP-Optimize, cache hébergeur
5. Médias (favicon, OG) et OG Yoast par page
6. QA finale, CHANGELOG, ROLLBACK

Rollback global : désactiver le plugin `blackvault-design` rend le site identique à la baseline, tant que le Kit n'est pas écrit. Après l'écriture du Kit : restaurer `snapshots/2026-09-27_phase0/kit/1685-elementor_page_settings.json`.
