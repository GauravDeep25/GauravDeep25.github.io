import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { Achievement } from '../types';

interface CertificateModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function CertificateModal({ achievement, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!achievement) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [achievement, onClose]);

  if (!achievement) return null;

  // Format date if present
  let displayDate = achievement.achieved_on || '';
  if (achievement.achieved_on) {
    try {
      const d = new Date(achievement.achieved_on);
      displayDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      displayDate = achievement.achieved_on;
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        id="certificate-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="certificate-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#fcfcfc] dark:bg-stone-900 border border-stone-300 dark:border-stone-750 rounded-xs shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Award className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-stone-900 dark:text-stone-100 block">
                  Official Verification &amp; Certificate
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-200/60 dark:bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-300 dark:border-stone-700">
                ESC to close
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Certificate Modal"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white transition-colors rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: High-resolution Certificate Preview */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-5">
            {achievement.image_path ? (
              <div className="overflow-hidden rounded-xs border border-stone-300 dark:border-stone-750 bg-stone-100 dark:bg-stone-950 max-h-[60vh] flex items-center justify-center">
                <img
                  src={achievement.image_path}
                  alt={achievement.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[58vh] object-contain select-none"
                  loading="lazy"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-stone-300 dark:border-stone-700 rounded-xs bg-stone-50 dark:bg-stone-900">
                <ShieldCheck className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-mono text-stone-600 dark:text-stone-400">
                  Verified Record &bull; Direct digital certification confirmed
                </p>
              </div>
            )}

            {/* Certificate Details */}
            <div className="pt-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-50">
                  {achievement.caption}
                </h2>
                {displayDate && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 bg-stone-200/60 dark:bg-stone-800 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3 h-3 text-stone-500" />
                    <span>{displayDate}</span>
                  </span>
                )}
              </div>

              {achievement.body && (
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans mt-2">
                  {achievement.body}
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 sm:px-7 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/80 flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Authenticated Portfolio Record
            </span>

            {achievement.image_path && (
              <a
                href={achievement.image_path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-950 dark:hover:text-white bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-xs border border-stone-300 dark:border-stone-700 transition-colors"
              >
                <span>Open Full Size</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
