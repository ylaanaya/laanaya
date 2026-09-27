# Phase 1 : critique design, groupe « solutions » (état avant)

Périmètre : hub `/solutions/` (ID 1725) et gabarit fiche solution (modèle 1806, cloné sur 1728 à 1746), examiné en profondeur sur Nova XSIEM (1728), BlackTrace (1734) et OrbitFix (1743). Survol du haut de page (1440) de BlackCaseX, The Hound, BlackVault VX et BlackVault Nexus pour les écarts propres à chaque produit.
Sources : captures pleine page `screenshots/before/1440/*.png` et `screenshots/before/390/*.png` (miroir local exact), tous les segments lus (3 + 4 + 4 + 4 en desktop, 6 x 4 en mobile), plus des recadrages pleine résolution (hero, cartes, chaîne, capacités, cas d'usage, intégration, nav, footer). Recoupements : `capture-report.json` (axe, métriques), balisage du miroir (lecture seule), `phase0/content.md`, `PREFLIGHT.md`.
Toutes les ordonnées « y » sont en pixels de la capture pleine page à l'échelle 1. Le texte est hors périmètre (garde-fou 6) : aucune réécriture, les incohérences de discours sont listées en section 9 pour arbitrage.

| Page | Hauteur 1440 | Hauteur 390 | Débordement horizontal 390 |
|---|---|---|---|
| solutions (hub) | 4 476 px (5,0 écrans) | 8 461 px (10,0 écrans) | non |
| nova-xsiem | 5 296 px (5,9) | 9 001 px (10,7) | non |
| blacktrace | 5 179 px (5,8) | 8 675 px (10,3) | non |
| orbitfix | 5 148 px (5,7) | 8 774 px (10,4) | non |
| 4 autres fiches | 5 176 à 5 262 px | 8 659 à 8 937 px | non |

Découpage de référence (fonds relevés au pixel, bord gauche) :
- Hub 1440 : header 0-94, hero + grille produits 94-1286 (`#070B10`, cartes à partir de y 694), « Chaque solution couvre un maillon » 1286-1804 (`#0B121A`), « Deux couches d'intelligence » 1804-2600, « Chez vous ou sur un cloud souverain » 2600-3402 (`#0B121A`), CTA final 3402-3898, footer 3898-4476.
- Hub 390 : hero 80-713, 8 cartes empilées 713-2800, chaîne 2800-3568, IA 3568-4970, déploiement 4970-6244, CTA 6244-6772, footer 6772-8461.
- Fiche Nova 1440 : hero 94-726, bandeau faits 726-870, « Le problème » 870-1372 (**fond clair `#F4F7FA`**), « Capacités clés » 1372-2108 (**fond blanc `#FFFFFF`**), « Cas d'usage » 2108-2798, « Sa place dans la plateforme » 2798-3420 (`#0B121A`), déploiement + CTA 3420-4718 (un seul fond `#070B10`), footer 4718-5296. Les 6 autres fiches suivent exactement ce découpage (bande claire de 838-914 à 2053-2129 selon la hauteur du logo).
- Fiche Nova 390 : hero 80-1018 (logo à y 750-940), faits 1018-1352, bande claire 1352-2128, bande blanche 2128-3050, cas d'usage 3050-4020, intégration 4020-5510, déploiement + CTA 5510-7313, footer 7313-9001.

## Verdict

Le squelette est bon et même rare dans le secteur : une fiche produit qui répond aux questions d'un RSSI dans l'ordre (rôle, entrée, sortie, problème, capacités, cas d'usage, amont/aval, mode de déploiement). Mais la peau ne suit pas. Chaque fiche est dominée par un logo produit raster en chrome 3D à halo néon (padlock et chiffres binaires sur Nova, chouette aux yeux vert fluo et trou de serrure sur Nexus, cerbère vert sur The Hound) qui tire le registre vers l'e-sport, pas vers la cyberdéfense institutionnelle ; aucune interface produit n'est montrée. Le spectre de 7 couleurs produit, le texte en dégradé arc-en-ciel et la carte-dégradé du hub contredisent l'accent unique du brief. Enfin, le gabarit cloné x7 inverse brutalement le fond (sombre → gris clair → blanc → sombre) sur 1 200 px en desktop et 1 700 px en mobile. La plupart des corrections passent par les tokens et les classes `bv-*` dans le plugin, une seule fois pour les 7 fiches ; le chantier lourd est le visuel produit (UI stylisées Figma + glyphes).

## Points forts à conserver

- Fond near-black `#070B10` (jamais `#000`) et alternance discrète avec `#0B121A` pour rythmer les sections du hub ; filets 1 px ; conteneur 1 280 px tenu partout ; alignement à gauche cohérent.
- Bandeau de faits sous le hero des fiches (labels mono « RÔLE / ENTRÉE / SORTIE », filets verticaux, 1440 y 726-870) : c'est déjà un composant de niveau « centre de commandement », à généraliser.
- Structure de fiche logique pour un décideur ; 1 seul h1 par page, h1 produit sur une ligne en 1440 et en 390, h1 du hub sur 2 lignes en desktop.
- Hub : hero qui tient dans le premier écran (contenu terminé à y ≈ 575, première rangée de cartes visible dès y 694) ; cartes produit entièrement cliquables.
- Chaîne « Détecter → Qualifier → Enrichir → Investiguer → Exposer → Corriger » (hub, y 1560-1700) : graine du module signature « flux » demandé par le brief.
- Bloc ASTRO avec requêtes en langage naturel (hub y 2011-2410) : matière prête pour l'UI de conversation du brief.
- Hélice ADN de BlackTrace : motif le plus distinctif et le seul explicitement conservé par le brief.
- Conformité des garde-fous 7 et 8 : aucun nom d'outil tiers, aucun logo client, aucun chiffre inventé ; MITRE ATT&CK cité en texte. Aucun débordement horizontal en 390.

## 1. Première impression et hero

**1.1 Le visuel hero des fiches est un logo raster 3D, pas une preuve produit.** Nova 1440 y 265-575, x 860-1320 ; 390 y 750-940. Idem sur les 7 fiches. Les logos `logo-*.webp` occupent toute la moitié droite du hero : rendus chrome biseautés, halos colorés, texte incrusté (nom du produit, et slogan pour BlackTrace et VX). Plusieurs tropes interdits par le brief y figurent : cadenas + colonne de chiffres binaires « 100 1 0 » + faisceau bleu lumineux (Nova), trou de serrure et yeux vert néon (Nexus), mascotte cerbère vert fluo entourée de nœuds réseau (The Hound), halo vert-citron (OrbitFix). Pour un RSSI de banque ou d'OIV, le premier signal est « jeu vidéo / e-sport », et il ne voit jamais à quoi ressemble le produit. Reco : hero de fiche = UI stylisée dessinée dans Figma (garde-fou 7) dans la direction choisie, avec le glyphe produit line-art du brief ; le logo officiel descend en lockup discret près du h1 (arbitrage client : ce sont des actifs de marque existants, on ne les retouche pas, on change leur rôle). Effort L.

**1.2 Slogan doublé dans le premier écran.** BlackTrace 1440 y 385-415 (texte) et y 545-570 (même phrase incrustée sous l'hélice) ; BlackVault VX idem (« Master Your Cyber Exposure. » en texte et dans le logo). Redondance visible, et texte figé dans une image (non traduisible, non accessible). Reco : utiliser la variante de logo sans baseline si elle existe (phase 2, sources de marque), sinon recadrer. Effort S si l'asset existe.

**1.3 Hub : moitié droite du hero vide.** 1440 y 94-640, x 880-1360 : seule une trame de points à peine visible. La page d'entrée vers 7 produits n'a aucune image de l'écosystème, alors que l'accueil et la plateforme en ont une. Reco : schéma de l'écosystème en SVG inline (7 glyphes + IA Orchestrator/ASTRO au centre), ou remonter la chaîne Détecter → Corriger dans le hero. Effort M.

**1.4 Deux boutons primaires concurrents dans le premier écran.** Fiches 1440 : header « Parler à un expert » (blanc plein, y 26-66) + hero « Demander une démonstration » (blanc plein, y 572-620) + « Parler à un expert » (contour). Même bouton blanc plein, même poids, deux libellés ; « Parler à un expert » apparaît deux fois au-dessus de la ligne de flottaison et trois fois sur la page ; la paire hero est répétée à l'identique dans le CTA final ; les deux libellés mènent à la même page (`/contact/` et `/contact/#formulaire`). Reco : un seul primaire par écran (le CTA du header passe en style secondaire ou « ghost » quand un primaire est visible), un libellé par intention sur tout le site (arbitrage texte). Effort S (styles) + arbitrage.

## 2. Hiérarchie et typographie

**2.1 Échelle plate en fin de page.** Hauteur de capitale mesurée : h1 « Nova XSIEM » 43 px (y 310-352) = h2 du CTA final « Voir Nova XSIEM sur votre périmètre » 43 px (y 4372-4414) ; hub : h1 45 px, h2 CTA 43 px ; h2 de section 34 px. Le titre de clôture pèse autant que le h1, donc la page n'a plus de sommet. Reco : échelle fluide `clamp()` avec h1 ≥ 1,3 x le plus grand h2 ; CTA final au niveau h2 de section. Effort S.

**2.2 Lignes trop longues et corps trop petits.** « Capacités clés » : descriptions en ~14 px sur 735 px de large, jusqu'à 112 caractères par ligne (Nova 1440 y 1540-1575) ; sous-titre du CTA final du hub sur une seule ligne de 119 caractères (y ≈ 3642). « Cas d'usage » : dans le même bento, corps à 18 px dans la grande carte et 13-14 px dans les deux petites (Nova 1440 y 2380-2680). Reco : mesure 60-70 caractères (max-width en `ch`), corps ≥ 16 px partout, une seule taille de texte par niveau de carte. Effort S.

**2.3 Veuves et césures dans les titres répétés.** « Chez vous ou sur un cloud souverain : la / même plateforme » (1440 y 2710-2790 hub, y 3530-3625 Nova, et sur les 7 fiches) laisse l'article « la » en fin de ligne ; en 390, césure « lui- / même » dans la carte « La solution ». Reco : `text-wrap: balance` sur h1-h3, `hyphens: manual`. Effort S.

**2.4 Surcharge d'étiquettes mono (eyebrows).** Sur une fiche : pastille produit, 3 labels du bandeau de faits, « LE PROBLÈME », « LA SOLUTION », pastille répétée dans le cas d'usage, « INTÉGRATION », « EN AMONT », « EN AVAL », « LES AUTRES SOLUTIONS » + 6 sous-labels, « FULL ON-PREMISE », « SAAS SOUVERAIN » : plus de 12 étiquettes pour 8 sections, là où le brief en tolère une pour trois sections. Elles sont en outre de 5 couleurs différentes (turquoise, vert, bleu `#2F80ED`, gris, couleur produit). Reco : une étiquette mono par groupe de 3 sections, une seule couleur (neutre `--muted` ou l'accent signature) ; garder le mono pour les données (bandeau de faits, tags). À valider (masquage d'éléments existants). Effort S à M.

**2.5 Trop de familles et de graisses.** Fiches : Sora 400/500/600, IBM Plex Sans 400/500/600, Plex Mono 400/500 = 8 couples chargés (le hub n'utilise pas Sora 500). Le brief demande 2 familles, 4 graisses. Reco : une sans (Sora ou Plex Sans, à trancher en phase 3) + Plex Mono. Effort S.

## 3. Mise en page et rythme

**3.1 Inversion de fond au milieu des fiches.** 1440 y 870-2108 (gris clair puis blanc, 1 240 px) ; 390 y 1352-3050 (1 700 px, 2 écrans). Sur un site dark-first, ce bloc éblouit, casse la continuité et crée 4 changements de fond en 2 300 px. L'étiquette bleue `#2F80ED` sur `#F4F7FA` y échoue au contraste (3,59:1, axe, 2 à 3 occurrences par fiche). Même bande sur les pages service. Reco : passer ces deux sections en surface graphite (`--surface` / `--surface-2`) ; si un registre clair est gardé, en faire un choix éditorial unique et assumé sur tout le site (arbitrage phase 3). Effort S (override des globals de fond dans le plugin).

**3.2 Clones stricts, zéro spécificité.** Les 7 fiches ont le même gabarit à l'élément près (153 éléments, phase 0) ; seules changent la couleur, le logo et les textes. Aucune fiche n'a un visuel propre (UI, schéma, extrait de rapport, chronologie). La section « Sa place dans la plateforme » (Nova 1440 y 2798-3420) décrit en texte ce qui devrait être le module signature : la chaîne Détecter → Corriger avec le maillon courant en surbrillance et ses flux amont/aval. Reco : un composant « position dans la chaîne » unique, alimenté par produit, + un emplacement « UI stylisée » par fiche. Effort M (composant) à L (visuels).

**3.3 Zones vides.** « Capacités clés » : colonne gauche vide sur ~450 px sous l'intro (1440 y 1600-2050) ; grande carte de « Cas d'usage » avec ~125 px vides en haut, contenu calé en bas comme si une image manquait (1440 y 2366-2490, 390 y 3278-3380) ; hub : moitié droite du hero vide (1.3). Reco : titre de colonne gauche en `position: sticky` sur grille 12 colonnes (4/8) ; grande carte avec glyphe ou mini-UI en tête, sinon contenu calé en haut. Effort S.

**3.4 Fin de page sans transition.** Fiches : déploiement et CTA final partagent le même fond `#070B10` de y 3420 à 4718 (Nova), avec ~250 px de noir sans repère entre les cartes (fin y ≈ 4110) et le titre du CTA (y 4367). Le hub, lui, alterne correctement. Reco : bande CTA dédiée (filet, trame ou surface) identique sur tout le site. Effort S.

**3.5 Bloc « Chez vous ou sur un cloud souverain » répété.** Identique sur le hub et les 7 fiches (et la plateforme) : dans ce groupe, 8 occurrences, soit les 35 à 40 % finaux de chaque fiche en contenu commun. Visuellement, c'est de la « boilerplate ». Reco : le styler une seule fois comme composant compact (comparatif 2 colonnes à filets, sans cartes), via une classe `bv-*`. Effort M.

**3.6 Grille du hub : alignements internes cassés.** Les icônes produit ont des proportions natives très différentes (116x108 à 320x264), donc les titres des cartes décrochent de 8 px (Nova/BlackTrace vs BlackCaseX/The Hound, 1440 y 811-819) et les descriptions de 16 px (y 852-868). Reco : boîte d'icône fixe (48 ou 56 px) et `align-items: start`. Effort S.

## 4. Couleur

**4.1 Spectre au lieu d'un accent signature.** Sur le hub : mots du h1 en dégradé texte bleu → turquoise → vert → citron (1440 y 269-380), carte n° 8 entièrement en dégradé spectre (1440 x 1052-1360, y 997-1284, texte sombre sur dégradé), ligne de la chaîne en dégradé avec 6 points colorés à halo (y 1596), filet spectre en haut du footer (y 3898). Sur chaque fiche : couleur produit pour pastille, slogan, coches et halo du hero, plus bleu, turquoise et vert pour les étiquettes. Le brief demande un seul accent. Reco : un accent signature (phase 2), les produits distingués par leur glyphe et leur nom, pas par la couleur ; si le client tient aux couleurs produit, les limiter à un repère de 8 px (pastille ou filet) sans halo. Supprimer tout dégradé de texte. Effort M (7 hex produit en dur dans les widgets + globals).

**4.2 Les couleurs produit ne distinguent même pas les produits.** The Hound `#35C57C`, BlackVault VX `#22C39A` et Nexus `#43D16B` sont trois verts quasi identiques ; Nova `#3D8BEF` et BlackCaseX `#2A9DF4` deux bleus voisins. Le système coûte en cohérence sans apporter de repérage. Même argument que 4.1. Effort inclus dans 4.1.

**4.3 Risque « vert Matrix / néon ».** Halos verts et vert-citron dans les heros The Hound, Nexus, VX et OrbitFix (1440 y 94-640, moitié droite), yeux vert fluo de la chouette Nexus, points lumineux de la chaîne du hub. Reco : aucun halo coloré ; fond near-black plat ou trame line-art très subtile (piste C) ; si un accent vert est retenu, le désaturer nettement. Effort S (fonds radiaux = 39 dégradés en données, override par classe).

**4.4 Contraste.** Pastille « DÉTECTION » bleu `#3D8BEF` sur `#162940` à 12,5 px : 4,3:1 (axe, hub). Étiquettes `#2F80ED` sur `#F4F7FA` : 3,59:1 (axe, toutes les fiches). Texte courant `#93A3B5` sur `#070B10` : correct. Effort S.

## 5. Images et iconographie

**5.1 Trois langages visuels mélangés.** Rendus 3D brillants (icônes et logos produit), Font Awesome 5 plein (coches, flèches, pictos du footer), et une flèche typographique « → » dans les liens de cartes. Les coches changent de couleur d'une section à l'autre (couleur produit dans « Capacités clés », turquoise puis vert dans les cartes de déploiement). Trois styles de flèche coexistent (FA pleine dans les boutons, « → » dans les cartes, petite FA turquoise dans « En aval »). Reco : une seule famille MIT/ISC (Lucide, Phosphor ou Tabler) en SVG inline, trait unique, une couleur ; 7 glyphes produit dessinés dans le même langage (BlackTrace reprend l'hélice). Effort M.

**5.2 Logos produit hétérogènes entre eux.** Survol des 7 heros : BlackCaseX en lockup horizontal « BLACKVAULT CASEX », VX et Nexus en lockup empilé préfixé « BLACKVAULT », Nova, OrbitFix et The Hound sans préfixe, mascottes animales (cerbère, chouette) à côté d'emblèmes (bouclier, hélice). La hauteur du hero varie en conséquence (bande claire démarrant entre y 838 et 914). Reco : en attendant l'arbitrage sur les logos, cadrer tous les lockups dans une même boîte (hauteur fixe) et les sortir du rôle de visuel principal (1.1). Effort S.

**5.3 Aucune UI produit.** Ni capture (interdite, c'est bien), ni UI stylisée : le RSSI ne voit jamais l'objet qu'il achète. C'est l'écart le plus net avec les acteurs internationaux du segment. Reco : 7 UI stylisées Figma (console de détection, dossier d'incident, chronologie d'attaque, verdict d'IOC, carte d'exposition, couverture de correctifs, bulletin de renseignement), même grille, même accent, sans marque tierce. Effort L.

**5.4 Icônes « Les autres solutions » absentes sur la capture.** Nova, BlackTrace, OrbitFix : 4 des 6 mini-cartes sans icône (Nova 1440 y 2940-3180 ; 390 y 4900-5440). Ce sont les images en `loading="lazy"` ; les fichiers existent : probable artefact de capture, à vérifier en navigateur réel. Même si elles s'affichent, ces icônes sont les mêmes rendus 3D en réduction (5.1). Effort S (vérification).

## 6. Composants

**6.1 Boutons.** Voir 1.4 : hiérarchie primaire/secondaire illisible (deux blancs pleins à l'écran), mêmes paires répétées. En 390, les deux boutons empilés ont des largeurs différentes (307 et 237 px dans le hero, 288 et 206 px dans le CTA final) : effet non fini. Reco : pleine largeur ou largeur commune en mobile, primaire unique. Effort S.

**6.2 Carte-dégradé du hub.** 8e tuile (1440 y 997-1284) : dégradé spectre, texte sombre, répète mot pour mot le h1 (en h3, doublon et saut h1 > h3 relevés en phase 0). Elle devient l'élément le plus bruyant de la page. Reco : tuile neutre (surface + filet) ou suppression visuelle au profit du lien « Explorer la plateforme » ; la correction Hn reste à valider. Effort S.

**6.3 Navigation : pas d'état actif sur les fiches.** Sur le hub, « Solutions » est souligné (1440 y 60) ; sur les 7 fiches, aucun élément du menu n'est marqué alors que la page est dans Solutions. Le fil « Toutes les solutions » (y 220-236) est un simple texte gris gras, sans chevron, petite cible en mobile. Reco : état `current-menu-ancestor`, fil d'Ariane avec chevron et cible ≥ 24 px. Effort S.

**6.4 Mini-cartes « Les autres solutions ».** Cartes cliquables sans aucun signe d'interaction (ni flèche, ni état au survol visible) ; en 390, 6 cartes pleine largeur de ~120 px chacune (≈ 800 px, Nova y 4641-5437). Reco : puces compactes 2 colonnes en mobile avec glyphe + nom, affordance explicite. Effort S.

**6.5 Bloc ASTRO.** Les trois requêtes sont de simples pastilles grises (hub y 2190-2395), sans marqueur de tour de parole, sans réponse, sans horodatage mono : on ne lit pas « conversation ». Reco : composant « UI de conversation » du brief (question utilisateur, réponse ASTRO sourcée, action à approuver). Effort M.

## 7. Mobile (390)

**7.1 Longueur.** 10 à 10,7 écrans par page. Postes les plus coûteux : 8 cartes produit empilées sur le hub (y 713-2800, 2,5 écrans), bande claire des fiches (2 écrans), mini-cartes (≈ 1 écran), footer (≈ 1 690 px, 2 écrans). Reco : cartes produit du hub en liste compacte (glyphe + nom + tag sur une ligne) ou carrousel à défilement horizontal accessible ; mini-cartes en 2 colonnes ; footer en accordéon. Effort M.

**7.2 Chaîne du hub sans chaîne.** En 390 (y 3140-3485), les 6 étapes passent en grille 2 colonnes et la ligne de liaison disparaît : on voit 6 points colorés, plus une chaîne. Reco : rail vertical à gauche avec les étapes empilées. Effort S.

**7.3 Footer : trous.** Blancs de ~150 à 180 px après « Secteurs » (hub y 7274-7463) et après « Contact » (hub y 8147-8340), hauteurs de colonnes desktop conservées. Voir le lot header/footer. Effort S.

**7.4 Hero fiche.** h1 sur une ligne, slogan sur 2, texte sur 5, 2 boutons : le logo n'apparaît qu'à y 750-940, à cheval sur la ligne de flottaison (844). Correct, mais le seul signe visuel du produit est coupé. Effort inclus dans 1.1.

Pas de débordement horizontal ; tailles de texte courant correctes (≥ 15 px), sauf les petites cartes de cas d'usage (2.2).

## 8. Cohérence de marque dans le groupe

- **Gabarité** : header, footer, hero de fiche, bandeau de faits, problème/solution, capacités, cas d'usage, intégration, déploiement, CTA. **Sur mesure** : rien de visuel, seulement la couleur et le logo. Le hub partage avec les fiches les blocs déploiement et CTA.
- Le hub parle « chaîne de défense » et « écosystème » ; les fiches parlent « produit » avec une identité visuelle propre à chacun (couleur, mascotte, slogan anglais). On lit 7 marques juxtaposées plutôt qu'une plateforme : c'est l'inverse du message « une seule chaîne ».
- Ce qui paraît générique : cartes arrondies identiques, coches Font Awesome, bande CTA centrée à deux boutons, halos radiaux colorés, texte en dégradé. Ce qui est propre à BLACKVAULT et doit devenir signature : bandeau de faits mono, chaîne Détecter → Corriger, amont/aval, ASTRO en langage naturel, hélice ADN.

## 9. Incohérences de discours (texte hors périmètre, à arbitrer)

| # | Constat | Où |
|---|---|---|
| 1 | Footer « Éditeur et opérateur de cybersécurité » sous un h1 « une seule chaîne de défense » ; le brief dit « acteur de la cyberdéfense » | footer des 8 pages |
| 2 | 6 slogans produit sur 7 en anglais sur un site `fr-FR` (seul BlackCaseX est en français), de nature différente : slogans (« Hunt Deeper, Respond Faster. ») et descripteurs (« Automated Vulnerability Patching. », « Unified Cyber Threat Intelligence Platform. ») | heros des 7 fiches |
| 3 | Slogan dit deux fois dans le premier écran (texte + incrusté dans le logo) | BlackTrace, BlackVault VX |
| 4 | Le logo BlackCaseX affiche « BLACKVAULT CASEX », le texte dit « BlackCaseX » ; VX et Nexus sont préfixés « BLACKVAULT » dans leur logo, pas les autres | heros |
| 5 | Abréviations « VX » et « Nexus » seules (« BlackVault VX, Nexus », « Plan de remédiation VX », « Boucle fermée avec VX », « demandés par VX ») | hub y 1640-1690, OrbitFix |
| 6 | Franglais dans les étiquettes : « FULL ON-PREMISE », « SAAS SOUVERAIN », « Forensics endpoint et threat hunting », « niveau Medium » | déploiement x8, BlackTrace, Nova |
| 7 | h1 du hub répété en h3 dans la carte-dégradé (doublon + saut h1 > h3) | hub |
| 8 | « des produits que nous concevons, maintenons et opérons nous-mêmes » (hero du hub) à rapprocher de « éditeurs de référence » / « notre catalogue » des pages service (phase 0, incohérence n° 2) | hub vs services |

## 10. Synthèse classée

| # | Problème | Impact | Effort |
|---|---|---|---|
| 1 | Logos raster 3D à halo néon comme visuel hero, tropes interdits (cadenas, binaire, néon), aucune UI produit | critique | L |
| 2 | Spectre multi-accents (7 couleurs produit, dégradés de texte, carte-dégradé, chaîne arc-en-ciel) contre un accent unique | critique | M |
| 3 | Bande claire/blanche au milieu des 7 fiches, contraste 3,59:1 | fort | S |
| 4 | Fiches clonées sans aucun visuel spécifique ; « Sa place dans la plateforme » en texte au lieu du module flux | fort | M/L |
| 5 | Mobile à 10-10,7 écrans (cartes empilées, mini-cartes, footer) | fort | M |
| 6 | Trois langages d'icônes, coches et flèches incohérentes | moyen | M |
| 7 | Deux primaires concurrents, paires de CTA répétées, deux libellés pour une intention | moyen | S |
| 8 | Surcharge d'étiquettes mono en 5 couleurs | moyen | S/M |
| 9 | Échelle plate (h2 final = h1), lignes de 110+ caractères, corps 13-14 px | moyen | S |
| 10 | Zones vides (colonne capacités, grande carte cas d'usage, hero du hub) | moyen | S |
| 11 | Bloc déploiement répété x8 et fin de page sans transition | moyen | M |
| 12 | Désalignement des cartes du hub (icônes de tailles natives) | moyen | S |
| 13 | Chaîne du hub perdue en mobile, footer à trous | moyen | S |
| 14 | Pas d'état actif « Solutions » sur les fiches, fil d'Ariane faible | faible | S |
| 15 | Bloc ASTRO pas encore lisible comme une conversation | faible | M |
