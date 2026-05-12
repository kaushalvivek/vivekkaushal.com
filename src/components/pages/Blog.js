import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import blogFeed from '../../static/blog-feed.xml';
import BlogPost from './BlogPost';

gsap.registerPlugin(ScrollTrigger);

const stripHtml = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const BlogList = ({ posts }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const head = rootRef.current.querySelectorAll('.page-head > *');
      gsap.from(head, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      });

      const rows = rootRef.current.querySelectorAll('.essay-row');
      gsap.set(rows, { opacity: 0, y: 18 });
      ScrollTrigger.batch(rows, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.06,
          }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, [posts.length]);

  return (
    <div ref={rootRef}>
      <div className="col">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Essays</span>
            <span className="bar" />
            <span className="smallcaps">{posts.length} pieces</span>
          </div>
          <h1 className="page-title">
            An archive of <em>essays.</em>
          </h1>
          <p className="page-intro">
            On building, paying attention, and life as I find it. Posted
            when a thought has earned it — no schedule.{' '}
            <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">Subscribe on Substack →</a>
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

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(blogFeed)
      .then((r) => r.text())
      .then((str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
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
      .catch(() => {
        setError('Failed to load posts.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="col">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Essays</span>
            <span className="bar" />
          </div>
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
