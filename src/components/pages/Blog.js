import React from 'react';
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
import BlogPost from './BlogPost';
import essays from '../../static/essays.json';

const BlogList = () => (
  <div className="col">
    <div className="page-head">
      <h1 className="page-title">Essays</h1>
      <p className="page-intro">On building, paying attention, and life as I find it.</p>
    </div>

    <div className="essay-list">
      {essays.map((essay) => (
        <RouterLink key={essay.slug} to={`/blog/${essay.slug}`} className="essay-row">
          <div className="essay-title">{essay.title}</div>
          <div className="essay-excerpt">{essay.description}</div>
          <div className="essay-date">
            {new Date(essay.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </div>
        </RouterLink>
      ))}
    </div>
  </div>
);

const Blog = () => (
  <Routes>
    <Route path="/" element={<BlogList />} />
    <Route path=":slug" element={<BlogPost />} />
  </Routes>
);

export default Blog;
