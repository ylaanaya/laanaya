# Phase 1 : critique design, groupe « accueil » (état avant)

Périmètre : page d'accueil (ID 1722), header 1808 et footer 1810 en profondeur.
Sources : `screenshots/before/1440/accueil.png` (1440 x 10 674 px, 11,9 écrans de 900 px) et `screenshots/before/390/accueil.png` (390 x 19 192 px, 22,7 écrans de 844 px), rendues depuis le miroir local exact. Chaque segment a été lu (7 en desktop, 12 en mobile), plus des recadrages pleine résolution (header, hero, stats, cartes produit, IA souveraine, pied de page). Recoupements : `capture-report.json` (axe), balisage du miroir (lecture seule), `phase0/*.md`, `PREFLIGHT.md`.
Toutes les ordonnées « y » sont en pixels de la capture pleine page à l'échelle 1 (desktop 1440 ou mobile 390).
Le texte est hors périmètre (garde-fou 6) : aucune réécriture proposée, les incohérences de discours sont signalées pour arbitrage.

## Verdict

La base est saine (fond near-black `#070B10`, surfaces graphite, filets 1 px, grille 1 280 px, hero qui tient dans le premier écran, header collant avec flou). Mais la page se lit aujourd'hui comme une landing SaaS de start-up, pas comme un acteur de cyberdéfense institutionnel : titre principal en anglais rempli d'un dégradé arc-en-ciel, spectre de 6 à 12 couleurs d'accent, huit grilles de cartes de la même famille, trois langages d'icônes (Font Awesome plein, rendus 3D brillants à halo néon, points lumineux), un bloc quasi invisible au milieu de la section Solutions et une version mobile de 22,7 écrans. Rien d'irréparable : la plupart des corrections passent par les tokens et le plugin `blackvault-design`, sans toucher au texte ni aux Hn.

## Points forts à conserver

- Fond near-black `#070B10` (pas `#000`), surfaces `#101923` / `#152231`, filets 1 px : bonne base pour la piste A « Vault Noir » ou B « Signal ».
- Hero : titre sur 2 lignes (desktop et mobile), contenu utile terminé à y ≈ 720 en 1440 et y ≈ 630 en 390, donc dans le premier écran.
- Conteneur 1 280 px tenu partout, alignement à gauche cohérent, aucun débordement horizontal en 390 (`hScroll: false`).
- Header collant (`#masthead { position: sticky }`, flou 14 px) et CTA d'en-tête identifiable.
- Référentiels (ISO 27001, NIST, MITRE ATT&CK...) déjà en badges texte, conformes au garde-fou 8. Aucun trope interdit majeur (pas de hacker à capuche, cadenas, pluie binaire). Aucun nom tiers (garde-fou 7).
- Matière prête pour les modules signature du brief : chaîne Détecter → Corriger, bloc stats (7, 24/7, < 5 min, 0), bloc ASTRO avec requêtes en langage naturel.
- Hiérarchie Hn propre (1 h1, h2/h3 réguliers), footer plan de site complet avec titres de colonnes en mono.

## 1. Première impression et hero

**1.1 Titre anglais, slogan produit, rempli en dégradé.** 1440 y 330-490 ; 390 y 200-295. « Master your cyber exposure. » est en anglais sur un site `fr-FR` et reprend le slogan de BlackVault VX (voir section 9). Visuellement, « cyber » en bleu et « exposure. » en dégradé turquoise → vert → citron donnent un registre start-up / fintech. Pour un RSSI de banque ou d'OIV, le premier signal lu est « produit marketing », pas « défense ». Reco : texte plein `--on-night`, zéro dégradé de texte ; si un accent est gardé, un seul mot en couleur signature unie. Arbitrage client sur la langue et le contenu du h1 (texte hors périmètre).

