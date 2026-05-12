import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/pages/home';
import Projects from './components/pages/projects';
import Research from './components/pages/research';
import Recommendations from './components/pages/recommendations';
import BucketList from './components/pages/bucketlist';
import Blog from './components/pages/Blog';
import Talk from './components/pages/talk';
import My404 from './components/pages/my404';
import ExternalRedirect from './components/ExternalRedirect';
import GATracker from './components/gaTracker';

gsap.registerPlugin(ScrollTrigger);

const RouteFrame = ({ children }) => {
  const location = useLocation();
  const wrapRef = useRef(null);
  const firstRef = useRef(true);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    requestAnimationFrame(() => ScrollTrigger.refresh());

    if (wrapRef.current) {
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  return (
    <div ref={wrapRef} key={location.pathname} className="route-frame">
      {children}
    </div>
  );
};

const App = () => (
  <Router>
    <GATracker />
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <RouteFrame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/books" element={<Recommendations />} />
            <Route path="/bucketlist" element={<BucketList />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/hack" element={<Navigate to="/blog" replace />} />
            <Route path="/meet" element={<ExternalRedirect to="https://calendly.com/vikaushal/30-min" />} />
            <Route path="/talk" element={<Talk />} />
            <Route path="*" element={<My404 />} />
          </Routes>
        </RouteFrame>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
