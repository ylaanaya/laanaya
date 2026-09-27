<?php
/**
 * Substitutions au rendu des widgets Elementor.
 * Les données des pages ne sont jamais modifiées : seul le HTML servi change,
 * et uniquement quand la couche de design est active.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Icônes produit officielles (médiathèque) : conservées, posées dans une tuile. */
const BVD_PRODUCT_ICONS = array(
	1696 => 'nova',
	1693 => 'casex',
	1694 => 'trace',
	1698 => 'hound',
	1699 => 'vx',
	1697 => 'orbitfix',
	1695 => 'nexus',
);

/** Logos produit officiels des héros de fiche : conservés, posés sur une scène. */
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

/** Texte alternatif d'une balise img. */
function bvd_img_alt( string $html ): string {
	return preg_match( '#<img\b[^>]*\balt="([^"]*)"#', $html, $m ) ? html_entity_decode( $m[1], ENT_QUOTES ) : '';
}

/** URL d'un logo officiel embarqué dans le plugin (assets/brand). */
function bvd_brand_url( string $key ): string {
	$rel = is_file( BVD_DIR . 'assets/brand/' . $key . '.webp' ) ? 'assets/brand/' . $key . '.webp' : 'assets/brand/products/' . $key . '.webp';
	return BVD_URL . $rel . '?ver=' . bvd_ver( $rel );
}

/** Visuel SVG inline : texte alternatif et logos officiels résolus. */
function bvd_visual_svg( string $key, string $alt ): string {
	$svg = bvd_svg_file( 'assets/visuals/' . $key . '.svg' );
	if ( '' === $svg ) {
		return '';
	}
	$svg = str_replace( '__ALT__', esc_attr( $alt ), $svg );
	return (string) preg_replace_callback(
		'#__IMG_([a-z0-9-]+)__#',
		static function ( $m ) {
			return esc_url( bvd_brand_url( $m[1] ) );
		},
		$svg
	);
}

/** Logos officiels d'IA Orchestrator et d'ASTRO, côte à côte (héros de la page IA souveraine). */
function bvd_logo_duo(): string {
	return '<div class="bvd-logo-duo">'
		. '<img src="' . esc_url( bvd_brand_url( 'ia-orchestrator-logo' ) ) . '" width="400" height="506" alt="IA Orchestrator" fetchpriority="high" decoding="async">'
		. '<img src="' . esc_url( bvd_brand_url( 'astro-logo' ) ) . '" width="400" height="434" alt="ASTRO" decoding="async">'
		. '</div>';
}

/**
 * Substitutions sur le HTML complet de la page (tampon de sortie).
 * Nécessaire car le cache d'éléments d'Elementor sert le HTML des widgets
 * sans repasser par le filtre elementor/widget/render_content.
 */
function bvd_filter_html( string $html ): string {
	if ( false === stripos( $html, '<html' ) ) {
		return $html;
	}
	$map = bvd_fa_map();
	// 1. Font Awesome inline vers Lucide.
	$html = (string) preg_replace_callback(
		'#<svg\b[^>]*\bclass="e-font-icon-svg e-fa[srb]-([a-z0-9-]+)"[^>]*>.*?</svg>#s',
		static function ( $m ) use ( $map ) {
			$lucide = $map[ $m[1] ] ?? '';
			$svg    = '' !== $lucide ? bvd_lucide_svg( $lucide ) : '';
			return '' !== $svg ? $svg : $m[0];
		},
		$html
	);
	// 1 bis. Mêmes icônes, échappées dans des attributs data-* (bascule du menu mobile HFE).
	$html = (string) preg_replace_callback(
		'#&lt;svg\b(?:(?!&gt;).)*?class=&quot;e-font-icon-svg e-fa[srb]-([a-z0-9-]+)&quot;.*?&lt;/svg&gt;#s',
		static function ( $m ) use ( $map ) {
			$lucide = $map[ $m[1] ] ?? '';
			$svg    = '' !== $lucide ? bvd_lucide_svg( $lucide ) : '';
			return '' !== $svg ? htmlspecialchars( $svg, ENT_QUOTES ) : $m[0];
		},
		$html
	);
	// 2. Images de la médiathèque repérées par leur classe wp-image-ID.
	$page = (int) get_queried_object_id();
	$html = (string) preg_replace_callback(
		'#<img\b[^>]*\bwp-image-(\d+)\b[^>]*>#',
		static function ( $m ) use ( $page ) {
			$id = (int) $m[1];
			if ( array_key_exists( $id, BVD_PRODUCT_ICONS ) ) {
				return '<span class="bvd-logo-box">' . $m[0] . '</span>';
			}
			if ( array_key_exists( $id, BVD_PRODUCT_LOGOS ) ) {
				return '<div class="bvd-logo-stage">' . $m[0] . '</div>';
			}
			if ( 2178 === $id && 1749 === $page ) {
				return bvd_logo_duo();
			}
			if ( array_key_exists( $id, BVD_VISUALS ) ) {
				$svg = bvd_visual_svg( BVD_VISUALS[ $id ], bvd_img_alt( $m[0] ) );
				return '' !== $svg ? $svg : $m[0];
			}
			return $m[0];
		},
		$html
	);
	// 2 bis. Emblèmes officiels devant les titres de carte « IA Orchestrator » et « ASTRO ».
	$html = (string) preg_replace_callback(
		'#<h3 class="elementor-heading-title[^"]*">(IA Orchestrator|ASTRO)</h3>#',
		static function ( $m ) {
			$key = 'ASTRO' === $m[1] ? 'astro-emblem' : 'ia-orchestrator-emblem';
			return '<img class="bvd-card-logo" src="' . esc_url( bvd_brand_url( $key ) ) . '" width="160" height="160" alt="" loading="lazy" decoding="async">' . $m[0];
		},
		$html
	);
	// 3. Logo du header : dimensions intrinsèques (CLS).
	$html = (string) preg_replace( '#(<img\b)(?![^>]*\bwidth=)([^>]*\bhfe-site-logo-img\b)#', '$1 width="488" height="184"$2', $html, 1 );
	return $html;
}
