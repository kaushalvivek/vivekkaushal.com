import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PAGE_VIEW_DEDUPE_MS,
  applyGate,
  articleProgressPercent,
  buildOutboundEvent,
  buildPageView,
  claimPageView,
  commitPageView,
  createActiveClock,
  noteInteraction,
  ensureGtag,
  essaySlugFromPath,
  isTrackingEnabled,
  isTrackableOutbound,
  newlyReachedMilestones,
  placementFromContext,
  sendEvent,
  setClockVisibility,
  settleActiveClock,
  setTrackingEnabled,
  titleForPath,
} from '../analytics/ga';
import { loadEssayTitles, peekEssayTitles, titlesFromLocalPosts } from '../analytics/essayTitles';

// Captured at module load, before React Router redirects or drops the landing query.
const landingHref = typeof window !== 'undefined' ? window.location.href : '';

const pageViewClaims = new Map();
let hasSentFirstPageView = false;
let publishedVisitKey = null;
let scheduleGeneration = 0;
let clickListenerBound = false;
let progressVisit = null;
let progressTick = null;
const PROGRESS_RESUME_MS = 800;

function publishPage(visit, title) {
  if (!isTrackingEnabled()) {
    document.title = title;
    return;
  }
  if (!claimPageView(pageViewClaims, visit.key, Date.now(), PAGE_VIEW_DEDUPE_MS)) return;

  publishedVisitKey = visit.key;
  const isFirst = !hasSentFirstPageView;
  hasSentFirstPageView = true;
  const params = buildPageView({
    title,
    pathname: visit.pathname,
    search: visit.search,
    origin: window.location.origin,
    landingHref,
    isFirst,
    referrer: document.referrer,
  });
  commitPageView(document, sendEvent, params);
  if (progressTick) progressTick();
}

function schedulePageView(visit) {
  const generation = ++scheduleGeneration;
  const finish = (titles, catalogReady) => {
    if (generation !== scheduleGeneration) return;
    const title = titleForPath(visit.pathname, titles, catalogReady)
      || 'Essay — Vivek Kaushal';
    publishPage(visit, title);
  };

  const local = titlesFromLocalPosts();
  const cached = peekEssayTitles();
  const sync = titleForPath(visit.pathname, cached || local, cached != null);
  if (sync) {
    finish(cached || local, cached != null);
    return;
  }

  loadEssayTitles().then((map) => {
    if (generation !== scheduleGeneration) return;
    if (map) finish(map, true);
    else finish(local, false);
  });
}

function linkNameFromAnchor(anchor) {
  const titled = anchor.querySelector('.essay-title, .c-title');
  const raw = titled?.textContent || anchor.getAttribute('aria-label') || anchor.textContent || '';
  return raw.trim().replace(/\s+/g, ' ').slice(0, 100);
}

function placementForAnchor(anchor) {
  return placementFromContext({
    inFooter: Boolean(anchor.closest('footer')),
    inHeader: Boolean(anchor.closest('header, .mobile-menu')),
    inPostEnd: Boolean(anchor.closest('.post-end')),
    inHero: Boolean(anchor.closest('.hero')),
    marked: anchor.closest('[data-placement]')?.getAttribute('data-placement') || '',
    pathname: window.location.pathname,
  });
}

