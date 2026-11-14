import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import essays from '../../static/essays.json';

const BlogPost = () => {
  const { slug } = useParams();
  const essay = essays.find((e) => e.slug === slug);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!essay) return undefined;
    let current = true;
    setContent(null);
    setError(null);
    fetch(`/essays/${essay.slug}.html`)
      .then((r) => {
        if (!r.ok) throw new Error(`Essay request failed (${r.status})`);
        return r.text();
      })
      .then((html) => current && setContent(html))
      .catch((err) => current && setError(err.message));
    return () => {
      current = false;
    };
  }, [essay]);

  if (!essay) {
    return (
      <div className="col">
        <div className="page-head">
          <p className="page-intro">Post not found.</p>
          <RouterLink to="/blog">Back to essays</RouterLink>
        </div>
      </div>
    );
  }

  return (
    <div className="col">
      <div className="page-head">
        <div className="post-meta">
          <RouterLink to="/blog">Essays</RouterLink>
          {' · '}
          {new Date(essay.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <h1 className="post-title">{essay.title}</h1>
      </div>

      {error && <p className="muted">{error}</p>}
      {content && <article className="doc-body" dangerouslySetInnerHTML={{ __html: content }} />}

      <div className="post-end">
        <RouterLink to="/blog">All essays</RouterLink>
      </div>
    </div>
  );
};

export default BlogPost;
