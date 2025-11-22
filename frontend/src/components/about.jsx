import React, { useState } from 'react';
import './about.css';
import { useContent } from '../context/ContentContext.jsx';

const About = () => {
  const [expandedItems, setExpandedItems] = useState([]);
  const { content } = useContent();

  const about = content?.about || {};
  const skills = content?.skills || [];
  const educationData = content?.education || [];

  const toggleExpand = (index) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <p>
              {about.paragraph_1 || "I'm a passionate and results-driven developer with a knack for creating dynamic and user-friendly web applications. With a strong foundation in modern frontend technologies, I specialize in turning complex problems into elegant, interactive solutions."}
            </p>
            <p>
              {about.paragraph_2 || "My journey in tech began with a deep curiosity for how things work, and it has since evolved into a career where I get to build, innovate, and collaborate with amazing people. I'm always eager to learn new skills and take on challenging projects."}
            </p>
          </div>
          <div className="about-skills">
            <h3 className="skills-title">Core Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <span key={skill.id || index} className="skill-tag">{skill.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Education Timeline Section --- */}
        <div className="education-section">
          <h3 className="education-main-title">Educational Journey</h3>
          <p className="timeline-subtitle">My academic path and educational achievements that shaped my technical foundation</p>
          <div className="timeline">
            <div className="timeline-line"></div>
            {educationData.map((edu, index) => {
              const isExpanded = expandedItems.includes(index);
              return (
                <div className="timeline-item education" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="timeline-marker">
                    <div className="timeline-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    </div>
                    <span className="timeline-year">{edu.years || `${edu.start_date} - ${edu.end_date || 'Present'}`}</span>
                  </div>
                  <div className={`timeline-content ${isExpanded ? 'expanded' : ''}`}>
                    <div className="timeline-header">
                      <div className="timeline-header-top">
                        <div className="timeline-title-group">
                          <h4 className="timeline-degree">{edu.degree}</h4>
                          <p className="timeline-university">{edu.institution || edu.university}</p>
                        </div>
                        {(edu.status || edu.end_date) && (
                          <div className="timeline-status">
                            <span className={`status-badge ${(edu.status || (edu.end_date === 'Present' ? 'current' : 'completed')).toLowerCase()}`}>
                              {edu.status || (edu.end_date === 'Present' ? 'Current' : 'Completed')}
                            </span>
                          </div>
                        )}
                      </div>
                      {edu.grade && (
                        <div className="timeline-grade">
                          <span className="grade-label">Grade: </span>
                          <span className="grade-value">{edu.grade}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`timeline-expandable ${isExpanded ? 'expanded' : ''}`}>
                      <p className="timeline-description">{edu.description}</p>
                      {edu.technologies && edu.technologies.length > 0 && (
                        <div className="timeline-technologies">
                          {edu.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      {edu.field_of_study && !edu.technologies && (
                        <div className="timeline-field">
                          <span className="field-tag">{edu.field_of_study}</span>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      className="timeline-toggle-btn" 
                      onClick={() => toggleExpand(index)}
                      aria-label={isExpanded ? "Show less" : "Show more"}
                    >
                      <span>{isExpanded ? "Show Less" : "Read More"}</span>
                      <svg 
                        className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

