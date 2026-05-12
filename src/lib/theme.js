import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'op.theme';

const getSystem = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const getInitial = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return getSystem();
};

const applyTheme = (theme, overridden) => {
  const root = document.documentElement;
  if (overridden) {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() =>
    typeof window === 'undefined' ? 'light' : getInitial()
  );
  const [overridden, setOverridden] = useState(() =>
    typeof window !== 'undefined' && !!localStorage.getItem(STORAGE_KEY)
  );

  useEffect(() => {
    applyTheme(theme, overridden);
  }, [theme, overridden]);

  useEffect(() => {
    if (overridden) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [overridden]);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    setOverridden(true);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
};
