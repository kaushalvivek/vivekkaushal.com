import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

const BlogPost = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
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
          {post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <h1 className="post-title">{post.title}</h1>
      </div>

      <article
        className="doc-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="post-end">
        <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">
          Subscribe
        </a>
        {' · '}
        <RouterLink to="/blog">All essays</RouterLink>
      </div>
    </div>
  );
};

export default BlogPost;