function onDocumentClick(event) {
  if (!isTrackingEnabled()) return;
  if (event.button != null && event.button !== 0) return;
  const raw = event.target;
  const el = raw && raw.nodeType === 1 ? raw : raw?.parentElement;
  if (!el || !el.closest) return;
  const anchor = el.closest('a[href]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!isTrackableOutbound(href, window.location.hostname, window.location.href)) return;

  const pagePath = window.location.pathname;
  const params = buildOutboundEvent({
    href,
    base: window.location.href,
    linkName: linkNameFromAnchor(anchor),
    placement: placementForAnchor(anchor),
    pagePath,
    essaySlug: essaySlugFromPath(pagePath),
  });
  // page_location is the GA4 document location (dl), so the hit stays on this URL.
  sendEvent('outbound_click', { ...params, page_location: window.location.href });
}

function ensureClickListener() {
  if (clickListenerBound) return;
  clickListenerBound = true;
  document.addEventListener('click', onDocumentClick, true);
}

function articleReady(article) {
  if (!article) return false;
  const waiting = Array.from(article.querySelectorAll('img')).some((img) => !img.complete);
  return !waiting && article.getBoundingClientRect().height >= 40;
}

function watchEssay(visitKey, slug) {
  const now = performance.now();
  const visible = document.visibilityState !== 'hidden';
  const resume = progressVisit
    && progressVisit.key === visitKey
    && progressVisit.stoppedAt
    && (now - progressVisit.stoppedAt) < PROGRESS_RESUME_MS;

  if (resume) {
    progressVisit.clock = setClockVisibility(progressVisit.clock, now, visible);
    progressVisit.stoppedAt = 0;
  } else {
    progressVisit = {
      key: visitKey,
      sent: new Set(),
      clock: createActiveClock(visible),
      stoppedAt: 0,
      armed: false,
    };
  }
  const visit = progressVisit;
  const startedAt = now;

  const tryArm = () => {
    if (visit.armed) return true;
    const article = document.querySelector('article.doc-body');
    if (!article || article.getBoundingClientRect().height < 40) return false;
    // Give images a moment to take their height, then measure anyway so a hung image can't block the proxy.
    const settled = articleReady(article) || performance.now() - startedAt > 3000;
    if (!settled) return false;
    visit.armed = true;
    return true;
  };

  const tick = () => {
    if (!isTrackingEnabled()) return;
    if (!visit.armed && !tryArm()) return;
    // Wait until this visit's page_view has carried the essay title out.
    if (publishedVisitKey !== visitKey) return;
    const article = document.querySelector('article.doc-body');
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const percent = articleProgressPercent({
      top: rect.top,
      height: rect.height,
      viewportHeight: window.innerHeight || 1,
    });
    const now = performance.now();
    // Active time is visible and not idle: an interaction within the last 30s.
    visit.clock = settleActiveClock(visit.clock, now);
    const activeMs = visit.clock.accumulatedMs;
    // Engagement proxy only — reaching a line on screen is not proof the essay was read.
    newlyReachedMilestones({
      maxScrollPercent: percent,
      activeMs,
      alreadySent: visit.sent,
    }).forEach((milestone) => {
      visit.sent.add(milestone);
      sendEvent('essay_progress', {
        essay_slug: slug,
        milestone,
        page_location: window.location.href,
      });
    });
  };

  const onActivity = () => {
    visit.clock = noteInteraction(visit.clock, performance.now());
    tryArm();
    tick();
  };
  const onResize = () => tick();
  const onVisibility = () => {
    visit.clock = setClockVisibility(
      visit.clock,
      performance.now(),
      document.visibilityState !== 'hidden',
    );
    tick();
  };

  // Active time pauses 30s after the last of these, and resumes on the next one.
  const activityEvents = ['scroll', 'mousemove', 'keydown', 'touchstart', 'pointerdown', 'wheel'];
  activityEvents.forEach((type) => {
    window.addEventListener(type, onActivity, { passive: true });
  });
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
  progressTick = tick;
  const interval = window.setInterval(tick, 1000);
  const poll = window.setInterval(() => {
    if (!tryArm()) return;
    window.clearInterval(poll);
    tick();
  }, 200);
  const stopPoll = window.setTimeout(() => window.clearInterval(poll), 8000);
  tick();

  return () => {
    if (progressTick === tick) progressTick = null;
    visit.clock = setClockVisibility(visit.clock, performance.now(), false);
    visit.stoppedAt = performance.now();
    activityEvents.forEach((type) => window.removeEventListener(type, onActivity));
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    window.clearInterval(interval);
    window.clearInterval(poll);
    window.clearTimeout(stopPoll);
  };
}

const GATracker = () => {
  const location = useLocation();

  useEffect(() => {
    const gate = applyGate({
      hostname: window.location.hostname,
      search: window.location.search,
      localStorage: window.localStorage,
      sessionStorage: window.sessionStorage,
    });
    setTrackingEnabled(gate.enabled);
    if (gate.enabled) {
      ensureGtag({ debug: gate.debug });
      ensureClickListener();
    }
    // Warm the catalog even when GA is quiet, so essay titles are ready for the tab.
    loadEssayTitles();
    schedulePageView({
      key: location.key,
      pathname: location.pathname,
      search: location.search,
    });
  }, [location.key, location.pathname, location.search]);

  useEffect(() => {
    if (!isTrackingEnabled()) return undefined;
    const slug = essaySlugFromPath(location.pathname);
    if (!slug) return undefined;
    return watchEssay(location.key, slug);
  }, [location.key, location.pathname, location.search]);

  return null;
};

export default GATracker;
