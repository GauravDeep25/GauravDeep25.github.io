import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_featured', true)
          .limit(2);

        if (!error && data) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="py-24 text-center font-hand text-2xl text-primary-500 animate-pulse">
      Summoning projects... ✨
    </div>
  );

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white">
            Featured Work 🛠️
          </h2>
          <p className="font-hand text-2xl text-cyan-500 mt-2 -rotate-2">
            Selected projects from my vault.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
            >
              
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className={`
                  absolute inset-0 rounded-[2rem] transform transition-transform duration-300 -z-10
                  ${index % 2 === 0 ? 'bg-primary-400 rotate-3 group-hover:rotate-6' : 'bg-cyan-400 -rotate-3 group-hover:-rotate-6'}
                `}></div>
                
                <Link to={`/project/${project.id}`} className="block overflow-hidden rounded-[2rem] shadow-lg border border-white/20 bg-slate-100 dark:bg-slate-800 aspect-video">
                  <img 
                    src={project.image_url || 'https://placehold.co/800x600/14b8a6/ffffff?text=Project+Image'} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </Link>
              </div>

              {/* Text Side */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <Link to={`/project/${project.id}`}>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4 hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>
                
                {/* Tech Tags */}
                <div className={`flex flex-wrap gap-2 mb-8 font-hand text-xl text-primary-600 dark:text-primary-400 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                  {project.tags?.map((tag) => (
                    <span key={tag}>#{tag.replace(/\s+/g, '')}</span>
                  ))}
                </div>

                {/* Buttons */}
                <div className={`flex gap-4 items-center ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                  <Link 
                    to={`/project/${project.id}`} 
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:-translate-y-1 shadow-md transition-all"
                  >
                    Details
                  </Link>
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-all"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-24 text-center">
          <Link 
            to="/projects" 
            className="group inline-flex items-center gap-3 font-heading font-bold text-xl text-primary-500 hover:text-primary-600 transition-colors"
          >
            <span>Explore The Full Vault</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}