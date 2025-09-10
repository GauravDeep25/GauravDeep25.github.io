import React, { useState } from 'react';
import './about.css';

// --- Sample Data for Education Timeline ---
const educationData = [

  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    university: "Sikkim Manipal Institute of Technology - Sikkim Manipal University",
    years: "2024 - 2028",
    description: "Pursuing a specialized B.Tech in CSE with a focus on IoT, Cybersecurity, and Blockchain Technology. This program provides in-depth knowledge of modern security protocols, network defense, and decentralized systems, alongside core engineering fundamentals. Focused on core subjects like Data Structures, Algorithms, and Web Development.",
  },
   {
    degree: "Higher Secondary Certificate",
    university: "Central Board of Secondary Education (CBSE)",
    years: "2022 - 2024",
    description: "Achieved a first-class aggregate of 70%. This curriculum was pivotal in building a strong foundation in core science and mathematics principles, developing the analytical and problem-solving skills essential for a career in engineering.",
  },
  {
    degree: "Secondary School Certificate",
    university: "Council for the Indian School Certificate Examinations (CISCE)",
    years: "2012 - 2022",
    description: "Secured a distinction with an aggregate of 91%. This result reflects a strong commitment to academic excellence and a comprehensive grasp of foundational subjects, setting a high standard for future academic pursuits.",
  },
];


const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc, altText) => {
    setSelectedImage({ src: imageSrc, alt: altText });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <p>
              I'm a passionate and results-driven developer with a knack for creating dynamic and user-friendly web applications. With a strong foundation in modern frontend technologies, I specialize in turning complex problems into elegant, interactive solutions.
            </p>
            <p>
              My journey in tech began with a deep curiosity for how things work, and it has since evolved into a career where I get to build, innovate, and collaborate with amazing people. I'm always eager to learn new skills and take on challenging projects.
            </p>
          </div>
          <div className="about-skills">
            <h3 className="skills-title">Core Skills</h3>
            <div className="skills-grid">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript (ES6+)</span>
              <span className="skill-tag">CSS3 & SASS</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Vite</span>
              <span className="skill-tag">Git & GitHub</span>
              <span className="skill-tag">Responsive Design</span>
            </div>
          </div>
        </div>

        {/* --- Education Timeline Section --- */}
        <div className="education-section">
          <h3 className="education-main-title">My Journey</h3>
          <div className="timeline">
            {educationData.map((edu, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-content">
                  <h4 className="timeline-degree">{edu.degree}</h4>
                  <p className="timeline-university">{edu.university}</p>
                  <span className="timeline-years">{edu.years}</span>
                  <p className="timeline-description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Certificates & Achievements Section --- */}
        <div className="certificates-section">
          <h3 className="certificates-main-title">Certificates & Achievements</h3>
          <div className="certificates-grid">
            <div className="certificate-card">
              <img 
                src="/GDSC.jpeg" 
                alt="GDSC Python Workshop Certificate" 
                className="certificate-image"
                onClick={() => openModal("/GDSC.jpeg", "GDSC Python Workshop Certificate")}
              />
              <div className="certificate-content">
                <h4 className="certificate-title">GDSC Python Workshop</h4>
                <p className="certificate-issuer">Issued by: Google Developer Student Club (GDSC)</p>
              </div>
            </div>
            <div className="certificate-card">
              <img 
                src="/NSDC.jpeg" 
                alt="Cybersecurity Skill Development Certificate" 
                className="certificate-image"
                onClick={() => openModal("/NSDC.jpeg", "Cybersecurity Skill Development Certificate")}
              />
              <div className="certificate-content">
                <h4 className="certificate-title">Cybersecurity Skill Development</h4>
                <p className="certificate-issuer">Issued by: Tech Mahindra (NSDC)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Modal for Certificate Images */}
    {selectedImage && (
      <div className="certificate-modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            className="modal-image" 
          />
        </div>
      </div>
    )}
  </>
  );
};

export default About;

