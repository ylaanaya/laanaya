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

Retour immédiat au mode aperçu (la couche reste visible pour les admins seulement). À combiner avec le § 2, sinon le nouveau Kit sombre s'applique à l'ancienne mise en page :

```php
update_option( 'bvd_public', 0 );
```

Désactivation seule. Le rendu revient exactement à l'état « avant » une fois le Kit (§ 2) et le CSS additionnel (§ 3) restaurés :

```php
deactivate_plugins( 'blackvault-design/blackvault-design.php' );
```

Retrait complet des fichiers créés par le projet, et d'eux seuls :

```php
deactivate_plugins( 'blackvault-design/blackvault-design.php' );
delete_option( 'bvd_preview_token' ); delete_option( 'bvd_public' );
// Suppression du dossier wp-content/plugins/blackvault-design/ (créé par le projet) via le gestionnaire d'extensions ou novamira/delete-file.
```

## 2. Kit Elementor 1685 (écrit le 27/09 à 19:57)

Copie de l'état « avant » conservée côté serveur dans l'option non chargée `bvd_kit_backup_20260927` (md5 de son JSON : `e8a4d0501a040f937cc5cc2f7d5e3649`, identique au snapshot) :

```php
update_post_meta( 1685, '_elementor_page_settings', wp_slash( get_option( 'bvd_kit_backup_20260927' ) ) );
```

Source alternative, locale :

```php
$json = '<contenu de snapshots/2026-09-27_phase0/kit/1685-elementor_page_settings.json>';
update_post_meta( 1685, '_elementor_page_settings', wp_slash( json_decode( $json, true ) ) );
```

Puis purges (§ 0). Retour complet à l'état « avant » : § 2, puis § 3 (le CSS additionnel a été vidé, ses règles vivent dans `legacy.css` du plugin), puis § 1 (désactivation), puis § 0.

## 3. CSS additionnel du Customizer (post 1832, vidé le 27/09)

Obligatoire avant toute désactivation du plugin. Contenu d'origine : révision 2459 du post 1832, ou le snapshot.

```php
wp_update_custom_css_post( '<contenu de snapshots/2026-09-27_phase0/custom_css/1832-hello-elementor.css>', array( 'stylesheet' => 'hello-elementor' ) );
```

## 4. Pages, header, footer

Deux sources au choix :

- restauration de la révision WordPress identique à l'état « avant » (IDs dans `manifest.json`) ;
- réécriture de `_elementor_data` depuis `snapshots/2026-09-27_phase0/pages/<ID>-<slug>/elementor_data.json`, avec `update_post_meta( $id, '_elementor_data', wp_slash( $raw ) )`.

## 5. Médias et OG Yoast

- Médias ajoutés par le projet : listés dans `ASSETS.md` avec leur ID. On peut les supprimer, car ils ont été créés par le projet.
- Médias 2462 à 2486 : marqués par la méta `_bvd_created`. Suppression : `wp_delete_attachment( $id, true );`, seulement si `get_post_meta( $id, '_bvd_created', true )` est non vide.
- OG par page (24 pages, CHANGELOG n° 7), puis reconstruction de l'indexable Yoast :

```php
$w = YoastSEO()->classes->get( 'Yoast\\WP\\SEO\\Integrations\\Watchers\\Indexable_Post_Watcher' );
foreach ( array( 1722, 1725, 1728, 1731, 1734, 1737, 1740, 1743, 1746, 1749, 1752, 1755, 1758, 1761, 1764, 1767, 1770, 1773, 1776, 1779, 1782, 1785, 1788, 2335 ) as $id ) {
	delete_post_meta( $id, '_yoast_wpseo_opengraph-image' );
	delete_post_meta( $id, '_yoast_wpseo_opengraph-image-id' );
	$w->build_indexable( $id );
}
```

- Icône du site : `update_option( 'site_icon', 1689 );`.

## Dernier recours

Restauration du backup All-in-One WP Migration téléchargé par l'utilisateur le 27/09 (17:44). Il capture l'état avant toute écriture du projet.
