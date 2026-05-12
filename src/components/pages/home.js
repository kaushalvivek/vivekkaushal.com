import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import blogFeed from '../../static/blog-feed.xml';
import projectsData from '../../static/projects.json';
import bucketListData from '../../static/bucketList.json';
import nonFictionData from '../../static/nonFiction.json';
import avatar from '../../static/avatar.jpg';
import { prefersReducedMotion } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_BOOKS = [
  'The Courage to be Disliked',
  'The Molecule of More',
  'Finite and Infinite Games',
  'Steve Jobs',
  'Shoe Dog',
];

const monthYear = (d) =>
  d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const stripHtml = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const Home = () => {
  const rootRef = useRef(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(blogFeed)
      .then((r) => r.text())
      .then((str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        const mapped = items.slice(0, 4).map((item) => {
          const title = item.querySelector('title')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent;
          const description = item.querySelector('description')?.textContent || '';
          const date = pubDate ? new Date(pubDate) : new Date();
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return { title, slug, date, excerpt: stripHtml(description).slice(0, 160) };
        });
        setPosts(mapped);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const heroLines = rootRef.current.querySelectorAll('[data-hero-line]');
      const heroRule = rootRef.current.querySelector('[data-hero-rule]');
      const heroSigLeft = rootRef.current.querySelector('[data-hero-sig-left]');
      const heroSigRight = rootRef.current.querySelector('[data-hero-sig-right]');
      const heroPortrait = rootRef.current.querySelector('[data-hero-portrait]');
      const heroPortraitImg = heroPortrait ? heroPortrait.querySelector('img') : null;

      if (heroLines.length) gsap.set(heroLines, { opacity: 0, y: 22 });
      if (heroSigLeft) gsap.set(heroSigLeft, { opacity: 0, y: 8 });
      if (heroSigRight) gsap.set(heroSigRight, { opacity: 0, y: 8 });
      if (heroPortrait) gsap.set(heroPortrait, { clipPath: 'inset(0% 0% 100% 0%)' });
      if (heroPortraitImg) gsap.set(heroPortraitImg, { scale: 1.1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: reduced ? 0 : 0.15,
      });

      if (heroPortrait) {
        tl.to(heroPortrait, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: reduced ? 0.01 : 1.25,
          ease: 'expo.out',
        }, 0);
      }

      if (heroPortraitImg) {
        tl.to(heroPortraitImg, {
          scale: 1,
          duration: reduced ? 0.01 : 1.8,
          ease: 'power3.out',
        }, 0);
      }

      if (heroLines.length) {
        tl.to(heroLines, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : 0.95,
          stagger: reduced ? 0 : 0.3,
        }, 0.1);
      }

      if (heroRule) {
        tl.to(heroRule, {
          scaleX: 1,
          duration: reduced ? 0.01 : 0.9,
          ease: 'expo.out',
        }, '-=0.4');
      }

      if (heroSigLeft) {
        tl.to(heroSigLeft, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : 0.55,
        }, '-=0.5');
      }

      if (heroSigRight) {
        tl.to(heroSigRight, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : 0.55,
        }, '-=0.45');
      }

      rootRef.current.querySelectorAll('[data-reveal-section]').forEach((section) => {
        const targets = section.querySelectorAll('[data-reveal]');
        if (!targets.length) return;
        gsap.set(targets, { opacity: 0, y: 18 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          once: true,
          onEnter: () =>
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.06,
            }),
        });
      });

      document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = projectsData.projects.slice(0, 4);
  const featuredBooks = FEATURED_BOOKS
    .map((title) => nonFictionData.find((b) => b.book === title))
    .filter(Boolean);
  const goals = bucketListData.items.slice(0, 8);
  const goalsDone = bucketListData.items.filter((i) => i.checked).length;
  const goalsTotal = bucketListData.items.length;
  const now = new Date();

  return (
    <div ref={rootRef}>
      {/* ============ HERO ============ */}
      <div className="col">
        <div className="hero-stage">
          <div className="hero-top">
            <div className="hero-text">
              <h1 className="hero-bio">
                <span className="hero-sentence" data-hero-line>
                  I lead the Agents product at{' '}
                  <a href="https://enterpret.com" target="_blank" rel="noreferrer">Enterpret</a>.
                </span>
              </h1>

              <p className="hero-sub">
                <span className="hero-sentence" data-hero-line>
                  I studied computer science, engineering, and cognitive neuroscience. After engineering backend systems for some time, I gravitated towards identifying and shaping products.
                </span>
              </p>

              <p className="hero-sub">
                <span className="hero-sentence" data-hero-line>
                  I build every day. I find joy in the zero-to-one product journey.
                </span>
              </p>
            </div>

            <figure className="hero-portrait" data-hero-portrait>
              <img src={avatar} alt="Vivek Kaushal" />
            </figure>
          </div>

          <div className="hero-signature">
            <span className="hairline-rule" data-hero-rule />
            <div className="hero-sig-left" data-hero-sig-left>
              <span className="byline">Vivek Kaushal</span>
              <span className="dateline">{monthYear(now)}</span>
            </div>
            <a
              data-hero-sig-right
              href="https://vivekkaushal.substack.com"
              target="_blank"
              rel="noreferrer"
              className="subscribe-link"
            >
              New essays by email →
            </a>
          </div>
        </div>
      </div>

      {/* ============ WRITING ============ */}
      <section className="col section" data-reveal-section>
        <div className="section-head">
          <div className="section-kicker">01 — Writing</div>
          <div>
            <h2 className="section-title" data-reveal>
              Recent <em>essays.</em>
            </h2>
            <p className="section-lede" data-reveal>
              On building, paying attention, and life as I find it.
              Archive at <Link to="/blog" className="link-accent">essays</Link>.
            </p>
          </div>
        </div>

        <div className="essay-list" data-reveal>
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="essay-row">
              <div className="essay-date">
                {p.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
              </div>
              <div>
                <div className="essay-title">{p.title}</div>
                <div className="essay-excerpt">{p.excerpt}</div>
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="prose-s" style={{ padding: '20px 0' }}>Loading…</div>
          )}
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="col section" data-reveal-section>
        <div className="section-head">
          <div className="section-kicker">02 — Projects</div>
          <div>
            <h2 className="section-title" data-reveal>
              Small <em>experiments.</em>
            </h2>
            <p className="section-lede" data-reveal>
              Side-projects and public tools. Most are open source.
              Archive at <Link to="/projects" className="link-accent">work</Link>.
            </p>
          </div>
        </div>

        <div className="piece-list" data-reveal>
          {featuredProjects.map((p, i) => {
            const href = p.appLink || p.codeLink || p.blogLink;
            const external = href && href.startsWith('http');
            const Tag = href ? (external ? 'a' : Link) : 'div';
            const linkProps = href ? (external ? { href, target: '_blank', rel: 'noreferrer' } : { to: href }) : {};
            return (
              <Tag key={p.name} className="piece" {...linkProps}>
                <span className="piece-num">No. {String(i + 1).padStart(2, '0')}</span>
                <span className="piece-name">{p.name}</span>
                <span className="piece-desc">{p.description}</span>
                <span className="piece-date">{p.date}</span>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* ============ READING ============ */}
      <section className="col section" data-reveal-section>
        <div className="section-head">
          <div className="section-kicker">03 — Reading</div>
          <div>
            <h2 className="section-title" data-reveal>
              My favorite <em>books.</em>
            </h2>
            <p className="section-lede" data-reveal>
              Non-fiction I keep coming back to.
            </p>
          </div>
        </div>

        <div className="books-grid" data-reveal>
          {featuredBooks.map((b) => (
            <div key={b.book} className="book-tile">
              <div>
                <div className="t">{b.book}</div>
                <div className="a">{b.author}</div>
              </div>
              <div className="tag">{b.tags[0]}</div>
            </div>
          ))}
        </div>

        <div className="section-cta" data-reveal>
          <Link to="/books" className="see-more">More recommendations →</Link>
        </div>
      </section>

      {/* ============ LIFE LIST ============ */}
      <section className="col section" data-reveal-section>
        <div className="section-head">
          <div className="section-kicker">04 — Life List</div>
          <div>
            <h2 className="section-title" data-reveal>
              A list, <em>in progress.</em>
            </h2>
            <p className="section-lede" data-reveal>
              Borrowed from Chip Huyen's <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer">List 100</a>.
              <strong> {goalsDone}</strong> of {goalsTotal} done.
              Full list at <Link to="/bucketlist" className="link-accent">life list</Link>.
            </p>
          </div>
        </div>

        <div className="goals-grid" data-reveal>
          {goals.map((item, i) => (
            <div key={i} className={`goal ${item.checked ? 'done' : ''}`}>
              <span className="mark">{item.checked ? '✓' : String(i + 1).padStart(2, '0')}</span>
              <span className="goal-text">{item.goal}</span>
              {item.state && <span className="goal-state">{item.state}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="col section tight" data-reveal-section>
        <div className="section-head">
          <div className="section-kicker">05 — Contact</div>
          <div>
            <h2 className="section-title" data-reveal>
              Write to <em>me.</em>
            </h2>
            <p className="section-lede" data-reveal>
              For collaborations, questions, or a hello.
            </p>
            <div style={{ marginTop: 28 }} data-reveal>
              <Link to="/talk" className="btn">Email</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
