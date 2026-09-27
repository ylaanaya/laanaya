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
