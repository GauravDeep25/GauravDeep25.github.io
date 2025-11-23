import React from 'react';
import './projects.css';
import { useContent } from '../context/ContentContext.jsx';

const Projects = () => {
  const { content } = useContent();
  const projectData = content?.projects || [];

  // Helper to generate a deterministic color gradient based on string
  const stringToGradient = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c1 = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    const c2 = ((hash * 2) & 0x00FFFFFF).toString(16).toUpperCase();
    return `linear-gradient(135deg, #${"00000".substring(0, 6 - c1.length) + c1}40, #${"00000".substring(0, 6 - c2.length) + c2}40)`;
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div key={project.id || index} className="project-card">
              <div
                className="project-image-placeholder"
                style={{ background: stringToGradient(project.title) }}
              >
                <span className="project-placeholder-title">{project.title}</span>
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
