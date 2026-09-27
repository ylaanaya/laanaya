# Phase 1 : critique design, groupe « institutionnel » (état avant)

Périmètre : Secteurs (1776), Entreprise (1779), Carrières (1782, formulaire CF7 1721), Contact (1785, formulaire CF7 1720), Politique de confidentialité (1788) et page 404 (gabarit du thème Hello Elementor).
Sources : `screenshots/before/1440/<slug>.png` et `screenshots/before/390/<slug>.png` (miroir local exact), tous les segments lus en desktop et en mobile, plus des recadrages pleine résolution (heros, lignes secteurs, stats, formulaires, bouton d'envoi, en-têtes de navigation, 404). Recoupements : `capture-report.json` (axe), `phase1/a11y/a11y-interactive.json` (focus des champs, cibles tactiles), balisage et CSS du miroir (lecture seule), formulaires CF7 du snapshot phase 0, `phase0/content.md`, `PREFLIGHT.md`.
Toutes les ordonnées « y » sont en pixels de la capture pleine page à l'échelle 1 (desktop 1440, écran de 900 px ; mobile 390, écran de 844 px).
Le texte est hors périmètre (garde-fou 6) : aucune réécriture proposée, les incohérences de discours sont listées pour arbitrage (section 9).

| Page | Desktop | Mobile | Écrans mobile | Part du footer en mobile |
|---|---|---|---|---|
| Secteurs | 3 720 px | 6 094 px | 7,2 | 28 % |
| Entreprise | 4 149 px | 7 086 px | 8,4 | 24 % |
| Carrières | 2 361 px | 3 959 px | 4,7 | 43 % |
| Contact | 2 087 px | 4 087 px | 4,8 | 42 % |
| Politique de confidentialité | 1 910 px | 3 293 px | 3,9 | 51 % |
| 404 | 900 px | 1 950 px | 2,3 | 87 % |

## Verdict

Les pages institutionnelles sont celles qu'un RSSI ou un acheteur ouvre pour sa due diligence (qui êtes-vous, pour quels secteurs, comment vous joindre). Aujourd'hui elles tiennent, mais par le texte seul : un même hero gabarit (eyebrow, titre à dégradé arc-en-ciel, moitié droite vide), puis un corps blanc qui fait basculer un site « dark-first » en site clair, sans aucun visuel ni signe propriétaire. Deux défauts bloquent la conversion et l'image : la 404 est illisible (titre à 1,04:1) et le bouton d'envoi des deux formulaires CF7 est invisible (blanc sur blanc), parce qu'une règle du Kit Elementor écrase le style prévu. Ces deux corrections sont de la CSS de plugin, sans toucher au texte ni aux Hn. Le reste relève du système (fonds, accent unique, grille, formulaires, footer mobile) et se règle une fois pour tout le groupe.

## Points forts à conserver

- Secteurs : liste éditoriale à filets 1 px (titre à gauche, texte et liens à droite), sans cartes. C'est le meilleur module du groupe et une base directe pour la piste A « Vault Noir » (1440 y 870-1 760).
- Référentiels en badges texte mono (ISO 27001, NIST, MITRE ATT&CK, lois nationales, protection des données), sans logos : conforme au garde-fou 8 (Secteurs 1440 y 2 470-2 535).
- Aucune photo stock, aucune fausse photo d'équipe sur Carrières, aucun trope interdit (capuche, cadenas, pluie binaire, globe), aucun nom d'outil tiers (garde-fou 7).
- Un seul h1 par page, h2/h3 réguliers ; chaque hero tient dans le premier écran, desktop et mobile.
- Formulaires CF7 bien construits : libellés visibles au-dessus des champs, `autocomplete` renseigné, 2 colonnes en desktop et 1 en mobile, champs de 48 px de haut, reflow 320 px sans débordement sur /contact/.
- Contact : bloc « Ce qui se passe ensuite » en 3 étapes, bonne réassurance avant envoi ; coordonnées complètes.
- Politique de confidentialité stylée par Elementor (pas le contenu brut du thème), lisible.
- Trame de points discrète dans les heros : texture sobre, compatible avec les pistes B « Signal » et C « Souverain ».
- Header collant, état actif souligné sur Secteurs, Entreprise et Contact.

## 1. Première impression et hero

**1.1 Un seul gabarit de hero, sans visuel ni signature.** Secteurs et Entreprise 1440 y 94-725, Carrières y 94-590, Contact y 94-540, Politique y 94-462. Même composition partout : eyebrow mono turquoise qui répète le nom de la page (« SECTEURS », « ENTREPRISE », « CARRIÈRES », « CONTACT »), h1 de 56-58 px sur 2 lignes dont la 2e en dégradé bleu → turquoise → vert → citron, chapeau gris, 0 à 2 boutons, trame de points. La moitié droite (x 880-1 360) reste vide sur toutes les pages. Aucun élément ne dit « cyberdéfense, Casablanca, souveraineté » visuellement : pour un RSSI de banque, ces pages ressemblent à celles d'une start-up SaaS. Reco : un hero institutionnel dédié (variante courte du hero d'accueil), titre plein sans dégradé, un motif signature en line-art (trame zellige de la piste C ou lignes de flux de la piste B) dans la moitié droite, remplacement de l'eyebrow redondant par un fil d'Ariane mono (Entreprise / Carrières), libellés déjà existants.