**1.2 Quatre appels à l'action dans le premier écran, dont deux identiques.** 1440 y 26-66 (CTA header « Parler à un expert »), y 631-681 (« Découvrir nos solutions » plein blanc + « Nos services de cybersécurité » en contour), y 718 (lien « Parler à un expert ») ; 390 y 473-640. Aucun CTA primaire unique : le bouton blanc du header et celui du hero ont le même poids, et l'intention « contact » apparaît deux fois. Reco : un seul bouton primaire dans le hero, un secondaire au plus ; supprimer ou fondre le lien tertiaire (il reste dans le header collant).

**1.3 Visuel hero entre deux eaux.** 1440 y 94-1000 (moitié droite) ; 390 y 80-640. Fibres bleues convergeant vers un point, halo radial bleu, puis 4 lignes spectre (bleu, turquoise, vert, citron) coupées au bord droit. La métaphore « bruit → signal » est juste, mais le traitement (halo bleu, lignes lumineuses, vert/citron) frôle les interdits « globe réseau bleu / néon / vert Matrix ». En 390, le fond est cadré de telle sorte qu'il ne reste que quelques fibres au bord droit : le hero mobile est un texte sur noir, sans aucun signe de marque. Le fichier fait 325 Ko (cible 200 Ko). Reco : refaire le visuel en SVG/line-art monochrome + un seul accent, cadrage dédié mobile (art direction `<picture>`), ou module « flux » animé du brief.

**1.4 Crédibilité.** Les preuves (stats, référentiels, souveraineté) sont loin : stats à y 1 535 en 1440 (1,7 écran), référentiels à y ≈ 9 420 (10,5 écrans) ; en 390, stats à y ≈ 2 000 et référentiels à y ≈ 16 800. Rien au-dessus de la ligne de flottaison ne dit « opéré depuis Casablanca, IA sur GPU locaux, SOC 24/7 » autrement que par le chapeau. Reco (structure, Hn intacts) : bandeau de preuves (stats en compteurs) accroché au bas du hero ou juste dessous, sans nouveau chiffre (garde-fou 8).

## 2. Hiérarchie et typographie

**2.1 Trois familles, registre mixte.** Sora 600 (titres, tracking -2,2 px en display), IBM Plex Sans 400/500/600 (texte), IBM Plex Mono 400/500 (labels) : 7 fontes chargées + Font Awesome. Le brief demande 2 familles et 4 graisses max. Sora géométrique + Plex humaniste donnent deux voix sans différentes l'une sur l'autre. Reco : une sans à caractère (titres + texte) + une mono, en woff2 subset, tailles `clamp()`.

**2.2 Eyebrows mono surutilisés.** 9 sections sur 12 ont un eyebrow (hero, Qui sommes-nous, Le problème, Notre réponse, La plateforme, Éditeur de cybersécurité, Intelligence artificielle, IA souveraine, Services) ; s'y ajoutent 6 labels mono dans la timeline plateforme (1440 y 3 580-4 120), 7 tags mono produit, 2 eyebrows de cartes IA, « Un seul écosystème », « Référentiels » et les 4 titres de colonnes du footer. Couleurs variables (turquoise, bleu sur fond clair, vert pour ASTRO). Le brief : 1 eyebrow pour 3 sections. L'effet est un bruit de petites capitales qui dilue le rôle « donnée / label » du mono. Reco : garder le mono pour les données (étapes, tags, chiffres, référentiels), 3 à 4 eyebrows de section maximum, une seule couleur.

**2.3 Chapeaux trop longs.** Mesure de la première ligne : hero 84 caractères (1440 y 520-560), Le problème 98, Notre réponse 97, Deux couches d'intelligence 105, Services 89, CTA final 121 caractères centrés sur une ligne (1440 y 9 830). Cible 60-70. Reco : `max-width: 62ch` sur la classe chapeau.

**2.4 Mots orphelins dans les titres.** Desktop : « plateforme » seul (h2 Deux couches, y ≈ 5 590), « régulées » seul (h2 Conçu pour, y ≈ 8 240). Mobile : « l'IA » (y ≈ 4 230), « côte » (y ≈ 5 660), « compte. » (y ≈ 17 120). Reco CSS sans toucher au texte : `text-wrap: balance` sur h1/h2, `pretty` sur les paragraphes.

