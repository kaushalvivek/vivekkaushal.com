import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import nonFiction from '../../static/nonFiction.json';

gsap.registerPlugin(Flip);

const Recommendations = () => {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const flipStateRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = useMemo(() => {
    const t = new Set();
    nonFiction.forEach((b) => b.tags.forEach((x) => t.add(x)));
    return Array.from(t).sort();
  }, []);

  const filtered = useMemo(() => {
    if (selectedTag === 'all') return nonFiction;
    return nonFiction.filter((b) => b.tags.includes(selectedTag));
  }, [selectedTag]);

  const handleTagChange = (tag) => {
    if (tag === selectedTag) return;
    if (gridRef.current) {
      flipStateRef.current = Flip.getState(gridRef.current.querySelectorAll('.book-tile'));
    }
    setSelectedTag(tag);
  };

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

      const tiles = rootRef.current.querySelectorAll('.book-tile');
      gsap.from(tiles, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: 'power2.out',
        stagger: { each: 0.015, from: 'start' },
        delay: 0.25,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!flipStateRef.current) return;
    Flip.from(flipStateRef.current, {
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.015,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.25, ease: 'power2.in' }),
    });
    flipStateRef.current = null;
  }, [selectedTag]);

  return (
    <div ref={rootRef}>
      <div className="col">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Reading</span>
            <span className="bar" />
            <span className="smallcaps">{nonFiction.length} on the shelf</span>
          </div>
          <h1 className="page-title">
            Favourite non-fiction.
          </h1>
          <p className="page-intro">
            The books I'll recommend.
          </p>
        </div>

        <div className="tag-bar">
          <button
            type="button"
            className={`tag-chip ${selectedTag === 'all' ? 'active' : ''}`}
            onClick={() => handleTagChange('all')}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              type="button"
              key={t}
              className={`tag-chip ${selectedTag === t ? 'active' : ''}`}
              onClick={() => handleTagChange(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="books-grid" ref={gridRef}>
          {filtered.map((b) => (
            <div key={b.book} className="book-tile" data-flip-id={b.book}>
              <div>
                <div className="t">{b.book}</div>
                <div className="a">{b.author}</div>
              </div>
              <div className="tag">{b.tags[0]}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="prose-m" style={{ marginTop: 24, color: 'var(--ink-muted)' }}>
            Nothing on the shelf under this tag. Try another.
          </p>
        )}

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
};

export default Recommendations;