**1.2 Hauteurs de hero sans système.** 631 px (Secteurs, Entreprise), 496 px (Carrières), 446 px (Contact), 368 px (Politique, sans eyebrow ni dégradé). Trois variantes de fait, aucune règle lisible. Reco : deux tailles seulement (hero de section, hero utilitaire pour Contact, Carrières, Politique, 404), paddings en tokens base 8.

**1.3 CTA du premier écran.** Secteurs et Entreprise affichent « Parler à un expert » deux fois dans le premier écran (header y 26-66 et hero y 555-605). Sur Contact, le CTA du header pointe vers la page courante. Voir 6.4.

**1.4 Crédibilité.** Entreprise ne montre aucun élément d'identité au-dessus de la ligne de flottaison (siège, entité, souveraineté) autrement que par le texte ; le bloc de preuves (7, 24/7, < 5 min, 0) arrive à y 1 355 en desktop et y 2 057 en mobile. Reco (structure, pas de nouveau chiffre) : remonter la bande de stats juste sous le hero, en compteurs animés comme demandé par le brief.

## 2. Hiérarchie et typographie

**2.1 Dégradé arc-en-ciel dans chaque h1.** « organisations régulées » (Secteurs), « innovateur, souverain » (Entreprise), « construit ce qu'elle opère » (Carrières), « votre sécurité » (Contact). En mobile, le dégradé démarre au milieu d'une ligne (Carrières 390 y 250-320 : « équipe qui **construit** »), ce qui casse la lecture. Registre fintech, pas défense. Reco : titres pleins `--on-night`, zéro texte en dégradé.

**2.2 Tailles de titres incohérentes avec les niveaux Hn.**
- Contact : le h2 « Ce qui se passe ensuite » est rendu au même corps que ses h3 (« Un échange de cadrage »), 1440 y 955-1 030.
- Carrières : le h2 « Ce qui nous anime » fait environ 24 px (1440 y 707-724) contre 44-48 px pour les h2 des autres pages.
- Bandes CTA : le h2 final (« Parlons de vos obligations », « Sécurisons ce qui compte. ») fait 56-58 px, soit la taille du h1 de la page (Secteurs 1440 y 2 795-2 851 contre h1 y 269-327).
- Entreprise : deux tailles de h3 pour des objets équivalents : piliers et valeurs environ 24 px (y 1 177 et 1 875), « Notre manière » environ 18 px (y 2 403), dans une section où le h2 fait 44 px.
Reco : une échelle unique en `clamp()` avec paliers h1 > h2 > h3 respectés quel que soit le module ; palier h2 « compact » réservé aux colonnes latérales, jamais égal au h3.