**2.5 Contraste d'échelle correct mais plat.** H1 78 / H2 44 / H3 24 / texte 17 : bon ratio, mais tous les H2 ont la même taille, la même graisse et le même alignement, ce qui ne marque aucun temps fort (Pourquoi BLACKVAULT a la même présence que Le SOC traditionnel). Reco : un palier « section signature » (plateforme, souveraineté) distinct du palier courant.

## 3. Mise en page et rythme

**3.1 Huit grilles de cartes de la même famille.** Piliers 4 colonnes (1440 y 1 260-1 460), stats 4 colonnes (y 1 500-1 640), problème 3 x 2 (y 2 040-2 460), solutions 4 x 2 (y 4 680-5 280), IA 2 cartes (y 5 760-6 160), services 4 x 2 (y 7 360-8 040), secteurs 4 (y 8 410-8 636), pourquoi 4 (y 9 140-9 370). Même carte arrondie à filet, icône en haut à gauche, titre, texte. Sur 12 écrans, l'œil ne rencontre aucun module qui n'existe que chez BLACKVAULT. Reco : réserver la carte aux produits et services ; passer piliers, problème et pourquoi en listes éditoriales à filets (numérotées ou en colonnes de texte), faire de la chaîne et de la souveraineté des modules signature.

**3.2 Deux rangées 4 colonnes identiques empilées.** 1440 y 1 260-1 640. Piliers et stats ont le même filet haut et la même largeur de colonne : le bloc de preuves chiffrées se lit comme une deuxième rangée de piliers. Reco : traitement dédié des stats (mono tabulaire, filets verticaux, compteurs), séparé des piliers.

**3.3 Chaîne Détecter → Corriger sans chaîne.** 1440 y 2 920-3 010 ; 390 y 4 470-4 810. Six points lumineux colorés posés en colonnes, sans connecteur, sans flèche ni sens de lecture ; en mobile, grille 2 x 3 qui casse la séquence. C'est pourtant le module « flux animé » demandé par le brief. Reco : ligne de flux horizontale (desktop) / verticale (mobile) à filets 1 px, étapes en mono, animation une fois au scroll.

**3.4 Ruptures de fond.** Bandes `#070B10` / `#0B121A` alternées sans filet (y 1 715, 2 575, 3 240, 4 360, 5 385, 6 270) : deux noirs presque identiques créent des coutures molles. Puis bascule sur `#F4F7FA` (services, y 6 990-8 070) puis `#FFFFFF` (secteurs, y 8 070-8 840) avant de revenir au noir : environ 1 850 px clairs en desktop et 4 000 px en mobile (y 11 580-15 625) au milieu d'une page dark-first. Reco : trancher à l'audit (le brief dit « dark-first à confirmer ») ; si une section claire est gardée, une seule, assumée, et un seul fond ; sinon, fond unique et séparations par filets hairline.

**3.5 Défauts d'alignement.** Qui sommes-nous : le paragraphe de droite commence à y ≈ 1 021, 43 px au-dessus de l'eyebrow de gauche (y ≈ 1 064). Services : les titres sur 1 ligne sont centrés verticalement dans la zone de titre, ceux sur 2 lignes démarrent plus haut, donc les textes des cartes ne sont pas sur la même ligne (y ≈ 7 450-7 500). Cartes produit : titres décalés selon la hauteur de l'icône (Nova vs BlackCaseX, y ≈ 4 797-4 806). Mobile : « Référentiels » centré au-dessus de badges alignés à gauche (390 y ≈ 16 775).

**3.6 Zones vides.** Colonne gauche d'IA souveraine : 700 x 680 px de `#070B10` uni (1440 y 6 300-6 980) ; 160 px vides en tête de section en 390 (y 10 770-10 930). L'image `visuel-souverainete.webp` est en `loading="lazy"` et n'a pas été rendue par la capture (voir Réserves). Même en live, sans réservation de place ni fond de secours, la colonne reste un trou noir tant que l'image charge. Hero : ~280 px vides sous le lien tertiaire (1440 y 720-1 000).

## 4. Couleur

