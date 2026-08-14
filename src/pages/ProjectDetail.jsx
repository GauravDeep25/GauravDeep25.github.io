import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error) setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) return <div className="pt-40 text-center font-hand text-2xl">Unfolding the magic...</div>;
  if (!project) return <div className="pt-40 text-center">Project not found!</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/projects" className="text-primary-500 hover:underline mb-8 inline-block">← Back to Vault</Link>
        
        <img 
          src={project.image_url} 
          alt={project.title} 
          className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl mb-12 border-4 border-white dark:border-slate-800"
        />

        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags?.map(tag => (
            <span key={tag} className="px-4 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full text-sm font-bold uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-8">
          {project.title}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
          <p className="text-xl font-medium">{project.description}</p>
          
          {/* Detailed Content Section */}
          <div className="bg-white/50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mt-12">
            <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">Key Features & Technical Challenges</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Architected using scalable {project.tags?.[0] || 'modern'} technologies.</li>
              <li>Focused on secure data handling and optimized performance.</li>
              <li>Implemented custom solutions for real-world user pain points.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex gap-6">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full hover:scale-105 transition-transform">
              Visit Live Site 🚀
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 transition-transform">
              View Source Code 💻
            </a>
          )}
        </div>
      </div>
    </div>
  );
}