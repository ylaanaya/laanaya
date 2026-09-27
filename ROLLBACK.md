# ROLLBACK blackvault.ma

Toutes les procédures s'exécutent via `novamira/execute-php`, dans l'ordre inverse du CHANGELOG. Après chaque rollback, lancer les purges du § 0.

## 0. Purges (règle 10 du brief)

```php
\Elementor\Plugin::$instance->files_manager->clear_cache();
if ( class_exists( 'autoptimizeCache' ) ) { autoptimizeCache::clearall(); }
if ( function_exists( 'wpo_cache_flush' ) ) { wpo_cache_flush(); }
```

Cache hébergeur (en-tête `x-cache-status`) : les URL versionnées se renouvellent seules. Pour le HTML, purger depuis le panneau de l'hébergeur si besoin. Vérifier ensuite en navigation privée.

## 1. Plugin `blackvault-design`

Désactivation seule. Le rendu revient exactement à l'état « avant », tant que le Kit n'a pas été réécrit (§ 2) :

```php
deactivate_plugins( 'blackvault-design/blackvault-design.php' );
```

Retrait complet des fichiers créés par le projet, et d'eux seuls :

```php
deactivate_plugins( 'blackvault-design/blackvault-design.php' );
delete_option( 'bvd_preview_token' ); delete_option( 'bvd_public' );
// Suppression du dossier wp-content/plugins/blackvault-design/ (créé par le projet) via le gestionnaire d'extensions ou novamira/delete-file.
```

## 2. Kit Elementor 1685 (après l'écriture du Kit)

```php
$json = '<contenu de snapshots/2026-09-27_phase0/kit/1685-elementor_page_settings.json>';
update_post_meta( 1685, '_elementor_page_settings', json_decode( $json, true ) );
```

Puis purges (§ 0).

## 3. CSS additionnel du Customizer (post 1832)

```php
wp_update_custom_css_post( '<contenu de snapshots/2026-09-27_phase0/custom_css/1832-hello-elementor.css>', array( 'stylesheet' => 'hello-elementor' ) );
```

## 4. Pages, header, footer

Deux sources au choix :

- restauration de la révision WordPress identique à l'état « avant » (IDs dans `manifest.json`) ;
- réécriture de `_elementor_data` depuis `snapshots/2026-09-27_phase0/pages/<ID>-<slug>/elementor_data.json`, avec `update_post_meta( $id, '_elementor_data', wp_slash( $raw ) )`.

## 5. Médias et OG Yoast

- Médias ajoutés par le projet : listés dans `ASSETS.md` avec leur ID. On peut les supprimer, car ils ont été créés par le projet.
- OG par page : `delete_post_meta( $id, '_yoast_wpseo_opengraph-image' ); delete_post_meta( $id, '_yoast_wpseo_opengraph-image-id' );`, pour les pages listées dans le CHANGELOG.
- Icône du site : `update_option( 'site_icon', 1689 );`.

## Dernier recours

Restauration du backup All-in-One WP Migration téléchargé par l'utilisateur le 27/09 (17:44). Il capture l'état avant toute écriture du projet.
