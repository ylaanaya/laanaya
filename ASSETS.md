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

## 3. Logos officiels des solutions, d'IA Orchestrator et d'ASTRO

À la demande de l'utilisateur (27/09), les logos officiels remplacent les glyphes line-art dessinés pour le projet. Propriété de BLACKVAULT ; aucune retouche du dessin, seulement recadrage, redimensionnement et fond noir rendu transparent.

| Ressource | Source | Usage |
|---|---|---|
| Icônes produit, médiathèque ID 1693 à 1699 (`icone-*.webp`) | Médiathèque du site, identiques à la présentation « BLACKVAULT Présentation Plateforme » (diapos 8 à 10) | Cartes produit, posées dans une tuile sombre de 64 px (`.bvd-logo-box`), alt d'origine |
| Logos produit, médiathèque ID 1700 à 1706 (`logo-*.webp`) | Idem (fiches produit, diapos 11 à 17) | Héros des 7 fiches Solution, sur une scène sombre à coins repères (`.bvd-logo-stage`), alt d'origine |
| `assets/brand/products/{nova,casex,trace,hound,vx,orbitfix,nexus}.webp` (7 à 14 Ko) | Icônes 1693 à 1699 recadrées et réduites à 128 px | Nœuds du visuel écosystème |
| `assets/brand/ia-orchestrator-emblem.webp` (20 Ko), `astro-emblem.webp` (17 Ko) | Logos fournis par l'utilisateur (`brand/sources/`), emblème seul, 160 px | Centre de l'écosystème (IA Orchestrator seul) ; devant les titres de carte « IA Orchestrator » et « ASTRO » (accueil, Solutions), `alt=""` car le titre suit |
| `assets/brand/ia-orchestrator-logo.webp` (101 Ko), `astro-logo.webp` (65 Ko) | Idem, logo complet, 400 px | Page IA souveraine : IA Orchestrator seul et centré dans le héros, ASTRO en tête de la section qui le décrit ; alt « IA Orchestrator » et « ASTRO » |

Script : `brand/tools/logos_build.py` (fond noir vers transparence, fondu de bord). Les glyphes du projet restent dans `assets/glyphs/` et `brand/boards/glyphes.png`, sans usage sur le site.

## 4. Visuels SVG inline (création du projet)

| Fichier | Remplace | Usage | Alt |
|---|---|---|---|
| `assets/visuals/hero-signal.svg` (2,6 Ko) | fond du hero d'accueil (`visuel-signal.webp`, 332 Ko) | Arrière-plan décoratif CSS | Décoratif |
| `assets/visuals/ecosystem.svg` (3,5 Ko) | `visuel-ecosysteme.webp` (ID 2177) | Écosystème : les 7 icônes produit officielles autour de l'emblème IA Orchestrator | Alt existant de l'image 2177 |
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

24 cartes JPEG (qualité 84, 34 à 51 Ko) composées en HTML/CSS avec les polices du site, le logo existant `blackvault-logo-blanc.png`, les logos officiels (7 solutions, IA Orchestrator et ASTRO, écosystème sur l'accueil et la Plateforme) ou une icône Lucide pour les autres pages. Le seul texte est le titre existant de la page et un label de rubrique (Solution, Service, Plateforme…). Scripts : `brand/tools/og_build.py`, `brand/tools/og_render.js`. Sources : `assets/og/`.

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
| Alt « IA Orchestrator » et « ASTRO » | Logos de la page IA souveraine (héros et section ASTRO) | Non |
| « Analyste » | Émetteur des bulles de la conversation ASTRO | Oui, en `::before` (annoncé par les lecteurs d'écran avant chaque requête) |
| « Session ASTRO » | En-tête du bloc conversation ASTRO | Oui, `aria-hidden="true"` |
| « Accueil » et « Parler à un expert » | Deux liens ajoutés à la page 404 | Oui (« Parler à un expert » reprend le libellé du bouton d'en-tête) |
| Landmark `<main id="content">` | Toutes les pages | Non (structure) |

## 8. Couverture de la page LinkedIn (hors site)

| Fichier | Détail |
|---|---|
| `assets/linkedin/blackvault-linkedin-couverture-4200x700.jpg` (200 Ko) | Fichier à téléverser : 4200 × 700 px, taille recommandée par LinkedIn pour la couverture d'une page entreprise (affichée à 1128 × 191), JPG qualité 92 |
| `assets/linkedin/blackvault-linkedin-couverture-4200x700.png` (511 Ko) | Même visuel en PNG |
| `assets/linkedin/apercu-desktop.png`, `apercu-mobile.png` | Mises en situation approximatives : logo de la page en bas à gauche ; recadrage mobile sur les 900 px centraux |
| `brand/tools/linkedin/build.js`, `cover.html` | Générateur (HTML/SVG rendu par Chromium) ; `brand/boards/linkedin-variantes.png` montre les 3 pistes étudiées |

Composition : piste « Signal » retenue par deux critiques indépendants, parmi trois (Signal, Écosystème avec logos produit, Souverain). Titre choisi par l'utilisateur le 27/09 parmi les propositions de `brand/SLOGANS.md` : « Votre cyberdéfense, conçue, intégrée, opérée. », avec la ligne « Cyberdéfense · IA souveraine · SOC » au-dessus, en sur-titre comme sur le site. Une variante garde cette ligne sous le titre : fichiers suffixés `-libelles-dessous`. La première version (« Un SOC qui décide, pas seulement qui alerte. ») reste dans l'historique git. À droite, les rails du héros du site convergent vers un nœud creux, avec deux étoiles zellige ; une trame zellige très légère passe sous le logo de la page. Polices Sora 600 et IBM Plex Mono 500 (OFL), palette du site, aucun logo tiers.

Zones de sécurité : texte entre x 336 et 806 sur 1128, hors de la zone du logo (bas gauche) et du coin bas droit, et dans les 900 px centraux gardés sur mobile. La variante avec les logos produit a été écartée : à 191 px de haut, les logos deviennent des taches illisibles, surtout sur mobile.

