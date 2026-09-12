import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/pages/home';
import Projects from './components/pages/projects';
import Research from './components/pages/research';
import Recommendations from './components/pages/recommendations';
import Blog from './components/pages/Blog';
import Talk from './components/pages/talk';
import My404 from './components/pages/my404';
import ExternalRedirect from './components/ExternalRedirect';
import GATracker from './components/gaTracker';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <Router>
    <GATracker />
    <ScrollToTop />
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/books" element={<Recommendations />} />
          <Route path="/bucketlist" element={<Navigate to="/" replace />} />
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/hack" element={<Navigate to="/blog" replace />} />
          <Route path="/meet" element={<ExternalRedirect to="https://calendly.com/vikaushal/30-min" />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="*" element={<My404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
