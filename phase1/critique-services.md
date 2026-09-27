# Phase 1 : critique design, groupe « services » (état avant)

Périmètre : hub Services (ID 1752) et trois fiches service en profondeur : SOC managé (1755), Audit et tests d'intrusion (1758), Hyperautomatisation et IA (1773). Les quatre autres fiches (Intégration 1761, Gouvernance 1764, Cloud 1767, Infogérance 1770) ont été parcourues en 1440 (segment haut, plus sections spécifiques : paliers d'infogérance, solutions associées de Cloud).
Sources : `screenshots/before/1440/*.png` et `screenshots/before/390/*.png` (miroir local exact), tous les segments lus (hub : 3 en desktop, 4 en mobile ; SOC : 4 et 7 ; Audit : 4 et 6 ; Hyperautomatisation : 4 et 6 ; 4 autres fiches : 1 à 3 segments en 1440), recadrages pleine résolution (hero, cartes du hub, problème, approche, bénéfices, solutions associées). Recoupements : `capture-report.json` (axe, Hn, hauteurs), `phase0/content.md`, `phase0/custom-code.md`, `PREFLIGHT.md`, et mesures de styles calculés sur le miroir local (Playwright, aucune requête réseau externe).
Toutes les ordonnées « y » sont en pixels de la capture pleine page à l'échelle 1.
Le texte est hors périmètre (garde-fou 6) : aucune réécriture proposée, les incohérences de discours sont listées pour arbitrage.

Hauteurs : hub 3 295 px en 1440 (3,7 écrans de 900) et 6 391 px en 390 (7,6 écrans de 844) ; fiches service de 4 801 à 5 677 px en 1440 et de 8 283 à 9 911 px en 390 (9,8 à 11,7 écrans mobiles).

## Verdict

Le squelette des fiches service est bon (problème, approche, capacités, bénéfices, livrables, solutions, contact) et identique sur 7 pages : c'est un gabarit idéal à styler une fois par classes `bv-*`. Mais le rendu actuel ne tient pas le registre « acteur de cyberdéfense international » : près de la moitié de chaque fiche est en thème clair (fond `#F4F7FA` / blanc, texte encre, accent bleu `#2F80ED`) alors que le reste du site est dark-first, ce qui donne deux systèmes visuels cousus ensemble ; chaque page empile quatre grilles de cartes de la même famille ; le hero n'a aucun visuel (une carte résumé qui répète la carte du hub) ; et une carte « IA Orchestrator et ASTRO » présente sur 4 fiches est soit invisible (texte encre sur noir), soit un aplat arc-en-ciel, selon que le lazy-load Elementor s'est déclenché ou non. Rien d'irréversible : la majorité des corrections passe par les tokens et le CSS du plugin `blackvault-design`, sans toucher au texte ni aux Hn.

## Points forts à conserver

- Squelette narratif clair et constant sur les 7 fiches (problème, approche, capacités, bénéfices, livrables, solutions associées, contact), Hn propres (1 h1, h2/h3 réguliers, aucun saut).
- La timeline « Notre approche » (SOC : Collecte, Détection, Triage IA, Enrichissement, Dossier, Réponse, Rapport) est la matière exacte du module « flux animé Détecter → Corriger » du brief, déjà reliée aux produits.
- Les cartes « Ce que vous recevez / Livrables » avec méta-label mono (TEMPS RÉEL, À LA CLÔTURE, PÉRIODIQUE, CONTINU ; RAPPORT, DIRECTION, ACTION) sont le bon registre pour la piste B « Signal ».
- Filets 1 px sur Capacités et Bénéfices, fond near-black `#070B10` (pas `#000`), conteneur 1 280 px aligné à gauche, header collant.
- Hero qui tient dans le premier écran en 1440 (fin de hero entre y 688 et 810), CTA visibles au premier écran en 390 (bouton secondaire au plus bas à y 659).
- Aucun débordement horizontal en 390 (`hScroll: false` sur les 8 pages), burger 41 x 44 px, 0 requête tierce.
- Aucun trope interdit (ni capuche, ni cadenas, ni pluie binaire, ni globe), aucun nom tiers (garde-fou 7) ; la mention « Aucun nom d'outil interne... ne figure sur vos rapports » (SOC) va dans le sens du discours propriétaire. Le glyphe BlackTrace garde son hélice ADN.

