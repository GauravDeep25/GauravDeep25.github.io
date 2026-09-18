import React from 'react';
import { Mail, MapPin, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { Profile, Capability, ToolItem, EducationItem } from '../types';
import { ContactForm } from '../components/ContactForm';

interface AboutProps {
  profile: Profile | null;
  capabilities: Capability[];
  tools: ToolItem[];
  loading: boolean;
}

export function About({ profile, capabilities, tools, loading }: AboutProps) {
  const longBio =
    profile?.long_bio ||
    'I am a developer and cybersecurity enthusiast based in Sikkim, India. My journey started with curiosity about how network protocols and modern applications operate under stress.';
  const email = profile?.email || 'contact@gdeep.in';
  const location = profile?.location || 'Sikkim, India';

  // Split bio by paragraphs
  const paragraphs = longBio.split('\n\n').filter(Boolean);



  return (
    <motion.div
      id="about-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-16"
    >
      {/* Left column: Bio & Contact */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="md:col-span-7"
      >
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-stone-50 mb-6 sm:mb-8 tracking-tight">
          About &amp; Practice
        </h1>

        <div className="space-y-4 sm:space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base font-sans font-normal">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {location && (
          <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans font-medium">
            <MapPin className="w-4 h-4 shrink-0 text-stone-500" />
            <span>Based in {location}</span>
          </div>
        )}

        <div className="mt-6 sm:mt-8">
          <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 mb-2 font-mono">
            Direct Contact
          </h2>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center min-h-[44px] gap-2.5 text-sm sm:text-base font-semibold text-stone-950 dark:text-stone-50 hover:text-stone-900 dark:hover:text-white transition-all border-b-2 border-stone-300 dark:border-stone-700 hover:border-stone-950 dark:hover:border-white pb-1 focus-visible:ring-2 focus-visible:ring-stone-400 rounded-xs"
          >
            <Mail className="w-4 h-4 text-stone-500" />
            <span>{email}</span>
          </a>
        </div>

        {/* Education Timeline Section (Recent at the Top) */}
        <section id="education-timeline" className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono">
              Academic Background &amp; Education
            </h2>
          </div>

          <div className="ml-1 sm:ml-2">
            {[
              {
                id: 'edu-1',
                degree: 'B.Tech in Computer Science & Engineering',
                institution: 'Sikkim Manipal Institute of Technology (SMIT)',
                location: 'Majitar, Sikkim',
                period: '2022 — 2026',
                description:
                  'Undergraduate studies focusing on systems programming, computer networks, and cybersecurity. Actively building defensive/offensive security tools, participating in CTFs, and researching web application security.',
                highlights: [
                  'Specialization: Network Security, Cryptography, Systems Architecture',
                  'Member: SIGIL (Special Interest Group for Information Liberation) & IIC',
                ],
              },
              {
                id: 'edu-2',
                degree: 'Higher Secondary Education (Class XII) — Science',
                institution: 'Senior Secondary School (CBSE)',
                location: 'Sikkim, India',
                period: '2020 — 2022',
                description:
                  'Rigorous foundational pre-university training with primary coursework in Mathematics, Physics, Chemistry, and Computer Science.',
                highlights: [
                  'Core subjects: Mathematics, Physics, Computer Science',
                ],
              },
              {
                id: 'edu-3',
                degree: 'Secondary School Examination (Class X)',
                institution: 'Secondary School (CBSE)',
                location: 'Sikkim, India',
                period: '2018 — 2020',
                description:
                  'Foundational general sciences, advanced mathematics, and introduction to computer programming fundamentals.',
              },
            ].map((edu, idx) => (
              <div
                key={edu.id}
                className="relative pl-6 sm:pl-8 pb-8 last:pb-2 border-l-2 border-stone-200 dark:border-stone-800 group"
              >
                {/* Timeline node */}
                <span
                  className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-[#fcfcfc] dark:border-stone-950 transition-all duration-300 ${
                    idx === 0
                      ? 'bg-stone-950 dark:bg-stone-50 scale-110 ring-4 ring-stone-200/70 dark:ring-stone-800/80'
                      : 'bg-stone-400 dark:bg-stone-600 group-hover:bg-stone-950 dark:group-hover:bg-stone-100'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-full border border-stone-200 dark:border-stone-700">
                    {edu.period}
                  </span>
                  {edu.location && (
                    <span className="text-[11px] font-mono font-medium text-stone-500 dark:text-stone-400">
                      {edu.location}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-950 dark:text-stone-50 mt-1">
                  {edu.degree}
                </h3>

                <div className="text-xs sm:text-sm font-sans font-semibold text-stone-800 dark:text-stone-200 mt-0.5">
                  {edu.institution}
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-2 leading-relaxed font-sans">
                    {edu.description}
                  </p>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-2.5 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-xs font-mono text-stone-600 dark:text-stone-400 flex items-start gap-2"
                      >
                        <span className="text-stone-400 dark:text-stone-600 mt-0.5">&rarr;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Integrated FormSubmit Contact Form */}
        <ContactForm recipientEmail={email} />
      </motion.div>

      {/* Right column: Structured lists (Capabilities + Tools) */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.14 }}
        className="md:col-span-5 space-y-12"
      >
        {/* Capabilities */}
        <div>
          <div className="flex justify-between items-baseline border-b border-stone-200 dark:border-stone-800 pb-3 mb-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono">
              Capabilities &amp; Core Stack
            </h2>
            <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400">
              {capabilities.length} items
            </span>
          </div>
          <ul className="space-y-1 text-sm text-stone-800 dark:text-stone-200 font-sans">
            {capabilities.map((c, idx) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.15 + idx * 0.03 }}
                className="flex items-center justify-between py-2 px-2.5 rounded-xs border-b border-stone-200/60 dark:border-stone-800/60 hover:bg-stone-100/70 dark:hover:bg-stone-900/50 transition-colors font-medium"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-600 shrink-0" />
                  <span>{c.label}</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <div className="flex justify-between items-baseline border-b border-stone-200 dark:border-stone-800 pb-3 mb-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-950 dark:text-stone-100 font-mono">
              Tools &amp; Environment
            </h2>
            <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400">
              {tools.length} items
            </span>
          </div>
          <ul className="space-y-1 text-sm text-stone-800 dark:text-stone-200 font-sans">
            {tools.map((t, idx) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.2 + idx * 0.03 }}
                className="flex items-center justify-between py-2 px-2.5 rounded-xs border-b border-stone-200/60 dark:border-stone-800/60 hover:bg-stone-100/70 dark:hover:bg-stone-900/50 transition-colors font-medium"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-600 shrink-0" />
                  <span>{t.label}</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
