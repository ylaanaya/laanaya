<?php
/**
 * Substitutions au rendu des widgets Elementor.
 * Les données des pages ne sont jamais modifiées : seul le HTML servi change,
 * et uniquement quand la couche de design est active.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Icônes produit raster (médiathèque) vers glyphes maison. */
const BVD_PRODUCT_ICONS = array(
	1696 => 'nova',
	1693 => 'casex',
	1694 => 'trace',
	1698 => 'hound',
	1699 => 'vx',
	1697 => 'orbitfix',
	1695 => 'nexus',
);

/** Logos produit raster des heros de fiche vers composition glyphe. */
const BVD_PRODUCT_LOGOS = array(
	1703 => 'nova',
	1700 => 'casex',
	1701 => 'trace',
	1705 => 'hound',
	1706 => 'vx',
	1704 => 'orbitfix',
	1702 => 'nexus',
);

/** Visuels raster vers SVG inline. */
const BVD_VISUALS = array(
	2177 => 'ecosystem',
	2178 => 'souverainete',
);

/** Contenu d'un fichier SVG du plugin, mis en cache par requête. */
function bvd_svg_file( string $rel ): string {
	static $cache = array();
	if ( ! isset( $cache[ $rel ] ) ) {
		$path          = BVD_DIR . $rel;
		$cache[ $rel ] = file_exists( $path ) ? trim( (string) file_get_contents( $path ) ) : '';
	}
	return $cache[ $rel ];
}

/** Contenu intérieur d'un SVG (sans la balise racine). */
function bvd_svg_inner( string $svg ): string {
	return (string) preg_replace( array( '#^<svg[^>]*>#', '#</svg>\s*$#' ), '', $svg );
}

/** Table Font Awesome (nom) vers Lucide (nom). */
function bvd_fa_map(): array {
	static $map = null;
	if ( null === $map ) {
		$json = bvd_svg_file( 'assets/icons/fa-to-lucide.json' );
		$map  = $json ? (array) json_decode( $json, true ) : array();
	}
	return $map;
}

/** SVG Lucide inline, dimensionné par Elementor (classe e-font-icon-svg conservée). */
function bvd_lucide_svg( string $name, string $extra_class = '' ): string {
	$svg = bvd_svg_file( 'assets/icons/lucide/' . $name . '.svg' );
	if ( '' === $svg ) {
		return '';
	}
	$class = trim( 'e-font-icon-svg bvd-icon bvd-icon-' . $name . ' ' . $extra_class );
	return '<svg aria-hidden="true" focusable="false" class="' . esc_attr( $class ) . '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' . bvd_svg_inner( $svg ) . '</svg>';
}

/** SVG d'un glyphe produit. */
function bvd_glyph_svg( string $key ): string {
	$svg = bvd_svg_file( 'assets/glyphs/' . $key . '.svg' );
	if ( '' === $svg ) {
		return '';
	}
	return '<svg aria-hidden="true" focusable="false" class="bvd-glyph bvd-glyph-' . esc_attr( $key ) . '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' . bvd_svg_inner( $svg ) . '</svg>';
}

/** Texte alternatif d'une balise img. */
function bvd_img_alt( string $html ): string {
	return preg_match( '#<img\b[^>]*\balt="([^"]*)"#', $html, $m ) ? html_entity_decode( $m[1], ENT_QUOTES ) : '';
}

/** Remplace la première balise img du HTML. */
function bvd_replace_img( string $html, string $replacement ): string {
	return (string) preg_replace( '#<img\b[^>]*>#', str_replace( array( '\\', '$' ), array( '\\\\', '\\$' ), $replacement ), $html, 1 );
}

/**
 * Point d'entrée du filtre elementor/widget/render_content.
 *
 * @param string                       $content HTML du widget.
 * @param \Elementor\Widget_Base|mixed $widget  Widget.
 */
function bvd_render_widget( string $content, $widget ): string {
	$name = is_object( $widget ) && method_exists( $widget, 'get_name' ) ? (string) $widget->get_name() : '';

	// 1. Font Awesome inline vers Lucide (icônes, listes, boutons, menus, footer).
	if ( false !== strpos( $content, 'e-font-icon-svg' ) ) {
		$map     = bvd_fa_map();
		$content = (string) preg_replace_callback(
			'#<svg\b[^>]*\bclass="e-font-icon-svg e-fa[srb]-([a-z0-9-]+)"[^>]*>.*?</svg>#s',
			static function ( $m ) use ( $map ) {
				$lucide = $map[ $m[1] ] ?? '';
				if ( '' === $lucide ) {
					return $m[0];
				}
				$svg = bvd_lucide_svg( $lucide );
				return '' !== $svg ? $svg : $m[0];
			},
			$content
		);
	}

	// 2. Images : icônes produit, logos produit, visuels.
	if ( 'image' === $name && is_object( $widget ) && method_exists( $widget, 'get_settings' ) ) {
		$image = (array) $widget->get_settings( 'image' );
		$id    = isset( $image['id'] ) ? (int) $image['id'] : 0;
		$alt   = bvd_img_alt( $content );

		if ( array_key_exists( $id, BVD_PRODUCT_ICONS ) ) {
			$linked = false !== strpos( $content, '<a ' );
			$attrs  = $linked ? ' role="img" aria-label="' . esc_attr( $alt ) . '"' : ' aria-hidden="true"';
			return bvd_replace_img( $content, '<span class="bvd-glyph-box"' . $attrs . '>' . bvd_glyph_svg( BVD_PRODUCT_ICONS[ $id ] ) . '</span>' );
		}
		if ( array_key_exists( $id, BVD_PRODUCT_LOGOS ) ) {
			return bvd_replace_img( $content, '<div class="bvd-glyph-hero" role="img" aria-label="' . esc_attr( $alt ) . '">' . bvd_glyph_svg( BVD_PRODUCT_LOGOS[ $id ] ) . '</div>' );
		}
		if ( array_key_exists( $id, BVD_VISUALS ) ) {
			$svg = bvd_svg_file( 'assets/visuals/' . BVD_VISUALS[ $id ] . '.svg' );
			if ( '' !== $svg ) {
				return bvd_replace_img( $content, str_replace( '__ALT__', esc_attr( $alt ), $svg ) );
			}
		}
	}

	// 3. Logo du header : dimensions intrinsèques pour réserver la place (CLS).
	if ( 'site-logo' === $name && false === strpos( $content, ' width=' ) ) {
		$content = (string) preg_replace( '#<img\b(?![^>]*\bwidth=)#', '<img width="488" height="184"', $content, 1 );
	}

	return $content;
}
