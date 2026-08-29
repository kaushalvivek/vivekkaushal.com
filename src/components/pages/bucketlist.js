import React from 'react';
import bucketListData from '../../static/bucketList.json';

const BucketList = () => {
  const total = bucketListData.items.length;
  const done = bucketListData.items.filter((i) => i.checked).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="col">
      <div className="page-head">
        <h1 className="page-title">Life list</h1>
        <p className="page-intro">
          Borrowed from Chip Huyen's{' '}
          <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer">List 100</a>.
          Writing it down in public keeps me honest about which items I'm really
          chasing and which I've outgrown.
        </p>
        <div className="progress">
          <div className="progress-label">
            <span>{done} of {total}</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="goals-grid">
        {bucketListData.items.map((item, i) => (
          <div key={i} className={`goal ${item.checked ? 'done' : ''}`}>
            <span className="mark">{item.checked ? '✓' : '·'}</span>
            <span className="goal-text">{item.goal}</span>
            {item.state && <span className="goal-state">{item.state}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BucketList;
