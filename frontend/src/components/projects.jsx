import React from 'react';
import './projects.css';
import { useContent } from '../context/ContentContext.jsx';

const Projects = () => {
  const { content } = useContent();
  const projectData = content?.projects || [];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div key={project.id || index} className="project-card">
              <div className="project-image-container">
                <img src={project.image_url} alt={project.title} className="project-image" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {(Array.isArray(project.tech) ? project.tech : (project.tech_stack ? project.tech_stack.split(', ') : [])).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.project_url || project.live_url} target="_blank" rel="noopener noreferrer" className="project-link primary">Live Demo</a>
                  <a href={project.code_url || project.github_url} target="_blank" rel="noopener noreferrer" className="project-link secondary">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

