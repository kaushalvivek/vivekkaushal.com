import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogFeed from '../../static/blog-feed.xml';
import localPosts from '../../static/localPosts';

const toSlug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const CONTACT = [
  { name: 'X', url: 'https://x.com/kaushalvivek' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/kaushalvivek/' },
  { name: 'GitHub', url: 'https://github.com/kaushalvivek' },
  { name: 'Substack', url: 'https://vivekkaushal.substack.com' },
];

const TOOLS = [
  { name: 'Feedback Bench', url: 'https://feedbackbench.com', note: 'A public ranking of AI agents by what their users say.' },
  { name: 'Control Panel', url: 'https://control-panel-ivory.vercel.app', note: 'Everything on your Linear plate, on one screen.' },
  { name: 'hn-cli', url: '/hn-cli/', note: 'Hacker News in your terminal.' },
  { name: 'htmlz', url: 'https://github.com/kaushalvivek/htmlz', note: 'A self-hosted home for the HTML your AI agents make.' },
  { name: 'AI Progress Today', url: 'https://github.com/kaushalvivek/ai-progress-today', note: 'A tracker for AI progress.' },
  { name: 'pom', url: 'https://github.com/kaushalvivek/pom', note: 'A pomodoro timer for the terminal.' },
];

const TALKS = [
  {
    name: 'What Great Looks Like at Every Stage of the New Product Development Cycle',
    url: 'https://www.youtube.com/watch?v=Jj2T-YX6zIM',
    note: 'ProductCon SF, October 2026',
  },
  {
    name: 'How Canva, Notion and Wispr Flow Are Automating the Feedback-to-Fix Loop',
    url: 'https://world.productledalliance.com/location/popssanfrancisco/speaker/vivekkaushal',
    note: 'Product Operations Summit, September 2026',
  },
];

const MORE = [
  { name: 'Research', to: '/research', note: 'Papers on clickbait, trust, and visual attention.' },
  { name: 'Reading', to: '/books', note: 'Books I recommend.' },
];

const external = (url) => (url.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {});

const Entry = ({ name, note }) => (
  <>
    <span className="essay-title">{name}</span>
    <span className="home-note">{note}</span>
  </>
);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(blogFeed)
      .then((r) => {
        if (!r.ok) throw new Error(`Feed request failed (${r.status})`);
        return r.text();
      })
      .then((str) => {
        const doc = new DOMParser().parseFromString(str, 'text/xml');
        if (doc.querySelector('parsererror')) {
          throw new Error('Feed XML is invalid');
        }
        const fromFeed = Array.from(doc.querySelectorAll('item')).map((item) => {
          const title = item.querySelector('title')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent;
          return { title, date: pubDate ? new Date(pubDate) : new Date() };
        });
        const local = localPosts.map((p) => ({ title: p.title, date: new Date(p.date) }));
        setPosts([...local, ...fromFeed].sort((a, b) => b.date - a.date).slice(0, 6));
      })
      .catch((err) => setError(err.message || 'Failed to load essays.'));
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>Vivek Kaushal</h1>
        <p>
          I lead product at{' '}
          <a href="https://enterpret.com" target="_blank" rel="noreferrer">Enterpret</a>.
          I studied computer science, engineering, and cognitive neuroscience. I built
          engineering systems for start-ups before I moved my focus to product. I still build.
        </p>
        <p>
          I brew my own coffee and write. If you listen to alternative rock, we can probably be
          friends.
        </p>
        <p className="home-contact">
          <Link to="/talk">Contact</Link>
          {CONTACT.map((l) => (
            <a key={l.name} href={l.url} target="_blank" rel="noreferrer">{l.name}</a>
          ))}
        </p>
      </div>

      <div>
        <h2>Essays</h2>
        {error && <p className="muted">{error}</p>}
        <ul>
          {posts.map((p) => (
            <li key={p.title}>
              <Link to={`/blog/${toSlug(p.title)}`}>
                <Entry
                  name={p.title}
                  note={p.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                />
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/blog" className="home-all">All essays</Link>
      </div>

      <div data-placement="home_tinkering">
        <h2>Things I built</h2>
        <ul>
          {TOOLS.map((t) => (
            <li key={t.name}>
              <a href={t.url} {...external(t.url)}><Entry {...t} /></a>
            </li>
          ))}
        </ul>
      </div>

      <div className="home-last">
        <div className="home-talks" data-placement="home_talks">
          <h2>Talks</h2>
          <ul>
            {TALKS.map((t) => (
              <li key={t.name}>
                <a href={t.url} {...external(t.url)}><Entry {...t} /></a>
              </li>
            ))}
          </ul>
        </div>
        <h2>More</h2>
        <ul>
          {MORE.map((m) => (
            <li key={m.name}>
              <Link to={m.to}><Entry {...m} /></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
