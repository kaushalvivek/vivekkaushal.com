// GA4 helpers. Sending is gated; these functions do not talk to the network by themselves.

export const GA_MEASUREMENT_ID = 'G-CS6915DZ38';
export const OPT_OUT_STORAGE_KEY = 'ga_optout';
export const DEBUG_STORAGE_KEY = 'ga_debug';
export const PAGE_VIEW_DEDUPE_MS = 500;
export const ESSAY_MILESTONES = [25, 50, 75, 90];
// 90% scroll only counts after this much time on the page with the tab visible.
export const ESSAY_90_MIN_ACTIVE_MS = 30000;

const PRODUCTION_HOSTS = new Set(['vivekkaushal.com', 'www.vivekkaushal.com']);

let trackingEnabled = false;
let gtagLoaded = false;

export function isTrackingEnabled() {
  return trackingEnabled;
}

export function setTrackingEnabled(enabled) {
  trackingEnabled = Boolean(enabled);
}

function safeGet(store, key) {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(store, key, value) {
  try {
    store.setItem(key, value);
  } catch {
    /* private mode and blocked storage should fail closed */
  }
}

function safeRemove(store, key) {
  try {
    store.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * Production hosts only, unless this tab opted into ?ga_debug=1 (remembered for the
 * session so client-side navigations keep sending). ?ga_optout=1 is stored and
 * blocks every host, including debug; ?ga_optout=0 clears it.
 */
export function applyGate({ hostname, search, localStorage, sessionStorage }) {
  try {
    const params = new URLSearchParams(search || '');
    const opt = params.get('ga_optout');
    if (opt === '1') safeSet(localStorage, OPT_OUT_STORAGE_KEY, '1');
    else if (opt === '0') safeRemove(localStorage, OPT_OUT_STORAGE_KEY);

    if (params.get('ga_debug') === '1') safeSet(sessionStorage, DEBUG_STORAGE_KEY, '1');

    const optedOut = safeGet(localStorage, OPT_OUT_STORAGE_KEY) === '1';
    const debug = safeGet(sessionStorage, DEBUG_STORAGE_KEY) === '1';
    if (optedOut) return { enabled: false, reason: 'optout', debug: false };

    const host = String(hostname || '').toLowerCase();
    if (PRODUCTION_HOSTS.has(host)) return { enabled: true, reason: 'production', debug };
    if (debug) return { enabled: true, reason: 'debug', debug: true };
    return { enabled: false, reason: 'host', debug: false };
  } catch {
    return { enabled: false, reason: 'error', debug: false };
  }
}

export function ensureGtag({ debug = false } = {}) {
  if (gtagLoaded || typeof document === 'undefined') return;
  if (!/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return;
  gtagLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Manual page_view only. Enhanced measurement in the GA4 property can still add its own hits.
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    ...(debug ? { debug_mode: true } : {}),
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function sendEvent(name, params) {
  if (!trackingEnabled) return;
  try {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  } catch {
    /* analytics must not break the page */
  }
}

export function claimPageView(sentAt, key, now, windowMs = PAGE_VIEW_DEDUPE_MS) {
  const prev = sentAt.get(key);
  if (prev != null && now - prev < windowMs) return false;
  sentAt.set(key, now);
  return true;
}

function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.replace(/\/+$/, '') || '/';
  return pathname;
}

export function essaySlugFromPath(pathname) {
  const path = normalizePath(pathname);
  if (!path.startsWith('/blog/')) return null;
  const raw = path.slice('/blog/'.length);
  if (!raw || raw.includes('/')) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

const STATIC_TITLES = {
  '/': 'Vivek Kaushal',
  '/blog': 'Essays — Vivek Kaushal',
  '/hack': 'Essays — Vivek Kaushal',
  '/books': 'Reading — Vivek Kaushal',
  '/research': 'Research — Vivek Kaushal',
  '/talk': 'Contact — Vivek Kaushal',
  '/meet': 'Meet — Vivek Kaushal',
  '/projects': 'Vivek Kaushal',
  '/bucketlist': 'Vivek Kaushal',
};

/**
 * Title for a route. Essay routes return null until the catalog has the slug
 * (catalogReady false) so the caller can wait and set document.title before page_view.
 */
export function titleForPath(pathname, titlesBySlug = null, catalogReady = true) {
  const path = normalizePath(pathname);
  const slug = essaySlugFromPath(path);
  if (slug) {
    const essayTitle = titlesBySlug && titlesBySlug[slug];
    if (essayTitle) return `${essayTitle} — Vivek Kaushal`;
    if (!catalogReady) return null;
    return 'Post not found — Vivek Kaushal';
  }
  return STATIC_TITLES[path] || 'Page not found — Vivek Kaushal';
}

/**
 * First hit uses the URL captured at startup so UTM params survive anything that
 * rewrites the address bar before gtag runs. Later hits use the route they landed on.
 */
export function buildPageView({
  title,
  pathname,
  search,
  origin,
  landingHref,
  isFirst,
  referrer,
}) {
  if (isFirst && landingHref) {
    const url = new URL(landingHref, origin || 'https://vivekkaushal.com');
    const params = {
      page_title: title,
      page_path: `${url.pathname}${url.search}`,
      page_location: url.href,
    };
    if (referrer) params.page_referrer = referrer;
    return params;
  }
  const page_path = `${pathname}${search || ''}`;
  return {
    page_title: title,
    page_path,
    page_location: `${origin}${page_path}`,
  };
}

export function commitPageView(doc, send, params) {
  doc.title = params.page_title;
  send('page_view', params);
}

export function createActiveClock(now, visible) {
  return { accumulatedMs: 0, runningSince: visible ? now : null };
}

export function activeElapsedMs(clock, now) {
  const extra = clock.runningSince == null ? 0 : Math.max(0, now - clock.runningSince);
  return clock.accumulatedMs + extra;
}

export function setClockVisibility(clock, now, visible) {
  const accumulatedMs = activeElapsedMs(clock, now);
  if (!visible) return { accumulatedMs, runningSince: null };
  if (clock.runningSince != null) return clock;
  return { accumulatedMs, runningSince: now };
}

/**
 * essay_progress is an engagement proxy (how far the essay has been on screen,
 * plus active time), not proof that anyone read it.
 * Each milestone is returned at most once. 90 also requires ESSAY_90_MIN_ACTIVE_MS
 * of active, visible time — time while the tab is hidden does not count.
 */
export function newlyReachedMilestones({ maxScrollPercent, activeMs, alreadySent }) {
  const sent = alreadySent instanceof Set ? alreadySent : new Set(alreadySent || []);
  const reached = [];
  ESSAY_MILESTONES.forEach((milestone) => {
    if (sent.has(milestone)) return;
    if (maxScrollPercent < milestone) return;
    if (milestone === 90 && activeMs < ESSAY_90_MIN_ACTIVE_MS) return;
    reached.push(milestone);
  });
  return reached;
}

export function articleProgressPercent({ top, height, viewportHeight }) {
  if (!height || height <= 0) return 0;
  const seen = Math.min(height, Math.max(0, viewportHeight - top));
  return (seen / height) * 100;
}

export function isSameSite(destinationHost, currentHost) {
  const dest = String(destinationHost || '').toLowerCase();
  const current = String(currentHost || '').toLowerCase();
  if (!dest || !current) return false;
  if (dest === current) return true;
  return PRODUCTION_HOSTS.has(dest) && PRODUCTION_HOSTS.has(current);
}

function blockedScheme(href) {
  const colon = href.indexOf(':');
  if (colon <= 0) return false;
  const scheme = href.slice(0, colon).toLowerCase();
  return scheme === 'mailto' || scheme === 'tel' || scheme === 'javascript';
}

export function isTrackableOutbound(href, currentHostname, base) {
  if (!href) return false;
  const trimmed = String(href).trim();
  if (trimmed.startsWith('#') || blockedScheme(trimmed)) return false;
  let url;
  try {
    url = new URL(trimmed, base);
  } catch {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  return !isSameSite(url.hostname, currentHostname);
}

export function classifyLinkType({ hostname, pathname, linkName, placement }) {
  const host = String(hostname || '').toLowerCase().replace(/^www\./, '');
  const name = String(linkName || '').trim().toLowerCase();
  const path = pathname || '/';

  if (placement === 'post_end' || name.includes('subscribe')) return 'subscribe';
  if (
    placement === 'home_talks' ||
    host === 'youtube.com' ||
    host === 'youtu.be' ||
    host === 'productledalliance.com' ||
    host.endsWith('.productledalliance.com')
  ) {
    return 'talk';
  }
  if (placement === 'home_tinkering' || host === 'feedbackbench.com') return 'project';
  if (host === 'github.com') {
    const parts = path.split('/').filter(Boolean);
    return parts.length >= 2 ? 'project' : 'social';
  }
  if (
    host === 'x.com' ||
    host === 'twitter.com' ||
    host === 'linkedin.com' ||
    host.endsWith('.linkedin.com')
  ) {
    return 'social';
  }
  if (host === 'substack.com' || host.endsWith('.substack.com')) return 'social';
  return 'other';
}

export function placementFromContext({
  inFooter,
  inHeader,
  inPostEnd,
  inHero,
  marked,
  pathname,
}) {
  if (inFooter) return 'footer';
  if (inHeader) return 'header';
  if (inPostEnd) return 'post_end';
  if (inHero) return 'home_hero';
  if (marked) return marked;
  const path = normalizePath(pathname);
  if (path.startsWith('/research')) return 'research';
  if (path.startsWith('/blog/')) return 'essay';
  if (path === '/blog') return 'blog';
  if (path === '/') return 'home';
  if (path === '/books') return 'books';
  if (path === '/talk') return 'talk';
  return 'not_found';
}

/** Query string is dropped so outbound payloads never carry UTMs, tokens, or emails. */
export function buildOutboundEvent({
  href,
  base = 'https://vivekkaushal.com',
  linkName,
  placement,
  pagePath,
  essaySlug,
}) {
  const url = new URL(href, base);
  const event = {
    link_type: classifyLinkType({
      hostname: url.hostname,
      pathname: url.pathname,
      linkName,
      placement,
    }),
    link_name: String(linkName || '').trim().replace(/\s+/g, ' ').slice(0, 100),
    placement,
    destination_host: url.hostname,
    destination_path: url.pathname || '/',
    page_path: pagePath,
  };
  if (essaySlug) event.essay_slug = essaySlug;
  return event;
}

export function trackContactSubmit(pagePath) {
  const path = pagePath || '/';
  const params = { page_path: path };
  if (typeof window !== 'undefined' && window.location) {
    params.page_location = window.location.href;
  }
  sendEvent('contact_submit', params);
}
