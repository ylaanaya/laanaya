<?php
/**
 * Plugin Name:       BLACKVAULT Design
 * Description:       Couche de design « Signal souverain » de blackvault.ma : polices auto-hébergées, tokens, composants, icônes Lucide, glyphes produit, visuels SVG, micro-interactions et correctifs d'accessibilité. Aucune donnée de page n'est modifiée ; désactiver le plugin rend le rendu d'origine.
 * Version:           1.0.3
 * Requires at least: 6.9
 * Requires PHP:      8.1
 * Author:            BLACK VAULT SARL
 * License:           Propriétaire (polices OFL 1.1, icônes Lucide ISC)
 * Text Domain:       blackvault-design
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BVD_VERSION', '1.0.3' );
define( 'BVD_FILE', __FILE__ );
define( 'BVD_DIR', plugin_dir_path( __FILE__ ) );
define( 'BVD_URL', plugin_dir_url( __FILE__ ) );

require_once BVD_DIR . 'includes/render.php';

/**
 * Autorité de design Novamira : le Kit Elementor reste la source de vérité
 * (décision du brief : « hybrid »).
 */
add_filter(
	'novamira_design_authority',
	static function () {
		return array(
			'level'   => 'hybrid',
			'builder' => 'Elementor',
		);
	},
	20
);

/**
 * Jeton d'aperçu créé à l'activation ; ouverture au public pilotée par l'option bvd_public.
 */
register_activation_hook(
	__FILE__,
	static function () {
		if ( ! get_option( 'bvd_preview_token' ) ) {
			add_option( 'bvd_preview_token', wp_generate_password( 32, false, false ), '', false );
		}
		if ( false === get_option( 'bvd_public', false ) ) {
			add_option( 'bvd_public', 0, '', true );
		}
	}
);

/**
 * La couche de design s'applique-t-elle à cette requête ?
 * Publique après ouverture ; avant, seulement pour un administrateur connecté
 * ou une requête portant le jeton d'aperçu.
 */
