import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-CS6915DZ38';

const isValidId = (id) => typeof id === 'string' && /^G-[A-Z0-9]+$/.test(id);

const GATracker = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!isValidId(GA_MEASUREMENT_ID)) return;
    if (initialized.current) return;
    initialized.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!isValidId(GA_MEASUREMENT_ID)) return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

export default GATracker;
