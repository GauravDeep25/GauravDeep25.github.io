import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ContentContext = createContext();

// Default content to use when database is not set up or has no data
const DEFAULT_CONTENT = {
  hero: {
    headline: 'Crafting secure and scalable digital solutions with code and creativity.',
    subheadline: 'Hi, I\'m Gaurav Deep. I am a Computer Science Engineering student specializing in IoT, Cybersecurity, and Blockchain Technology.',
    profile_image_url: '/Me.png'
  },
  about: {
    paragraph_1: 'I\'m a passionate and results-driven developer with a knack for creating dynamic and user-friendly web applications. With a strong foundation in modern frontend technologies, I specialize in turning complex problems into elegant, interactive solutions.',
    paragraph_2: 'My journey in tech began with a deep curiosity for how things work, and it has since evolved into a career where I get to build, innovate, and collaborate with amazing people. I\'m always eager to learn new skills and take on challenging projects.'
  },
  skills: [
    { id: '1', name: 'React', proficiency: 90 },
    { id: '2', name: 'JavaScript (ES6+)', proficiency: 85 },
    { id: '3', name: 'CSS3 & SASS', proficiency: 85 },
    { id: '4', name: 'HTML5', proficiency: 90 },
    { id: '5', name: 'Node.js', proficiency: 80 },
    { id: '6', name: 'Vite', proficiency: 85 },
    { id: '7', name: 'Git & GitHub', proficiency: 80 },
    { id: '8', name: 'Responsive Design', proficiency: 90 }
  ],
  education: [
    {
      id: '1',
      institution: "Sikkim Manipal Institute of Technology",
      degree: "Bachelor of Technology",
      field_of_study: "Computer Science and Engineering (IoT and Cybersecurity)",
      start_date: "2024",
      end_date: "2028",
      description: "Pursuing a specialized B.Tech in CSE with a focus on IoT, Cybersecurity, and Blockchain Technology."
    },
    {
      id: '2',
      institution: "Central Board of Secondary Education (CBSE)",
      degree: "Higher Secondary Certificate",
      field_of_study: "Science",
      start_date: "2022",
      end_date: "2024",
      description: "Achieved a first-class aggregate of 69% with a focus on Mathematics, Physics, and Chemistry."
    }
  ],
  projects: [
    {
      id: '1',
      title: "TicketSphere",
      description: "A fully responsive online ticket selling/buying platform with admin verification. Built with modern tech stack.",
      image_url: "https://placehold.co/600x400/3366ff/FFFFFF?text=TicketSphere",
      tech_stack: "React, Node.js, Express, MongoDB",
      project_url: "https://ticketsphere-frontend.onrender.com",
      code_url: "#"
    }
  ],
  certifications: [],
  socialLinks: [
    { id: '1', platform: 'github', url: 'https://github.com/GauravDeep25' },
    { id: '2', platform: 'linkedin', url: 'https://linkedin.com/in/gauravdeep25' },
    { id: '3', platform: 'instagram', url: 'https://instagram.com/gaurav.d.jpg' }
  ]
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    hero: null,
    about: null,
    skills: [],
    education: [],
    projects: [],
    certifications: [],
    socialLinks: []
  });
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);

      // Fetch hero content
      const { data: heroData, error: heroError } = await supabase
        .from('hero_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (heroError && heroError.code !== 'PGRST116') throw heroError;

      // Fetch about content
      const { data: aboutData, error: aboutError } = await supabase
        .from('about_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (aboutError && aboutError.code !== 'PGRST116') throw aboutError;

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: true });

      if (skillsError) throw skillsError;

      // Fetch education
      const { data: educationData, error: educationError } = await supabase
        .from('education')
        .select('*')
        .order('created_at', { ascending: false });

      if (educationError) throw educationError;

      // Fetch projects with fallback for missing display_order
      let projectsResult = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (projectsResult.error && projectsResult.error.code === '42703') {
        console.warn('display_order column missing in projects, falling back to created_at');
        projectsResult = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
      }

      if (projectsResult.error) throw projectsResult.error;
      const projectsData = projectsResult.data;

      // Fetch certifications with fallback for missing display_order
      let certificationsResult = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });

      if (certificationsResult.error && certificationsResult.error.code === '42703') {
        console.warn('display_order column missing in certifications, falling back to created_at');
        certificationsResult = await supabase
          .from('certifications')
          .select('*')
          .order('created_at', { ascending: false });
      }

      if (certificationsResult.error) throw certificationsResult.error;
      const certificationsData = certificationsResult.data;

      // Fetch social links
      const { data: socialData, error: socialError } = await supabase
        .from('social_links')
        .select('*');

      if (socialError) throw socialError;

      setContent({
        hero: heroData || DEFAULT_CONTENT.hero,
        about: aboutData || DEFAULT_CONTENT.about,
        skills: skillsData || DEFAULT_CONTENT.skills,
        education: educationData || DEFAULT_CONTENT.education,
        projects: projectsData || DEFAULT_CONTENT.projects,
        certifications: certificationsData || DEFAULT_CONTENT.certifications,
        socialLinks: socialData || DEFAULT_CONTENT.socialLinks
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      // Set default content if database is not set up yet
      setContent(DEFAULT_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const refreshContent = async () => {
    await fetchContent();
  };

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
};