**4.1 Spectre au lieu d'un accent signature.** Accents visibles sur la seule accueil : bleu `#2F80ED` (liens « En savoir plus », icônes services et secteurs, bouton « Tous les services » inversé), turquoise `#3CC7D6` (eyebrows, icônes piliers et pourquoi), vert `#35C57C`, émeraude `#22C39A`, citron `#A8CC2F`, vert `#43D16B` (tags produit, points de la chaîne), ambre `#F2B138` (6 icônes du problème, 1440 y 2 075-2 300), dégradé texte du h1, filet spectre du footer (y ≈ 10 090), halos vert/citron du visuel écosystème. Le brief : un seul accent signature. Pour un public régulé, cette palette lit « tableau de bord grand public ». Reco : neutres graphite + un accent ; les couleurs produit, si elles restent, uniquement dans les glyphes produit, jamais dans le texte ni l'interface.

**4.2 Risque vert Matrix / néon.** Points à halo (y 2 920), cercles lumineux du visuel écosystème (y 3 540-4 040), tags verts/citron sur fond vert sombre, lignes citron du hero : quatre occurrences de vert lumineux sur noir. Reco : supprimer les halos (`box-shadow` / glow), aucun vert saturé sur fond noir.

**4.3 Contraste.** Carte « Un seul écosystème » : texte `#0B121A`-ish sur `#070B10`, ratio ≈ 1,1:1 (détail en 6.1). Tag « DÉTECTION » `#3D8BEF` sur `#162940` : 4,3:1 à 12,5 px (axe, sous 4,5:1). Lien tertiaire du hero et titres de colonnes du footer en gris sur noir, lisibles mais faibles pour leur rôle. Rappel phase 0 : le Theme Style est réglé pour fond clair (titres 1,05:1 par défaut), ce qui explique la carte fantôme.

## 5. Imagerie et iconographie

**5.1 Trois langages d'icônes.** Font Awesome 5 plein (~30 glyphes sur la page : code, satellite, cerveau, bouclier, cloche, sablier, globe, empreinte digitale, balance, usine, etc.), rendus 3D brillants à halo pour les produits (visuel écosystème, icônes de cartes), points lumineux pour la chaîne. Métaphores clichés pour la cible (cerveau = IA, globe = souveraineté, empreinte = traçabilité, bouclier). Même glyphe « université » pour Banques et Administrations (1440 y ≈ 8 450 ; 390 y ≈ 14 580 et 15 040). Burger mobile = glyphe « align-justify » à 4 barres, pas un menu (390 y 25-55). Reco : une famille line MIT/ISC (Lucide, Phosphor ou Tabler), trait unique, SVG inline, et 7 glyphes produit dessinés dans le même langage.

**5.2 Visuel écosystème.** 1440 y 3 540-4 040 ; 390 y 5 180-5 460. Raster 1 400 x 1 400 : 7 glyphes 3D hétérogènes (hibou, bouclier-loupe, hélice ADN, coche en orbite, « V » en écusson...) dans des cercles lumineux, texte « IA Orchestrator + ASTRO » incrusté dans l'image (interdit pour les visuels générés, illisible en 390 à ~10 px, non traduisible, non indexable). Il porte `fetchpriority="high"` alors qu'il est à 3,9 écrans du haut. Reco : SVG inline (glyphes produit unifiés + libellés HTML), orbite en filets 1 px, animation légère, chargement différé.

**5.3 Glyphes produit incohérents entre eux et avec la marque.** Cartes Nova (forme horizontale ~48 x 30 px) et BlackCaseX (écusson vertical ~42 x 48 px) : tailles, perspectives et matières différentes (1440 y 4 700-4 760). BlackTrace devrait reprendre son hélice ADN (brief) : c'est le cas dans l'écosystème, mais dans un style 3D brillant qui ne dialogue pas avec le logo BLACKVAULT (pictogramme de coffre au trait dans un carré bleu).

## 6. Composants

