# ASSETS blackvault.ma : upgrade « Signal souverain »

Inventaire des ressources ajoutées par le projet. Aucune photo, aucune image générée par IA, aucun logo client : la direction retenue repose sur des SVG line-art écrits à la main et sur la typographie. Magnific et Unsplash n'ont donc pas servi (crédits non débloqués, et pas de besoin : la règle « aucune photo stock présentée comme notre équipe » et l'interdit du texte incrusté excluent l'essentiel de leurs usages ici).

Chemins relatifs à `wp-content/plugins/blackvault-design/` sauf mention contraire.

## 1. Polices

| Famille | Graisses | Sous-ensembles | Fichiers | Licence | Source |
|---|---|---|---|---|---|
| Sora | 400, 500, 600 | latin, latin-ext | `assets/fonts/sora-*.woff2` (6 fichiers, 7 à 15 Ko) | SIL OFL 1.1, © 2019 The Sora Project Authors (`assets/fonts/OFL-Sora.txt`) | Fontsource (`@fontsource/sora`), woff2 auto-hébergés |
| IBM Plex Mono | 500 | latin, latin-ext | `assets/fonts/ibm-plex-mono-*.woff2` (2 fichiers, 13 et 15 Ko) | SIL OFL 1.1, © 2017 IBM Corp. (`assets/fonts/OFL-IBM-Plex-Mono.txt`) | Fontsource (`@fontsource/ibm-plex-mono`) |

Usage : Sora pour titres et texte, Plex Mono pour labels et données. 4 graisses au total. Préchargement de Sora 400 et 600 (latin). Les anciennes polices Google locales d'Elementor (`elementor-gf-local-*`) ne sont plus chargées quand la couche est active.

## 2. Icônes

| Ressource | Licence | Usage |
|---|---|---|
| Lucide, 37 icônes (`assets/icons/lucide/*.svg`) | ISC, © 2026 Lucide Icons and Contributors (`assets/icons/lucide/LICENSE-lucide-ISC.txt`) | Remplacent les 33 icônes Font Awesome des pages, du menu et du pied de page ; table de correspondance `assets/icons/fa-to-lucide.json`. Substitution sur le HTML final, `aria-hidden="true"` |

Font Awesome n'est plus chargé quand la couche est active.

## 3. Glyphes produit (création du projet)

9 glyphes line-art, grille 24 px, trait 1,5, monochromes : `assets/glyphs/{nova,casex,trace,hound,vx,orbitfix,nexus,orchestrator,astro}.svg`, sprite `assets/glyphs/sprite.svg`, métadonnées `assets/glyphs/glyphs.json`. Planche : `brand/boards/glyphes.png`.

Licence : propriété de BLACKVAULT (créés pour le projet). Aucun emprunt à un logo tiers ; IA Orchestrator et ASTRO reprennent la forme de leurs logos fournis par l'utilisateur (`brand/sources/`).

| Média remplacé à l'affichage (non supprimé) | ID | Rendu |
|---|---|---|
| Icônes produit des cartes | 1693 à 1699 | Tuile glyphe, `aria-hidden="true"` (le nom du produit est déjà dans la carte) |
| Logos produit des pages Solution | 1700 à 1706 | Glyphe héros, `role="img"` + `aria-label` repris de l'alt existant |

## 4. Visuels SVG inline (création du projet)

| Fichier | Remplace | Usage | Alt |
|---|---|---|---|
| `assets/visuals/hero-signal.svg` (2,6 Ko) | fond du hero d'accueil (`visuel-signal.webp`, 332 Ko) | Arrière-plan décoratif CSS | Décoratif |
| `assets/visuals/ecosystem.svg` (6,7 Ko) | `visuel-ecosysteme.webp` (ID 2177) | Écosystème : 7 produits autour d'IA Orchestrator + ASTRO | Alt existant de l'image 2177 |
| `assets/visuals/souverainete.svg` (3,0 Ko) | `visuel-souverainete.webp` (ID 2178) | Périmètre souverain | Alt existant de l'image 2178 |

Les fichiers d'origine restent dans la médiathèque, intacts. Aucune capture de console réelle, aucun nom d'outil tiers dans les visuels.

## 5. Favicon et icône du site

| Ressource | Détail |
|---|---|
| `assets/favicon.svg` (2,6 Ko après SVGO) | Vectorisation fidèle du pictogramme BlackVault existant (ID 1689) : tuile bleue `#1F74B5`, champ blanc, cadre et roue reconstruits géométriquement, éclats d'angle tracés depuis l'original. Servi par `<link rel="icon" type="image/svg+xml" sizes="any">` |
| `assets/favicon/blackvault-icon-{32,180,192,512}.png` (dépôt) | Rendus PNG du SVG |
| Médiathèque ID **2486** `blackvault-icone-vectoriel-512.png` (29 Ko) | Nouvelle `site_icon` ; WordPress a généré 32, 64, 180, 192 et 270 px. Remplace l'ID 1689 (344 Ko, sans tailles d'icône), qui reste en médiathèque |