**2.3 Longueurs de ligne.** Politique 116-117 caractères (1440 y 820-1 000, colonne de 915 px) ; chapeau de bande CTA 98 (Secteurs) et 121 caractères (Entreprise) centrés sur une ligne ; « Pourquoi maintenant » 104-107 ; chapeaux de hero 79 à 91 ; Casablanca 91. Cible 60-70. Reco : `max-width: 66ch` sur les classes paragraphe et chapeau, 62ch pour le texte centré.

**2.4 Mots orphelins.** Desktop : « partout » (Entreprise y ≈ 2 775-2 820), « publics » (Secteurs y ≈ 1 300), « Pourquoi / maintenant » coupé dans une colonne de 380 px alors qu'il tient sur une ligne en mobile (Secteurs 1440 y 2 020-2 120). Mobile : « crédit » (Secteurs 390 y ≈ 860), « vitale » (y ≈ 2 170), « animent » (Entreprise 390 y ≈ 2 520), « compte. » (y ≈ 5 010). Reco CSS sans toucher au texte : `text-wrap: balance` sur h1-h3, `pretty` sur les paragraphes.

**2.5 Emphase inversée.** Entreprise 1440 y 845-1 030 : le chapeau est en gris 20 px, la phrase « Notre mission » qui suit est en blanc 16 px, donc plus contrastée que le texte principal. Reco : un seul style de chapeau, le second paragraphe en texte courant.

**2.6 Eyebrows et mono.** Usage modéré dans ce groupe (1 à 2 par page), mais l'eyebrow de hero répète le nom de page et n'apporte rien. Le mono est par ailleurs bien employé pour les données (tags secteurs, référentiels, titres de colonnes du footer). Trois familles restent chargées (Sora, IBM Plex Sans, IBM Plex Mono), 8 fontes sur Entreprise, plus Font Awesome : le brief en demande 2.

## 3. Mise en page et rythme

**3.1 Le « dark-first » s'arrête sous le hero.** Cinq pages sur six passent d'un bandeau sombre à un corps blanc sans transition : Secteurs 1440 y 725, Carrières y 590, Contact y 540, Politique y 462. Entreprise enchaîne six fonds sans filet ni intention : `#070B10` (0-725), `#0B121A` (725-1 580), `#070B10` (1 580-2 167), `#F4F7FA` (2 167-2 612), `#FFFFFF` (2 612-3 075), `#070B10` (3 075-4 149). Deux gris clairs consécutifs et deux quasi-noirs alternés créent des coutures molles. Pour l'audience, le site change d'identité entre l'accueil et les pages d'entreprise. Reco : trancher à l'audit (brief : « dark-first à confirmer ») ; si le clair est gardé, un seul fond clair, assumé, pour les modules de lecture longue (politique, formulaires), et séparations par filets hairline plutôt que par bascules de fond.

**3.2 Pas de grille commune.** Les colonnes de droite démarrent à x 592 (lignes Secteurs), 541 (« Pourquoi maintenant », même page), 720 (Entreprise, section « revendons »), 900 (carte Casablanca, colonne latérale Contact) et 592 (formulaire Carrières). Aucune de ces lignes ne tombe sur une colonne d'une grille 12 colonnes de 1 280 px. Sur la seule page Secteurs, le texte de « Pourquoi maintenant » est décalé de 51 px par rapport aux lignes secteurs juste au-dessus. Reco : grille 12 colonnes tokenisée, découpes 5/7 (listes éditoriales) et 8/4 (formulaire + aside) uniquement.

**3.3 Zones vides.**
- Carrières 1440 : colonne gauche vide de y 1 010 à 1 670 (435 x 660 px) à côté du formulaire.
- Politique 1440 : colonne droite vide x 995-1 360 sur toute la hauteur du texte (y 462-1 335).
- Secteurs 1440 : 155 px blancs après la dernière ligne (y 1 760-1 914) avant la bascule en sombre.
- 404 1440 : 120 px noirs sous le footer (y 780-900).
Reco : aside collant (sommaire de la politique construit sur les h2 existants, rappel des coordonnées à côté du formulaire Carrières), largeur de lecture limitée plutôt que colonne pleine.

