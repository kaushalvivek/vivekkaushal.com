import React from 'react';

const papers = [
  {
    title: "Clickbait's Impact on Visual Attention — An Eye Tracker Study",
    link: 'https://escholarship.org/uc/item/8w80h7jp',
    year: '2022',
    venue: 'CogSci 2022',
  },
  {
    title: 'Clickbait — Credibility, Visual Attention, Propensity and Proliferation',
    link: 'https://web2py.iiit.ac.in/research_centres/publications/view_publication/mastersthesis/1026',
    year: '2021',
    venue: 'MS Thesis, IIIT-Hyderabad',
  },
  {
    title: 'Clickbait — Trust and Credibility of Digital News',
    link: 'https://ieeexplore.ieee.org/abstract/document/9405359',
    year: '2021',
    venue: 'IEEE Transactions on Technology and Society',
  },
  {
    title: 'Clickbait in Hindi News Media',
    link: 'https://aclanthology.org/2020.icon-main.11.pdf',
    year: '2020',
    venue: 'ICON 2020',
  },
  {
    title: 'Investigating Academic Performance and Financial Risk-Taking',
    link: 'https://www.researchgate.net/profile/Vivek-Kaushal-3/publication/345156547_Investigating_Academic_Performance_and_Financial_Risk-Taking/links/5f9fa924a6fdccfd7b948b85/Investigating-Academic-Performance-and-Financial-Risk-Taking.pdf',
    year: '2019',
    venue: 'ACCS 2019',
  },
];

const conferences = [
  'Session Chair · 44th Annual Meeting of the Cognitive Science Society (CogSci 2022) — Full Paper',
  "International Conference on Natural Language Processing (ICON'20), IIT Patna — Paper",
  "IEEE International Symposium on Technology and Society (ISTAS'20) — Extended Abstract",
  '6th Annual Conference of the Association for Cognitive Sciences in India (ACCS 2019) — Poster',
  'Foundation of Utility and Risk Conference, University of York, UK (2018) — Poster',
];

const links = [
  { title: 'Research Resume', link: 'https://drive.google.com/file/d/1Y0A-_eBY-tySBg82vUveCIcCU8T3-LXx/view?usp=sharing' },
  { title: 'Google Scholar', link: 'https://scholar.google.co.in/citations?user=juZg-YcAAAAJ&hl=en' },
  { title: 'ResearchGate', link: 'https://www.researchgate.net/profile/Vivek-Kaushal-3' },
  { title: 'Published Datasets', link: 'https://kaggle.com/kaushalvivek/datasets' },
];

const Research = () => (
  <div className="col">
    <div className="page-head">
      <h1 className="page-title">Research</h1>
      <p className="page-intro">
        I spent the early part of my career studying{' '}
        <a href="https://en.wikipedia.org/wiki/Clickbait" target="_blank" rel="noreferrer">clickbait</a>
        {' '}— how it spreads, whether people trust it, and what it does to attention.
        Eye-tracking studies and news-credibility experiments with Dr. Kavita Vemuri
        at IIIT Hyderabad; demographic work on consumer choice with Dr. Hendrik
        Rommeswinkel at NTU Taiwan; behavioral experiments with Dr. Prithviraj
        Mukherjee at IIM Bangalore.
      </p>
    </div>

    <h2 className="section-title">Papers</h2>
    {papers.map((p) => (
      <a
        key={p.title}
        href={p.link}
        target="_blank"
        rel="noreferrer"
        className="citation"
      >
        <span className="c-year">{p.year}</span>
        <span className="c-title">{p.title}</span>
        <span className="c-venue">{p.venue}</span>
      </a>
    ))}

    <h2 className="section-title">Conferences</h2>
    <ul className="plain-list">
      {conferences.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>

    <h2 className="section-title">Elsewhere</h2>
    <ul className="link-list">
      {links.map((l) => (
        <li key={l.title}>
          <a href={l.link} target="_blank" rel="noreferrer">{l.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Research;
