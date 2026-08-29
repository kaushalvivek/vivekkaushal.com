import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogFeed from '../../static/blog-feed.xml';
import avatar from '../../static/avatar.jpg';

const stripHtml = (s) => {
  const t = document.createElement('textarea');
  t.innerHTML = s.replace(/<[^>]+>/g, '');
  return t.value.replace(/\s+/g, ' ').trim();
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(blogFeed)
      .then((r) => {
        if (!r.ok) throw new Error(`Feed request failed (${r.status})`);
        return r.text();
      })
      .then((str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
        if (doc.querySelector('parsererror')) {
          throw new Error('Feed XML is invalid');
        }
        const items = Array.from(doc.querySelectorAll('item'));
        const mapped = items.slice(0, 5).map((item) => {
          const title = item.querySelector('title')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent;
          const description = item.querySelector('description')?.textContent || '';
          const date = pubDate ? new Date(pubDate) : new Date();
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return { title, slug, date, excerpt: stripHtml(description).slice(0, 160) };
        });
        setPosts(mapped);
      })
      .catch((err) => setError(err.message || 'Failed to load essays.'));
  }, []);

  return (
    <div className="col">
      <div className="hero">
        <div className="hero-top">
          <div className="hero-text">
            <p className="hero-bio">
              I lead product at{' '}
              <a href="https://enterpret.com" target="_blank" rel="noreferrer">Enterpret</a>.
            </p>
            <p className="hero-sub">
              I studied computer science, engineering, and cognitive neuroscience. I spent a few years on backend systems, then moved into product.
            </p>
            <p className="hero-sub">
              I brew my own coffee, and enjoy progressive rock music.
            </p>
          </div>
          <figure className="hero-portrait">
            <img src={avatar} alt="Vivek Kaushal" />
          </figure>
        </div>
      </div>

      <h2 className="section-title">Essays</h2>
      {error && <p className="muted">{error}</p>}
      <div className="essay-list">
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
      </div>
      <Link to="/blog" className="more">All essays</Link>
    </div>
  );
};

export default Home;