Script : `brand/tools/favicon_build.py`. SVGO 4 appliqué au favicon (3,4 à 2,6 Ko ; écart de rendu mesuré invisible, moyenne 0,02 niveau de gris sur 512 px). Les SVG inline (visuels, glyphes, Lucide) sont écrits à la main et déjà minimaux ; SVGO n'y a pas été appliqué, car sa suppression des attributs « par défaut » ferait hériter des traits CSS du parent (gain mesuré inférieur à 1 Ko par fichier).

## 6. Images Open Graph 1200 × 630

24 cartes JPEG (qualité 84, 34 à 45 Ko) composées en HTML/CSS avec les polices du site, le logo existant `blackvault-logo-blanc.png` et les glyphes ou icônes du projet. Le seul texte est le titre existant de la page et un label de rubrique (Solution, Service, Plateforme…). Scripts : `brand/tools/og_build.py`, `brand/tools/og_render.js`. Sources : `assets/og/`.

| Page | ID page | ID média | Fichier |
|---|---|---|---|
| Accueil | 1722 | 2462 | `blackvault-og-accueil.jpg` |
| Solutions | 1725 | 2463 | `blackvault-og-solutions.jpg` |
| Nova XSIEM | 1728 | 2464 | `blackvault-og-nova-xsiem.jpg` |
| BlackCaseX | 1731 | 2465 | `blackvault-og-blackcasex.jpg` |
| BlackTrace | 1734 | 2466 | `blackvault-og-blacktrace.jpg` |
| The Hound | 1737 | 2467 | `blackvault-og-the-hound.jpg` |
| BlackVault VX | 1740 | 2468 | `blackvault-og-blackvault-vx.jpg` |
| OrbitFix | 1743 | 2469 | `blackvault-og-orbitfix.jpg` |
| BlackVault Nexus | 1746 | 2470 | `blackvault-og-blackvault-nexus.jpg` |
| IA souveraine | 1749 | 2471 | `blackvault-og-ia-souveraine.jpg` |
| Services | 1752 | 2472 | `blackvault-og-services.jpg` |
| SOC managé 24/7 | 1755 | 2473 | `blackvault-og-soc-manage.jpg` |
| Audit et tests d’intrusion | 1758 | 2474 | `blackvault-og-audit-tests-intrusion.jpg` |
| Intégration de solutions de sécurité | 1761 | 2475 | `blackvault-og-integration-solutions-securite.jpg` |
| Gouvernance, risques et conformité | 1764 | 2476 | `blackvault-og-gouvernance-risques-conformite.jpg` |
| Cloud souverain, hébergement et continuité | 1767 | 2477 | `blackvault-og-cloud-hebergement-continuite.jpg` |
| Infogérance et supervision IT | 1770 | 2478 | `blackvault-og-infogerance-supervision.jpg` |
| Hyperautomatisation et IA | 1773 | 2479 | `blackvault-og-hyperautomatisation-ia.jpg` |
| Secteurs | 1776 | 2480 | `blackvault-og-secteurs.jpg` |
| Entreprise | 1779 | 2481 | `blackvault-og-entreprise.jpg` |
| Carrières | 1782 | 2482 | `blackvault-og-carrieres.jpg` |
| Contact | 1785 | 2483 | `blackvault-og-contact.jpg` |
| Politique de confidentialité | 1788 | 2484 | `blackvault-og-politique-de-confidentialite.jpg` |
| Plateforme | 2335 | 2485 | `blackvault-og-plateforme.jpg` |

Assignation : `_yoast_wpseo_opengraph-image` et `-image-id` par page. L'image OG par défaut de Yoast (ID 2179, `blackvault-partage.jpg`, 1200 × 630) n'a pas été modifiée (réglage global de Yoast, hors périmètre) ; elle sert encore aux contenus hors de ces 24 pages.

Tous les médias créés portent la méta `_bvd_created` (version du plugin), ce qui permet de les retrouver et de les retirer sans toucher aux autres.

## 7. Ajouts de texte (règle 6 : alt, aria-label, micro-labels)

À valider par l'utilisateur. Aucun autre texte n'a été ajouté ni modifié.

| Ajout | Où | Visible |
|---|---|---|
| Alt « BLACKVAULT : *titre de la page* » | 24 médias OG | Non (métadonnée) |
| Alt « BLACKVAULT » | Média 2486 (icône) | Non |
| `aria-label` des glyphes héros | Pages Solution | Non, repris de l'alt existant de l'image remplacée |
| « Analyste » | Émetteur des bulles de la conversation ASTRO | Oui, en `::before` (annoncé par les lecteurs d'écran avant chaque requête) |
| « Session ASTRO » | En-tête du bloc conversation ASTRO | Oui, `aria-hidden="true"` |
| « Accueil » et « Parler à un expert » | Deux liens ajoutés à la page 404 | Oui (« Parler à un expert » reprend le libellé du bouton d'en-tête) |
| Landmark `<main id="content">` | Toutes les pages | Non (structure) |
