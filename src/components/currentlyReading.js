import React from 'react';
import currentlyReading from '../static/currentlyReading.json';

const CurrentlyReading = () => (
  <div className="books-grid">
    {currentlyReading.map((b) => (
      <div key={b.book} className="book-tile">
        <div className="t">{b.book}</div>
        <div className="a">{b.author}</div>
      </div>
    ))}
  </div>
);

export default CurrentlyReading;
