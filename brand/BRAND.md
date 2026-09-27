# Phase 2 : extraction de marque (en cours)

## Sources consultées

| Source | Résultat |
|---|---|
| Kit Elementor 1685 | Palette « Spectrum » (4 accents + 7 couleurs produit), Sora / IBM Plex Sans / IBM Plex Mono |
| Médiathèque | Logo BlackVault en PNG uniquement : `blackvault-logo.png` (ID 1691, 489×184, version sombre), `blackvault-logo-blanc.png` (ID 1690, 488×184, version claire avec artefacts de détourage), icône `blackvault-icone.png` (ID 1689, 512×512). Aucun vectoriel. |
| Médiathèque, faux positif | `LOGO-VF.png` (ID 1627) est le logo **NUCLEON** (partenaire), pas BlackVault |
| Logos produit (médiathèque) | 7 rasters hétérogènes avec texte incrusté ; Nova XSIEM contient chiffres binaires et cadenas, Nexus / The Hound / OrbitFix des verts néon (interdits du brief pour les visuels du site) |
| Utilisateur (27/09) | Logos **IA Orchestrator** (hub hexagonal à 6 nœuds, « COMMAND. AUTOMATE. DEFEND. ») et **ASTRO** (bouclier, étoile à 4 branches, orbite, « Cybersecurity AI Copilot »), copiés dans `brand/sources/` |
| OneDrive | Deck `BLACKVAULT_Plateforme_SOC_V1.pptx` : texte seul lisible via le connecteur, pas de couleurs extractibles |
| Google Drive | Inaccessible (scope OAuth insuffisant) |
| Canva | 0 brand kit, aucun design BlackVault |
| Figma | Aucun fichier de marque |

## Teinte signature

Toutes les marques maison convergent vers un même bleu :

| Marque | Teinte mesurée | Couleur de référence |
|---|---|---|
| BlackVault (cadre de l'icône) | 206° | `#1F74B5` |
| IA Orchestrator | 208 à 216° | `#0070C0`, `#0080D0`, lueur `#60D0F0` |
| ASTRO | 212 à 220° | `#0080F0`, `#00A0F0` |

Conclusion : un seul accent, le bleu BlackVault, décliné en 3 valeurs dans la même teinte.

| Rôle | Valeur | Sur `#070B10` | Sur `#101923` | Sur `#FFFFFF` | Sur `#F4F7FA` |
|---|---|---|---|---|---|
| Accent logo (fonds clairs, UI sur sombre) | `#1F74B5` | 3,97 | 3,56 | 4,97 | 4,62 |
| Accent texte sur sombre (min AA) | `#2485D0` | 5,02 | 4,51 | | |
| Accent lien / label sur sombre (AAA) | `#5EAAE3` | 7,83 | 7,03 | | |

Neutres actuels conservés comme base : encre `#E6EDF4` (16,7:1 sur fond), texte discret `#93A3B5` (7,65:1), `#6A7B8D` réservé au sombre (4,54:1, échoue sur clair).

## Glyphes produit (langage commun à dessiner)

Trait unique, line-art, même grille que la famille d'icônes retenue. Motifs repris des marques existantes :

- BlackTrace : hélice ADN (imposé par le brief)
- IA Orchestrator : hub hexagonal, 6 nœuds reliés
- ASTRO : étoile à 4 branches dans un bouclier, orbite
- Nova XSIEM, BlackCaseX, The Hound, BlackVault VX, OrbitFix, Nexus : motif principal de chaque logo (triangle-prisme, loupe/empreinte, tête de chien, bouclier VX, coche en orbite, chouette), sans binaire, cadenas ni lueur néon

## Logo en SVG

Aucune source vectorielle trouvée. Vectorisation Magnific impossible (0 crédit). Proposition possible : tracé local du PNG 1691 comme **proposition** uniquement, à valider par toi, sans retouche du dessin.
