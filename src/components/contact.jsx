import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './contact.css';

const Contact = () => {
  // Extract form ID from full URL if provided, or use as-is if just ID
  const getFormId = () => {
    const formConfig = import.meta.env.VITE_FORMSPREE_FORM_ID;
    if (formConfig?.includes('formspree.io/f/')) {
      // Extract ID from full URL: https://formspree.io/f/mdklbldg -> mdklbldg
      return formConfig.split('/f/')[1];
    }
    return formConfig;
  };

  const [state, handleSubmit] = useForm(getFormId());
  const formRef = useRef(null);

  // Clear form when submission is successful
  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
    }
  }, [state.succeeded]);

  // Debug logging to check form ID
  useEffect(() => {
    const formConfig = import.meta.env.VITE_FORMSPREE_FORM_ID;
    const extractedId = getFormId();
    console.log('Formspree Form Config:', formConfig);
    console.log('Extracted Form ID:', extractedId);
    if (!formConfig) {
      console.error('VITE_FORMSPREE_FORM_ID is not set in environment variables');
    }
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a question or want to work together? Feel free to reach out!
        </p>
        <div className="contact-content-wrapper">
          <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
            {state.succeeded && (
              <div className="form-success">
                <p>✅ Thank you for your message! I'll get back to you soon.</p>
              </div>
            )}
            {state.errors && state.errors.length > 0 && !state.succeeded && (
              <div className="form-error-message">
                <p>❌ There was an error sending your message. Please try again.</p>
                {/* Debug: Show specific errors */}
                {process.env.NODE_ENV === 'development' && (
                  <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    {state.errors.map((error, index) => (
                      <div key={index}>{error.message}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Your Name"
                required
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                className="form-error"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Your Email"
                required
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="form-error"
              />
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Your Message"
                rows="6"
                required
              ></textarea>
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="form-error"
              />
            </div>
            <button type="submit" className="submit-btn" disabled={state.submitting}>
              {state.submitting ? '⏳ Sending...' : 
               state.succeeded ? '✅ Message Sent!' : 
               'Send Message'}
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

export default Contact;

