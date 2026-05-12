import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import projectsData from '../../static/projects.json';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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

      const pieces = rootRef.current.querySelectorAll('.piece');
      gsap.set(pieces, { opacity: 0, y: 18 });
      ScrollTrigger.batch(pieces, {
        start: 'top 88%',
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
  }, []);

  return (
    <div ref={rootRef}>
      <div className="col">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Work</span>
            <span className="bar" />
            <span className="smallcaps">{projectsData.projects.length} pieces</span>
          </div>
          <h1 className="page-title">
            Small <em>experiments.</em>
          </h1>
          <p className="page-intro">
            Side projects, most of them open source. Each one started as a
            question I couldn't answer by reading, so I built something to find out.
          </p>
        </div>

        <div className="piece-list">
          {projectsData.projects.map((p, i) => {
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

        <div style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="https://github.com/kaushalvivek" target="_blank" rel="noreferrer" className="btn-ghost">
            GitHub →
          </a>
          <Link to="/blog" className="btn-ghost">Writing →</Link>
        </div>

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
};

export default Projects;
