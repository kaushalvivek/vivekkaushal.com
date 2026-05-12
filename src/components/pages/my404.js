import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const My404 = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const num = rootRef.current.querySelector('.nf-number');
      const msg = rootRef.current.querySelector('.nf-msg');
      const rest = rootRef.current.querySelectorAll('.nf-rest > *');

      if (num) gsap.from(num, { opacity: 0, scale: 0.94, duration: 0.9, ease: 'power3.out' });
      if (msg) gsap.from(msg, { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      if (rest.length) {
        gsap.from(rest, {
          opacity: 0,
          y: 12,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.4,
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className="col nf">
        <div className="nf-number">404</div>
        <h1 className="nf-msg">
          That page slipped the <em>press.</em>
        </h1>
        <div className="nf-rest" style={{ marginTop: 32 }}>
          <p className="prose" style={{ color: 'var(--ink-muted)', maxWidth: '44ch' }}>
            If you came looking for the writing, it lives on{' '}
            <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer" className="link-accent">Substack</a>
            {' '}or at <Link to="/blog" className="link-accent">/essays</Link>.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link to="/" className="btn">Back to the front</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default My404;
