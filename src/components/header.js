import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { to: '/blog', label: 'Essays' },
  { to: '/books', label: 'Reading' },
  { to: '/research', label: 'Research' },
  { to: '/talk', label: 'Contact' },
];

const Header = () => {
  const { pathname } = useLocation();
  const isActive = (to) => pathname === to || pathname.startsWith(to + '/');

  return (
    <header className="nav">
      <div className="col nav-inner">
        <Link to="/" className="brand" aria-label="Vivek Kaushal — home">
          Vivek Kaushal
        </Link>
        <nav className="nav-links">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
