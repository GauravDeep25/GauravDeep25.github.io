import React from 'react';
import './certifications.css';
import { useContent } from '../context/ContentContext.jsx';

const Certifications = () => {
  const { content } = useContent();
  const certificationsData = content?.certifications || [];

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="certifications-title">Certifications & Achievements</h2>
        <p className="certifications-subtitle">
          Professional certifications and courses that enhance my skills and expertise
        </p>
        
        <div className="certifications-grid">
          {certificationsData.map((cert, index) => (
            <div key={cert.id || index} className="certification-card">
              {cert.image_url && (
                <div className="certification-image-container">
                  <img 
                    src={cert.image_url} 
                    alt={cert.title} 
                    className="certification-image"
                    loading="lazy"
                  />
                  <div className="certification-overlay">
                    {cert.credential_url && (
                      <a 
                        href={cert.credential_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-credential-btn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              <div className="certification-content">
                <div className="certification-header">
                  <h3 className="certification-title">{cert.title}</h3>
                  <p className="certification-issuer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {cert.issuer}
                  </p>
                  <p className="certification-date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {cert.issue_date}
                  </p>
                </div>

                {cert.description && (
                  <p className="certification-description">{cert.description}</p>
                )}

                {cert.credential_id && (
                  <p className="certification-id">
                    <strong>ID:</strong> {cert.credential_id}
                  </p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="certification-skills">
                    {(Array.isArray(cert.skills) ? cert.skills : []).map((skill, i) => (
                      <span key={i} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {certificationsData.length === 0 && (
          <div className="no-certifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            <p>No certifications added yet. Login to add your achievements!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