function bvd_is_enabled(): bool {
	static $enabled = null;
	if ( null !== $enabled ) {
		return $enabled;
	}
	if ( is_admin() && ! wp_doing_ajax() ) {
		return $enabled = false;
	}
	if ( (int) get_option( 'bvd_public', 0 ) === 1 ) {
		return $enabled = true;
	}
	if ( is_user_logged_in() && current_user_can( 'manage_options' ) ) {
		return $enabled = true;
	}
	$token = (string) get_option( 'bvd_preview_token', '' );
	if ( '' !== $token && isset( $_GET['bvd_preview'] ) && hash_equals( $token, (string) wp_unslash( $_GET['bvd_preview'] ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return $enabled = true;
	}
	return $enabled = false;
}

/** Éditeur ou aperçu Elementor : CSS seulement, pas de JS ni de substitution au rendu. */
function bvd_is_elementor_editing(): bool {
	if ( isset( $_GET['elementor-preview'] ) || ( isset( $_GET['action'] ) && 'elementor' === $_GET['action'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return true;
	}
	return false;
}

/** Version d'asset basée sur la date du fichier (le .htaccess met les CSS/JS en cache un an). */
function bvd_ver( string $rel ): string {
	$path = BVD_DIR . $rel;
	return BVD_VERSION . '.' . ( file_exists( $path ) ? (string) filemtime( $path ) : '0' );
}

/* -------------------------------------------------------------------------
 * Styles, polices, script
 * ---------------------------------------------------------------------- */

add_action(
	'wp_enqueue_scripts',
	static function () {
		if ( ! bvd_is_enabled() ) {
			return;
		}
		wp_register_style( 'bvd-fonts', BVD_URL . 'assets/css/fonts.css', array(), bvd_ver( 'assets/css/fonts.css' ) );
		wp_register_style( 'bvd-legacy', BVD_URL . 'assets/css/legacy.css', array( 'bvd-fonts' ), bvd_ver( 'assets/css/legacy.css' ) );
		wp_register_style( 'bvd', BVD_URL . 'assets/css/bvd.css', array( 'bvd-legacy' ), bvd_ver( 'assets/css/bvd.css' ) );
		if ( ! bvd_is_elementor_editing() ) {
			wp_enqueue_script( 'bvd', BVD_URL . 'assets/js/bvd.js', array(), bvd_ver( 'assets/js/bvd.js' ), array( 'in_footer' => true, 'strategy' => 'defer' ) );
		}
	},
	20
);

/** Imprimé après le CSS additionnel du Customizer (priorité 101) pour garder la main en cas d'égalité. */
add_action(
	'wp_head',
	static function () {
		if ( ! bvd_is_enabled() ) {
			return;
		}
		wp_print_styles( array( 'bvd-fonts', 'bvd-legacy', 'bvd' ) );
	},
	102
);

/** Préchargement des deux fichiers de police du premier écran, classe bvd-js au plus tôt. */
add_action(
	'wp_head',
	static function () {
		if ( ! bvd_is_enabled() ) {
			return;
		}
		foreach ( array( 'sora-latin-600-normal.woff2', 'sora-latin-400-normal.woff2' ) as $font ) {
			printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( BVD_URL . 'assets/fonts/' . $font ) );
		}
		if ( ! bvd_is_elementor_editing() ) {
			echo "<script>document.documentElement.classList.add('bvd-js');</script>\n";
		}
	},
	1
);

/** Favicon vectoriel, imprimé après les icônes PNG du site (wp_site_icon, priorité 99). */
add_action(
	'wp_head',
	static function () {
		if ( ! bvd_is_enabled() ) {
			return;
		}
		printf( '<link rel="icon" href="%s" type="image/svg+xml" sizes="any">' . "\n", esc_url( BVD_URL . 'assets/favicon.svg?ver=' . bvd_ver( 'assets/favicon.svg' ) ) );
	},
	100
);

/* -------------------------------------------------------------------------
 * Allègement : feuilles devenues inutiles quand la couche est active
 * ---------------------------------------------------------------------- */

function bvd_page_has_form(): bool {
	if ( ! is_singular() ) {
		return false;
	}
	$id   = get_queried_object_id();
	$data = (string) get_post_meta( $id, '_elementor_data', true );
	return false !== strpos( $data, 'contact-form-7' ) || has_shortcode( (string) get_post_field( 'post_content', $id ), 'contact-form-7' );
}

function bvd_page_has_table(): bool {
	if ( ! is_singular() ) {
		return false;
	}
	$id = get_queried_object_id();
	return false !== strpos( (string) get_post_meta( $id, '_elementor_data', true ), '[table' ) || has_shortcode( (string) get_post_field( 'post_content', $id ), 'table' );
}

function bvd_dequeue_unused(): void {
	if ( ! bvd_is_enabled() || bvd_is_elementor_editing() ) {
		return;
	}
	$styles = array(
		// Polices : remplacées par Sora + IBM Plex Mono auto-hébergées et subsettées.
		'elementor-gf-local-sora',
		'elementor-gf-local-ibmplexsans',
		'elementor-gf-local-ibmplexmono',
		// Font Awesome et icônes UAE : remplacées par Lucide inline et des chevrons CSS.
		'hfe-social-share-icons-brands',
		'hfe-social-share-icons-fontawesome',
		'hfe-nav-menu-icons',
		'hfe-social-icons',
		'hfe-elementor-icons',
		'hfe-icons-list',
		'font-awesome',
		'elementor-icons-fa-solid',
		'elementor-icons-shared-0',
	);
	if ( ! bvd_page_has_table() ) {
		$styles[] = 'tablepress-default';
	}
	if ( ! bvd_page_has_form() ) {
		$styles[] = 'contact-form-7';
		wp_dequeue_script( 'contact-form-7' );
		wp_dequeue_script( 'swv' );
	}
	foreach ( $styles as $handle ) {
		wp_dequeue_style( $handle );
	}
}
add_action( 'wp_print_styles', 'bvd_dequeue_unused', 1 );
add_action( 'wp_print_footer_scripts', 'bvd_dequeue_unused', 1 );

/* -------------------------------------------------------------------------
 * Accessibilité : landmark principal (répare le lien d'évitement #content)
 * ---------------------------------------------------------------------- */

add_action(
	'elementor/page_templates/header-footer/before_content',
	static function () {
		if ( bvd_is_enabled() && ! bvd_is_elementor_editing() ) {
			echo '<main id="content" class="bvd-main" tabindex="-1">';
		}
	},
	1
);
add_action(
	'elementor/page_templates/header-footer/after_content',
	static function () {
		if ( bvd_is_enabled() && ! bvd_is_elementor_editing() ) {
			echo '</main>';
		}
	},
	99
);

/* -------------------------------------------------------------------------
 * Substitutions sur le HTML servi (icônes, glyphes, visuels) : voir includes/render.php
 * ---------------------------------------------------------------------- */

add_action(
	'template_redirect',
	static function () {
		if ( ! bvd_is_enabled() || bvd_is_elementor_editing() || is_feed() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return;
		}
		ob_start(
			static function ( $html ) {
				return is_string( $html ) ? bvd_filter_html( $html ) : $html;
			}
		);
	},
	0
);

/** Données pour le script : libellés d'interface (micro-labels). */
add_action(
	'wp_footer',
	static function () {
		if ( ! bvd_is_enabled() || bvd_is_elementor_editing() ) {
			return;
		}
		$data = array(
			'who'      => 'Analyste',
			'session'  => 'Session ASTRO',
			'sub'      => 'Sous-menu',
			'home'     => home_url( '/' ),
			'contact'  => home_url( '/contact/' ),
			'homeTxt'  => 'Accueil',
			'contactT' => 'Parler à un expert',
		);
		echo '<script id="bvd-data" type="application/json">' . wp_json_encode( $data ) . '</script>' . "\n";
	},
	1
);
