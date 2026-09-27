# QA finale (phase 7) : blackvault.ma en ligne

27/09/2026, après l'ouverture au public (CHANGELOG n° 9 à 11). Toutes les mesures portent sur le HTML public servi aux visiteurs anonymes, récupéré côté serveur et rejoué en local (même méthode que l'audit « avant »).

## Synthèse

| Mesure | Avant | Après | Cible |
|---|---|---|---|
| Performance Lighthouse mobile (médiane des 24 pages) | 81,5 | __PERF__ | pas de régression |
| Accueil | 71 | __PERF_HOME__ | |
| LCP (labo, 4G simulée, médiane) | 4,1 s (accueil 7,2 s) | __LCP__ | < 2,5 s |
| FCP (médiane) | 2,9 s | __FCP__ | |
| CLS | 0 à 0,038 | 0 à 0,016 | < 0,1 |
| TBT (médiane) | 14 ms | __TBT__ | |
| Accessibilité Lighthouse | 91 à 97 | __A11Y__ | WCAG 2.2 AA |
| Poids transféré (médiane) | 486 Ko (accueil 918 Ko) | __KB__ | |
| Violations axe (WCAG 2.2 AA + best practices) | 6 règles, 280 nœuds environ | 1 : `heading-order` sur /solutions (contenu, hors périmètre) | 0 |
| Requêtes tierces navigateur | 0 | 0 | 0 |
| check-design Novamira | non disponible | 0 échec sur 24 pages | 0 échec |

Détail : `phase1/lighthouse-compare.json` (24 pages, 3 passes, rendu en aperçu identique au rendu public) et `phase7/lighthouse-public.json` (6 pages de contrôle sur le rendu public final).

Réserve de méthode : le TTFB local (environ 10 ms) est bien meilleur que celui du serveur (0,85 à 1,4 s en MISS, 20 ms en HIT). Les LCP réels restent donc au-dessus de ces valeurs de labo. Le LCP de 3,2 à 3,5 s tient au rendu de la police du titre sous 4G simulée ; la cible de 2,5 s demanderait un travail serveur (TTFB, HTTP/2 push ou 103 Early Hints), hors périmètre.

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
| OG | `og:image` 1200 × 630 propre à chaque page sur les 24 pages |
| Favicon | SVG + PNG 32/180/192 servis ; icône d'écran d'accueil 180 px |
| Cache hébergeur | La version servie en HIT contient la nouvelle couche |

## Statut du top 15 de l'audit

| # | Problème | Statut |
|---|---|---|
| 1 | Theme Style clair sur site sombre | Résolu (plugin + Kit) |
| 2 | Bouton CF7 invisible | Résolu |
| 3 | LCP, FCP, CSS bloquants | Amélioré : FCP 2,9 à 2,1 s, poids divisé par 1,6 ; LCP labo encore au-dessus de 2,5 s |
| 4 | Clavier et formulaires | Résolu |
| 5 | Visuels et logos produit raster | Résolu à l'affichage (glyphes et SVG) ; les fichiers d'origine restent en médiathèque |
| 6 | Spectre multicolore | Résolu : accent unique |
| 7 | Contrastes AA | Résolu (0 violation de contraste axe) |
| 8 | Hiérarchie d'action | Résolu : 2 variantes de bouton, 48 px |
| 9 | Typographie | Résolu : Sora + IBM Plex Mono, `clamp()` |
| 10 | Iconographie | Résolu : Lucide |
| 11 | Modules signature | Résolu : chaîne animée, compteurs, conversation ASTRO |
| 12 | Dark-first rompu | Résolu |
| 13 | Pages mobiles trop longues | Amélioré (hauteurs minimales et footer) ; la longueur restante tient au contenu |
| 14 | Gabarit SaaS | Amélioré par le rythme, les filets et la mesure ; la structure des sections (contenu Elementor) est inchangée |
| 15 | Partage et identité technique | Résolu : 24 OG, favicon SVG et PNG |

## Restes connus

- `heading-order` sur /solutions : le h1 est répété en h3 (contenu, garde-fou 6).
- Les widgets header et footer (UAE) déclarent encore « IBM Plex Sans » dans leurs réglages : neutralisé par le plugin, aucun fichier chargé. À nettoyer dans l'éditeur si l'on retire un jour le plugin.
- Les presets de couleurs du cœur WordPress (dont un violet) restent dans le CSS global de WordPress : non utilisés.
