# Phase 1 : critique design, groupe « plateforme »

Pages : `/plateforme/` (2335) et `/plateforme/ia-souveraine/` (1749).
Sources : captures pleine page `screenshots/before/1440/*.png` et `screenshots/before/390/*.png` (miroir local exact), `capture-report.json` (axe, métriques), CSS Customizer 1832 et HTML du miroir pour confirmer les causes. Coordonnées y en pixels réels de la capture (pas des segments réduits).

| Page | Hauteur 1440 | Hauteur 390 | Sections | Débordement horizontal 390 |
|---|---|---|---|---|
| plateforme | 9 094 px (env. 10 écrans) | 15 454 px (env. 18 écrans) | 12 + footer | non |
| ia-souveraine | 5 739 px (env. 6 écrans) | 10 087 px (env. 12 écrans) | 8 + footer | non |

Découpage de référence (1440) :
- plateforme : header 0-94, hero 94-880, « De la détection à la remédiation » 882-1366, « Une architecture de bout en bout » 1366-2166, « SOC traditionnel, SOC augmenté » 2166-3150, « De la détection à la clôture » 3150-3840, « Répondre vite » 3840-4594, « Ce que vous recevez » 4594-5204, « Une IA qui fonctionne sous notre contrôle » 5204-5926, « Conforme et cloisonné » 5926-6680, « Chez vous ou sur un cloud souverain » 6680-7484, « Comment démarrer » 7484-8000, CTA final 8000-8516, footer 8516-9094.
- ia-souveraine : hero 94-746, « Une équipe d'agents » 746-1720, « N1 assuré, N2 instruit, N3 outillé » 1720-2456, ASTRO 2456-3144, « Votre sécurité ne transite pas » 3144-3884, UEBA 3884-4666, CTA final 4666-5160, footer 5160-5739.

## Points forts à conserver

- Fond near-black correct (`#070B10` / `#0B121A`, jamais `#000`). Contrastes du texte courant solides : `#93A3B5` sur `#070B10` env. 7,6:1, texte clair env. 16:1.
- Matière propre et spécifique, rare dans le secteur : architecture en étages avec tags produit, tableau SOC traditionnel vs augmenté, catalogue d'actions correctives, livrables, deux modes de déploiement. C'est la base idéale de composants signature.
- Aucun trope interdit majeur : pas de hacker à capuche, pas de pluie binaire, pas de globe bleu, pas de dégradé violet. Aucun nom d'outil tiers visible.
- Référentiels affichés en badges texte (ISO 27001, NIST, MITRE ATT&CK), conforme au garde-fou 8.
- Gabarit cohérent entre les deux pages (hero, CTA final, footer identiques), hairlines 1px et rayons de cartes homogènes, un seul h1, H1 desktop sur 2 lignes.
- Registre mono (IBM Plex Mono) pour les étiquettes : compatible avec la direction B « Signal ».

## 1. Première impression et hero

- plateforme 1440 y 94-880 : le hero tient dans le premier viewport, H1 sur 2 lignes, lecture immédiate. Mais trois CTA sont visibles d'emblée : « Parler à un expert » (header, bouton plein blanc), « Demander une démonstration » (plein blanc) et « Parler à un expert » (contour). Le même libellé existe donc en deux hiérarchies (plein dans le header, secondaire dans le hero), et les deux boutons du hero portent la même flèche Font Awesome : aucune différence d'intention. Les deux mènent à `/contact/`.
- ia-souveraine 1440 y 94-746 : le secondaire devient « Voir la plateforme ». Le secondaire change de rôle d'une page à l'autre.
- Le mot en dégradé spectre (« cyberdéfense », « ASTRO », y 420-480 et 330-390) est le procédé le plus générique du site : il évoque un template SaaS/IA plutôt qu'un acteur de défense institutionnel.
- Crédibilité internationale : la composition est propre mais le visuel du hero (voir section 5) tire la page vers l'esthétique « gaming / NFT » (halos néon, emblèmes 3D chromés) au lieu de la sobriété attendue par un RSSI de banque.
- Mobile 390 : H1 sur 3 lignes (y 205-320), CTA empilés de largeurs inégales (287 px et 205 px, y 473-585), visuel repoussé sous la ligne de flottaison (y 650-990) et libellé incrusté illisible (env. 8 px).

