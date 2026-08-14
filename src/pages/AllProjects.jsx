import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setProjects(data);
      setLoading(false);
    }
    fetchAllProjects();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <Link to="/" className="text-primary-500 font-medium hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-4">
            The Project Vault 📁
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-hand text-2xl">
            A complete collection of my development and security ventures.
          </p>
        </div>

        {loading ? (
          /* Simple Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Project Image */}
                <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={project.image_url || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.is_featured && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary-500 transition-colors">
                         <span className="text-sm font-bold">GitHub</span>
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-500 transition-colors">
                        <span className="text-sm font-bold">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl font-hand text-slate-500">The vault is currently empty... check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}