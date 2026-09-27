# CHANGELOG blackvault.ma : upgrade visuel « Signal souverain »

Chaque écriture sur le site a une entrée et une procédure de rollback. Heures en heure serveur (UTC+1). Référence d'état « avant » : `snapshots/2026-09-27_phase0/`, révisions WordPress listées dans `snapshots/2026-09-27_phase0/manifest.json`, backup All-in-One WP Migration de l'utilisateur (27/09 17:44).

## Effets de bord de lecture (phases 0 et 1)

- Les rendus en loopback ont fait générer les CSS Elementor de 21 pages, comme une première visite.
- Deux lignes ont été ajoutées au journal 404 de Redirection (`/page-inexistante-bv-test/`).

Aucune autre écriture.

## Entrées

| # | Date | Écriture | Portée | Rollback |
|---|---|---|---|---|
| 1 | 27/09 | Installation du plugin `blackvault-design` (fichiers créés dans `wp-content/plugins/blackvault-design/`), activation, options `bvd_preview_token` et `bvd_public = 0` | Mode aperçu : couche visible seulement pour les admins et le jeton d'aperçu ; filtre d'autorité Novamira `hybrid` actif pour tous | ROLLBACK.md § 1 |
| 2 | 27/09 | Plugin 1.0.1 : substitutions sur le HTML final (fichiers `includes/render.php`, `blackvault-design.php`, `assets/css/bvd.css` remplacés de façon atomique) | Mode aperçu uniquement | ROLLBACK.md § 1 |
| 3 | 27/09 | Novamira : design `blackvault-signal-souverain` enregistré et activé (l'ancien `blackvault-spectrum` reste enregistré) | Guidage des agents ; aucun effet sur le rendu | `novamira/activate-design` avec le slug `blackvault-spectrum` |
| 4 | 27/09 | Plugin 1.0.2 : `bvd.css` (contraste du champ fichier), `bvd.js` (conversation ASTRO sur toute page à 2 requêtes « … » ou plus), remplacement atomique vérifié par sha256 | Mode aperçu uniquement | ROLLBACK.md § 1 ; fichiers 1.0.1 au commit `4886018` |
| 5 | 27/09 | Plugin 1.0.3 : `assets/favicon.svg` (pictogramme BlackVault vectorisé) et balise `<link rel="icon" type="image/svg+xml">` | Mode aperçu, puis public avec l'entrée 9 | ROLLBACK.md § 1 |
| 6 | 27/09 | Médiathèque : 24 cartes OG 1200×630 (ID 2462 à 2485) et icône 512 px (ID 2486, tailles 32/64/180/192/270 générées), méta `_bvd_created` sur chacune | Nouveaux fichiers dans `uploads/2026/09/`, rien de remplacé | ROLLBACK.md § 5 |
| 7 | 27/09 | Yoast : `_yoast_wpseo_opengraph-image` et `-image-id` sur les 24 pages, indexables reconstruits. Avant : aucun OG par page, image par défaut 1 400 × 1 400 ou première image du contenu (ex. `icone-nova.webp` sur SOC managé) | Balises `og:image` publiques | ROLLBACK.md § 5 |
| 8 | 27/09 | `site_icon` : 1689 (PNG 512 px, 344 Ko, sans tailles d'icône) vers 2486 (PNG 29 Ko, tailles d'icône générées) | Favicon et icône d'écran d'accueil publics | `update_option( 'site_icon', 1689 );` |
| 9 | 27/09 19:57 | Ouverture au public : copie serveur du Kit dans `bvd_kit_backup_20260927` (md5 vérifié = snapshot), `bvd_public = 1`, Kit 1685 remplacé par `deploy/kit-1685-signal-souverain.json` (sha256 `cb6ea86d…07cb8d` vérifié au téléchargement), purges Elementor, Autoptimize et WP-Optimize | Tout le site public | ROLLBACK.md § 2 puis § 1 |
| 10 | 27/09 | CSS additionnel du Customizer (1832) **conservé** : `legacy.css` le recouvre (imprimé après, mêmes sélecteurs), état validé en aperçu. Aucune écriture | Aucune | Sans objet |
