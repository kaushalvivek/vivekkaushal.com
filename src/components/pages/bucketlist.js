import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import bucketListData from '../../static/bucketList.json';

gsap.registerPlugin(ScrollTrigger);

const BucketList = () => {
  const rootRef = useRef(null);
  const total = bucketListData.items.length;
  const done = bucketListData.items.filter((i) => i.checked).length;
  const pct = Math.round((done / total) * 100);

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

      const bar = rootRef.current.querySelector('[data-progress-bar]');
      if (bar) {
        gsap.fromTo(
          bar,
          { width: '0%' },
          { width: `${pct}%`, duration: 1.4, delay: 0.4, ease: 'power3.out' }
        );
      }

      const cells = rootRef.current.querySelectorAll('.goal');
      gsap.set(cells, { opacity: 0, y: 10 });
      ScrollTrigger.batch(cells, {
        start: 'top 92%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.015,
          }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, [pct]);

  return (
    <div ref={rootRef}>
      <div className="col">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Life List</span>
            <span className="bar" />
            <span className="smallcaps">{done} of {total}</span>
          </div>
          <h1 className="page-title">
            A list, <em>in progress.</em>
          </h1>
          <p className="page-intro">
            Borrowed from Chip Huyen's{' '}
            <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer">List 100</a>.
            Writing it down in public keeps me honest about which items I'm really
            chasing and which I've outgrown.
          </p>

          <div className="progress">
            <div className="progress-label">
              <span className="smallcaps">Progress</span>
              <span className="smallcaps mark">{pct}%</span>
            </div>
            <div className="progress-track">
              <div data-progress-bar className="progress-fill" />
            </div>
          </div>
        </div>

        <div className="goals-grid">
          {bucketListData.items.map((item, i) => (
            <div key={i} className={`goal ${item.checked ? 'done' : ''}`}>
              <span className="mark">{item.checked ? '✓' : String(i + 1).padStart(2, '0')}</span>
              <span className="goal-text">{item.goal}</span>
              {item.state && <span className="goal-state">{item.state}</span>}
            </div>
          ))}
        </div>

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
};

export default BucketList;