**6.1 Carte fantôme dans Solutions (critique).** 1440 x 1 040-1 370, y 4 990-5 260 ; 390 y 8 950-9 170. Huitième tuile de la grille produit : eyebrow « Un seul écosystème », h3 « Sept solutions, une seule chaîne de défense », lien « Explorer la plateforme ». Pixels mesurés : fond `#070B10`, texte au mieux `#0B121A` : ratio ≈ 1,1:1, invisible. axe la signale (éléments 3c12642, 878de41, 5f089e4). C'est l'équivalent sombre de la tuile « Un besoin précis ? » des services (qui, elle, est pleine noire sur fond clair et lisible) : le fond ou la couleur de texte prévus n'ont pas été appliqués en contexte sombre. Reco immédiate (CSS du plugin, pas de texte) : fond accent ou surface élevée + texte `--on-night`.

**6.2 Boutons.** Plein blanc (primaire sur sombre), contour (secondaire), plein noir (primaire sur clair, « Tous les services »), contour sur blanc (« Voir les secteurs ») : 4 variantes pour 2 rôles. 21 boutons sur la page. Mobile : boutons empilés de largeurs inégales (242 et 289 px, 390 y 473-584), alignés à gauche, puis centrés dans le CTA final (y ≈ 17 300-17 400). Reco : 2 variantes (primaire, secondaire) × 2 thèmes par tokens ; en mobile, pleine largeur ou largeur commune.

**6.3 Un libellé par intention (à arbitrer, texte hors périmètre).** Aller au détail : « Découvrir » (x7), « En savoir plus » (x7), « Explorer la plateforme » (x3), « Découvrir l'entreprise », « Découvrir l'IA souveraine », « Voir les secteurs », « Toutes les solutions », « Tous les services ». Contact : « Parler à un expert » (x4 avec le header) et « Demander une démonstration » (x2). Flèches : glyphe Font Awesome plein dans les boutons, « → » typographique dans les cartes, deux graisses. Reco : liste de libellés par intention soumise au client ; une seule flèche SVG.

**6.4 Tags produit et chips.** Tags mono colorés (DÉTECTION, INVESTIGATION, FORENSICS...) sur fond teinté ; dans la timeline, les chips « Nova XSIEM », « BlackCaseX »... ont l'apparence exacte de boutons secondaires (contour, texte gras) sans en être (1440 y 3 700-4 080 ; 390 y 5 980-6 440). Ambiguïté d'affordance. Reco : chips plats non cliquables (ou liens explicites vers les fiches).

**6.5 Bloc ASTRO.** 1440 y 5 760-6 160 ; 390 y 10 200-10 700. Trois requêtes en pastilles statiques, sans rôle émetteur ni réponse : le brief demande une UI de conversation. Reco : composant « échange » (requête analyste, réponse ASTRO stylisée, horodatage mono), UI dessinée, jamais de capture de console (garde-fou 7).

**6.6 Header.** Desktop (1440 y 0-94) : logo raster PNG 488 x 184 affiché à 150 px, sans width/height (CLS) ; 6 entrées dont 4 à chevron Font Awesome ; « Contact » et le CTA « Parler à un expert » pointent la même page ; parents répétés en premier enfant des sous-menus ; axe `nested-interactive` x4 sur les parents à sous-menu ; pointeur de survol turquoise. Mobile (390 y 0-79) : burger « align-justify » dans un `div role="button"`, CTA masqué en mobile et tablette alors que la page fait 22,7 écrans. Reco : logo SVG (source vectorielle en priorité, sans retouche), `<button>` natif, CTA compact visible dès 390, menus sans doublons (à valider), états hover / focus-visible / actif dessinés.

**6.7 Footer.** 1440 y 10 090-10 674 : filet haut en dégradé spectre, icônes coordonnées Font Awesome turquoise, colonne Services trop étroite (4 libellés sur 7 passent sur 2 lignes), mention « Éditeur et opérateur de cybersécurité ». Mobile 390 y 17 500-19 192 : 1 690 px, une seule colonne, 24 liens, deux trous vides de 176 px (y 18 012-18 188) et 184 px (y 18 884-19 068) hérités des hauteurs de colonnes desktop. Reco : filet hairline neutre, grille footer 12 colonnes (marque 4, liens 2+2+2+2), en mobile 2 colonnes de liens ou accordéons, suppression des hauteurs fixes.