## 1. Première impression et hero

**1.1 Hero de fiche service : titre trop long, pas de visuel, carte redondante.** SOC 1440 y 94-749 (h1 y 259-442, 3 lignes à 58 px dans une colonne de 717 px) ; Gouvernance et Cloud : 3 lignes ; Infogérance : 4 lignes (hero jusqu'à y ≈ 810) ; Audit, Hyperautomatisation, Intégration : 2 lignes. En 390, le h1 fait 3 lignes sur les trois fiches étudiées (y 205-319). La moitié droite est occupée par une carte « résumé » (SOC x 874-1360, y 251-608) qui reprend mot pour mot la carte du hub (icône, titre, phrase) plus 4 capacités qui reviennent ensuite dans « Nos capacités » : le même contenu est donc lu trois fois (hub, hero, section Capacités). En 390 cette carte pousse le hero à 1 036 px (SOC y 80-1116). Aucun visuel propre au service : pour un RSSI, rien ne distingue au premier regard un SOC 24/7 d'une offre d'hyperautomatisation. Reco : h1 sur 8 colonnes, taille fluide (`clamp`), `text-wrap: balance`, objectif 2 lignes desktop ; remplacer la carte par un visuel signature par service dans la direction choisie (line-art mono-accent, ou le flux Détecter → Corriger pour le SOC) ; masquer la carte en mobile.

**1.2 Hero du hub : moitié droite vide et mot en dégradé.** Hub 1440 y 94-694 : titre « Ce que nous faisons pour vous » dont « pour vous » est rempli du dégradé spectre bleu → turquoise → vert → citron (classe `.bv-grad`), « vous » seul sur la 2e ligne (y 320-386). Toute la zone x 900-1440 est vide (trame de points seule). Registre start-up plutôt qu'institutionnel, et l'emphase porte sur la partie la moins informative du titre. Reco : texte plein, aucun dégradé de texte ; un visuel ou une composition typographique qui occupe la droite (par exemple l'index des 7 services en liste mono), ou un hero volontairement plus bas et plus dense.

**1.3 Trop d'appels au premier écran.** Hub : « Parler à un expert » dans le header (162 x 40, y 26) et dans le hero (203 x 48, y 525), plus « Découvrir nos solutions » (244 x 50). Fiches : même trio, et le secondaire « Découvrir nos solutions » renvoie à `/solutions/`, donc fait sortir le visiteur du service qu'il est venu lire. Reco : un seul primaire par hero, un secondaire utile au contexte (ancre vers Capacités ou Livrables), le header gardant le contact.

**1.4 Crédibilité.** Aucune preuve au-dessus de la ligne de flottaison : pas de référentiel en badge texte (ISO 27001, NIST, MITRE ATT&CK sont cités plus bas en texte courant), pas d'indicateur. Sans inventer de chiffres, les éléments existants (24/7, niveaux 1 à 3, MITRE ATT&CK, GPU locaux) peuvent être mis en forme de micro-labels mono dans le hero. Liste à valider (garde-fou 6).

## 2. Hiérarchie et typographie

**2.1 Échelle sans palier intermédiaire.** Mesures : h1 58 px / 1,05, h2 44 px, h3 18 px, corps 15 px, chapeau 20 px, label mono 12,5 px (desktop) ; mobile h1 36, h2 30, h3 17, corps 15. Le saut h2 → h3 (44 → 18) est brutal : les h3 des cartes paraissent des intertitres de formulaire, et le corps à 15 px est petit pour un registre éditorial premium. Tailles en paliers fixes, pas de `clamp`. Reco : échelle fluide à 6 paliers (display, h1, h2, h3 20 à 24 px, corps 16 à 17 px, label), via `--e-global-typography-*` dans le plugin.

**2.2 Longueurs de ligne.** Hub : chapeau du hero ≈ 87 caractères par ligne (x 80-899), intro « Nos domaines d'intervention » ≈ 99 caractères (largeur 922 px, y 875-925) ; SOC : chapeau ≈ 78 caractères. La classe `.bv-measure` (68ch) existe mais n'est pas posée sur ces chapeaux. Reco : `max-width: 60ch` sur tous les chapeaux et intros.

**2.3 Trois familles.** Sora (titres), IBM Plex Sans (texte), IBM Plex Mono (labels), plus Font Awesome : le brief fixe 2 familles maximum (une sans + une mono). Reco : arbitrer en phase 3 (Sora ou Plex Sans pour tout le texte, Plex Mono pour data et labels).

**2.4 Eyebrows et mono labels.** Sur la fiche SOC, le mono capitales sert quatre rôles : eyebrow de section (LE PROBLÈME, NOTRE APPROCHE), méta de livrable (TEMPS RÉEL...), badge catégorie produit (DÉTECTION, INVESTIGATION) et titres de colonnes du footer ; en deux couleurs (bleu `#2F80ED` sur clair, turquoise `#3CC7D6` sur sombre). Les eyebrows n'apparaissent que sur les sections 2 et 3 puis disparaissent. Sur Hyperautomatisation, Gouvernance, Cloud et Infogérance, l'eyebrow « NOTRE APPROCHE » surmonte un h2 « Notre approche » (redondance pure). Le « Tous les services » du hero occupe la place d'un eyebrow mais c'est un lien, en Plex Sans gras gris, alors que le hub a un eyebrow mono turquoise : deux traitements pour la même position. Reco : un eyebrow au plus pour 3 sections, une seule couleur ; mono réservé aux données et méta-labels ; masquer les eyebrows redondants (liste à valider).

**2.5 Veuves et césures.** « vous » seul (hub h1), « pas » seul (SOC, carte « Des outils qui ne se parlent pas », y ≈ 1 045), « sécurité » seul (hub, h2 CTA en 390, y ≈ 3 322), « IT » seul (hub, carte Infogérance). Reco : `text-wrap: balance` sur h1 à h3, `pretty` sur les paragraphes.

## 3. Mise en page et rythme

**3.1 Une seule famille de mise en page, répétée.** Chaque fiche enchaîne : 3 ou 4 cartes égales (Problème), 6 tuiles à coche en 3 x 2 (Capacités), 3 ou 4 cartes (Livrables), 3 cartes produit (Solutions associées). Quatre grilles de cartes par page, multipliées par 7 fiches, plus 8 cartes sur le hub et 7 cartes service sur l'accueil. Effet « template SaaS », aucune section n'a de statut visuel propre. Reco : garder les cartes pour les seuls objets navigables (solutions associées) ; Problème en liste éditoriale numérotée, Capacités en liste à deux colonnes sans cadre, Livrables en tableau ou « fiches documents », Approche en flux.

**3.2 Désalignements.** Hub 1440 y 982-1582 : les cartes sont en `justify-content: space-between`, donc titres et textes flottent selon la longueur du titre (h3 à y 1 069 contre 1 053 sur la ligne 1 ; 1 361 à 1 377 sur la ligne 2, et 1 318 pour la carte « Un besoin précis ? », 59 px d'écart). Hyperautomatisation 1440 y ≈ 2 170-2 300 : 5 capacités dans une grille de 3, un emplacement vide en bas à droite. SOC 1440 y 2 780-3 762 : Bénéfices (colonne gauche) se termine vers y 3 360 alors que Livrables descend à y ≈ 3 640, laissant un vide d'environ 280 px à gauche. Reco : contenu calé en haut (`flex-start`) avec lien poussé en bas (`margin-top: auto`), grille adaptée au nombre d'items, colonnes Bénéfices/Livrables équilibrées (Bénéfices collant ou en pleine largeur).

**3.3 Ruptures de fond et zébrage.** Ordre des fonds sur SOC (1440) : sombre 94-749, clair `#F4F7FA` 749-1283, graphite `#0B121A` 1283-2057, blanc 2057-2780, clair 2780-3762, near-black 3762-4396, CTA 4396-4892, footer. Même alternance sur les 7 fiches ; les sections claires couvrent environ 47 % de la hauteur de contenu. Les passages blanc → `#F4F7FA` (y 2 780) sont si proches qu'ils semblent une erreur, et les passages noir → clair se font sans filet ni transition. Voir aussi 4.1.

**3.4 Vides.** SOC 1440 : entre la fin des cartes Solutions (y 4 284) et le h2 du CTA (y ≈ 4 550), deux sections sombres identiques se suivent et forment un vide d'environ 270 px, aggravé par la carte invisible (6.1). En 390, SOC y 7 174-7 700 : plus de 500 px apparemment vides. Reco : une seule section de clôture (solutions + contact) ou un filet de séparation, padding vertical sur base 8 (96 / 128).

## 4. Couleur

**4.1 Deux thèmes dans le même gabarit.** Classes `bv-light` (`#F4F7FA`), `bv-white` (`#FFFFFF`), `bv-dark2` (`#0B121A`), `bv-dark` (`#070B10`). Sur fond clair : titres encre `#0B121A`, texte `#3B4A5A`, accent bleu `#2F80ED` ; sur sombre : texte `#93A3B5`, accent turquoise `#3CC7D6`. C'est un second design system, et c'est lui qui porte l'essentiel du contenu (problème, capacités, bénéfices, livrables). Le brief est dark-first « à confirmer à l'audit » : ce groupe est l'endroit où le choix se joue. Reco : trancher en phase 3 ; si dark-first, basculer `bv-light` et `bv-white` vers des surfaces graphite (deux niveaux maximum) au niveau des classes, ce qui corrige les 7 fiches d'un coup ; si une respiration claire est voulue, une seule section « papier » par page, dessinée comme telle.

**4.2 Spectre au lieu d'un accent.** Hub : dégradé de texte dans le h1. Fiches : pastilles de la timeline en bleu, turquoise, vert, vert-citron, citron (SOC 1440 x ≈ 693, y 1 395-1 900) ; badges produit teintés (DÉTECTION bleu, INVESTIGATION bleu, EXPOSITION vert, REMÉDIATION citron, FORENSICS turquoise, Audit 1440 y 3 367-3 630) ; carte `.bv-spectrum-card` en dégradé 135° `#3D8BEF` → `#A8CC2F` ; filet du footer en dégradé spectre ; bleu et turquoise pour le même composant selon le fond. Le vert et le citron sur near-black frôlent l'interdit « vert Matrix / néon ». Reco : un accent signature unique issu des sources de marque, les couleurs produit réservées aux glyphes (et encore, à arbitrer), pastilles de timeline monochromes avec l'accent sur l'étape active.

**4.3 Contrastes en échec (WCAG 2.2 AA).** axe : « En savoir plus » `#2F80ED` sur blanc à 3,86:1 (hub, 7 occurrences, 15 px) ; méta-labels mono `#2F80ED` sur `#F4F7FA` à 3,59:1 en 12,5 px (SOC 10 nœuds, Hyperautomatisation 9, Cloud 9, Gouvernance 8, Intégration 6, Infogérance 6, Audit 5). Plus la carte invisible (6.1). Reco : token d'accent « texte » distinct de l'accent « décor », validé à 4,5:1 sur chaque surface.

## 5. Imagerie et iconographie

**5.1 Pas d'image, des icônes génériques.** Les 8 pages n'ont aucune image hors glyphes produit. Les services sont signés par des Font Awesome pleins (bouclier, loupe, organigramme, balance, serveurs, réseau, engrenages), bleus sur clair et turquoise sur sombre, petits (≈ 20 px) face à des titres lourds. Le bouclier (SOC) et les engrenages (Hyperautomatisation) sont les métaphores les plus attendues du secteur. Reco : une seule famille stroke (Lucide, Phosphor ou Tabler) en SVG inline, pictos dessinés pour chaque service dans le même langage que les 7 glyphes produit.

**5.2 Coche partout.** La coche FA sert d'icône à toutes les capacités (6 par page, bleu), à la liste du hero (turquoise) et aux paliers d'infogérance : une coche dit « inclus / validé », pas « capacité ». Reco : index mono (01, 02...) ou picto par capacité.

**5.3 Deux flèches.** Boutons : flèche FA pleine ; liens de carte « En savoir plus » et « Découvrir » : flèche texte « → » en pseudo-élément. Reco : une flèche SVG unique.

**5.4 Glyphes produit en rendu 3D.** Solutions associées (SOC 1440 y 4 019-4 284 ; Audit y 3 367-3 630) : Nova XSIEM en cristal brillant illisible à 60 px, BlackCaseX bouclier-loupe chromé, BlackVault VX bouclier vert, OrbitFix bouclier à coche citron avec orbite, BlackTrace hélice à particules. Halo, reflets, volumes : c'est le troisième langage visuel de la page après FA plein et les filets 1 px. Deux boucliers à coche sont proches du cliché « cadenas ». Reco : glyphes custom en line-art stroke unique (brief), BlackTrace gardant son hélice.

**5.5 Tropes interdits.** Aucun hacker à capuche, cadenas, pluie binaire, globe réseau. Pas de fausse UI produit. Risque résiduel : vert/citron et halos (voir 4.2).

## 6. Composants

**6.1 Carte « IA Orchestrator et ASTRO » : invisible ou arc-en-ciel (critique).** Présente dans Solutions associées sur 4 fiches : SOC (3e position, 1440 x 944-1360 y 4 019-4 284 ; 390 y 7 174-7 421), Hyperautomatisation (1re position, 1440 x 80-496 y 3 351-3 616 ; 390 y 5 248-5 495), Gouvernance et Cloud (1440, 3e et 1re position). Sur les captures, on ne lit qu'une trace : texte encre `#0B121A` sur `#070B10` (≈ 1,1:1). Cause mesurée sur le miroir : la carte porte `.bv-spectrum-card` (fond `var(--bv-spectrum-diag) !important`), mais la règle d'optimisation Elementor `.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload) *` impose `background-image: none !important` à tous les descendants tant que la section n'a pas reçu `e-lazyloaded` par l'IntersectionObserver. Après `scrollIntoView` et 1,5 s, la section est marquée et la carte se peint en aplat arc-en-ciel bleu → citron. Conséquences : carte illisible pour tout visiteur dont l'observer n'a pas encore déclenché (saut d'ancre, défilement rapide, JS bloqué, impression, aperçus et captures), puis, une fois peinte, élément le plus « néon » du site. Sur Hyperautomatisation et Cloud elle est en tête de rangée : la rangée paraît commencer par un trou. Elle n'a pas de lien « Découvrir » alors que les deux autres en ont un. Reco immédiate (CSS plugin, sans texte) : fond en `background-color` (non concerné par la règle lazy-load) sur surface élevée, texte `--on-night`, filet ou liseré d'accent unique ; ou classe `e-no-lazyload` sur le conteneur (modif de structure, sur copie brouillon).

**6.2 Boutons et libellés par intention.** Intention « contact » : « Parler à un expert » (header, hero, carte « Un besoin précis ? », CTA final, et 3 fois dans les paliers d'infogérance) et « Demander une démonstration » (CTA final du hub, vers `/contact/#formulaire`) : deux libellés pour la même destination, et une « démonstration » n'a pas de sens pour un service. Intention « voir le détail » : « En savoir plus » (hub) et « Découvrir » (cartes produit). « Tous les services » apparaît deux fois par fiche (lien du hero et bouton secondaire final). Tailles : header 162 x 40, primaire 203 x 48, secondaire 244 x 50 (1 px de décalage vertical entre les deux boutons du hero). En 390, boutons empilés de largeurs inégales (203 et 244 px), alignés à gauche dans le hero, centrés dans le CTA. Reco : un libellé par intention (arbitrage client), hauteur commune 48 px, boutons pleine largeur ou de largeur égale en mobile.

**6.3 Cartes.** Cartes service du hub : blanches à rayon 16 px sur `#F4F7FA`, bordure à peine visible, contenu en `space-between` (3.2). Carte « Un besoin précis ? » : aplat noir dans la section claire (hub 1440 x 992-1300 y 1 290-1 582) ; en 390 un vide de ≈ 60 px entre son titre et son texte (y ≈ 2 945-3 000). Cartes « problème » blanches sur gris très clair, sans hiérarchie interne (titre 18 px, texte 15 px). Reco : une carte de référence (surface, filet, rayon, états hover, focus-visible) déclinée partout.

**6.4 Navigation.** Sur le hub, « Services » est souligné (pseudo-élément turquoise). Sur les 7 fiches, l'item a bien les classes `current-menu-ancestor` / `current-menu-parent`, mais le soulignement reste à `opacity: 0` : le visiteur perd le repère de rubrique sur toute la section. Le lien retour « Tous les services » du hero (119 x 18 px, y 220 en 1440, y 166 en 390) n'a ni flèche ni soulignement : il se lit comme un eyebrow, et sa cible de 18 px de haut est loin du confort tactile (44 px). axe signale aussi `nested-interactive` sur les 4 conteneurs de sous-menus (header, toutes pages). Reco : état actif pour les ancêtres, fil d'Ariane mono explicite avec cible de 44 px.

**6.5 Paliers d'infogérance.** Infogérance 1440 y ≈ 2 640-3 140 : patron « grille tarifaire SaaS » (3 cartes, 3 boutons identiques « Parler à un expert », 3e carte inversée noire). Reco : tableau comparatif capacités x paliers avec coches mono et un seul CTA dessous.

**6.6 Stats, formulaires.** Aucun bloc stats ni formulaire dans ce groupe.

**6.7 Footer.** Filet haut en dégradé spectre (hub 1440 y ≈ 2 717) ; icônes de contact FA turquoise ; mention « Éditeur et opérateur de cybersécurité » (voir discours). Colonnes titrées en mono : bonne base.

## 7. Mobile (390)

**7.1 Longueur.** Fiches : 8 283 (Hyperautomatisation), 8 659 (Audit), 9 682 (SOC), 9 911 px (Infogérance), soit 9,8 à 11,7 écrans ; hub 7,6 écrans. Principaux postes : carte résumé du hero (≈ 430 px, redondante), Capacités en 6 blocs de 218 px de pas dont ≈ 80 à 100 px vides chacun (SOC y 3 503-4 772, 1 270 px), cartes Problème empilées, cartes du hub (y 963-3 140, 2,6 écrans), footer.

**7.2 Footer.** 1 688 px (SOC y 7 994-9 682, 2 écrans, environ 17 % de la page) avec deux trous d'environ 170 px (après la colonne Plateforme, SOC y ≈ 8 500-8 680, et avant le copyright, y ≈ 9 380-9 540) : la grille desktop est conservée en hauteur fixe. Reco : colonnes en 2 x 2 ou accordéons, suppression des hauteurs fixes.

**7.3 Reflow et lisibilité.** Pas de débordement horizontal. h1 36 px sur 3 lignes, corps 15 px, labels 12,5 px mono capitales espacés : lisibles mais au plancher. h2 du CTA centré en 3 lignes avec « sécurité » seul (hub). Alignements mixtes : hero et sections à gauche, CTA final centré.

**7.4 Cibles.** Burger 41 x 44 correct ; lien « Tous les services » 18 px de haut ; liens du footer au pas de 33 px (correct).

## 8. Cohérence de marque dans le groupe

- **Gabarit vs sur-mesure :** les 7 fiches sont un même gabarit (seules Infogérance ajoute ses paliers). Rien ne différencie visuellement un SOC 24/7, un audit offensif ou une hyperautomatisation, hormis l'icône FA et la couleur des badges produit. Un RSSI qui passe d'une fiche à l'autre a l'impression de relire la même page.
- **Hub vs fiches :** deux systèmes de hero (hub : eyebrow mono turquoise, mot en dégradé, trame de points, pas de carte ; fiches : lien retour gris, halo radial bleu en haut à droite, carte résumé), deux styles de liens de carte, deux accents.
- **Services vs reste du site :** le thème clair est l'ADN de ce groupe alors que l'accueil et les solutions sont sombres ; les cartes « Solutions associées » (sombres, glyphes 3D, badges colorés) reprennent le vocabulaire des pages produit et jurent avec les sections claires qui les précèdent.
- **Générique :** grille de cartes égales, coches, pictos FA, grille tarifaire SaaS, CTA centré « Parlons de... » : l'ensemble relève du modèle de landing SaaS plus que de l'institutionnel défense.

## 9. Incohérences de discours relevées (texte hors périmètre, à arbitrer)

| # | Incohérence | Où |
|---|---|---|
| 1 | Positionnement : eyebrow du hub « Services de cybersécurité » et footer « Éditeur et opérateur de cybersécurité » face au positionnement « acteur de la cyberdéfense » ; la carte Intégration du même hub dit « solutions de cyberdéfense » (les deux termes cohabitent sur une page) | hub, footer |
| 2 | Éditeur pur vs intégrateur/revendeur : « Des projets construits avec des éditeurs de référence, et avec nos propres produits lorsque c'est pertinent » (hub, « Des partenariats solides ») ; « Sélection et POC », « vos équipes restent dépendantes de l'intégrateur » (Intégration) ; contre « Nous ne revendons pas la solution d'un autre » (accueil, Entreprise) | 1752, 1761 |
| 3 | Anglicismes sur un site `fr-FR` destiné à des RSSI : « Threat hunting » (SOC, hero et capacités), « Red Teaming » (Audit), « CISO » (SOC, « escalade jusqu'au CISO », alors que la cible est nommée RSSI), paliers « Basic / Semi-Managed / Fully-Managed », « MSSP » (Infogérance), « RPA », « BPM » (Hyperautomatisation) | 1755, 1758, 1770, 1773 |
| 4 | Notation 24/7 non homogène sur la même page : « SOC managé 24/7 » (titre de carte), « 24 heures sur 24 » (chapeau du hero), « 24h/24, 7j/7 » (capacité Surveillance continue) | 1755 |
| 5 | Périmètre d'offre : Hyperautomatisation (RPA, BPM, OCR, productivité) et Infogérance (poste de travail, messagerie, Microsoft 365) tirent vers l'ESN généraliste et diluent « acteur de la cyberdéfense » | 1770, 1773 |
| 6 | Titre dupliqué : h2 « Le SOC traditionnel a atteint ses limites » identique sur la fiche SOC et l'accueil | 1755, 1722 |
| 7 | Libellés d'action : « Demander une démonstration » pour un service ; « En savoir plus » et « Découvrir » pour la même intention | 1752, fiches |
| 8 | Eyebrow et h2 identiques : « NOTRE APPROCHE » / « Notre approche » | 1764, 1767, 1770, 1773 |

## 10. Réserves de capture

- La carte `.bv-spectrum-card` apparaît invisible sur les captures parce que le défilement automatique (600 px toutes les 60 ms) n'a pas laissé le lazy-load Elementor marquer la section ; un défilement humain la peint en dégradé arc-en-ciel. Les deux états sont décrits en 6.1 et vérifiés par styles calculés sur le miroir local.
- États hover, focus et menus déroulants non capturés (le soulignement de rubrique a été vérifié par style calculé).
- Fiches Intégration, Gouvernance, Cloud et Infogérance : lecture desktop partielle seulement (même squelette que les trois fiches étudiées).

## Top des constats (impact / effort)

| # | Constat | Impact | Effort |
|---|---|---|---|
| 1 | Carte IA Orchestrator et ASTRO invisible (lazy-load) ou arc-en-ciel, 4 fiches | critique | S |
| 2 | Gabarit zébré clair/sombre, deuxième design system sur 47 % de chaque fiche | fort | M |
| 3 | Hero de fiche : h1 3 à 4 lignes, carte résumé redondante, aucun visuel ; hub à moitié vide | fort | M |
| 4 | Spectre multi-accent (dégradé de texte, pastilles, badges, filet footer, bleu + turquoise) | fort | M |
| 5 | Contrastes AA en échec : liens 3,86:1 et labels 3,59:1 sur 8 pages | fort | S |
| 6 | Quatre grilles de cartes par page et contenu répété trois fois | fort | M |
| 7 | Iconographie hétérogène : FA plein, coches génériques, deux flèches, glyphes produit 3D | fort | L |
| 8 | Mobile de 9,8 à 11,7 écrans, footer de 2 écrans avec trous, hauteurs fixes | moyen | M |
| 9 | Libellés multiples par intention, boutons de 3 tailles, largeurs inégales en mobile | moyen | S |
| 10 | Rubrique « Services » non signalée sur les 7 fiches, lien retour déguisé en eyebrow, cible 18 px | moyen | S |
| 11 | Désalignements : titres de cartes du hub, trou de grille, colonnes Bénéfices/Livrables, vide avant CTA | moyen | S |
| 12 | Échelle typo sans palier (58/44/18/15), 3 familles, lignes de 78 à 99 caractères, veuves | moyen | M |
| 13 | Mono capitales pour 4 rôles et 2 couleurs, eyebrows irréguliers ou redondants | moyen | S |
| 14 | Hub et fiches sans système commun ; grille tarifaire SaaS sur Infogérance | moyen | M |
| 15 | Incohérences de discours (cybersécurité / cyberdéfense, éditeur / intégrateur, anglicismes, 24/7) | moyen | S |
