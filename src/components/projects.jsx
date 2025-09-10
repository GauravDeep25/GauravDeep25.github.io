import React from 'react';
import './projects.css';

// --- Sample Project Data ---
// You can easily replace this with your own project details.
const projectData = [
  {
    title: "Detectify",
    description: "A fully responsive e-commerce website with features like product filtering, a shopping cart, and a secure checkout process.",
    imageUrl: "https://placehold.co/600x400/64ffda/121212?text=Detectify",
    tech: ["HTML5", "CSS", "JavaScript", "Python", "JSON", "Render"],
    liveUrl: import.meta.env.VITE_DETECTIFY_LIVE_URL || "#",
    githubUrl: import.meta.env.VITE_DETECTIFY_GITHUB_URL || "#",
  },
  {
    title: "Coming Soon",
    description: "Coming soon...",
    imageUrl: "https://placehold.co/600x400/64ffda/121212?text=Coming+Soon",
    tech: ["TBA"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Coming Soon",
    description: "Coming soon...",
    imageUrl: "https://placehold.co/600x400/64ffda/121212?text=Coming+Soon",
    tech: ["TBA"],
    liveUrl: "#",
    githubUrl: "#",
  },
];


const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-container">
                <img src={project.imageUrl} alt={project.title} className="project-image" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">Live Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link secondary">GitHub</a>
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

