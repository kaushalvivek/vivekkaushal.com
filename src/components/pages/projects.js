import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../../static/projects.json';

const Projects = () => (
  <div className="col">
    <div className="page-head">
      <h1 className="page-title">Work</h1>
      <p className="page-intro">
        Side projects, most of them open source. Each one started as a
        question I couldn't answer by reading, so I built something to find out.
      </p>
    </div>

    <div className="piece-list">
      {projectsData.projects.map((p) => {
        const href = p.appLink || p.codeLink || p.blogLink;
        const external = href && href.startsWith('http');
        const Tag = href ? (external ? 'a' : Link) : 'div';
        const linkProps = href ? (external ? { href, target: '_blank', rel: 'noreferrer' } : { to: href }) : {};
        return (
          <Tag key={p.name} className="piece" {...linkProps}>
            <span className="piece-name">{p.name}</span>
            <span className="piece-date">{p.date}</span>
            <span className="piece-desc">{p.description}</span>
          </Tag>
        );
      })}
    </div>
  </div>
);

export default Projects;
