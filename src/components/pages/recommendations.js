import React, { useState, useMemo } from 'react';
import nonFiction from '../../static/nonFiction.json';

const Recommendations = () => {
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

  return (
    <div className="col">
      <div className="page-head">
        <h1 className="page-title">Reading</h1>
        <p className="page-intro">Non-fiction I keep coming back to.</p>
      </div>

      <div className="tag-bar">
        <button
          type="button"
          className={`tag-chip ${selectedTag === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTag('all')}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            type="button"
            key={t}
            className={`tag-chip ${selectedTag === t ? 'active' : ''}`}
            onClick={() => setSelectedTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="books-grid">
        {filtered.map((b) => (
          <div key={b.book} className="book-tile">
            <div className="t">{b.book}</div>
            <div className="a">{b.author}</div>
            <div className="tag">{b.tags[0]}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="muted">Nothing under this tag.</p>
      )}
    </div>
  );
};

export default Recommendations;
