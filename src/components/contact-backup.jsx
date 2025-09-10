import React, { useState } from 'react';
import './contact.css';

// Alternative contact form without Formspree
// This version creates a mailto link as fallback
const ContactBackup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Clear form
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message
    alert('Email client opened! Please send the email to complete your message.');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a question or want to work together? Feel free to reach out!
        </p>
        <div className="contact-content-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Your Message"
                rows="6"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
          <h3 className="contact-info-title">Contact Information</h3>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>{import.meta.env.VITE_CONTACT_EMAIL}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}>{import.meta.env.VITE_CONTACT_PHONE}</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBackup;
