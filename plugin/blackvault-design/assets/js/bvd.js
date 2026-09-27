/* BLACKVAULT Design : micro-interactions et accessibilité. Vanilla, sans dépendance. */
(function () {
  'use strict';
  var d = document;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var data = {};
  try { data = JSON.parse((d.getElementById('bvd-data') || {}).textContent || '{}'); } catch (e) { data = {}; }
  var main = d.getElementById('content') || d.body;
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || d).querySelectorAll(sel)); };

  /* 1. Sections : révélation au défilement, jouée une fois ---------------- */
  var sections = $$('.elementor > .e-con.e-parent', main);
  var seen = function (el) { el.classList.add('bvd-in'); };
  if (reduce || !('IntersectionObserver' in window)) {
    sections.forEach(seen);
  } else {
    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { seen(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    sections.forEach(function (s, i) {
      var top = s.getBoundingClientRect().top;
      if (i === 0 || top < vh * 0.9) { seen(s); return; }
      s.classList.add('bvd-reveal');
      io.observe(s);
    });
    // Filet de sécurité : jamais de contenu masqué durablement.
    window.setTimeout(function () { sections.forEach(function (s) { if (!s.classList.contains('bvd-in') && s.getBoundingClientRect().top < (window.innerHeight || 800)) { seen(s); } }); }, 2500);
  }

  /* 2. Chiffres clés : compteurs joués une fois -------------------------- */
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  function countTo(el, from, to, fmt, dur) {
    var t0 = null;
    function step(ts) {
      if (!t0) { t0 = ts; }
      var p = Math.min(1, (ts - t0) / dur);
      el.textContent = fmt(Math.round(from + (to - from) * ease(p)));
      if (p < 1) { window.requestAnimationFrame(step); } else { el.textContent = el.getAttribute('data-bvd-final'); el.removeAttribute('aria-label'); }
    }
    window.requestAnimationFrame(step);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    var stats = $$('.bv-stat .elementor-heading-title', main);
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        var el = en.target, txt = el.getAttribute('data-bvd-final');
        sio.unobserve(el);
        el.setAttribute('aria-label', txt);
        var m;
        if ((m = txt.match(/^(\d+)$/))) {
          var n = parseInt(m[1], 10);
          if (n === 0) { countTo(el, 9, 0, String, 900); } else { countTo(el, 0, n, String, 900); }
        } else if ((m = txt.match(/^(\d+)(\/\d+)$/))) {
          countTo(el, 0, parseInt(m[1], 10), function (v) { return v + m[2]; }, 1000);
        } else if ((m = txt.match(/^([<≤]\s*)(\d+)(\s*\S.*)$/))) {
          countTo(el, 30, parseInt(m[2], 10), function (v) { return m[1] + v + m[3]; }, 1000);
        } else {
          el.removeAttribute('aria-label');
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(function (el) { el.setAttribute('data-bvd-final', el.textContent.trim()); sio.observe(el); });
  }

  /* 3. ASTRO : requêtes présentées en interface de conversation ---------- */
  var quotes = $$('.elementor-widget-text-editor', main).filter(function (w) {
    var t = w.textContent.trim();
    return t.length > 12 && t.charAt(0) === '«' && t.charAt(t.length - 1) === '»';
  });
  var groups = [];
  quotes.forEach(function (w) {
    var bubble = w.parentElement && w.parentElement.closest('.e-con') ? w.parentElement.closest('.e-con') : w;
    if (bubble.querySelectorAll('.elementor-widget-text-editor').length > 1) { bubble = w; }
    var host = bubble.parentElement;
    var g = groups.filter(function (x) { return x.host === host; })[0];
    if (!g) { g = { host: host, items: [] }; groups.push(g); }
    g.items.push(bubble);
  });
  groups.forEach(function (g) {
    if (g.items.length < 2) { return; }
    g.host.classList.add('bvd-astro');
    var head = d.createElement('div');
    head.className = 'bvd-astro-head';
    head.setAttribute('aria-hidden', 'true');
    head.innerHTML = '<span class="bvd-dot"></span>' + (data.session || 'Session ASTRO');
    g.items[0].parentNode.insertBefore(head, g.items[0]);
    g.items.forEach(function (m) {
      m.classList.add('bvd-msg');
      m.setAttribute('data-bvd-who', data.who || 'Analyste');
      var typing = d.createElement('div');
      typing.className = 'bvd-typing';
      typing.setAttribute('aria-hidden', 'true');
      typing.innerHTML = '<i></i><i></i><i></i>';
      m.parentNode.insertBefore(typing, m.nextSibling);
    });
  });

  /* 4. Navigation : clavier (desktop), Échap (desktop et mobile) ---------- */
  var desktop = window.matchMedia ? window.matchMedia('(min-width: 1025px)').matches : true;
  $$('.bv-nav li.menu-item-has-children').forEach(function (li) {
    var wrap = li.querySelector(':scope > .hfe-has-submenu-container');
    var link = wrap ? wrap.querySelector('a') : li.querySelector(':scope > a');
    var sub = li.querySelector(':scope > .sub-menu');
    if (!link || !sub) { return; }
    if (desktop && wrap) {
      wrap.setAttribute('role', 'none');
      wrap.removeAttribute('tabindex');
      wrap.removeAttribute('aria-haspopup');
      wrap.removeAttribute('aria-expanded');
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
    }
    var items = function () { return $$('a', sub); };
    li.addEventListener('focusin', function () { if (desktop) { li.classList.remove('bvd-closed'); link.setAttribute('aria-expanded', 'true'); } });
    li.addEventListener('focusout', function (e) { if (desktop && !li.contains(e.relatedTarget)) { link.setAttribute('aria-expanded', 'false'); li.classList.remove('bvd-closed'); } });
    li.addEventListener('mouseleave', function () { li.classList.remove('bvd-closed'); });
    li.addEventListener('keydown', function (e) {
      if (!desktop) { return; }
      var list = items(), i = list.indexOf(d.activeElement);
      if (e.key === 'Escape') { li.classList.add('bvd-closed'); link.setAttribute('aria-expanded', 'false'); link.focus(); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { (list[i + 1] || list[0]).focus(); li.classList.remove('bvd-closed'); e.preventDefault(); }
      else if (e.key === 'ArrowUp' && i > -1) { (i === 0 ? link : list[i - 1]).focus(); e.preventDefault(); }
    });
  });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    var t = d.querySelector('.hfe-nav-menu__toggle.hfe-active-menu');
    if (t) { t.click(); t.focus(); }
  });

  /* 5. 404 : deux issues ---------------------------------------------------- */
  if (d.body.classList.contains('error404')) {
    var pc = d.querySelector('.error404 .page-content') || d.querySelector('.error404 .site-main');
    if (pc && !d.querySelector('.bvd-404-links')) {
      var nav = d.createElement('p');
      nav.className = 'bvd-404-links';
      nav.innerHTML = '<a href="' + (data.home || '/') + '">' + (data.homeTxt || 'Accueil') + '</a><a href="' + (data.contact || '/contact/') + '">' + (data.contactT || 'Parler à un expert') + '</a>';
      pc.appendChild(nav);
    }
  }
})();
