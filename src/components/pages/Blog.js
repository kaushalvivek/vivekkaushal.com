import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
import blogFeed from '../../static/blog-feed.xml';
import BlogPost from './BlogPost';

const stripHtml = (s) => {
  const t = document.createElement('textarea');
  t.innerHTML = s.replace(/<[^>]+>/g, '');
  return t.value.replace(/\s+/g, ' ').trim();
};

const BlogList = ({ posts }) => (
  <div className="col">
    <div className="page-head">
      <h1 className="page-title">Essays</h1>
      <p className="page-intro">
        On building, paying attention, and life as I find it.{' '}
        <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">Subscribe on Substack</a>
      </p>
    </div>

    <div className="essay-list">
      {posts.map((post) => (
        <RouterLink
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="essay-row"
        >
          <div className="essay-date">
            {post.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </div>
          <div>
            <div className="essay-title">{post.title}</div>
            <div className="essay-excerpt">{stripHtml(post.description).slice(0, 240)}</div>
          </div>
        </RouterLink>
      ))}
    </div>
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

        const mapped = items.map((item) => {
          const title = item.querySelector('title')?.textContent || 'Untitled';
          const content =
            item.querySelector('content\\:encoded')?.textContent ||
            item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent ||
            item.querySelector('description')?.textContent ||
            '';
          const cleanContent = content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
          const link = item.querySelector('link')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent;
          const date = pubDate ? new Date(pubDate) : new Date();
          const description = item.querySelector('description')?.textContent || '';
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          return {
            title,
            content: cleanContent,
            link,
            date,
            slug,
            description: description.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, ''),
          };
        });

        setPosts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load posts.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="col">
        <div className="page-head">
          <p className="page-intro">Loading essays…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col">
        <div className="page-head">
          <p className="page-intro">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<BlogList posts={posts} />} />
      <Route path=":slug" element={<BlogPost posts={posts} />} />
    </Routes>
  );
};

export default Blog;
