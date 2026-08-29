import React from 'react';

const ELSEWHERE = [
  { name: 'Substack', url: 'https://vivekkaushal.substack.com' },
  { name: 'X', url: 'https://x.com/vi_kaushal' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/kaushalvivek/' },
  { name: 'GitHub', url: 'https://github.com/kaushalvivek' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="col footer">
        <span>© {year} Vivek Kaushal</span>
        <div className="footer-links">
          {ELSEWHERE.map((l) => (
            <a key={l.name} href={l.url} target="_blank" rel="noreferrer">
              {l.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
