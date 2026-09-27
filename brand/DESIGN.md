---
name: "BlackVault Signal souverain"
description: "Identité sombre et institutionnelle d'un acteur de la cyberdéfense : nuit graphite, un seul accent bleu BlackVault, lignes de flux et trame zellige en line-art, labels en mono."
colors:
  bg: "#070B10"
  bg-alt: "#0B121A"
  surface: "#101923"
  surface-raised: "#152231"
  border: "#1E2C3A"
  border-strong: "#2A3B4D"
  ink: "#E6EDF4"
  ink-2: "#B8C3CF"
  muted: "#93A3B5"
  accent: "#2485D0"
  accent-logo: "#1F74B5"
  accent-soft: "#5EAAE3"
  signal: "#F2B138"
  error: "#F2767A"
  white: "#FFFFFF"
typography:
  heading:
    fontFamily: "Sora, sans-serif"
    fontWeight: "600"
  body:
    fontFamily: "Sora, sans-serif"
    fontWeight: "400"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontWeight: "500"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  section: "clamp(72px, 48px + 6vw, 128px)"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
components:
  buttons: "Primaire : fond blanc, texte nuit, 48 px de haut, rayon 8 ; au survol, filet accent-soft. Secondaire : contour #2A3B4D, texte encre. Une seule flèche SVG Lucide."
  cards: "Surface #101923, filet #1E2C3A, rayon 12 ; au survol, filet accent et translation de 2 px, jamais de halo."
  badges: "Mono 12,5 px en capitales, texte accent-soft sur teinte accent à 12 %, filet accent à 38 %, rayon 4."
  pipeline: "Rail horizontal 1 px, nœuds creux accent-soft, flux lumineux joué une fois ; rail vertical en mobile."
  astro: "Requêtes en bulles de conversation (émetteur « Analyste » en mono), indicateur de saisie en trois points ; aucune réponse inventée."
  glyphs: "9 glyphes line-art maison (7 produits, IA Orchestrator, ASTRO), grille 24 px, trait 1,5, monochromes."
dials:
  variance: 0.35
  density: 0.35
  motion: 0.35
---

## Overview

BLACKVAULT est un acteur de la cyberdéfense : plateforme propriétaire, SOC 24/7, IA souveraine sur GPU locaux. Le site parle à des RSSI et DSI d'organisations régulées. La direction « Signal souverain » combine un centre de commandement épuré (lignes de flux, labels mono) et une trame zellige très discrète, lue comme un motif cryptographique.

## Colors

Un seul accent : le bleu du logo BlackVault (teinte 206°), partagé par les marques IA Orchestrator et ASTRO, en trois luminances.

- `#1F74B5` : réservé aux éléments d'interface et aux fonds clairs.
- `#2485D0` : texte sur fond sombre, conforme AA.
- `#5EAAE3` : liens et labels sur fond nuit, conforme AAA.

Le spectre multicolore et les couleurs produit sont retirés de l'interface. Les neutres sont bleutés et froids, jamais `#000`.

## Typography

Sora 600 pour les titres, serrés (1,04 à 1,12, interlettrage -0,02 à -0,03 em). Sora 400 pour le texte, à 64 caractères de mesure maximum. IBM Plex Mono 500 en capitales espacées pour les labels et les données. Échelle fluide en `clamp()`, 4 graisses au total, woff2 auto-hébergés en latin et latin-ext.

## Layout

Conteneur 1 280 px, grille 12 colonnes, espacements en base 8. Sections sombres uniquement, séparées par des filets 1 px plutôt que par des changements de fond.

## Elevation & Depth

La profondeur vient des surfaces et des filets, pas des ombres. Aucun halo lumineux.

## Shapes

Rayons 4 (champs, badges), 8 (boutons), 12 (cartes). Coins de repère en équerre sur les tuiles de glyphe.

## Components

Boutons, cartes, badges, rail « Détecter → Corriger », chiffres clés à compteur, bloc ASTRO en conversation, tuile glyphe produit, visuels SVG inline (signal, écosystème, périmètre souverain).

## Do's and Don'ts

### Do's
- Utiliser l'accent bleu uniquement pour l'action, l'état et la chaîne de défense.
- Garder un seul libellé par intention d'action.
- Réserver le mono aux données et aux labels de 1 à 3 mots.
- Couper toute animation sous prefers-reduced-motion.

### Don'ts
- Never use cadenas, silhouettes à capuche, pluie binaire, globe réseau ou images de stock présentées comme l'équipe.
- Don't invent clients, certifications, chiffres ou témoignages.
- Avoid néons, halos, dégradés arc-en-ciel et violet.
- Never name third-party tools or show real console screenshots.
