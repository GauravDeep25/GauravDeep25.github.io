import React from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, FileCheck, ArrowUpRight } from 'lucide-react';
import { Achievement } from '../types';

interface LogCardProps {
  achievement: Achievement;
  index: number;
  onViewCertificate: (achievement: Achievement) => void;
}

export function LogCard({ achievement, index, onViewCertificate }: LogCardProps) {
  const formattedIndex = String(index + 1).padStart(2, '0');

  // Format date if present (e.g. "2026-02-15" -> "15 Feb 2026")
  let displayDate = achievement.achieved_on || '';
  if (achievement.achieved_on) {
    try {
      const d = new Date(achievement.achieved_on);
      displayDate = d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      displayDate = achievement.achieved_on;
    }
  }

  const hasCertificate = Boolean(achievement.image_path);

  return (
    <motion.article
      id={`log-${achievement.id}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-6 sm:pl-8 pb-10 border-l-2 border-stone-200 dark:border-stone-800 last:border-transparent group"
    >
      {/* Timeline Node Dot */}
      <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border-2 border-stone-50 dark:border-stone-950 group-hover:bg-stone-950 dark:group-hover:bg-stone-100 group-hover:scale-125 transition-all duration-300" />

      {/* Log Entry Header */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2 font-mono text-xs">
        <span className="font-bold text-stone-950 dark:text-stone-100 tracking-wider">
          LOG #{formattedIndex}
        </span>
        <span className="text-stone-300 dark:text-stone-700">&bull;</span>
        {displayDate && (
          <span className="font-semibold text-stone-600 dark:text-stone-400">
            {displayDate}
          </span>
        )}
        {hasCertificate && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <FileCheck className="w-3 h-3" />
            <span>Certificate Available</span>
          </span>
        )}
      </div>

      {/* Log Caption / Title */}
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-50 mb-3 tracking-tight group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
        {achievement.caption}
      </h2>

      {/* Log Body Text */}
      {achievement.body && (
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans font-normal max-w-3xl mb-4">
          {achievement.body}
        </p>
      )}

      {/* View Certificate Action at the end of every log */}
      {hasCertificate ? (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onViewCertificate(achievement)}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] text-xs font-mono font-bold text-stone-950 dark:text-stone-50 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-850 border border-stone-300 dark:border-stone-700 hover:border-stone-500 dark:hover:border-stone-500 rounded-xs transition-all cursor-pointer shadow-xs group/btn"
          >
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover/btn:scale-110 transition-transform" />
            <span>View Certificate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="pt-1 text-xs font-mono text-stone-400 dark:text-stone-600 italic">
          Verified Activity Record
        </div>
      )}
    </motion.article>
  );
}
