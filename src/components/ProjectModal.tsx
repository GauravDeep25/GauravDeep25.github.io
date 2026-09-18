import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Calendar, Code } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export function ProjectModal({
  project,
  projects,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const idx = projects.findIndex((p) => p.id === project.id);
        if (idx > 0) {
          onSelectProject(projects[idx - 1]);
        } else {
          onSelectProject(projects[projects.length - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        const idx = projects.findIndex((p) => p.id === project.id);
        if (idx < projects.length - 1) {
          onSelectProject(projects[idx + 1]);
        } else {
          onSelectProject(projects[0]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const techStackList = project.tech_stack
    ? project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectProject(projects[currentIndex - 1]);
    } else {
      onSelectProject(projects[projects.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < projects.length - 1) {
      onSelectProject(projects[currentIndex + 1]);
    } else {
      onSelectProject(projects[0]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        id="project-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="project-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#fcfcfc] dark:bg-stone-900 border border-stone-300 dark:border-stone-750 rounded-xs shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
                {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <span className="h-3.5 w-px bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span className="hidden sm:inline-block text-[11px] font-mono text-stone-500 dark:text-stone-400">
                PROJECT DETAIL
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-200/60 dark:bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-300 dark:border-stone-700">
                ESC to close &bull; &larr; &rarr; to cycle
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Project Modal"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white transition-colors rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Project Image Preview */}
            {project.image_path && (
              <div className="overflow-hidden rounded-xs border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 aspect-[16/9] w-full">
                <img
                  src={project.image_path}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
              </div>
            )}

            {/* Title & Year */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight">
                  {project.title}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-stone-800 dark:text-stone-200 bg-stone-200/70 dark:bg-stone-800/80 rounded-full border border-stone-300 dark:border-stone-700">
                  <Calendar className="w-3 h-3 text-stone-500" />
                  <span>{project.year}</span>
                </span>
              </div>

              {/* Tech Stack Badges */}
              {techStackList.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 mr-1">
                    <Code className="w-3.5 h-3.5" />
                    <span>Stack:</span>
                  </span>
                  {techStackList.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/60 rounded-xs border border-stone-200 dark:border-stone-750"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Full Description */}
            <div className="border-t border-stone-200 dark:border-stone-800 pt-5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono mb-3">
                Overview &amp; Architecture
              </h3>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans font-normal whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

          {/* Bottom Bar: Action Links & Navigation Controls */}
          <div className="px-5 sm:px-7 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            {project.link_url ? (
              <a
                href={project.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] text-xs uppercase tracking-widest font-bold text-white dark:text-stone-950 bg-stone-950 dark:bg-stone-50 hover:bg-stone-800 dark:hover:bg-white transition-colors rounded-xs shadow-xs w-full sm:w-auto cursor-pointer"
              >
                <span>{project.link_label || 'View Live Project'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs font-mono text-stone-500 italic">Internal repository</span>
            )}

            {projects.length > 1 && (
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-200/60 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-xs border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-200/60 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-xs border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
