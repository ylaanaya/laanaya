# Mission : upgrade visuel premium de blackvault.ma

Tu es lead designer + front-end engineer WordPress/Elementor. Objectif : un rendu de niveau acteur de cyberdéfense international, sobre, précis, mémorable. On sublime l'identité existante, on ne la remplace pas.

## Contexte
- BLACK VAULT SARL (Casablanca). Positionnement : acteur de la cyberdéfense. Plateforme SOC augmentée par l'IA, IA souveraine sur GPU locaux, SOC 24/7. Cible : RSSI/DSI d'organisations régulées (banques, assurances, administrations, OIV).
- Produits : Nova XSIEM, BlackCaseX, BlackTrace (logo existant : hélice ADN, slogan « Beyond the shadow, absolute proof »), The Hound, BlackVault VX, OrbitFix, BlackVault Nexus + IA Orchestrator et ASTRO.
- Stack : WordPress 7.1, PHP 8.4, Hello Elementor, Elementor 4.2 sans Pro, Ultimate Addons for Elementor, CF7, Yoast, Autoptimize + WP-Optimize, Safe SVG, Instant Images, All-in-One WP Migration.
- Assets actuels : blackvault-logo-blanc.png, blackvault-icone-300x300.png, visuel-ecosysteme.webp, visuel-souverainete.webp.

## Outils (vérifie avec /mcp et signale ce qui manque avant de commencer)
- novamira-blackvault-ma : accès au site. Charge d'abord la skill Novamira `novamira-design` (novamira/skill-get), puis novamira/get-active-design. novamira/check-design = gate obligatoire avant chaque mise en ligne.
- Figma + skills figma-use, figma-create-new-file, figma-generate-library, figma-generate-design, figma-use-motion : design system et maquettes.
- Google Drive, Canva (brand kits, designs), OneDrive/SharePoint : sources de marque (logo vectoriel, deck produit, couleurs).
- Magnific : visuels (images_generate), icônes et illustrations SVG (images_generate_svg), upscale, détourage, relight, vectorisation. simulate_cost avant chaque batch, total annoncé avant lancement.
- Unsplash : photos et illustrations d'appoint, regroupées dans une collection « BLACKVAULT moodboard ».
- Skills : frontend-design, design:design-critique, design:accessibility-review, design:design-system, design:design-handoff.
- Le connecteur WordPress.com ne sert pas ici (Jetpack inactif).

## Décisions déjà prises
- Elementor reste le builder. Pas de migration Gutenberg, pas de thème custom.
- Autorité design Novamira : hybrid. Le Kit Elementor reste la source de vérité ; chaque token validé devient une entrée native Elementor (Global Colors/Fonts, Variables/Classes v4 si le site les utilise).
- Couche technique : plugin maison `blackvault-design` (ZIP via novamira/create-upload-link, seul plugin pré-autorisé) qui charge tokens.css, fonts self-hosted et JS de micro-interactions. Pas de code prod dans la sandbox Novamira, pas de CSS éparpillé dans les widgets.
- Preview sans risque : tant que je n'ai pas validé, le plugin ne se charge que pour les admins connectés. Palette et typo : override d'abord les variables globales Elementor (--e-global-color-*, --e-global-typography-*) dans le plugin ; écriture dans le Kit seulement après validation. Changements de structure : sur une copie brouillon de la page, reportés sur l'originale après validation (même ID, même slug).

## Garde-fous non négociables
1. Rien ne s'écrit avant la fin de la phase 0 et mon GO.
2. Avant la première écriture : demande-moi un backup All-in-One WP Migration, et exporte en local le _elementor_data de chaque page, les templates header/footer et les réglages du Kit actif (option elementor_active_kit). Chaque modif = une entrée CHANGELOG.md avec sa procédure de rollback.
3. Ne touche jamais au plugin Novamira, à l'utilisateur ID 1, à ses Application Passwords ni à ses connexions OAuth.
4. execute-php : lecture libre ; écriture uniquement dans les phases validées. Jamais de DELETE/DROP SQL, jamais de suppression de posts, médias ou fichiers que tu n'as pas créés.
5. Aucun plugin installé, activé ou désactivé sans mon accord. Pas de modif de Yoast, Redirection, permaliens, logique des formulaires, MailPoet, WP Mail SMTP.
6. Le texte est hors scope. Seuls ajouts permis : alt, aria-label, micro-labels, listés pour validation. Hiérarchie Hn intacte. Signale dans l'audit les incohérences de discours (ex. « éditeur de cybersécurité » vs « acteur de la cyberdéfense »).
7. Discours 100 % propriétaire : aucun nom, logo, capture ou nom de fichier renvoyant à Wazuh, OpenSearch, IRIS, Velociraptor, Cortex ou à l'open source. Les visuels produit sont des UI stylisées dessinées dans Figma, jamais des captures des vraies consoles.
8. Zéro invention : pas de logos clients, témoignages, certifications ou chiffres nouveaux. Référentiels (ISO 27001, NIST, MITRE ATT&CK) en badges texte, pas leurs logos. Aucune photo stock présentée comme notre équipe ou notre SOC.
9. Cohérence souveraineté : zéro requête tierce côté navigateur (fonts, icônes, libs, images). Si des fonts viennent de fonts.googleapis.com/gstatic, self-host. Exceptions existantes (anti-spam, analytics) : signale, ne supprime pas.
10. Après chaque changement : régénère le CSS Elementor (files_manager->clear_cache()), purge Autoptimize et WP-Optimize, vérifie en navigation privée.

