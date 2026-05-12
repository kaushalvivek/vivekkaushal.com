import React, { useEffect, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import gsap from 'gsap';

const BlogPost = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current || !post) return;
    const ctx = gsap.context(() => {
      const meta = rootRef.current.querySelector('.post-meta');
      const title = rootRef.current.querySelector('.post-title');
      const body = rootRef.current.querySelector('.doc-body');

      if (meta) gsap.from(meta, { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' });
      if (title) gsap.from(title, { opacity: 0, y: 18, duration: 0.9, ease: 'power3.out', delay: 0.08 });
      if (body) gsap.from(body, { opacity: 0, y: 14, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    }, rootRef);
    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <div className="col-read">
        <div className="page-head">
          <p className="page-intro">Post not found.</p>
          <RouterLink to="/blog" className="link-accent">← Back to essays</RouterLink>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef}>
      <div className="col-read">
        <div className="page-head">
          <div className="page-meta post-meta">
            <RouterLink to="/blog" className="smallcaps mark" style={{ color: 'var(--accent)' }}>
              ← Essays
            </RouterLink>
            <span className="bar" />
            <span className="smallcaps">
              {post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="post-title" style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            marginBottom: 16,
          }}>
            {post.title}
          </h1>
        </div>

        <article
          className="doc-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--hair)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer" className="btn">
            Subscribe to new essays
          </a>
          <RouterLink to="/blog" className="btn-ghost">All essays</RouterLink>
        </div>
        <div style={{ height: 80 }} />
      </div>
    </div>
  );
};

export default BlogPost;
