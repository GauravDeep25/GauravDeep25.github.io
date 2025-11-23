import React from 'react';
import './about.css';
import { useContent } from '../context/ContentContext.jsx';

const About = () => {
  const { content, loading } = useContent();

  const about = content?.about || {};
  const skills = content?.skills || [];
  const educationData = content?.education || [];

  if (loading) {
    return (
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <div className="skeleton skeleton-title" style={{ width: '150px', height: '2rem', marginBottom: '1.5rem' }}></div>
              <div className="skeleton skeleton-paragraph" style={{ marginBottom: '0.5rem' }}></div>
              <div className="skeleton skeleton-paragraph" style={{ marginBottom: '0.5rem' }}></div>
              <div className="skeleton skeleton-paragraph" style={{ width: '90%', marginBottom: '1rem' }}></div>
              <div className="skeleton skeleton-paragraph" style={{ marginBottom: '0.5rem' }}></div>
              <div className="skeleton skeleton-paragraph" style={{ width: '85%' }}></div>
            </div>
            <div className="about-skills">
              <div className="skeleton skeleton-subtitle" style={{ width: '130px', height: '1.5rem', marginBottom: '1rem' }}></div>
              <div className="skills-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="skeleton" style={{ width: '120px', height: '32px', borderRadius: '16px' }}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="education-section">
            <div className="skeleton skeleton-title" style={{ width: '250px', height: '2rem', marginBottom: '0.5rem' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '400px', height: '1rem', marginBottom: '2rem' }}></div>
            <div className="education-timeline">
              {[1, 2].map((i) => (
                <div key={i} className="education-timeline-item">
                  <div className="education-timeline-marker"></div>
                  <div className="education-card skeleton" style={{ height: '200px' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <p>
              {about.paragraph_1}
            </p>
            <p>
              {about.paragraph_2}
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
