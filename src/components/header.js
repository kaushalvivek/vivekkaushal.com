import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme';

const NAV = [
  { to: '/blog', label: 'Essays' },
  { to: '/projects', label: 'Work' },
  { to: '/books', label: 'Reading' },
  { to: '/bucketlist', label: 'Life List' },
  { to: '/research', label: 'Research' },
  { to: '/talk', label: 'Contact' },
];

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      className="theme-btn"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
};

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
            Vivek <em>Kaushal</em>
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
            <ThemeToggle />
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
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
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
        <div style={{ marginTop: 24 }}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default Header;
