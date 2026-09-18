import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectRowProps {
  project: Project;
}

export function ProjectRow({ project }: ProjectRowProps) {
  return (
    <motion.article
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8 first:pt-0 border-t first:border-t-0 border-stone-200 dark:border-stone-800/60 group"
    >
      <div className="md:col-span-4 text-sm">
        <h3 className="text-lg md:text-2xl font-bold text-stone-950 dark:text-stone-50 mb-2 font-serif group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <span className="block text-xs font-mono font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wide">
          {project.tech_stack}
        </span>
        <span className="inline-block text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 mt-2">
          {project.year}
        </span>
      </div>

      <div className="md:col-span-8 flex flex-col justify-between">
        <div>
          <p className="text-stone-700 dark:text-stone-300 mb-6 leading-relaxed text-sm md:text-base font-sans">
            {project.description}
          </p>

          {project.image_path && (
            <div className="mb-6 overflow-hidden rounded-xs border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 max-w-lg aspect-[16/9]">
              <img
                src={project.image_path}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] select-none"
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
            </div>
          )}
        </div>

        {project.link_url && (
          <div className="pt-2">
            <a
              href={project.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold border-b-2 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 hover:border-stone-950 dark:hover:border-white transition-all pb-1 focus-visible:ring-2 focus-visible:ring-stone-400 rounded-xs"
            >
              {project.link_label || 'View project ↗'}
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}
