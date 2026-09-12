import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { to: '/blog', label: 'Essays' },
  { to: '/books', label: 'Reading' },
  { to: '/research', label: 'Research' },
  { to: '/talk', label: 'Contact' },
];

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <>
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
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </header>
      {open && (
        <div className="mobile-menu open">
          <div className="col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={isActive(item.to) ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
