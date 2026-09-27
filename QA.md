# QA finale (phase 7) : blackvault.ma en ligne

27/09/2026, après l'ouverture au public et le passage aux logos officiels (CHANGELOG n° 9 à 14, plugin 1.1.1). Toutes les mesures portent sur le HTML public servi aux visiteurs anonymes, récupéré côté serveur et rejoué en local (même méthode que l'audit « avant »).

## Synthèse

Mesures Lighthouse mobile (3 passes, médiane) sur 6 pages représentatives du rendu public final : accueil, Plateforme, IA souveraine, Solutions, Nova XSIEM, SOC managé.

| Mesure | Avant | Après | Cible |
|---|---|---|---|
| Performance (médiane des 6 pages) | 80,5 | 86,5 (84 à 90) | pas de régression |
| Accueil | 71 | 86 | |
| LCP (labo, 4G simulée, médiane) | 4,3 s (accueil 7,2 s) | 3,9 s (accueil 3,9 s) | < 2,5 s |
| FCP (médiane) | 2,9 s | 2,1 s | |
| CLS | 0 à 0,038 | 0 | < 0,1 |
| TBT (médiane) | 29 ms | 15 ms | |
| Accessibilité Lighthouse | 91 à 97 | 98 à 100 | WCAG 2.2 AA |
| Bonnes pratiques, SEO | 100, 100 | 100, 100 | |
| Poids transféré (médiane) | 593 Ko (accueil 918 Ko) | 392 Ko (accueil 420 Ko) | |
| Violations axe, 25 pages × 2 largeurs (WCAG 2.2 AA + best practices) | 6 règles, 280 nœuds environ | 1 : `heading-order` sur /solutions (contenu, hors périmètre) | 0 |
| Requêtes tierces navigateur | 0 | 0 | 0 |
| check-design Novamira (24 pages) | non disponible | 0 échec | 0 échec |

Détail : `phase7/lighthouse-public.json`. Avant les logos officiels (glyphes SVG), la performance était de 89 à 90 sur ces pages (`phase1/lighthouse-compare.json`, 24 pages) : le retour aux logos raster d'origine, demandé par l'utilisateur, coûte 3 à 6 points et environ 100 Ko sur les pages qui les affichent.

Réserve de méthode : le TTFB local (environ 10 ms) est bien meilleur que celui du serveur (0,85 à 1,4 s en MISS, 20 ms en HIT). Les LCP réels restent donc au-dessus de ces valeurs de labo. Passer sous 2,5 s demanderait surtout un travail côté serveur et chargement (TTFB en MISS, 103 Early Hints, CSS critique), hors périmètre de ce projet.

## Contrôles

| Contrôle | Résultat |
|---|---|
| Captures pleine page 1440 et 390 px | `screenshots/after/` (24 pages + 404) |
| Texte et hiérarchie Hn | Identiques à l'état « avant » sur les 25 pages : 560 titres comparés, texte visible identique mot pour mot |
| Clavier desktop | Lien d'évitement vers `main#content`, focus visible partout (2 px `#5EAAE3`), sous-menus aux flèches, Échap ferme et rend le focus |
| Menu mobile | Bouton nommé « Basculer le menu », `aria-expanded` à jour, Échap ferme le menu |
| Formulaires CF7 | Libellés associés, champs sombres, focus visible (filet `#5EAAE3` + halo 3 px), bouton d'envoi visible |
| Reflow 320 px et zoom 200 % | Aucun défilement horizontal sur 4 pages types |
| `prefers-reduced-motion` | Toutes les sections visibles d'emblée, aucune animation en cours |
| Tiers et souveraineté | 0 requête hors `blackvault.ma` ; les seuls liens externes sont un lien Google Maps (clic volontaire) et `gmpg.org` (balise `rel=profile` du thème, sans requête) |
| Polices chargées | Sora 400/500/600 et IBM Plex Mono 500, woff2 locaux ; Font Awesome et les polices Google locales d'Elementor ne sont plus chargés |
| Garde-fou 7 (discours propriétaire) | 0 occurrence de noms d'outils tiers dans les visuels, fichiers et médias ajoutés |
| Logos | Logos officiels des 7 solutions (cartes et héros de fiche) ; IA Orchestrator au centre de l'écosystème et dans le héros IA souveraine ; ASTRO dans sa section et sa carte ; aucun glyphe de substitution restant |
| OG | `og:image` 1200 × 630 propre à chaque page sur les 24 pages |
| Favicon | SVG + PNG 32/180/192 servis ; icône d'écran d'accueil 180 px |
| Cache hébergeur | La version servie en HIT contient la nouvelle couche |

## Statut du top 15 de l'audit

| # | Problème | Statut |
|---|---|---|
| 1 | Theme Style clair sur site sombre | Résolu (plugin + Kit) |
| 2 | Bouton CF7 invisible | Résolu |
| 3 | LCP, FCP, CSS bloquants | Amélioré : FCP 2,9 à 2,1 s, poids -34 %, LCP de l'accueil 7,2 à 3,9 s ; LCP labo encore au-dessus de 2,5 s |
| 4 | Clavier et formulaires | Résolu |
| 5 | Visuels et logos produit raster | Visuels refaits en SVG ; logos produit officiels conservés à la demande de l'utilisateur, présentés sur tuiles et scènes sombres homogènes |
| 6 | Spectre multicolore | Résolu : accent unique |
| 7 | Contrastes AA | Résolu (0 violation de contraste axe) |
| 8 | Hiérarchie d'action | Résolu : 2 variantes de bouton, 48 px |
| 9 | Typographie | Résolu : Sora + IBM Plex Mono, `clamp()` |
| 10 | Iconographie | Résolu : Lucide |
| 11 | Modules signature | Résolu : chaîne animée, compteurs, conversation ASTRO |
| 12 | Dark-first rompu | Résolu |
| 13 | Pages mobiles trop longues | Partiel : pied de page mobile réparé (2 rangées vides de 470 px supprimées). Longueur en 390 px stable (médiane +1 %, de -7 à +9 %) ; la réduire vraiment demande de resserrer le contenu Elementor, hors périmètre |
| 14 | Gabarit SaaS | Amélioré par le rythme, les filets et la mesure ; la structure des sections (contenu Elementor) est inchangée |
| 15 | Partage et identité technique | Résolu : 24 OG, favicon SVG et PNG |

## Restes connus

- `heading-order` sur /solutions : le h1 est répété en h3 (contenu, garde-fou 6).
- Les widgets header et footer (UAE) déclarent encore « IBM Plex Sans » dans leurs réglages : neutralisé par le plugin, aucun fichier chargé. À nettoyer dans l'éditeur si l'on retire un jour le plugin.
- Les presets de couleurs du cœur WordPress (dont un violet) restent dans le CSS global de WordPress : non utilisés.
