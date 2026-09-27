# AUDIT blackvault.ma : état « avant » (phase 1)

27/09/2026. Périmètre : 24 pages publiées + 404, en 1440 et 390 px. Le site actuel est la V2 « Spectrum » publiée le jour même à 15:11.

## Méthode et limites

- **Copie locale exacte du rendu public.** Le HTML servi aux visiteurs anonymes a été récupéré côté serveur, avec ses 196 assets (md5 vérifiés). La copie est servie en HTTPS local sous le nom `blackvault.ma`, car le conteneur n'a pas accès direct au site. Aucune requête tierce n'a été observée pendant les rendus.
- **Captures** : `screenshots/before/1440` et `screenshots/before/390`, pleine page. Le défilement est lent pour déclencher le chargement différé (les captures d'un premier passage trop rapide ont été refaites).
- **Lighthouse 13 mobile**, 3 passes par page, médiane : `phase1/lighthouse-baseline.json`.
  - Mesures de labo : le TTFB est local (environ 10 ms), alors que le vrai serveur répond en 0,85 à 1,4 s sur cache MISS. Le LCP réel est donc au moins aussi mauvais.
  - L'insight « Modern HTTP » vient du serveur local HTTP/1.1 : il est ignoré.
- **axe-core 4**, WCAG 2.0 à 2.2 AA plus best practices : `phase1/a11y/axe-summary.json`.
- **Tests interactifs Playwright** (clavier, menu mobile, reflow 320 px, zoom 200 %, focus des champs) : `phase1/a11y/a11y-interactive.json`.
- **Critique design** en 5 groupes, consolidée en 31 constats S01 à S31 : `phase1/critique-synthese.md`.
- **Constat écarté** : S08 (« colonne visuel vide », icônes absentes) était un artefact de capture. Il est corrigé et vérifié sur les captures refaites.

## Baseline chiffrée

| Mesure | Valeur actuelle | Cible du brief |
|---|---|---|
| Performance Lighthouse mobile | 71 (accueil) à 88 (pages courtes) | aucune régression |
| LCP (labo, simulé 4G) | 3,2 à 7,2 s ; accueil 7,2 s | < 2,5 s |
| FCP | 2,9 s sur toutes les pages | |
| CLS | 0 à 0,038 | < 0,1 |
| TBT | 0 à 123 ms | INP < 200 ms |
| Accessibilité Lighthouse | 91 à 97 | WCAG 2.2 AA |
| Poids transféré | 423 à 918 Ko ; accueil 918 Ko, dont 511 Ko d'images et 169 Ko de polices | hero ≤ 200 Ko, autres images ≤ 150 Ko |
| Ressources bloquant le rendu | 28 (27 CSS + jQuery), environ 1,65 s d'économie estimée | |
| Requêtes tierces navigateur | 0 | 0 |
| Violations axe | contraste (22 pages, 205 nœuds), contrôles imbriqués dans le menu (25), pas de `<main>` (24), lien d'évitement cassé (24), ordre des titres (1), lien de consentement non distinguable (1) | 0 |

## Top 15 des problèmes, classés impact puis effort

| # | Problème | Pages | Impact | Effort | Preuve | Correction prévue |
|---|---|---|---|---|---|---|
| 1 | **Theme Style réglé pour fond clair sur un site sombre** : texte par défaut à 2,17:1, titres à 1,05:1. La 404 est illisible et les cartes « spectre » tombent à 1,04:1 tant que le fond différé n'est pas chargé (S01, S03). | 404, accueil, ia-souveraine, 4 fiches service, tout contenu non stylé | critique | S | axe 1,04:1 ; `kit.md` section 8 ; 404 1440 y 94-224 | Theme Style sombre (plugin puis Kit), cartes spectre en `background-color` |
| 2 | **Bouton d'envoi CF7 invisible**, blanc sur blanc (S02) | contact, carrieres | critique | S | contact 1440 y 1330-1380 ; conflit de spécificité avec le Kit | Sélecteur plus fort dans le plugin, bouton du système |
| 3 | **LCP de 3,2 à 7,2 s et FCP de 2,9 s** : fond de hero raster de 332 Ko, image de 268 Ko prioritaire à 3,9 écrans du haut, 27 CSS bloquants (720 Ko sur l'accueil, dont `post-1722.css` à 325 Ko), CSS header/footer chargé 2 fois (49,5 Ko), Font Awesome pour 4 flèches, TablePress et CF7 partout, 170 `@font-face` | toutes, surtout l'accueil | critique | M | `lighthouse-baseline.json` ; insights « render-blocking » et « image delivery » | Visuels en SVG inline, polices subsettées et préchargées, dequeue des CSS inutiles |
| 4 | **Clavier et formulaires** : liens parents du menu sans indicateur de focus, sous-menus non ouvrables aux flèches, `div role="button"` imbriqués (axe `nested-interactive`), Échap sans effet sur le menu mobile, champs sans focus visible (WCAG 2.4.7), pas de `<main>`, lien d'évitement vers une cible absente (S17, S28) | toutes | critique | M | `a11y-interactive.json` | Landmark `main#content`, focus-visible systématique, JS d'accessibilité du menu |
| 5 | **Visuels et logos produit raster avec tropes interdits** : chiffres binaires et cadenas (Nova XSIEM), verts néon (Nexus, The Hound, OrbitFix), halos, texte incrusté ; 7 identités juxtaposées (S04, S18) | accueil, plateforme, ia-souveraine, 7 fiches solution | critique | L | captures 1440 des fiches, `brand/BRAND.md` | Glyphes line-art maison et visuels SVG dans la direction retenue |
| 6 | **Spectre de 7 à 8 accents, titres en dégradé arc-en-ciel, halos lumineux** au lieu d'un accent signature unique (S06, S12) | toutes | fort | S | accueil y 330-490 (« exposure. ») | Accent unique : bleu BlackVault, 3 luminances |
| 7 | **Contrastes AA en échec** : accent `#2F80ED` sur fond clair (3,6 à 3,9:1), pastilles `#3D8BEF` sur `#162940` (4,3:1), texte discret `#6A7B8D` sur clair (4,04:1), lien de consentement non souligné (S05) | 22 pages | fort | S | `axe-summary.json` | Tokens d'accent texte à 4,5:1 minimum par surface, liens soulignés |
| 8 | **Hiérarchie d'action** : 3 à 4 CTA au premier écran, 4 rendus de bouton, 3 tailles (S07) | toutes | fort | S | accueil y 26-718 | Système de boutons 2 variantes x 2 thèmes, hauteur 48 px |
| 9 | **Typographie hors brief** : 3 familles, 8 fontes, paliers fixes, h1 et h2 de même taille par endroits (S26) | toutes | fort | M | `kit.md` section 3 | Sora (400, 500, 600) + IBM Plex Mono (500), `clamp()` |
| 10 | **Iconographie sans famille** : Font Awesome plein (33 glyphes), rendus 3D, points lumineux (S19) | toutes | fort | M | inventaire des widgets : 221 coches, 131 flèches | Lucide (ISC) substitué au rendu, trait unique, une couleur |
| 11 | **Modules signature absents** : chaîne Détecter → Corriger sans flux, stats 7 / 24/7 / < 5 min / 0 noyées, bloc ASTRO statique (S09, S15, S29) | accueil, plateforme, ia-souveraine, solutions, fiches | fort | M | accueil y 1260-1640, 2920-3010, 5760-6160 | Chaîne animée une fois, compteurs, UI de conversation, tout coupé sous `prefers-reduced-motion` |
| 12 | **Dark-first rompu** : îlots clairs de 1 200 à 4 000 px, zébrage mécanique, coutures sans filet (S13) | 11 pages | fort | M | SOC : 47 % de hauteur claire | Sections claires basculées en surfaces graphite, séparations en filets |
| 13 | **Pages mobiles de 10 à 22,7 écrans**, footer de 1 700 px avec des trous hérités du desktop (S10, S16) | accueil, plateforme, fiches | fort | M | accueil 390 : 19 192 px | Hauteurs minimales desktop seulement, footer en 2 colonnes, listes compactes |
| 14 | **Gabarit SaaS** : grilles de cartes identiques partout, eyebrows dans 9 sections sur 12, mono capitales en phrases (S20, S21, S22) | toutes | moyen | M | accueil : 8 grilles de la même carte | Listes à filets pour le non-navigable, rythme de sections, mesure de ligne 60 à 66 caractères |
| 15 | **Partage et identité technique** : og:image hors format sur 18 pages sur 24 (logos, icônes de 120 px, carré 1400×1400), favicon PNG de 344 Ko déclaré en 32 px, logo header PNG sans dimensions (risque de CLS), pas de SVG ni de manifest | toutes | moyen | S | `phase0/media.md`, `frontend.md` | 15 OG 1200×630, favicon SVG + PNG 180/192/512, logo dimensionné |

Les 16 autres constats de la critique (S14, S23 à S25, S27, S30, S31, etc.) sont détaillés dans `phase1/critique-synthese.md` et traités au passage.

## Incohérences de discours (liste d'arbitrage, texte hors périmètre)

Signalées sans aucune réécriture (garde-fou 6) :

1. **Positionnement.** « Éditeur et opérateur de cybersécurité » (slogan WordPress, Kit, footer, Yoast, h1 Entreprise), alors que le brief dit « acteur de la cyberdéfense ». Cette expression n'apparaît jamais ; on compte 21 « cybersécurité » contre 5 « cyberdéfense ».
2. **Éditeur pur ou intégrateur.** « Nous ne revendons pas la solution d'un autre » (accueil, entreprise) est contredit par « éditeurs de référence », « notre catalogue » et « partenariats forts » (services, intégration, entreprise).
3. **Langue.** Le h1 de l'accueil « Master your cyber exposure. » est en anglais sur un site fr-FR, et identique au slogan de BlackVault VX. S'y ajoutent 6 slogans produit sur 7 en anglais, et des labels comme AGENTIC WORKFLOW, HUMAN-IN-THE-LOOP, Basic / Semi-Managed / Fully-Managed.
4. **Taxonomie de la chaîne.** 3 à 4 nomenclatures coexistent. Nexus est rangé tour à tour en Renseignement, Exposer et Investigation ; The Hound en Enrichissement et Investigation.
5. **Graphie de la marque.** On trouve « Black Vault » (logo), « BLACKVAULT » (texte), « BLACK VAULT SARL » et « BLACKVAULT CASEX ». La disponibilité s'écrit aussi de trois façons : 24/7, 24 heures sur 24, 24h/24 7j/7.
6. **Divers.**
   - Le texte de la 404 est celui du thème.
   - Les valeurs de l'entreprise existent en deux versions (Entreprise, Carrières).
   - La page confidentialité ne nomme pas l'entité juridique responsable du traitement.
   - Le texte « notre groupe » apparaît.
   - La page Secteurs cite 5 produits sur 7.
   - Le h1 de Solutions est répété en h3.

Garde-fou 7 (discours propriétaire) : 0 occurrence de Wazuh, OpenSearch, IRIS, Velociraptor, Cortex ou « open source », dans les pages, les métas, les options, les révisions, les médias et le HTML rendu.

## Images et OG

- 19 images seulement sont rendues sur le front ; 471 pièces jointes sur 495 ne sont référencées nulle part (information seulement, aucune suppression).
- Au-dessus du budget du brief : `visuel-signal.webp` (332 Ko, fond du hero, taille pleine sur tous les breakpoints) et `visuel-ecosysteme.webp` (268 Ko, marqué `fetchpriority=high` hors premier écran).
- Défaut OG Yoast : déjà en 1200×630 (`blackvault-partage.jpg`). Le « 1400×1400 » vient du repli sur la première image du contenu (accueil, plateforme).
- Logo : PNG uniquement (489×184), aucune source vectorielle. `LOGO-VF.png` est le logo NUCLEON, pas BlackVault.

## À conserver

- Fond near-black et surfaces graphite, filets 1 px, conteneur 1 280 px.
- Heros tenus dans le premier écran, un h1 par page.
- Bandeau de faits des fiches solution, cartes Livrables à méta-labels mono, liste Secteurs à filets.
- Hélice ADN de BlackTrace.
- Formulaires bien construits (libellés, `autocomplete`, 2 colonnes et 1 en mobile).
- Zéro requête tierce.
- Aucun débordement horizontal à 320 px ni au zoom 200 %.

## Hors périmètre design

Des constats de sécurité critiques ont été transmis au client le 27/09 (voir `PREFLIGHT.md`, non versionné, et le fil de la session). Ils ne sont pas détaillés ici, car ce dépôt est public.
