import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, signOut } from '../supabaseClient';
import { useContent } from '../context/ContentContext';
import { uploadImage } from '../utils/imageUpload';
import './edit.css';

const EditDashboard = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const navigate = useNavigate();
  const { content, refreshContent } = useContent();

  // Hero section state
  const [heroData, setHeroData] = useState({
    headline: '',
    subheadline: '',
    profile_image_url: ''
  });

  // About section state
  const [aboutData, setAboutData] = useState({
    paragraph_1: '',
    paragraph_2: ''
  });

  // Skills state
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  // Education state
  const [education, setEducation] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  // Certifications state
  const [certifications, setCertifications] = useState([]);
  const [editingCertification, setEditingCertification] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Social links state
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/edit');
    }
  };

  const loadData = async () => {
    await refreshContent();
    if (content) {
      setHeroData(content.hero || {});
      setAboutData(content.about || {});
      setSkills(content.skills || []);
      setEducation(content.education || []);
      setProjects(content.projects || []);
      setCertifications(content.certifications || []);
      setSocialLinks(content.socialLinks || []);
    }
  };

  useEffect(() => {
    if (content) {
      setHeroData(content.hero || {});
      setAboutData(content.about || {});
      setSkills(content.skills || []);
      setEducation(content.education || []);
      setProjects(content.projects || []);
      setCertifications(content.certifications || []);
      setSocialLinks(content.socialLinks || []);
    }
  }, [content]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const showSaveStatus = (status) => {
    setSaveStatus(status);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Hero section handlers
  const saveHeroContent = async () => {
    setLoading(true);
    try {
      if (content.hero?.id) {
        const { error } = await supabase
          .from('hero_content')
          .update({
            headline: heroData.headline,
            subheadline: heroData.subheadline,
            profile_image_url: heroData.profile_image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.hero.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hero_content')
          .insert([{
            headline: heroData.headline,
            subheadline: heroData.subheadline,
            profile_image_url: heroData.profile_image_url
          }]);

        if (error) throw error;
      }

      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving hero content:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // About section handlers
  const saveAboutContent = async () => {
    setLoading(true);
    try {
      if (content.about?.id) {
        const { error } = await supabase
          .from('about_content')
          .update({
            paragraph_1: aboutData.paragraph_1,
            paragraph_2: aboutData.paragraph_2,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.about.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_content')
          .insert([{
            paragraph_1: aboutData.paragraph_1,
            paragraph_2: aboutData.paragraph_2
          }]);

        if (error) throw error;
      }

      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving about content:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Skills handlers
  const addSkill = async () => {
    if (!newSkill.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('skills')
        .insert([{ name: newSkill, proficiency: 50 }]);

      if (error) throw error;
      await refreshContent();
      setNewSkill('');
      showSaveStatus('success');
    } catch (error) {
      console.error('Error adding skill:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error deleting skill:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Education handlers
  const saveEducation = async (edu) => {
    setLoading(true);
    try {
      if (edu.id) {
        const { error } = await supabase
          .from('education')
          .update({
            institution: edu.institution || edu.university,
            degree: edu.degree,
            field_of_study: edu.field_of_study || 'General',
            start_date: edu.start_date || edu.years?.split(' - ')[0] || '2020',
            end_date: edu.end_date || edu.years?.split(' - ')[1] || 'Present',
            description: edu.description
          })
          .eq('id', edu.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('education')
          .insert([{
            institution: edu.institution || edu.university,
            degree: edu.degree,
            field_of_study: edu.field_of_study || 'General',
            start_date: edu.start_date || edu.years?.split(' - ')[0] || '2020',
            end_date: edu.end_date || edu.years?.split(' - ')[1] || 'Present',
            description: edu.description
          }]);
        if (error) throw error;
      }
      await refreshContent();
      setEditingEducation(null);
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving education:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error deleting education:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Reordering helpers
  const moveItem = (items, index, direction) => {
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    return newItems;
  };

  // Projects handlers
  const moveProject = (index, direction) => {
    const newProjects = moveItem(projects, index, direction);
    setProjects(newProjects);
  };

  const saveProjectsOrder = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (project.id) {
          const { error } = await supabase
            .from('projects')
            .update({ display_order: i })
            .eq('id', project.id);
          if (error) throw error;
        }
      }
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving projects order:', error);
      if (error.code === '42703' || error.message?.includes('Could not find the \'display_order\' column')) {
        alert('Database Update Required: The "display_order" column is missing. Please run the SQL migration script in your Supabase Dashboard.');
      }
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (project) => {
    setLoading(true);
    try {
      if (project.id) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            tech_stack: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech_stack || project.tech,
            project_url: project.project_url || project.live_url,
            code_url: project.code_url || project.github_url
          })
          .eq('id', project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            tech_stack: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech_stack || project.tech,
            project_url: project.project_url || project.live_url,
            code_url: project.code_url || project.github_url,
            display_order: projects.length // Add at the end
          }]);
        if (error) throw error;
      }
      await refreshContent();
      setEditingProject(null);
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving project:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error deleting project:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const [editingSocialLink, setEditingSocialLink] = useState(null);

  // Social links handlers
  const saveSocialLink = async (link) => {
    setLoading(true);
    try {
      if (link.id) {
        const { error } = await supabase
          .from('social_links')
          .update({ platform: link.platform, url: link.url })
          .eq('id', link.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('social_links')
          .insert([{ platform: link.platform, url: link.url }]);
        if (error) throw error;
      }
      await refreshContent();
      setEditingSocialLink(null);
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving social link:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const deleteSocialLink = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error deleting social link:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Image upload handler
  const handleImageUpload = async (file, callback) => {
    setUploadingImage(true);
    try {
      const result = await uploadImage(file, 'portfolio-images');
      if (result.error) {
        alert('Error uploading image: ' + result.error);
        return;
      }
      callback(result.url);
      showSaveStatus('success');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Certifications handlers
  const moveCertification = (index, direction) => {
    const newCerts = moveItem(certifications, index, direction);
    setCertifications(newCerts);
  };

  const saveCertificationsOrder = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < certifications.length; i++) {
        const cert = certifications[i];
        if (cert.id) {
          const { error } = await supabase
            .from('certifications')
            .update({ display_order: i })
            .eq('id', cert.id);
          if (error) throw error;
        }
      }
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving certifications order:', error);
      if (error.code === '42703' || error.message?.includes('Could not find the \'display_order\' column')) {
        alert('Database Update Required: The "display_order" column is missing. Please run the SQL migration script in your Supabase Dashboard.');
      }
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const saveCertification = async (cert) => {
    setLoading(true);
    try {
      if (cert.id) {
        const { error } = await supabase
          .from('certifications')
          .update({
            title: cert.title,
            issuer: cert.issuer,
            issue_date: cert.issue_date,
            credential_id: cert.credential_id,
            credential_url: cert.credential_url,
            image_url: cert.image_url,
            description: cert.description,
            skills: cert.skills
          })
          .eq('id', cert.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('certifications')
          .insert([{
            title: cert.title,
            issuer: cert.issuer,
            issue_date: cert.issue_date,
            credential_id: cert.credential_id,
            credential_url: cert.credential_url,
            image_url: cert.image_url,
            description: cert.description,
            skills: cert.skills,
            display_order: certifications.length // Add at the end
          }]);
        if (error) throw error;
      }
      await refreshContent();
      setEditingCertification(null);
      showSaveStatus('success');
    } catch (error) {
      console.error('Error saving certification:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const deleteCertification = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshContent();
      showSaveStatus('success');
    } catch (error) {
      console.error('Error deleting certification:', error);
      showSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Portfolio Editor</h1>
          <div className="header-actions">
            <a href="/" className="preview-button" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Preview Site
            </a>
            <button onClick={handleLogout} className="logout-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {saveStatus && (
        <div className={`save-status ${saveStatus}`}>
          {saveStatus === 'success' ? '✓ Changes saved successfully!' : '✕ Error saving changes'}
        </div>
      )}

      <div className="dashboard-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            Hero Section
          </button>
          <button
            className={`tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About & Skills
          </button>
          <button
            className={`tab ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`tab ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </button>
          <button
            className={`tab ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            Certifications
          </button>
        </div>

        <div className="tab-content">
          {/* Hero Section Tab */}
          {activeTab === 'hero' && (
            <div className="edit-section">
              <h2>Hero Section</h2>
              <div className="form-group">
                <label>Headline</label>
                <input
                  type="text"
                  value={heroData.headline || ''}
                  onChange={(e) => setHeroData({ ...heroData, headline: e.target.value })}
                  placeholder="Your main headline"
                />
              </div>
              <div className="form-group">
                <label>Subheadline</label>
                <textarea
                  value={heroData.subheadline || ''}
                  onChange={(e) => setHeroData({ ...heroData, subheadline: e.target.value })}
                  placeholder="Your subheadline"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Profile Image URL</label>
                <input
                  type="text"
                  value={heroData.profile_image_url || ''}
                  onChange={(e) => setHeroData({ ...heroData, profile_image_url: e.target.value })}
                  placeholder="/Me.png"
                />
              </div>
              <button onClick={saveHeroContent} disabled={loading} className="save-button">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* About & Skills Tab */}
          {activeTab === 'about' && (
            <div className="edit-section">
              <h2>About Section</h2>
              <div className="form-group">
                <label>Paragraph 1</label>
                <textarea
                  value={aboutData.paragraph_1 || ''}
                  onChange={(e) => setAboutData({ ...aboutData, paragraph_1: e.target.value })}
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Paragraph 2</label>
                <textarea
                  value={aboutData.paragraph_2 || ''}
                  onChange={(e) => setAboutData({ ...aboutData, paragraph_2: e.target.value })}
                  rows="4"
                />
              </div>
              <button onClick={saveAboutContent} disabled={loading} className="save-button">
                {loading ? 'Saving...' : 'Save About Content'}
              </button>

              <div className="section-divider"></div>

              <h2>Skills</h2>
              <div className="skills-manager">
                <div className="add-skill-form">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter new skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button onClick={addSkill} disabled={loading}>Add Skill</button>
                </div>
                <div className="skills-list">
                  {skills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                      <span>{skill.name}</span>
                      <button onClick={() => deleteSkill(skill.id)} className="delete-btn">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="edit-section">
              <h2>Education Timeline</h2>
              <button
                onClick={() => setEditingEducation({
                  degree: '',
                  institution: '',
                  field_of_study: '',
                  start_date: '',
                  end_date: '',
                  description: ''
                })}
                className="add-button"
              >
                + Add Education
              </button>

              {editingEducation && (
                <div className="edit-modal">
                  <div className="modal-content">
                    <h3>{editingEducation.id ? 'Edit Education' : 'Add Education'}</h3>
                    <div className="form-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={editingEducation.degree || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                        placeholder="Bachelor of Technology"
                      />
                    </div>
                    <div className="form-group">
                      <label>Institution</label>
                      <input
                        type="text"
                        value={editingEducation.institution || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                        placeholder="Sikkim Manipal Institute of Technology"
                      />
                    </div>
                    <div className="form-group">
                      <label>Field of Study</label>
                      <input
                        type="text"
                        value={editingEducation.field_of_study || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, field_of_study: e.target.value })}
                        placeholder="Computer Science and Engineering"
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="text"
                        value={editingEducation.start_date || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, start_date: e.target.value })}
                        placeholder="2024"
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="text"
                        value={editingEducation.end_date || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, end_date: e.target.value })}
                        placeholder="2028 or Present"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={editingEducation.description || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
                        rows="4"
                        placeholder="Pursuing a specialized B.Tech in CSE with a focus on IoT, Cybersecurity, and Blockchain Technology."
                      />
                    </div>
                    <div className="modal-actions">
                      <button onClick={() => saveEducation(editingEducation)} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingEducation(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="items-list">
                {education.map((edu) => (
                  <div key={edu.id} className="list-item">
                    <div className="item-content">
                      <h4>{edu.degree}</h4>
                      <p>{edu.institution || edu.university} • {edu.start_date && edu.end_date ? `${edu.start_date} - ${edu.end_date}` : edu.years}</p>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingEducation(edu)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => deleteEducation(edu.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="edit-section">
              <h2>Projects</h2>
              <div className="section-header-actions">
                <button
                  onClick={() => setEditingProject({
                    title: '',
                    description: '',
                    image_url: '',
                    tech: [],
                    live_url: '',
                    github_url: ''
                  })}
                  className="add-button"
                >
                  + Add Project
                </button>
                <button onClick={saveProjectsOrder} disabled={loading} className="save-order-button">
                  Save Order
                </button>
              </div>

              {editingProject && (
                <div className="edit-modal">
                  <div className="modal-content">
                    <h3>{editingProject.id ? 'Edit Project' : 'Add Project'}</h3>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        value={editingProject.image_url}
                        onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : ''}
                        onChange={(e) => setEditingProject({
                          ...editingProject,
                          tech: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                        })}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="form-group">
                      <label>Live URL</label>
                      <input
                        type="text"
                        value={editingProject.live_url}
                        onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input
                        type="text"
                        value={editingProject.github_url}
                        onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                      />
                    </div>
                    <div className="modal-actions">
                      <button onClick={() => saveProject(editingProject)} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingProject(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="items-list">
                {projects.map((project, index) => (
                  <div key={project.id} className="list-item">
                    <div className="item-reorder">
                      <button
                        onClick={() => moveProject(index, 'up')}
                        disabled={index === 0}
                        className="reorder-btn"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveProject(index, 'down')}
                        disabled={index === projects.length - 1}
                        className="reorder-btn"
                      >
                        ↓
                      </button>
                    </div>
                    <div className="item-content">
                      <h4>{project.title}</h4>
                      <p>{project.description?.substring(0, 60)}...</p>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingProject(project)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <div className="edit-section">
              <h2>Social Links</h2>
              <button
                onClick={() => setEditingSocialLink({ platform: '', url: '' })}
                className="add-button"
              >
                + Add Social Link
              </button>

              {editingSocialLink && (
                <div className="edit-modal">
                  <div className="modal-content">
                    <h3>{editingSocialLink.id ? 'Edit Social Link' : 'Add Social Link'}</h3>
                    <div className="form-group">
                      <label>Platform</label>
                      <input
                        type="text"
                        value={editingSocialLink.platform}
                        onChange={(e) => setEditingSocialLink({ ...editingSocialLink, platform: e.target.value })}
                        placeholder="e.g., GitHub, LinkedIn"
                      />
                    </div>
                    <div className="form-group">
                      <label>URL</label>
                      <input
                        type="url"
                        value={editingSocialLink.url}
                        onChange={(e) => setEditingSocialLink({ ...editingSocialLink, url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="modal-actions">
                      <button onClick={() => saveSocialLink(editingSocialLink)} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingSocialLink(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="items-list">
                {socialLinks.map((link) => (
                  <div key={link.id} className="list-item">
                    <div className="item-content">
                      <h4>{link.platform}</h4>
                      <p>{link.url}</p>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingSocialLink(link)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => deleteSocialLink(link.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="edit-section">
              <h2>Certifications</h2>

              {/* List of Certifications */}
              <div className="certifications-list">
                {certifications.map((cert) => (
                  <div key={cert.id} className="certification-item">
                    <div className="certification-preview">
                      {cert.image_url && (
                        <img src={cert.image_url} alt={cert.title} className="cert-image-preview" />
                      )}
                      <div>
                        <h3>{cert.title}</h3>
                        <p>{cert.issuer} - {cert.issue_date}</p>
                      </div>
                    </div>
                    <div className="certification-actions">
                      <button
                        onClick={() => setEditingCertification(cert)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCertification(cert.id)}
                        disabled={loading}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Certification Form */}
              <div className="certification-form">
                <h3>{editingCertification?.id ? 'Edit Certification' : 'Add New Certification'}</h3>

                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={editingCertification?.title || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      title: e.target.value
                    })}
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                </div>

                <div className="form-group">
                  <label>Issuer *</label>
                  <input
                    type="text"
                    value={editingCertification?.issuer || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      issuer: e.target.value
                    })}
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>

                <div className="form-group">
                  <label>Issue Date *</label>
                  <input
                    type="month"
                    value={editingCertification?.issue_date || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      issue_date: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Credential ID</label>
                  <input
                    type="text"
                    value={editingCertification?.credential_id || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      credential_id: e.target.value
                    })}
                    placeholder="e.g., ABC123XYZ"
                  />
                </div>

                <div className="form-group">
                  <label>Credential URL</label>
                  <input
                    type="url"
                    value={editingCertification?.credential_url || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      credential_url: e.target.value
                    })}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label>Certificate Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], (url) => setEditingCertification({ ...editingCertification, image_url: url }))}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <p>Uploading image...</p>}
                  {editingCertification?.image_url && (
                    <div className="image-preview">
                      <img src={editingCertification.image_url} alt="Certificate preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={editingCertification?.description || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      description: e.target.value
                    })}
                    placeholder="Brief description of the certification..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={editingCertification?.skills || ''}
                    onChange={(e) => setEditingCertification({
                      ...editingCertification,
                      skills: e.target.value
                    })}
                    placeholder="e.g., AWS, Cloud Architecture, DevOps"
                  />
                </div>

                <div className="form-actions">
                  <button
                    onClick={() => saveCertification(editingCertification)}
                    disabled={loading || !editingCertification?.title || !editingCertification?.issuer || !editingCertification?.issue_date}
                    className="save-button"
                  >
                    {loading ? 'Saving...' : editingCertification?.id ? 'Update Certification' : 'Add Certification'}
                  </button>
                  {editingCertification?.id && (
                    <button
                      onClick={() => setEditingCertification({})}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDashboard;