**3.4 Entreprise : trois traitements pour des listes de même nature.** Piliers (Éditeur, Opérateur...) en 4 colonnes à filet haut avec icône (1440 y 1 107-1 285), stats en 4 colonnes identiques juste dessous (y 1 355-1 470), valeurs en 3 cartes égales arrondies (y 1 837-2 055), « Notre manière de travailler » en 4 colonnes à filet haut sans icône et en plus petit (y 2 376-2 500). Carrières reprend les mêmes valeurs en liste à filets (y 700-1 010). Les deux rangées 4 colonnes empilées se lisent comme une seule grille ; les 3 cartes égales sont le motif le plus générique possible. Reco : liste éditoriale numérotée pour piliers et valeurs, module stats distinct (mono tabulaire, filets verticaux, compteurs), même composant « valeurs » sur Entreprise et Carrières.

**3.5 Rythme vertical.** Globalement régulier (environ 96 à 112 px de padding de section), mais la liste Secteurs s'ouvre à environ 150 px et se ferme sur 155 px vides ; hauteurs d'items égales conservées en mobile dans « Notre manière » (Entreprise 390 y 3 400-3 950, écarts de 30 à 60 px entre items). Reco : paddings de section en tokens (64 / 96 / 128), `min-height` des items seulement au-dessus du breakpoint tablette.

## 4. Couleur

**4.1 Deux accents selon le fond, plus le spectre.** Sur sombre : turquoise `#3CC7D6` (eyebrows, icônes piliers, icônes coordonnées). Sur clair : bleu `#2F80ED` (tags secteurs, liens, icônes Casablanca, eyebrow « CONTACT »). S'y ajoutent le dégradé 4 couleurs des h1, le filet spectre en haut du footer (toutes pages, par ex. Secteurs 1440 y 3 142) et le dégradé chromé blanc → gris des stats (Entreprise 1440 y 1 390-1 430). Le brief demande un seul accent signature ; ici l'accent change avec le fond, ce qui empêche de le mémoriser. Reco : neutres graphite + un accent unique, en deux valeurs de luminance (sur sombre, sur clair) issues du même token.

**4.2 Contrastes en échec, tous liés au bleu sur clair.**
- Secteurs : 25 nœuds axe, pastilles mono `#2F80ED` sur `#E2EDFC` à 3,26:1 en 12,5 px et liens bleus sur blanc à 3,86:1 (1440 y 930-1 740 ; 390 y 890-2 860).
- Entreprise : eyebrow « CONTACT » de la carte Casablanca à 3,59:1 sur `#F4F7FA` (1440 y 2 770).
- Contact et Carrières : lien « politique de confidentialité » du consentement à 3,86:1 sur blanc et 3,59:1 sur `#F4F7FA`, sans soulignement, 2,34:1 face au texte voisin (axe `link-in-text-block`).
Reco : accent sur clair assombri jusqu'à 4,5:1 minimum, liens de texte soulignés.

**4.3 404 : couleurs du Theme Style « fond clair » sur fond sombre.** h1 `#0B121A` sur `#070B10` à 1,04:1, paragraphe à environ 2,2:1 (1440 y 105-205 ; 390 y 90-235). C'est le risque « contenu non stylé » annoncé en phase 0, réalisé ici. Voir 6.1.

**4.4 Pas de néon ni de vert Matrix** dans ce groupe, mais les verts et citrons du dégradé des h1 sont les seuls éléments chromatiques forts de ces pages : ils en deviennent la signature par défaut.

## 5. Imagerie et iconographie

**5.1 Zéro image.** Aucune des six pages n'a de visuel (hors logo), ce qui est sain pour Carrières (garde-fou 8 : pas de photo stock présentée comme l'équipe), mais laisse les pages sans marqueur de marque. Reco : un motif propriétaire line-art unique décliné par page (trame zellige, flux, carte stylisée du siège en filets), SVG inline, sans texte incrusté ; aucune photo d'équipe.