## 7. Mobile (390)

**7.1 Longueur.** 19 192 px, soit 22,7 écrans (1,8 fois la version desktop). Contributeurs : problème 6 cartes (y 2 320-4 100), solutions 7 cartes + fantôme (y 6 705-9 255), services 8 cartes (y 11 580-14 255), secteurs 4 (y 14 255-15 625), pourquoi 4 (y 15 625-16 975), footer 1 690 px. Reco : listes compactes à filets pour piliers, problème, pourquoi et secteurs ; rangées produit compactes (glyphe, nom, tag) ; défilement horizontal à accroche seulement si un indicateur est visible.

**7.2 Cartes à hauteur fixe.** Vides de ~70 px en bas de « Les faux positifs éternels » (390 y 3 345-3 560) et « Assurances et mutuelles » (y 14 775-14 990) : les hauteurs égales du desktop sont conservées une fois empilées. Reco : `min-height` seulement au-dessus du breakpoint tablette.

**7.3 Hero mobile.** Tient dans l'écran, mais sans visuel (cf. 1.3) ; « cyber » arrive à 22 px du bord droit, donc risque de passage à 3 lignes à 360 px (non vérifié). Titre 42 px fixe (pas de `clamp`).

**7.4 Cibles tactiles.** Liens du footer espacés d'environ 33 px, burger ~44 px : conformes WCAG 2.2 (24 px). Les liens « Découvrir → » et « En savoir plus → » sont des lignes de 20 px de haut en bas de carte : zone tactile à étendre à la carte entière. Pas de débordement horizontal.

## 8. Cohérence de marque (page et gabarits)

- Gabarité : bande CTA radiale finale, grilles de cartes, eyebrows, section « Chez vous ou sur un cloud souverain » et cartes produit sont réutilisés sur une vingtaine de pages (phase 0). Toute correction sur l'accueil doit passer par les classes `bv-*` du plugin, sinon elle se répète page par page.
- Sur mesure : seuls le visuel hero, le visuel écosystème et le bloc ASTRO sont propres à la marque, et ce sont eux qui portent les écarts (dégradés, halos, texte incrusté).
- Générique : la trame « Le problème / Notre réponse / Pourquoi X / CTA » est celle d'une landing SaaS. Rien ne signe l'ancrage (Casablanca, souveraineté, OIV) : la piste C « Souverain » (trame zellige en line-art) ou une signature « Signal » (flux, mono) donnerait un marqueur propriétaire.
- Logo : le PNG affiche « Black Vault » en deux mots, casse mixte, pictogramme de coffre dans un carré bleu ; le texte du site écrit « BLACKVAULT », l'entité est « BLACK VAULT SARL ». Pas de retouche du logo (brief) ; à documenter en phase 2 (règles d'usage, zone de protection, version SVG).

## 9. Incohérences de discours relevées sur l'accueil (à arbitrer, texte hors périmètre)

1. H1 « Master your cyber exposure. » : anglais sur site français, identique au slogan de BlackVault VX (1440 y 330-490).
2. Positionnement : eyebrow « Éditeur de cybersécurité » (Nos solutions, 1440 y ≈ 4 475), pilier « Éditeur », footer « Éditeur et opérateur de cybersécurité », bouton « Nos services de cybersécurité », h2 « Des services de cybersécurité... » ; le brief dit « acteur de la cyberdéfense » ; « cyberdéfense » n'apparaît qu'une fois, dans la carte Intégration.
3. « Nous ne revendons pas la solution d'un autre » (h2, y ≈ 1 100) sur la même page que le service « Intégration de solutions de sécurité » (y ≈ 7 400).
4. Trois taxonomies de la chaîne sur une même page, avec des affectations contradictoires :
   - chaîne « Notre réponse » : Détecter, Qualifier, Enrichir, Investiguer, Exposer, Corriger ;
   - timeline « La plateforme » : Sources, Détection, Intelligence artificielle, Investigation, Exposition et remédiation, Restitution ;
   - tags des cartes : Détection, Investigation, Forensics, Enrichissement, Exposition, Remédiation, Renseignement.
   BlackVault Nexus = « Renseignement » (carte), « Exposer » (chaîne), « Investigation » (timeline). The Hound = « Enrichissement » / « Enrichir » / « Investigation ». BlackTrace = « Forensics » / « Investiguer » / « Investigation ». Les couleurs produit ne codent donc rien de stable non plus.
