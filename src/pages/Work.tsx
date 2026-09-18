import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ProjectModal } from '../components/ProjectModal';
import { Code, ExternalLink, ArrowUpRight, Layers } from 'lucide-react';

interface WorkProps {
  projects: Project[];
  loading: boolean;
}

export function Work({ projects, loading }: WorkProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Derive unique tech categories for quick filtering if available
  const allStacks = projects.flatMap((p) =>
    p.tech_stack ? p.tech_stack.split(',').map((s) => s.trim()) : []
  );
  // Pick top recurring stacks or unique keywords
  const uniqueStacks = Array.from(new Set(allStacks)).filter(Boolean);
  const filterOptions = ['All', ...uniqueStacks.slice(0, 5)];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) =>
        p.tech_stack?.toLowerCase().includes(activeFilter.toLowerCase())
      );

  if (loading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-8 bg-stone-200 dark:bg-stone-900 rounded w-1/4 mb-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-72 bg-stone-200 dark:bg-stone-900 rounded-xs"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      id="work-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 md:space-y-12"
    >
      {/* Header matching Photography & Editorial aesthetic */}
      <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight">
            Index of Work
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans font-medium">
            Software projects, security tools, and open interactive systems
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>
      </div>

      {/* Filter options pills if there are categories */}
      {filterOptions.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-sans">
          {filterOptions.map((opt) => (
            <motion.button
              key={opt}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-2 rounded-full transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center cursor-pointer ${
                activeFilter === opt
                  ? 'bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 font-semibold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-medium hover:bg-stone-200 dark:hover:bg-stone-850'
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      )}

      {/* Cards Grid like Photography page */}
      {filteredProjects.length === 0 ? (
        <p className="text-stone-600 dark:text-stone-400 text-sm py-16 text-center font-sans">
          No projects found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.figure
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
                onClick={() => setSelectedProject(project)}
                className="group relative overflow-hidden bg-stone-100 dark:bg-stone-900/50 rounded-xs border border-stone-200 dark:border-stone-800 cursor-pointer transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-xs flex flex-col justify-between"
              >
                {/* Image / Visual Header */}
                <div className="overflow-hidden bg-stone-200 dark:bg-stone-950 aspect-[16/10] relative">
                  {project.image_path ? (
                    <img
                      src={project.image_path}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                      loading="lazy"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable="false"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-900/40">
                      <Layers className="w-10 h-10 mb-2 opacity-50" />
                      <span className="font-mono text-xs tracking-wider uppercase">System Codebase</span>
                    </div>
                  )}

                  {/* Corner tag overlay */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-950/75 text-stone-100 backdrop-blur-xs border border-white/10">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Figcaption Content */}
                <figcaption className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-xs font-sans">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="font-serif font-bold text-lg text-stone-950 dark:text-stone-50 group-hover:underline decoration-stone-400 dark:decoration-stone-500 underline-offset-4 transition-colors">
                        {String(index + 1).padStart(2, '0')}. {project.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack metadata & popup affordance */}
                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-medium text-stone-600 dark:text-stone-400 truncate max-w-[180px]">
                      {project.tech_stack}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-950 dark:group-hover:text-white shrink-0">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Detail Popup Modal for each project */}
      <ProjectModal
        project={selectedProject}
        projects={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </motion.div>
  );
}