**5.2 Font Awesome plein, deux couleurs.** Entreprise : code, satellite, cerveau, bouclier (1440 y 1 135-1 145) ; coordonnées : repère, téléphone, enveloppe (Entreprise y 2 820-2 910, Contact y 795-871, footer) ; flèches pleines dans tous les boutons et liens. Cerveau = IA et bouclier = sécurité sont les métaphores les plus attendues du secteur. Reco : une famille line MIT/ISC, trait unique, SVG inline, une seule flèche.

**5.3 Liens produit indistincts des liens service.** Sur Secteurs, « BlackCaseX », « BlackVault VX », « Nova XSIEM », « OrbitFix », « BlackVault Nexus » ont exactement le style de « SOC managé 24/7 » ou « Déploiement on-premise » (1440 y 1 000, 1 187, 1 374, 1 561, 1 748). Reco : glyphe produit (les 7 glyphes custom du brief) devant les liens produit, lien texte simple pour les services.

**5.4 Logo raster.** PNG 488 x 184 sans width/height sur les 6 pages (axe `imgsNoDims`), pictogramme très détaillé qui se brouille à 57 px. À traiter en phase 2 (SVG depuis la source vectorielle, sans retouche).

## 6. Composants

**6.1 Page 404 (critique).** 1440 y 94-224 ; 390 y 80-253. Gabarit du thème Hello Elementor non stylé : h1 et paragraphe invisibles (4.3), collés au header (h1 à 11 px sous le filet du header), alignés à x 150 (conteneur du thème 1 140 px) au lieu de x 80, gouttière de 10 px en mobile au lieu de 20 ; aucune issue (ni lien accueil, ni contact, ni recherche) ; la page est à 87 % le footer en mobile. Pour un visiteur venu d'un lien cassé, c'est l'image d'un site non terminé. Reco : styler `.error404 .page-header` et `.page-content` dans le plugin (couleurs, conteneur 1 280, paddings, typo), motif signature, et deux liens (accueil, contact) ajoutés comme micro-labels à valider. Effort S pour la lisibilité, M pour la page complète.

**6.2 Bouton d'envoi des formulaires invisible (critique).** Contact 1440 y 1 330-1 380 (« Envoyer ma demande ») : fond blanc, sans bordure, sur carte blanche ; il se lit comme du texte en gras. Carrières 1440 y 1 565-1 612 (« Envoyer ma candidature ») : blanc sur `#F4F7FA`, à peine détaché. Mobile : Contact 390 y ≈ 1 560, Carrières 390 y 2 100-2 148. Cause mesurée dans le CSS : la règle du Kit `.elementor-kit-1685 input[type="submit"]` (spécificité 0,2,1, fond `#FFFFFF`) écrase la règle prévue `.bv-form .wpcf7-submit` (0,2,0, fond `#0B121A`, survol `#2F80ED`). L'action la plus importante du site est l'élément le moins visible de la page. Reco immédiate : sélecteur plus spécifique dans le plugin (`.elementor-kit-1685 .bv-form input.wpcf7-submit`), bouton primaire du système avec états hover, focus-visible, active, disabled et chargement (spinner CF7 déjà présent).

**6.3 Champs de formulaire.**
- Aucun état de focus visible : `outline: none` et bordure `#DCE3EA` inchangée au focus sur les 8 champs de Contact (`a11y-interactive.json`, formFocus). Échec WCAG 2.4.7 pour un public qui navigue souvent au clavier.
- Contrôles natifs non stylés : champ fichier « Choose File / No file chosen » (libellés du navigateur, en anglais dans la capture) sur Carrières 1440 y 1 170-1 190, select natif « Votre demande concerne » (Contact 1440 y 903-950), case à cocher native de 13 px (Contact y 1 277, Carrières y 1 510).
- En mobile, le champ fichier déborde la colonne des champs jusqu'au bord de la carte (Carrières 390 y 1 673-1 701, x 44-370 contre 44-346 pour les autres champs).
- Astérisques d'obligation non différenciés, pas d'état d'erreur visible sur capture.
- Deux habillages de carte formulaire : blanche à bordure sur blanc (Contact, x 80-847) et grise `#F4F7FA` sans bordure (Carrières, x 592-1 360).
Reco : composant formulaire unique (CSS seulement, logique CF7 intacte) : champ, select, fichier, case, message d'erreur et de succès, focus-visible à l'accent, même carte pour les deux formulaires.

