import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Photography } from './pages/Photography';
import { Log } from './pages/Log';
import { About } from './pages/About';
import {
  getProjects,
  getAchievements,
  getPhotos,
} from './lib/queries';
import { Profile, Project, Achievement, Photo } from './types';
import { siteConfig } from './config/siteConfig';

const Login = lazy(() => import('./admin/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('./admin/Dashboard').then(m => ({ default: m.Dashboard })));

function PublicLayout({ profile }: { profile: Profile | null }) {
  return (
    <div className="bg-[#fcfcfc] text-stone-800 dark:bg-stone-950 dark:text-stone-300 font-sans min-h-screen flex flex-col antialiased selection:bg-stone-300 dark:selection:bg-stone-700 selection:text-stone-900 dark:selection:text-white">
      {/* Navigation (Not Fixed, scrolls away naturally per design spec) */}
      <Nav profile={profile} />

      {/* Main Content View Container - mobile optimized padding */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
        <Outlet />
      </main>

      {/* Editorial Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600 dark:text-stone-400 font-mono font-medium text-center sm:text-left">
        <div>
          <span className="font-semibold text-stone-900 dark:text-stone-200">{profile?.name || 'Gaurav Deep'}</span> &copy; {new Date().getFullYear()}
          <span className="mx-2">&bull;</span>
          <span>{profile?.location || 'Sikkim, India'}</span>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
          <a
            href={profile?.github_url || 'https://github.com/GauravDeep25'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-2 rounded-xs text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer min-h-[44px] sm:min-h-0"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <span className="text-stone-300 dark:text-stone-700 select-none">&bull;</span>

          <a
            href={profile?.linkedin_url || 'https://linkedin.com/in/gauravdeep25/'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-2 rounded-xs text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer min-h-[44px] sm:min-h-0"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <span className="text-stone-300 dark:text-stone-700 select-none">&bull;</span>

          <a
            href={profile?.instagram_url || 'https://instagram.com/gaurav.d.jpg'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-2 rounded-xs text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer min-h-[44px] sm:min-h-0"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [proj, ach, ph] = await Promise.all([
        getProjects(),
        getAchievements(),
        getPhotos(),
      ]);

      setProjects(proj);
      setAchievements(ach);
      setPhotos(ph);
    } catch (err) {
      console.error('Error loading portfolio state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route element={<PublicLayout profile={siteConfig.profile as any} />}>
              <Route
                path="/"
                element={
                  <Home
                    profile={siteConfig.profile as any}
                    projects={projects}
                    achievements={achievements}
                    photos={photos}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/work"
                element={<Work projects={projects} loading={loading} />}
              />
              <Route
                path="/photography"
                element={<Photography photos={photos} loading={loading} />}
              />
              <Route
                path="/log"
                element={<Log achievements={achievements} loading={loading} />}
              />
              <Route
                path="/about"
                element={
                  <About
                    profile={siteConfig.profile as any}
                    capabilities={siteConfig.capabilities as any}
                    tools={siteConfig.tools as any}
                    loading={loading}
                  />
                }
              />
            </Route>

            {/* Secret Admin Panel Routes */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-500 font-mono text-sm">Loading admin...</div>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-500 font-mono text-sm">Loading admin...</div>}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            {/* Secret /admin redirects to /admin/dashboard (which triggers login if no session) */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
