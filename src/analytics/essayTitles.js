import blogFeed from '../static/blog-feed.xml';
import localPosts from '../static/localPosts';

// Slug rule matches Blog.js and home.js. Titles are resolved here so page_view
// can wait for the essay title instead of reading document.title too early.

export function slugifyTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function titlesFromLocalPosts(posts = localPosts) {
  const map = Object.create(null);
  posts.forEach((post) => {
    const slug = slugifyTitle(post.title);
    if (slug) map[slug] = post.title;
  });
  return map;
}

export function titlesFromFeedXml(xml, localMap = titlesFromLocalPosts()) {
  const map = { ...localMap };
  if (!xml || typeof DOMParser === 'undefined') return map;
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) return map;
  doc.querySelectorAll('item').forEach((item) => {
    const title = (item.querySelector('title')?.textContent || '').trim();
    const slug = slugifyTitle(title);
    if (slug && !map[slug]) map[slug] = title;
  });
  return map;
}

let cached = null;
let pending = null;

export function peekEssayTitles() {
  return cached;
}

export function loadEssayTitles() {
  if (cached) return Promise.resolve(cached);
  if (pending) return pending;
  const local = titlesFromLocalPosts();
  pending = fetch(blogFeed)
    .then((response) => {
      if (!response.ok) throw new Error('feed');
      return response.text();
    })
    .then((xml) => {
      cached = titlesFromFeedXml(xml, local);
      return cached;
    })
    .catch(() => {
      pending = null;
      return null;
    });
  return pending;
}