**6.4 Boutons et libellés.** « Parler à un expert » : 4 fois sur Entreprise (header, hero y 555-605, Casablanca y 2 914-2 962, CTA final y ≈ 3 400), 3 fois sur Secteurs. « Demander une démonstration » mène au même formulaire (`/contact/#formulaire`) sans présélection du sujet : deux libellés pour une même destination. Sur Contact, le CTA du header renvoie à la page courante. Variantes visuelles : blanc plein et contour sombre sur fond sombre, noir plein et contour sur fond clair (Casablanca) : 4 rendus pour 2 rôles. Reco : 2 variantes (primaire, secondaire) par tokens, déclinées par thème ; CTA du header en état « courant » ou masqué sur /contact/ ; liste de libellés par intention à arbitrer (texte).

**6.5 Stats.** Entreprise 1440 y 1 355-1 470 : chiffres Sora 56 px en dégradé chromé, statiques, même filet que les piliers au-dessus. Bloc identique à l'accueil (`bv-facts`). Reco : module stats signature (mono tabulaire, compteurs joués une fois, `prefers-reduced-motion` respecté), sans nouveau chiffre.

**6.6 Tags secteurs.** Pastilles mono capitales bleues sur bleu pâle (Secteurs 1440 y 930-1 700) : bon usage du mono pour des mots-clés, mais contraste insuffisant (4.2) et, en mobile, retour à la ligne des pastilles (390 y 890-950 et 1 325-1 390) qui allonge chaque bloc. Reco : tag neutre à filet 1 px, texte `--muted` à 4,5:1.

**6.7 Carte coordonnées de Contact.** Carte noire sur page blanche (1440 y 600-920, x 900-1 360) : c'est l'élément le plus contrasté de la page, devant le formulaire, alors que le bouton d'envoi est invisible. Hiérarchie inversée. Le nom « BLACKVAULT » y est composé en titre, alors que le logo dit « Black Vault ». Reco : aside au même niveau que le formulaire (surface élevée, pas d'inversion), coordonnées cliquables, logo ou nom composé selon les règles de marque de la phase 2.

**6.8 Navigation.** Carrières n'active pas son parent « Entreprise » dans le menu (1440 y 30-66 : aucun soulignement), alors que Secteurs, Entreprise et Contact sont soulignés. Burger mobile à 4 barres (glyphe « align-justify »). Politique : e-mails `contact@blackvault.ma` non cliquables (1440 y 585 et 1 140), aucun sommaire. Reco : état parent actif, burger standard dans un `<button>`, liens `mailto:` sur les adresses existantes.

**6.9 Footer (gabarit commun).** Voir 7.2. En desktop, colonne Services trop étroite (4 libellés sur 7 sur 2 lignes, par ex. Secteurs 1440 y 3 280-3 390) et filet spectre en tête.

## 7. Mobile (390)

**7.1 Reflow correct, pas de débordement horizontal** (`hScroll: false` sur les 6 pages), sauf le champ fichier de Carrières (6.3).

**7.2 Footer de 1 700 px.** Sur chaque page (Secteurs 390 y 4 397-6 094, Contact y 2 390-4 087, Politique y ≈ 1 600-3 293, 404 y 253-1 950) : une colonne de 24 liens, avec deux trous d'environ 190 px hérités des hauteurs desktop (après « Secteurs » de la colonne Plateforme et après « Contact » de la colonne Entreprise, par ex. Secteurs 390 y 4 907-5 097 et 5 780-5 973). Il pèse 42 à 51 % des pages courtes. Liens de 23 px de haut, espacés d'environ 33 px : conformes WCAG 2.2 grâce à l'espacement. Reco : 2 colonnes de liens ou accordéons, suppression des hauteurs fixes, bloc marque compact.

