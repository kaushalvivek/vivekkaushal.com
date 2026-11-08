import {
  ESSAY_90_MIN_ACTIVE_MS,
  OPT_OUT_STORAGE_KEY,
  DEBUG_STORAGE_KEY,
  ESSAY_IDLE_MS,
  activeElapsedMs,
  applyGate,
  buildOutboundEvent,
  buildPageView,
  claimPageView,
  commitPageView,
  createActiveClock,
  newlyReachedMilestones,
  noteInteraction,
  setClockVisibility,
  titleForPath,
} from './ga';

function memoryStorage(seed = {}) {
  const data = { ...seed };
  return {
    getItem: (key) => (Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
    removeItem: (key) => {
      delete data[key];
    },
  };
}

describe('GA host gate and opt-out', () => {
  function gate(hostname, search, storage = {}) {
    return applyGate({
      hostname,
      search,
      localStorage: storage.localStorage || memoryStorage(),
      sessionStorage: storage.sessionStorage || memoryStorage(),
    });
  }

  test('sends only on the production hosts', () => {
    expect(gate('vivekkaushal.com', '').enabled).toBe(true);
    expect(gate('www.vivekkaushal.com', '').enabled).toBe(true);
    expect(gate('VivekKaushal.com', '').enabled).toBe(true);
    expect(gate('localhost', '').enabled).toBe(false);
    expect(gate('127.0.0.1', '').enabled).toBe(false);
    expect(gate('deploy-preview-42--vivekkaushal.netlify.app', '').enabled).toBe(false);
  });

  test('?ga_debug=1 enables a non-production host and sticks for the session', () => {
    const localStorage = memoryStorage();
    const sessionStorage = memoryStorage();
    const first = applyGate({
      hostname: 'localhost',
      search: '?ga_debug=1',
      localStorage,
      sessionStorage,
    });
    expect(first).toMatchObject({ enabled: true, reason: 'debug' });
    expect(sessionStorage.getItem(DEBUG_STORAGE_KEY)).toBe('1');

    const later = applyGate({
      hostname: 'random-name.netlify.app',
      search: '',
      localStorage,
      sessionStorage,
    });
    expect(later.enabled).toBe(true);
  });

  test('?ga_optout=1 persists and blocks debug; ?ga_optout=0 clears it', () => {
    const localStorage = memoryStorage();
    const sessionStorage = memoryStorage();

    const blocked = applyGate({
      hostname: 'localhost',
      search: '?ga_optout=1&ga_debug=1',
      localStorage,
      sessionStorage,
    });
    expect(blocked).toMatchObject({ enabled: false, reason: 'optout' });
    expect(localStorage.getItem(OPT_OUT_STORAGE_KEY)).toBe('1');

    const stillBlocked = applyGate({
      hostname: 'vivekkaushal.com',
      search: '',
      localStorage,
      sessionStorage,
    });
    expect(stillBlocked.enabled).toBe(false);

    const cleared = applyGate({
      hostname: 'vivekkaushal.com',
      search: '?ga_optout=0',
      localStorage,
      sessionStorage,
    });
    expect(cleared.enabled).toBe(true);
    expect(localStorage.getItem(OPT_OUT_STORAGE_KEY)).toBe(null);
  });
});

describe('essay_progress milestones', () => {
  test('fires each milestone once, and holds 90 until 30s of active time', () => {
    const sent = new Set();

    const jumped = newlyReachedMilestones({
      maxScrollPercent: 100,
      activeMs: 0,
      alreadySent: sent,
    });
    expect(jumped).toEqual([25, 50, 75]);
    jumped.forEach((milestone) => sent.add(milestone));

    expect(newlyReachedMilestones({
      maxScrollPercent: 100,
      activeMs: ESSAY_90_MIN_ACTIVE_MS - 1,
      alreadySent: sent,
    })).toEqual([]);

    expect(newlyReachedMilestones({
      maxScrollPercent: 90,
      activeMs: ESSAY_90_MIN_ACTIVE_MS,
      alreadySent: sent,
    })).toEqual([90]);
    sent.add(90);

    expect(newlyReachedMilestones({
      maxScrollPercent: 100,
      activeMs: ESSAY_90_MIN_ACTIVE_MS * 4,
      alreadySent: sent,
    })).toEqual([]);
  });

  test('ignores time with no interaction, idle gaps, and a hidden tab', () => {
    let clock = createActiveClock(true);
    expect(activeElapsedMs(clock, 10000)).toBe(0);

    clock = noteInteraction(clock, 10000);
    expect(activeElapsedMs(clock, 20000)).toBe(10000);

    clock = setClockVisibility(clock, 20000, false);
    expect(activeElapsedMs(clock, 80000)).toBe(10000);

    clock = setClockVisibility(clock, 80000, true);
    expect(activeElapsedMs(clock, 90000)).toBe(10000);

    clock = noteInteraction(clock, 90000);
    expect(activeElapsedMs(clock, 100000)).toBe(20000);
  });

  test('stops 30s after the last interaction and resumes on the next one', () => {
    let clock = createActiveClock(true);
    clock = noteInteraction(clock, 0);
    expect(activeElapsedMs(clock, ESSAY_IDLE_MS)).toBe(ESSAY_IDLE_MS);
    expect(activeElapsedMs(clock, ESSAY_IDLE_MS + 25000)).toBe(ESSAY_IDLE_MS);

    clock = noteInteraction(clock, 20000);
    expect(activeElapsedMs(clock, 45000)).toBe(45000);
    expect(activeElapsedMs(clock, 60000)).toBe(50000);

    let brief = createActiveClock(true);
    brief = noteInteraction(brief, 0);
    brief = setClockVisibility(brief, 10000, false);
    const sent = new Set([25, 50, 75]);
    expect(activeElapsedMs(brief, 120000)).toBe(10000);
    expect(newlyReachedMilestones({
      maxScrollPercent: 100,
      activeMs: activeElapsedMs(brief, 120000),
      alreadySent: sent,
    })).toEqual([]);

    brief = setClockVisibility(brief, 120000, true);
    brief = noteInteraction(brief, 120000);
    const activeMs = activeElapsedMs(brief, 140000);
    expect(activeMs).toBe(30000);
    expect(newlyReachedMilestones({
      maxScrollPercent: 100,
      activeMs,
      alreadySent: sent,
    })).toEqual([90]);
  });

  test('25 is sent once when the reader is still above that line', () => {
    const sent = new Set();
    const first = newlyReachedMilestones({ maxScrollPercent: 30, activeMs: 0, alreadySent: sent });
    expect(first).toEqual([25]);
    first.forEach((milestone) => sent.add(milestone));
    expect(newlyReachedMilestones({ maxScrollPercent: 30, activeMs: 0, alreadySent: sent })).toEqual([]);
    expect(newlyReachedMilestones({
      maxScrollPercent: 89,
      activeMs: ESSAY_90_MIN_ACTIVE_MS * 2,
      alreadySent: new Set([25, 50, 75]),
    })).toEqual([]);
  });
});

describe('outbound_click payload', () => {
  test('strips the query string and describes the link', () => {
    const event = buildOutboundEvent({
      href: 'https://github.com/kaushalvivek/hn-cli?utm_source=home&tab=readme',
      linkName: 'hn-cli',
      placement: 'home_tinkering',
      pagePath: '/',
    });
    expect(event).toEqual({
      link_type: 'project',
      link_name: 'hn-cli',
      placement: 'home_tinkering',
      destination_host: 'github.com',
      destination_path: '/kaushalvivek/hn-cli',
      page_path: '/',
    });
    expect(event.destination_path).not.toContain('?');
    expect(event.destination_path).not.toContain('utm_source');
  });

  test('keeps essay_slug on essay pages and classifies subscribe, talk, and social', () => {
    const subscribe = buildOutboundEvent({
      href: 'https://vivekkaushal.substack.com/subscribe?utm_campaign=post&email=hidden@example.com',
      linkName: 'Subscribe',
      placement: 'post_end',
      pagePath: '/blog/some-essay',
      essaySlug: 'some-essay',
    });
    expect(subscribe.destination_host).toBe('vivekkaushal.substack.com');
    expect(subscribe.destination_path).toBe('/subscribe');
    expect(subscribe.essay_slug).toBe('some-essay');
    expect(subscribe.link_type).toBe('subscribe');
    expect(JSON.stringify(subscribe)).not.toContain('hidden@example.com');

    const talk = buildOutboundEvent({
      href: 'https://www.youtube.com/watch?v=Jj2T-YX6zIM',
      linkName: 'What Great Looks Like',
      placement: 'home_talks',
      pagePath: '/',
    });
    expect(talk.link_type).toBe('talk');
    expect(talk.destination_host).toBe('www.youtube.com');
    expect(talk.destination_path).toBe('/watch');
    expect(talk.essay_slug).toBeUndefined();

    const social = buildOutboundEvent({
      href: 'https://github.com/kaushalvivek/',
      linkName: 'GitHub',
      placement: 'footer',
      pagePath: '/books',
    });
    expect(social.link_type).toBe('social');
    expect(social.destination_path).toBe('/kaushalvivek/');
  });
});

describe('document titles and the first page_view', () => {
  test('gives each route its own title and uses the essay title', () => {
    const routes = {
      '/': 'Vivek Kaushal',
      '/blog': 'Essays — Vivek Kaushal',
      '/books': 'Reading — Vivek Kaushal',
      '/research': 'Research — Vivek Kaushal',
      '/talk': 'Contact — Vivek Kaushal',
      '/meet': 'Meet — Vivek Kaushal',
    };
    const seen = new Set();
    Object.entries(routes).forEach(([path, title]) => {
      expect(titleForPath(path)).toBe(title);
      expect(seen.has(title)).toBe(false);
      seen.add(title);
    });

    const essay = 'Customer feedback is the verification layer for product development';
    expect(titleForPath(
      '/blog/customer-feedback-is-the-verification-layer-for-product-development',
      { 'customer-feedback-is-the-verification-layer-for-product-development': essay },
      false,
    )).toBe(`${essay} — Vivek Kaushal`);

    expect(titleForPath('/blog/not-loaded-yet', {}, false)).toBeNull();
    expect(titleForPath('/blog/missing', {}, true)).toBe('Post not found — Vivek Kaushal');
    expect(titleForPath('/no-such-page')).toBe('Page not found — Vivek Kaushal');
  });

  test('sets the title before page_view and keeps the landing query string', () => {
    const landingHref = 'https://vivekkaushal.com/?utm_source=newsletter&utm_medium=email';
    const params = buildPageView({
      title: 'Vivek Kaushal',
      pathname: '/',
      search: '',
      origin: 'https://vivekkaushal.com',
      landingHref,
      isFirst: true,
      referrer: 'https://substack.com/',
    });
    expect(params.page_location).toBe(landingHref);
    expect(params.page_path).toBe('/?utm_source=newsletter&utm_medium=email');
    expect(params.page_referrer).toBe('https://substack.com/');

    const next = buildPageView({
      title: 'Essays — Vivek Kaushal',
      pathname: '/blog',
      search: '',
      origin: 'https://vivekkaushal.com',
      landingHref,
      isFirst: false,
      referrer: 'https://substack.com/',
    });
    expect(next.page_location).toBe('https://vivekkaushal.com/blog');
    expect(next.page_path).toBe('/blog');
    expect(next.page_referrer).toBeUndefined();

    const seen = [];
    const doc = { title: 'Vivek Kaushal' };
    commitPageView(doc, (name, payload) => {
      seen.push({ name, titleAtSend: doc.title, payload });
    }, params);
    expect(doc.title).toBe('Vivek Kaushal');
    expect(seen).toEqual([{ name: 'page_view', titleAtSend: 'Vivek Kaushal', payload: params }]);
  });

  test('collapses a StrictMode double send of the same visit', () => {
    const sentAt = new Map();
    expect(claimPageView(sentAt, 'default', 1000)).toBe(true);
    expect(claimPageView(sentAt, 'default', 1200)).toBe(false);
    expect(claimPageView(sentAt, 'abc', 1300)).toBe(true);
    expect(claimPageView(sentAt, 'default', 1000 + 500)).toBe(true);
  });
});