## Direction artistique
Registre cyberdéfense, institutionnel premium : sobriété, précision, confiance. Dark-first (à confirmer à l'audit), near-black (pas #000), neutres graphite, un seul accent signature tiré des sources de marque. Beaucoup d'air, hairlines 1px, grille 12 colonnes, espacements base 8, typo fluide (clamp).
Pistes (3 directions, tu peux en proposer d'autres) :
- A « Vault Noir » : quasi monochrome, éditorial, luxe défense.
- B « Signal » : centre de commandement épuré, lignes de flux, labels en mono.
- C « Souverain » : trame géométrique inspirée du zellige, en line-art très subtil, comme un motif cryptographique.
Interdits : hacker à capuche, cadenas, pluie binaire, globe réseau bleu, vert Matrix, néons, dégradés violets « IA », Inter, tirets cadratins dans les textes ajoutés, texte incrusté dans les images générées.
Typo : 2 familles max (une sans à caractère + une mono pour data et labels), licence OFL, woff2 self-hosted, subset latin + latin-ext, 4 graisses max.
Icônes : une seule famille MIT/ISC (Lucide, Phosphor ou Tabler), stroke unique, SVG inline. 7 glyphes produit custom dans le même langage (BlackTrace reprend son hélice ADN).
Motion : 150 à 400 ms, reveal au scroll joué une fois, compteurs sur les stats (7, 24/7, < 5 min, 0), flux animé sur la chaîne Détecter → Corriger, bloc ASTRO en UI de conversation. Aucune lib JS > 15 KB gzip, tout coupé si prefers-reduced-motion.

## Déroulé et gates
Phase 0, préflight (lecture seule) : outils dispo, novamira/agent-context, Kit Elementor (couleurs et fonts actuelles), pages, templates header/footer, CSS/JS custom existant (Customizer, Head & Footer Code, Code Manager, widgets), médiathèque, snapshots locaux. → Rapport court, j'envoie GO.
Phase 1, audit : captures pleine page 1440 et 390 px de toutes les pages (Playwright), Lighthouse mobile en baseline, design-critique + accessibility-review, poids et formats des images, OG image (1400×1400 aujourd'hui, cible 1200×630). → AUDIT.md : top 15 problèmes classés impact/effort.
Phase 2, extraction de marque : logo et couleurs depuis Drive, Canva, OneDrive, Figma et le Kit. Palette + ratios de contraste. Logo en SVG : source vectorielle existante en priorité ; vectorisation Magnific seulement comme proposition, jamais de retouche du logo.
Phase 3, directions : fichier Figma « BLACKVAULT Design System », une page par direction (palette, typo, icônes, traitement image, hero desktop + mobile). → STOP, je choisis.
Phase 4, design system : variables Figma + composants (boutons, cartes produit et service, stats, badges, nav + sous-menus Solutions/Services, bloc ASTRO, formulaire, footer) avec états hover, focus-visible, active, disabled. Maquettes : home desktop + mobile, template Solution, template Service, Contact. Direction enregistrée dans Novamira (save-design puis activate-design), export tokens.json + tokens.css. → STOP, je valide.
Phase 5, assets : hero et visuels de section (Magnific, un style de référence unique pour toute la série), photos d'appoint (Unsplash, importées en local, pas de hotlink), icônes et glyphes, visuel-ecosysteme et visuel-souverainete refaits en SVG inline si le gain est réel, favicon SVG + PNG 180/192/512, OG images 1200×630 (home, 7 solutions, 7 services). WebP ou AVIF, dimensions explicites, srcset, hero ≤ 200 KB, autres ≤ 150 KB, SVG passés dans SVGO. ASSETS.md : source, licence, crédit, prompt, usage.
Phase 6, implémentation : plugin blackvault-design → header/footer → home (→ STOP, je valide) → pages Solution (x7) → pages Service (x7) → autres pages → formulaire CF7 (CSS seulement) → 404 → écriture dans le Kit et ouverture au public. Captures avant/après à chaque étape. OG images assignées dans Yoast après mon OK.
Phase 7, QA : check-design 0 fail, WCAG 2.2 AA (contrastes, focus visible, clavier sur les menus, zoom 200 %), LCP < 2,5 s, CLS < 0,1, INP < 200 ms, aucune régression Lighthouse vs baseline, 0 requête tierce, Chrome / Safari iOS / Firefox, de 360 à 1920 px.

## Livrables (dossier courant)
AUDIT.md, DIRECTIONS.md (+ liens Figma), tokens.json, tokens.css, ASSETS.md, CHANGELOG.md, ROLLBACK.md, screenshots/before et screenshots/after.

## Communication
Français, concis. À chaque gate : fait / proposé / questions groupées. Doute sur une action irréversible : tu demandes.

Première action : enregistre ce brief tel quel dans ./CLAUDE.md (il doit survivre entre les sessions), puis lance la phase 0.  Publier le une fois finalisé

## Journal des décisions (ajouts en cours de projet)
- 27/09/2026 : GO phase 0 donné, backup All-in-One WP Migration téléchargé par l'utilisateur (17:44 heure serveur).
- 27/09/2026 : l'utilisateur supprime les STOP de validation (phases 3, 4, 6) : « tu drives en toute autonomie de A à Z, tu prends les décisions nécessaires ». Les garde-fous 2 à 10 restent en vigueur ; le OK pour les OG Yoast est considéré comme donné.
- 27/09/2026 : logos ASTRO et IA Orchestrator fournis par l'utilisateur (`brand/sources/`). Accent unique : bleu BlackVault (teinte 206°), voir `brand/BRAND.md`.
- 27/09/2026 : feu vert explicite de l'utilisateur pour la publication (ouverture au public du plugin, écriture dans le Kit, OG Yoast), sans validation intermédiaire.
