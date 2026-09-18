import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Achievement } from '../types';
import { LogCard } from '../components/LogCard';
import { CertificateModal } from '../components/CertificateModal';
import { Terminal, Shield, Award } from 'lucide-react';

interface LogProps {
  achievements: Achievement[];
  loading: boolean;
}

export function Log({ achievements, loading }: LogProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null);

  if (loading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-8 bg-stone-200 dark:bg-stone-900 rounded w-1/4 mb-12"></div>
        <div className="space-y-8 pl-6 border-l-2 border-stone-200 dark:border-stone-800">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-3 pb-8">
              <div className="h-4 bg-stone-200 dark:bg-stone-900 rounded w-32"></div>
              <div className="h-6 bg-stone-200 dark:bg-stone-900 rounded w-3/4"></div>
              <div className="h-16 bg-stone-200 dark:bg-stone-900 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Count items with verified certificates
  const certificatesCount = achievements.filter((a) => Boolean(a.image_path)).length;

  return (
    <motion.div
      id="log-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 sm:space-y-12"
    >
      {/* Editorial Log Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            <span>Chronological Engineering Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight">
            System &amp; Activity Log
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans font-medium">
            Competitions, CTFs, security research milestones, and verified credentials
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0 font-mono text-xs">
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            {achievements.length} {achievements.length === 1 ? 'Entry' : 'Entries'}
          </span>
          <span className="text-stone-300 dark:text-stone-700">&bull;</span>
          <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Award className="w-3 h-3" />
            <span>{certificatesCount} Certificates</span>
          </span>
        </div>
      </div>

      {/* Chronological Log Stream */}
      {achievements.length === 0 ? (
        <p className="text-stone-600 dark:text-stone-400 text-sm py-16 text-center font-sans">
          No log entries recorded yet.
        </p>
      ) : (
        <div className="max-w-4xl pt-4">
          <div className="ml-2 sm:ml-3">
            {achievements.map((achievement, index) => (
              <LogCard
                key={achievement.id}
                achievement={achievement}
                index={index}
                onViewCertificate={(item) => setSelectedCertificate(item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Certificate Viewer Lightbox / Modal */}
      <CertificateModal
        achievement={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </motion.div>
  );
}