5. Mélange FR/EN dans les micro-labels : tag « FORENSICS », « threat hunting » dans la carte BlackTrace, titre anglais.
6. Abréviation « BlackVault VX, Nexus » dans la chaîne (y ≈ 2 995).
7. « 24/7 » et « 24 heures sur 24 » (pilier Opérateur) sur la même page.
8. Nom de marque : logo « Black Vault », texte « BLACKVAULT », entité « BLACK VAULT SARL ».

## 10. Réserves de capture

- 5 icônes de cartes produit (BlackTrace, The Hound, VX, OrbitFix, Nexus) et `visuel-souverainete.webp` sont absents des deux captures. Ce sont exactement les images en `loading="lazy"` du balisage ; les non différées (Nova, BlackCaseX, écosystème) sont rendues. Probable artefact de capture (défilement trop rapide), à confirmer en live avant de classer en défaut. Constat valable dans tous les cas : aucune place réservée ni fond de secours, d'où des trous noirs pendant le chargement.
- États hover, focus, sous-menus et menu mobile ouvert non visibles sur des captures statiques : à couvrir par la revue accessibilité.

## Top des constats (impact / effort)

| # | Constat | Impact | Effort |
|---|---|---|---|
| 1 | Carte fantôme « Un seul écosystème » à 1,1:1 | critique | S |
| 2 | Spectre multi-accents au lieu d'un accent signature | fort | M |
| 3 | H1 anglais, slogan VX, dégradé arc-en-ciel | fort | S |
| 4 | 4 CTA dans le premier écran, dont 2 « Parler à un expert » | fort | S |
| 5 | 8 grilles de cartes de la même famille, aucun module signature | fort | L |
| 6 | Trois langages d'icônes, métaphores clichés, burger « align-justify » | fort | M |
| 7 | Visuel écosystème raster, texte incrusté, glyphes 3D à halo néon | fort | L |
| 8 | Mobile 22,7 écrans, cartes à hauteur fixe, footer à trous | fort | M |
| 9 | Hero : visuel réseau bleu / néon, absent en mobile, 325 Ko | fort | M |
| 10 | Taxonomie de la chaîne incohérente (3 modèles, affectations contradictoires) | fort | M |
| 11 | Stats noyées, traitées comme les piliers, loin du hero | fort | S |
| 12 | Chaîne Détecter → Corriger sans connecteur ni sens | moyen | M |
| 13 | Ruptures de fond (bandes quasi noires, îlot clair de 1 850 / 4 000 px) | moyen | M |
| 14 | Eyebrows mono dans 9 sections sur 12, couleurs variables | moyen | S |
| 15 | Header : logo PNG sans dimensions, CTA masqué en mobile, doublons, `div role=button` | moyen | M |
| 16 | 3 familles typo, 7 fontes, paliers fixes | moyen | M |
| 17 | Chapeaux de 84 à 121 caractères | moyen | S |
| 18 | Boutons : 4 variantes, largeurs inégales en mobile, 8 libellés pour 2 intentions | moyen | S |
| 19 | Footer : filet spectre, colonne Services étroite, 1 690 px en mobile | moyen | S |
| 20 | Chips produit qui ressemblent à des boutons | moyen | S |
| 21 | Bloc ASTRO statique (pas d'UI conversation) | moyen | M |
| 22 | Alignements (Qui sommes-nous, titres services, titres produit, Référentiels mobile) | faible | S |
| 23 | Mots orphelins dans 5 titres | faible | S |
| 24 | Images différées sans place réservée (colonne IA souveraine vide) | moyen (à vérifier) | S |