**7.3 Ordre de lecture de Contact.** Les coordonnées (téléphone, e-mail) n'arrivent qu'après tout le formulaire, à y 1 665-1 953, soit au 3e écran. Reco (structure, pas de texte) : rappel compact téléphone / e-mail avant le formulaire en mobile, ou aside placé en premier.

**7.4 Boutons empilés de largeurs inégales.** Heros Secteurs (390 y 529-641 : 203 et 244 px) et Entreprise (y 557-668), CTA finaux centrés (Secteurs y 4 189-4 300 : 204 et 290 px), Casablanca (y 4 410-4 520). Reco : pleine largeur ou largeur commune.

**7.5 Titres et alignements.** h1 sur 3 lignes pour Secteurs, Entreprise et Carrières, avec le dégradé coupé en cours de ligne ; « RÉFÉRENTIELS » centré au-dessus de badges alignés à gauche (Secteurs 390 y 3 669-3 795) ; 404 avec h1 à x 20 et paragraphe à x 10.

**7.6 Longueur.** Raisonnable pour Carrières, Contact et Politique (3,9 à 4,8 écrans, dont près de la moitié de footer). Entreprise (8,4 écrans) s'allonge surtout par les 4 piliers empilés (390 y 1 290-1 975), les 3 cartes valeurs (y 2 632-3 240) et les 4 items « Notre manière » (y 3 400-3 950). Reco : listes compactes à filets, stats 2 x 2 conservées.

## 8. Cohérence de marque (groupe)

