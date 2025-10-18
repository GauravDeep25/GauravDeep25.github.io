import React from 'react';
import './projects.css';

// --- Sample Project Data ---
// You can easily replace this with your own project details.
const projectData = [
  {
    title: "TicketSphere",
    description: "A fully responsive online ticket selling/buying platform. Youo can sell/buy tickets of various events verified by an admin. Built with a modern tech stack to ensure a seamless user experience.",
    imageUrl: "https://placehold.co/600x400/3366ff/FFFFFF?text=TicketSphere",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://ticketsphere-frontend.onrender.com",
    githubUrl: "#",
  },
  {
    title: "Auto Pro E-commerce",
    description: "A fully functional e-commerce platform with features like product listings, shopping cart, and user authentication and also equipped with payment gateway integration & appointment scheduling.",
    imageUrl: "https://placehold.co/600x400/64ffda/121212?text=Upcoming+Project",
    tech: ["React", "Vite", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
  },
  /*{
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my skills and projects, built with a mobile-first approach and a clean, modern design.",
    imageUrl: "https://placehold.co/600x400/212529/FFFFFF?text=Project+3",
    tech: ["React", "CSS3", "Responsive Design"],
    liveUrl: "#",
    githubUrl: "#",
  },*/
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

