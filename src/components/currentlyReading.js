import React from 'react';
import { Link } from 'react-router-dom';
import currentlyReading from '../static/currentlyReading.json';

const CurrentlyReading = ({ variant = 'tiles' }) => {
  if (variant === 'rows') {
    return (
      <div className="essay-list">
        {currentlyReading.map((b) => (
          <Link key={b.book} to="/books" className="essay-row">
            <div className="essay-date" />
            <div>
              <div className="essay-title">{b.book}</div>
              <div className="essay-excerpt">{b.author}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="books-grid">
      {currentlyReading.map((b) => (
        <div key={b.book} className="book-tile">
          <div className="t">{b.book}</div>
          <div className="a">{b.author}</div>
        </div>
      ))}
    </div>
  );
};

export default CurrentlyReading;