- **Gabarité** : header, footer, hero (eyebrow + h1 dégradé + chapeau + boutons sur trame de points), bande CTA centrée finale (la même que sur une vingtaine de pages), bloc stats identique à l'accueil. Toute correction passe par les classes `bv-*` et le plugin, sinon elle se répète page par page.
- **Sur mesure** : liste des secteurs (réussie), carte coordonnées sombre, mise en page formulaire + aside. Ce sont les seuls modules propres au groupe, et ils ne partagent ni la même grille ni la même carte.
- **Générique** : 3 cartes égales pour les valeurs, 4 colonnes à icône pour les piliers, CTA centré sur fond noir. Rien ne signe Casablanca, la souveraineté ou le registre défense.
- **Deux sites en un** : sombre sur l'accueil et les heros, clair dans le corps des pages institutionnelles, avec un accent qui change de teinte à chaque bascule.
- **Nom de marque** : logo « Black Vault » (deux mots, casse mixte), texte « BLACKVAULT », entité « BLACK VAULT SARL ». La carte Contact compose « BLACKVAULT » comme un titre. À documenter en phase 2 (règles d'usage), sans retouche du logo.

## 9. Incohérences de discours relevées (à arbitrer, texte hors périmètre)

1. **Positionnement** : h1 Entreprise « Éditeur, opérateur, innovateur, souverain », footer « Éditeur et opérateur de cybersécurité » (toutes pages), chapeau Entreprise « Spécialisés dans la cybersécurité, les services managés de sécurité et l'intégration d'infrastructures résilientes » ; le brief dit « acteur de la cyberdéfense », terme absent de ces six pages.
2. **Éditeur pur ou intégrateur, sur la même page** : Entreprise h2 « Nous ne revendons pas la solution d'un autre » (1440 y 844-930) puis h3 « Des partenariats forts : avec des leaders de l'informatique et de la cybersécurité » (y ≈ 2 400) et chapeau de hero sur « l'intégration d'infrastructures ». Un RSSI lit les deux à 1 600 px d'écart.
3. **Valeurs en deux versions** : Entreprise « Les valeurs qui nous animent » et Carrières « Ce qui nous anime » listent les mêmes trois valeurs (Engagement, Confiance, Ouverture) avec des définitions différentes.
4. **« notre groupe »** (chapeau Carrières) alors que l'entité est BLACK VAULT SARL.
5. **Responsable du traitement** : la politique nomme « BLACKVAULT » et non l'entité juridique ; le copyright du footer dit « © 2026 BLACKVAULT ». À valider juridiquement.
6. **Anglicismes** dans les liens Secteurs : « Déploiement on-premise », « SaaS souverain », alors que d'autres pages disent « Chez vous ou sur un cloud souverain ».
7. **Texte 404 générique du thème** (« La page ne peut pas être trouvée. Il semble que rien n'a été trouvé à cet emplacement. ») : ce n'est pas la voix de la marque.
8. **Deux intentions de contact** (« Parler à un expert », « Demander une démonstration ») pour un même formulaire sans présélection : distinction purement cosmétique.
9. **Couverture produit** : Secteurs cite 5 produits sur 7 (ni BlackTrace ni The Hound), déjà signalé en phase 0.

## 10. Réserves de capture

- États hover, focus, erreur et succès des formulaires non visibles sur captures statiques ; l'absence de focus visible est établie par la mesure `formFocus`, pas par l'image.
- Les libellés du champ fichier (« Choose File ») dépendent de la langue du navigateur de capture ; le constat porte sur l'absence de style, pas sur la langue.
- Sous-menus et menu mobile ouvert hors périmètre de ces captures (voir revue accessibilité).

## Top des constats (impact / effort)

| # | Constat | Pages | Impact | Effort |
|---|---|---|---|---|
| 1 | Bouton d'envoi CF7 invisible (règle Kit plus spécifique que `.bv-form`) | Contact, Carrières | critique | S |
| 2 | 404 illisible (1,04:1), mal alignée, sans issue | 404 | critique | S |
| 3 | Champs sans focus visible, contrôles natifs non stylés, champ fichier qui déborde en mobile, deux cartes formulaire | Contact, Carrières | fort | M |
| 4 | Dark-first rompu : hero sombre puis corps blanc, 6 fonds sur Entreprise | toutes | fort | M |
| 5 | Hero gabarit sans visuel ni signature, eyebrow redondant, moitié droite vide | 5 pages | fort | M |
| 6 | Accent qui change selon le fond + dégradé h1 + stats chromées + filet spectre | toutes | fort | M |
| 7 | Bleu sur clair en échec de contraste (25 nœuds sur Secteurs, liens de consentement) | Secteurs, Entreprise, Contact, Carrières | fort | S |
| 8 | Contradictions de discours sur Entreprise (éditeur pur contre partenariats et intégration) | Entreprise | fort | S |
| 9 | Footer mobile de 1 700 px avec trous de 190 px (42 à 87 % des pages courtes) | toutes | fort | M |
| 10 | Tailles de titres incohérentes avec les Hn (h2 = h3, h2 final = h1) | Contact, Carrières, Entreprise, Secteurs | moyen | S |
| 11 | Aucune grille commune (colonnes à x 541, 592, 720, 900), zones vides | Secteurs, Carrières, Politique, Contact | moyen | M |
| 12 | Entreprise : 3 traitements pour des listes équivalentes, 2 rangées 4 colonnes identiques, 3 cartes égales | Entreprise, Carrières | moyen | M |
| 13 | CTA répétés, deux libellés pour une destination, CTA header vers la page courante | Entreprise, Secteurs, Contact | moyen | S |
| 14 | Contact : carte coordonnées plus forte que le formulaire, coordonnées au 3e écran en mobile | Contact | moyen | S |
| 15 | Lignes trop longues (jusqu'à 121 caractères) et mots orphelins | toutes | moyen | S |
| 16 | Font Awesome plein, métaphores clichés, liens produit sans glyphe | Entreprise, Secteurs, Contact | moyen | M |
| 17 | Navigation : parent non actif sur Carrières, burger 4 barres, e-mails non cliquables | Carrières, Politique, toutes | faible | S |
