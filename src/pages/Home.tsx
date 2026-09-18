import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Profile, Project, Achievement, Photo } from '../types';

interface HomeProps {
  profile: Profile | null;
  projects: Project[];
  achievements: Achievement[];
  photos?: Photo[];
  loading: boolean;
}

export function Home({ profile, projects, achievements, photos = [], loading }: HomeProps) {
  const tagline = profile?.tagline || 'I build software and try to break it.';
  const location = profile?.location || 'Sikkim, India';
  const shortBio =
    profile?.short_bio ||
    'Undergraduate computer science student specializing in defensive & offensive security, web systems, and systems programming.';

  // Selected work: top 2-3 projects
  const selectedProjects = projects.slice(0, 3);
  // Recent log: top 2 achievements
  const recentLog = achievements.slice(0, 2);
  // Featured photos: photos marked as featured (or top 3)
  const featuredPhotos = photos.filter((p) => p.is_featured).length > 0
    ? photos.filter((p) => p.is_featured).slice(0, 3)
    : photos.slice(0, 3);



  return (
    <motion.div
      id="home-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12 sm:space-y-16 md:space-y-20"
    >
      {/* Intro section - responsive typography */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="max-w-3xl mb-8 sm:mb-14 md:mb-18"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-950 dark:text-stone-50 leading-[1.14] tracking-tight mb-5 sm:mb-6">
          {tagline}{' '}
          {location && (
            <span className="block mt-2 font-serif italic font-normal text-xl sm:text-2xl md:text-3xl text-stone-600 dark:text-stone-400">
              Based in {location}.
            </span>
          )}
        </h1>
        <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-normal max-w-2xl">
          {shortBio}
        </p>
      </motion.section>

      {/* 2-Column Split: Selected Work & Recent Log */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 animate-pulse pt-6 border-t border-stone-200 dark:border-stone-800/60">
          <div className="h-48 sm:h-64 bg-stone-200 dark:bg-stone-900 rounded"></div>
          <div className="h-48 sm:h-64 bg-stone-200 dark:bg-stone-900 rounded"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 pt-6 border-t border-stone-200 dark:border-stone-800/60">
        {/* Selected Work Teaser */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <div className="flex justify-between items-end border-b border-stone-200 dark:border-stone-800 pb-3 mb-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono">
              Selected Work
            </h2>
            <Link
              to="/work"
              className="text-xs font-mono font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white transition-colors py-1 inline-flex items-center gap-1 group/link"
            >
              <span>View all</span>
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <ul className="space-y-6 sm:space-y-8">
            {selectedProjects.map((project, idx) => (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
                className="group cursor-pointer"
              >
                <Link to="/work" className="block p-2 -m-2 rounded-xs transition-colors hover:bg-stone-100/70 dark:hover:bg-stone-900/50">
                  <span className="block text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 mb-1 font-mono font-medium tracking-wide uppercase">
                    {project.year} — {project.tech_stack}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-950 dark:text-stone-50 group-hover:underline decoration-stone-400 dark:decoration-stone-500 underline-offset-4 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Recent Log Teaser */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <div className="flex justify-between items-end border-b border-stone-200 dark:border-stone-800 pb-3 mb-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono">
              Recent Log
            </h2>
            <Link
              to="/log"
              className="text-xs font-mono font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white transition-colors py-1 inline-flex items-center gap-1 group/link"
            >
              <span>All entries</span>
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {recentLog.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.06 }}
                className="p-4 bg-stone-100/80 dark:bg-stone-900/60 rounded-xs border border-stone-200 dark:border-stone-800 group hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 hover:shadow-xs"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100">
                    {String(idx + 1).padStart(2, '0')}. {item.caption}
                  </span>
                  {item.achieved_on && (
                    <span className="text-[10px] font-mono font-medium text-stone-500 dark:text-stone-400">
                      {item.achieved_on.slice(0, 7)}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-2">
                  {item.body}
                </p>
                {item.image_path && (
                  <div className="mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      Certificate attached
                    </span>
                    <Link
                      to="/log"
                      className="text-[11px] font-mono font-semibold text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-1"
                    >
                      <span>View in Log</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
      )}
      {/* Dedicated Recent Photography Section Teaser */}
      
      {featuredPhotos.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="pt-8 sm:pt-10 border-t border-stone-200 dark:border-stone-800/60"
        >
          <div className="flex justify-between items-end border-b border-stone-200 dark:border-stone-800 pb-3 mb-6">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono">
                Recent Photography
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans font-medium">
                Shot on 35mm &amp; Medium Format Film &bull; Eastern Himalayas
              </p>
            </div>
            <Link
              to="/photography"
              className="text-xs font-mono font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white transition-colors py-1 inline-flex items-center gap-1 group/link"
            >
              <span>Gallery</span>
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredPhotos.map((photo, pIdx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + pIdx * 0.05 }}
              >
                <Link
                  to="/photography"
                  className="group block overflow-hidden rounded-xs border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/50 hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 hover:shadow-xs"
                >
                  <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-stone-200 dark:bg-stone-900">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      loading={pIdx < 2 ? "eager" : "lazy"}
                      onContextMenu={(e) => e.preventDefault()}
                      draggable="false"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none"
                    />
                  </div>
                  <div className="p-3.5 text-xs font-sans">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif font-bold text-sm sm:text-base text-stone-950 dark:text-stone-50 truncate group-hover:underline decoration-stone-400 underline-offset-4">
                        {photo.title}
                      </span>
                      {photo.year && (
                        <span className="font-mono text-[11px] font-semibold text-stone-500 dark:text-stone-400 shrink-0">
                          {photo.year}
                        </span>
                      )}
                    </div>
                    {photo.location && (
                      <p className="text-[11px] font-mono font-medium text-stone-600 dark:text-stone-400 truncate mt-1">
                        {photo.location}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
