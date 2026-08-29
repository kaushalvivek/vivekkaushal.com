import React from 'react';
import { Link } from 'react-router-dom';

const My404 = () => (
  <div className="col nf">
    <div className="nf-number">404</div>
    <h1 className="nf-msg">Page not found.</h1>
    <p className="muted">
      Writing lives on{' '}
      <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">Substack</a>
      {' '}or at <Link to="/blog">/blog</Link>.
    </p>
    <p style={{ marginTop: 20 }}>
      <Link to="/">Home</Link>
    </p>
  </div>
);

export default My404;
