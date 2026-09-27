# Directions artistiques (phase 3)

Trois pistes ont été évaluées sur la matière réelle du site (captures « avant », audit, sources de marque). L'utilisateur a délégué le choix le 27/09. La direction retenue est **« Signal souverain »** (B + C).

## A. « Vault Noir »

- **Principe** : quasi monochrome, éditorial, luxe défense. Noir graphite, blanc, gris ; l'accent n'apparaît que sur les états.
- **Forces** : sobriété maximale, lecture « institution ».
- **Limites** :
  - trop muet pour raconter un portefeuille de 9 produits et une chaîne Détecter → Corriger ;
  - efface l'identité bleue commune à BlackVault, IA Orchestrator et ASTRO ;
  - rend les pages produit interchangeables.
- **Verdict** : écartée comme direction principale. Son principe de retenue (blanc pour l'action primaire, pas de halo) est repris.

## B. « Signal »

- **Principe** : centre de commandement épuré. Lignes de flux, labels en mono, un accent unique, rails et nœuds.
- **Forces** :
  - colle au récit du site : chaîne de défense, pipeline, SOC 24/7 ;
  - donne un rôle clair au mono (données, étiquettes) ;
  - rend les modules signature naturels : flux animé, compteurs, conversation ASTRO.
- **Limites** : risque de cliché « tableau de bord » s'il est poussé en fausse UI. Garde-fou retenu : pas de fausse console, seulement des rails, des nœuds et des glyphes.

## C. « Souverain »

- **Principe** : trame géométrique inspirée du zellige, en line-art très fin, lue comme un motif cryptographique.
- **Forces** : ancrage marocain sans folklore ; porte l'idée de périmètre et de souveraineté.
- **Limites** : décoratif s'il est omniprésent.
- **Verdict** : retenue comme texture, limitée à 2 usages (étoile à huit branches du hero et de l'écosystème, enceinte du visuel souveraineté).

## Direction retenue : « Signal souverain »

| Élément | Décision |
|---|---|
| Fond | Near-black `#070B10`, alt `#0B121A`, surfaces `#101923` / `#152231`, filets 1 px `#1E2C3A` |
| Accent unique | Bleu BlackVault (teinte 206°), en trois luminances : `#1F74B5` (logo), `#2485D0` (texte AA), `#5EAAE3` (liens et labels, AAA) |
| Spectre 4 couleurs et couleurs produit | Retirés de l'interface ; les logos produit gardent leurs couleurs |
| Typographie | Sora 400 / 500 / 600 et IBM Plex Mono 500 ; latin + latin-ext ; échelle fluide `clamp()` |
| Icônes | Lucide (ISC), trait 1,75, substitué aux 33 glyphes Font Awesome |
| Logos produit | Logos officiels des 7 solutions, d'IA Orchestrator et d'ASTRO, posés sur des tuiles et scènes sombres (demande de l'utilisateur, 27/09). Les 9 glyphes line-art dessinés d'abord sont archivés dans `brand/boards/` |
| Visuels | SVG inline : hero « signal », écosystème en orbite (icônes officielles), périmètre souverain |
| Motion | Révélation jouée une fois, compteurs, flux sur le rail, conversation ASTRO ; coupés sous `prefers-reduced-motion` |
| Rayons | 4 px (champs, badges), 8 px (boutons), 12 px (cartes) |

## Figma

Le fichier « BLACKVAULT Design System » n'a pas été produit. Le compte Figma connecté est en plan Starter, siège View : 20 lectures MCP par mois, et l'écriture n'est pas garantie. Les planches ont été rendues en HTML/CSS local, puis directement sur le site en mode aperçu.

Les tokens de référence sont dans `tokens.json` et `tokens.css`. Les planches de glyphes et de visuels sont dans `brand/boards/`.

## Novamira

Le design est enregistré dans Novamira (`save-design` puis `activate-design`) sous le slug `blackvault-signal-souverain`. L'autorité est `hybrid` : le Kit Elementor reste la source de vérité, via le filtre `novamira_design_authority` du plugin.
