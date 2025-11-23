import React from 'react';
import './about.css';
import { useContent } from '../context/ContentContext.jsx';

const About = () => {
  const { content } = useContent();

  const about = content?.about || {};
  const skills = content?.skills || [];
  const educationData = content?.education || [];

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
          <div className="education-timeline">
            <div className="education-timeline-line"></div>
            {educationData.map((edu, index) => {
              return (
                <div className="education-timeline-item" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="education-timeline-marker"></div>
                  <div className="education-card">
                    <div className="education-header">
                      <div className="education-header-main">
                        <h4 className="education-degree">{edu.degree}</h4>
                        <p className="education-institution">{edu.institution || edu.university}</p>
                      </div>
                      <div className="education-meta">
                        <span className="education-year">{edu.years || `${edu.start_date} - ${edu.end_date || 'Present'}`}</span>
                        {(edu.status || edu.end_date) && (
                          <span className={`status-badge ${(edu.status || (edu.end_date === 'Present' || parseInt(edu.end_date) >= new Date().getFullYear() ? 'current' : 'completed')).toLowerCase()}`}>
                            {edu.status || (edu.end_date === 'Present' || parseInt(edu.end_date) >= new Date().getFullYear() ? 'Current' : 'Completed')}
                          </span>
                        )}
                      </div>
                    </div>

                    {edu.grade && (
                      <div className="education-grade">
                        <span className="grade-label">Grade: </span>
                        <span className="grade-value">{edu.grade}</span>
                      </div>
                    )}

                    <div className="education-details">
                      <p className="education-description">{edu.description}</p>
                      {edu.technologies && edu.technologies.length > 0 && (
                        <div className="education-technologies">
                          {edu.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      {edu.field_of_study && !edu.technologies && (
                        <div className="education-field">
                          <span className="field-tag">{edu.field_of_study}</span>
                        </div>
                      )}
                    </div>
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
