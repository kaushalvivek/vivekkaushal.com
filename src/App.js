import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/pages/home';
import Projects from './components/pages/projects';
import Research from './components/pages/research';
import Recommendations from './components/pages/recommendations';
import BucketList from './components/pages/bucketlist';
import Blog from './components/pages/Blog';
import My404 from './components/pages/my404';
import theme from './theme';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/bucketlist" element={<BucketList />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/hack" element={<Navigate to="/blog" replace />} />
            <Route path="/meet" element={<Navigate to="https://calendly.com/vikaushal/30-min" replace />} />
            <Route path="*" element={<Navigate to="/blog" replace />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