## 2. Hiérarchie et typographie

- Contraste d'échelle faible : H1 env. 60 px, H2 env. 48 px (ratio 1,25). Le hero ne domine pas les 11 H2 qui suivent. Texte de carte à 14 px (tuiles du flux, livrables, UEBA) : petit pour un public décideur.
- Trois familles (Sora, IBM Plex Sans, IBM Plex Mono) et 8 couples famille/graisse chargés sur plateforme (Sora 400/500/600, Plex Sans 400/500/600, Plex Mono 400/500), plus Font Awesome. Le brief demande 2 familles et 4 graisses. Paliers fixes, pas de `clamp`.
- Sora dessine `I` majuscule et `l` minuscule à l'identique : « Il prépare, il n'impose pas » et « Il connaît vos procédures » (ia-souveraine 1440 y 2840-2990) se lisent « ll ». Sur un site où « IA » est un terme clé, c'est une ambiguïté de lecture à éviter pour la famille de titrage.
- Longueurs de ligne hors mesure : timeline architecture env. 90 caractères (plateforme 1440 y 1480-1650), chapô de « Votre sécurité ne transite pas » env. 95 caractères sur une ligne (ia 1440 y 3410), chapô du CTA final env. 120 caractères centrés sur une ligne (plateforme 1440 y 8250-8280). `.bv-measure` (68ch) n'est pas appliqué partout.
- Eyebrows : ia-souveraine en compte 5 pour 8 sections (IA SOUVERAINE, AGENTIC WORKFLOW, HUMAN-IN-THE-LOOP, ASSISTANT DE L'ANALYSTE, SOUVERAINETÉ), au-delà de la règle 1 pour 3, dont 2 en anglais, en trois couleurs (turquoise, vert pour ASSISTANT DE L'ANALYSTE, gris pour CE QU'ON LUI DEMANDE). plateforme respecte la règle au niveau section (2 sur 12) mais empile env. 35 étiquettes mono capitales dans les cartes.
- Mono détourné : les 8 puces « Actions correctives au catalogue » (plateforme 1440 y 4400-4480, 390 y 7145-7450) sont des phrases entières en mono capitales espacées, pénibles à lire. Le mono doit rester aux données et labels courts.
- Micro-typographie : espace simple avant « : » qui casse la ligne (« : elle est inscrite dans l'architecture » commence une ligne sur plateforme 390 y 9860 ; H2 desktop « Chez vous ou sur un cloud souverain : la » y 6800). Des espaces insécables sont nécessaires (à lister pour validation, garde-fou 6).

## 3. Mise en page et rythme

- Redondance structurelle majeure : la chaîne de valeur est dessinée trois fois sur plateforme avec trois composants différents (6 étapes à points y 1160-1260, 6 étages en timeline y 1470-2020, 7 tuiles y 3410-3556), puis une quatrième fois sur ia-souveraine (5 étapes à hairline y 1116-1220). Aucune ne se lit comme un flux : pas de connecteurs entre les tuiles, et la ligne spectre des 6 étapes disparaît en mobile (grille 2 x 3 de points, plateforme 390 y 1370-1720).
- Colonne vide : section « Une IA qui fonctionne sous notre contrôle » (plateforme 1440 x 80-680, y 5250-5900, pixels uniformes `#0B121A`). Le visuel `visuel-souverainete.webp` est bien dans le balisage et s'affiche en 390 (y 8680-8920) : c'est un défaut de mise en page desktop (colonne à 46 % centrée, image qui s'effondre), pas un fichier manquant. Un demi-écran vide au milieu de la page.
- Architecture (plateforme 1440 y 1366-2166) : titre et chapô à gauche, puis env. 350 px vides sous le chapô pendant que la timeline descend à droite. Une colonne gauche collante ou une grille 5/7 alignée sur les étages équilibrerait.
- Zébrage systématique : alternance `#070B10` / `#0B121A` à chaque section, bords durs, 12 fois de suite. Le rythme devient mécanique ; aucune section « respiration » ni « manifeste » ne casse la cadence.
- Familles de layout répétées : 2 cartes côte à côte (« Répondre vite » y 4090-4352, « Chez vous » y 7018-7372), 3 colonnes à hairline (y 3604-3720 et 7740-7900, et encore sur ia y 1116-1220), 4 cartes égales (livrables y 4886-5092), grilles 3 x 2 (conformité y 6185-6460, UEBA ia y 4214-4484), 2 x 2 cartes (ia y 1266-1690). Sur ia-souveraine, la section agents empile deux layouts (5 colonnes puis 2 x 2) dans le même bloc.
- Tuiles du flux (plateforme 1440 y 3410-3556) : 7 tuiles d'env. 170 px, « Enrichissement » touche le bord droit de sa tuile ; « Triage IA » est surligné en turquoise sans légende ; en 390, grille 2 colonnes avec une 7e tuile orpheline (y 5425-5567).
- Longueur : 15 454 px en mobile pour plateforme, soit env. 18 écrans ; le tableau comparatif à lui seul fait env. 1 500 px (390 y 2955-4670).

## 4. Couleur

- Spectre à 4 teintes (`#3D8BEF`, `#3CC7D6`, `#35C57C`, `#A8CC2F`) utilisé comme accent partout : mots en dégradé des H1, points de la chaîne, hairlines des étapes, filet dégradé au-dessus du footer, eyebrows turquoise ou verts, coches turquoise ou vertes selon la carte (Régime 1 turquoise, Régime 2 vert ; Full on-premise turquoise, SaaS souverain vert, y 7180-7290), halos du visuel écosystème. Le brief demande un seul accent signature.
- Le vert `#35C57C` et le citron `#A8CC2F` en halo lumineux (visuel écosystème, y 300-700) frôlent le vert Matrix et le néon interdits.
- Défaut critique : la carte « Niveau 1 · Qualification » (ia 1440 x 80-500, y 1990-2340 ; ia 390 y 3160-3440) est quasi invisible. Elle devait porter le dégradé `.bv-spectrum-card` avec un texte sombre ; le fond n'est pas peint, il reste `#0B121A` sur `#070B10`. axe : contraste 1,04:1 sur 8 nœuds (eyebrow, h3, sous-titre, 5 puces). Le niveau que la page met en avant est justement celui qu'on ne voit pas.
- Le bouton primaire plein blanc est lisible mais non relié à la marque ; il faudra décider si l'accent unique porte le primaire ou si le primaire reste monochrome (direction A).

## 5. Imagerie et iconographie

- `visuel-ecosysteme.webp` (hero plateforme, 1 400 x 1 400, 262 Ko) :
  - texte incrusté « IA Orchestrator + ASTRO » dans une troisième famille (humaniste, ni Sora ni Plex), illisible en mobile, non traduisible, non indexable ;
  - glyphes produit hétérogènes : emblèmes 3D chromés et métalliques, chouette aux yeux vert fluo avec un trou de serrure (cadenas déguisé), bouclier plat avec coche, hélice ADN ; chacun avec son halo néon ;
  - 7 couleurs produit dans un seul visuel.
  Le brief prévoit 7 glyphes produit custom dans un même langage : ce visuel est à refaire en SVG inline.
- `visuel-souverainete.webp` (hero ia-souveraine, 1 400 x 1 050) : puce CPU en dégradé dans un nuage de particules, trope « IA générique ». Il n'exprime pas la souveraineté (périmètre, enceinte, contrôle). Il est aussi sous-dimensionné (env. 360 px dans une colonne d'env. 590 px, ia 1440 x 910-1275, y 290-560) : le hero penche à gauche.
- Font Awesome 5 solid : pin, puce, calques, utilisateur-bouclier, clé, empreinte digitale (conformité, plateforme 1440 y 6185-6460), coches, flèches, chevrons, téléphone, enveloppe, burger. Graisse pleine, étrangère au registre hairline visé ; clé et empreinte sont des clichés cyber. Deux langages coexistent : icônes FA plates et glyphes produit raster 3D.
- Trame de points `.bv-dots` sur les heros : discrète mais générique ; peut devenir la base de la trame zellige (direction C) ou des lignes de flux (direction B).
- ASTRO (ia 1440 y 2456-3144) : quatre cartes de citation statiques en Sora semi-gras. Le brief attend un bloc en UI de conversation, dessiné (jamais une capture de console) ; c'est le meilleur candidat de composant signature du groupe.

## 6. Composants

- Boutons : primaire plein blanc avec flèche, secondaire contour avec la même flèche, CTA du header plein blanc sans flèche. Un même libellé (« Parler à un expert ») en plein et en contour. Deux libellés (« Demander une démonstration », « Parler à un expert ») pour une même destination. Lien texte tertiaire « Découvrir l'IA souveraine → » correct.
- Cartes : au moins 7 variantes sur plateforme (étape à point, étage de timeline, tuile de flux, carte régime, carte livrable à étiquette mono, carte déploiement, item icône sans carte) et 4 sur ia-souveraine. Aucune n'a d'état hover visible sur capture.
- Puces : trois styles sur une page (tags produit contour blanc gras, actions en mono capitales sur fond gris, référentiels en mono capitales sur fond gris). À ramener à deux variantes nommées.
- Tableau comparatif : bon en desktop (hairlines, colonne BLACKVAULT en clair). En 390, les en-têtes « SOC TRADITIONNEL » et « SOC AUGMENTÉ BLACKVAULT » s'empilent au-dessus du tableau (plateforme 390 y 3205-3270 ; ia 390 y 5803-5845) et les deux colonnes de cellules n'ont plus de repère : on ne sait plus quelle colonne est laquelle.
- Nav : état actif souligné turquoise sur « Plateforme » à `/plateforme/`, absent sur `/plateforme/ia-souveraine/` (pas d'état ancêtre). Chevrons FA. CTA du header masqué en mobile.
- Footer : filet dégradé spectre en tête, 4 colonnes et bloc marque. En mobile, colonnes à hauteur fixe qui laissent un vide d'env. 170 px (plateforme 390 y 14280-14450 ; ia 390 y 8910-9080) ; liens d'env. 20 px de haut, sous la cible confortable de 44 px.

## 7. Mobile (390)

- Pas de débordement horizontal (vérifié).
- Hero : visuel sous la ligne de flottaison, libellé incrusté illisible, CTA de largeurs inégales (idem CTA final, plateforme 390 y 13558-13670).
- Tableau comparatif sans repère de colonnes (voir 6).
- Hauteurs minimales héritées du desktop : carte « Mémoire des décisions » avec un vide bas (ia 390 y 2397-2562), écarts irréguliers entre les étapes agents (ia 390 y 1600-1960), colonnes du footer.
- Alignements : label « RÉFÉRENTIELS » centré au-dessus de badges alignés à gauche (plateforme 390 y 10880-11010).
- Longueur excessive : 18 écrans pour plateforme ; tableau, conformité (6 items) et footer (4 colonnes empilées, env. 1 600 px) sont les principaux candidats à un affichage progressif (accordéons, onglets), sans supprimer de texte.

## 8. Cohérence de marque dans le groupe

- Gabarité : hero (eyebrow mono turquoise, H1 avec mot en dégradé, chapô, 2 boutons, visuel à droite, trame de points), CTA final centré, footer. Propre, mais c'est précisément la partie la plus générique.
- Sur-mesure et à valoriser : timeline d'architecture avec tags produit, tableau SOC traditionnel vs augmenté, catalogue d'actions, niveaux N1/N2/N3, bloc ASTRO. Aujourd'hui ils sont traités avec les mêmes cartes génériques que le reste.
- Logotype « Black Vault » en deux mots (header, footer) contre « BLACKVAULT » dans tout le texte et « BLACK VAULT SARL » en raison sociale : trois graphies (on ne retouche pas le logo, mais la question est à poser en phase 2).

## Incohérences de discours relevées (texte hors scope, à arbitrer par le client)

1. H1 plateforme « Un écosystème intégré de cyberdéfense » contre footer de la même page « Éditeur et opérateur de cybersécurité ».
2. Chaîne de valeur à géométrie variable sur la même page : 6 étapes (Détecter à Corriger), 6 étages (Sources à Restitution), 7 étapes (Collecte à Rapport), puis 5 étapes agents sur ia-souveraine. Affectation des produits contradictoire : BlackVault Nexus rangé sous « Exposer » (y 1240) puis sous « Investigation » (y 1830) ; The Hound sous « Enrichir » puis sous « Investigation » ; l'IA est « Qualifier », « Intelligence artificielle » puis « Triage IA ».
3. Anglicismes sur un site `fr-FR` : AGENTIC WORKFLOW, HUMAN-IN-THE-LOOP, FULL ON-PREMISE, SAAS SOUVERAIN, RUN 24/7, UEBA, « escalade au CISO » (alors que la cible est nommée RSSI ailleurs), « niveau Medium ».
4. « Nexus » seul dans les étapes (plateforme y 1240, 390 y 1720) alors que le nom complet est la règle.
5. Les 4 affirmations de la section IA souveraine de plateforme (Où tourne l'analyse, Ce qui sort du périmètre, Dépendance, Continuité) sont reprises à l'identique dans le tableau de ia-souveraine : doublon d'une page à l'autre.
6. Secteurs rangé sous « Plateforme » dans le footer, mais entrée de premier niveau dans le header.
7. Espaces insécables manquants avant « : » et « ? » (voir section 2).

## Recommandations prioritaires (groupe plateforme)

| # | Problème | Impact | Effort |
|---|---|---|---|
| 1 | Carte Niveau 1 invisible (1,04:1) | critique | S |
| 2 | Visuel IA souveraine non rendu en desktop sur plateforme (demi-écran vide) | fort | S |
| 3 | Spectre 4 teintes comme accent, dégradés de texte, halos néon | fort | M |
| 4 | Visuel écosystème : texte incrusté, glyphes 3D hétérogènes, halos | fort | M |
| 5 | Chaîne dessinée 3 fois sans composant de flux signature | fort | M |
| 6 | Visuel souveraineté générique (puce CPU) et sous-dimensionné | moyen | M |
| 7 | CTA : 3 dans le premier écran, un libellé en deux hiérarchies | moyen | S |
| 8 | Échelle typo plate, 3 familles, I/l ambigus en Sora | moyen | M |
| 9 | Eyebrows en excès et multicolores, mono détourné, 3 styles de puces | moyen | S |
| 10 | Zébrage et familles de layout répétées, page de 18 écrans en mobile | moyen | L |
| 11 | Tableau comparatif illisible en 390 | moyen | S |
| 12 | Bloc ASTRO statique au lieu d'une UI de conversation | moyen | M |
| 13 | Font Awesome solid et clichés (clé, empreinte) | moyen | M |
| 14 | Colonne vide sous l'architecture, lignes de 90 à 120 caractères | faible | S |
| 15 | Détails mobile : hauteurs fixes, alignements, cibles tactiles, CTA inégaux | faible | S |
| 16 | Nav sans état ancêtre, Secteurs rangé différemment | faible | S |
