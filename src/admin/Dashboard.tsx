import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Briefcase,
  Award,
  Cpu,
  Wrench,
  Camera,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  getProjects,
  getAchievements,
  getPhotos,
  listMediaFiles,
} from '../lib/queries';
import { Project, Achievement, Photo, MediaFile } from '../types';
import { ProjectsEditor } from './ProjectsEditor';
import { AchievementsEditor } from './AchievementsEditor';
import { PhotosEditor } from './PhotosEditor';
import { MediaLibrary } from './MediaLibrary';
import { ThemeToggle } from '../components/ThemeToggle';
import { siteConfig } from '../config/siteConfig';

type ActiveTab = 'projects' | 'photography' | 'achievements' | 'media';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user, signOut, isConfigured, isDemoAdmin } = useAuth();
  const navigate = useNavigate();

  const loadAllData = async () => {
    try {
      const [proj, ach, ph, mf] = await Promise.all([
        getProjects(),
        getAchievements(),
        getPhotos(),
        listMediaFiles().catch(() => []),
      ]);

      setProjects(proj);
      setAchievements(ach);
      setPhotos(ph);
      setMediaFiles(mf);
    } catch (err) {
      console.error('Failed to load portfolio state:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" />, count: projects.length },
    { id: 'photography', label: 'Photography', icon: <Camera className="w-4 h-4" />, count: photos.length },
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" />, count: achievements.length },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-stone-950 text-stone-800 dark:text-stone-300 font-sans flex flex-col">
      {/* Admin Top Header */}
      <header className="border-b border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <Link
              to="/"
              className="text-base sm:text-lg font-serif font-semibold tracking-tight text-stone-900 dark:text-white hover:opacity-80 transition-opacity"
            >
              {siteConfig.profile.name}
            </Link>
            <span className="text-[11px] px-2 py-0.5 rounded-xs bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">
              Admin
            </span>

            {/* Supabase Status Indicator */}
            {isConfigured ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Supabase Live</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{isDemoAdmin ? 'Local Mode' : 'Unconfigured'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 text-xs">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors min-h-[36px]"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors min-h-[36px]"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <ThemeToggle />

            <div className="h-4 w-px bg-stone-300 dark:bg-stone-800" />

            <div className="flex items-center gap-2">
              <span className="text-stone-500 truncate max-w-[100px] sm:max-w-[180px] hidden sm:inline" title={user?.email || ''}>
                {user?.email || 'admin'}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-200 dark:bg-stone-800 rounded-xs transition-colors min-h-[36px]"
              >
                <LogOut className="w-3 h-3" />
                <span className="text-[11px]">Log out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Responsive Tab Bar (Horizontally scrollable on mobile, vertical sidebar on desktop) */}
        <aside className="md:col-span-3">
          <nav className="flex md:flex-col overflow-x-auto scrollbar-none pb-2 md:pb-0 gap-1.5 md:gap-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-medium whitespace-nowrap transition-colors shrink-0 md:shrink ${
                    active
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                      : 'bg-stone-100 md:bg-transparent dark:bg-stone-900 md:dark:bg-transparent text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                      active
                        ? 'bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-800'
                        : 'bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>


        </aside>

        {/* Content Area */}
        <main className="md:col-span-9 bg-[#fcfcfc] dark:bg-stone-950">
          {loading ? (
            <div className="py-24 text-center text-xs text-stone-400">
              <div className="w-6 h-6 border-2 border-stone-400 dark:border-stone-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <span>Loading resources...</span>
            </div>
          ) : (
            <>
              {activeTab === 'projects' && (
                <ProjectsEditor projects={projects} onRefresh={handleRefresh} />
              )}

              {activeTab === 'photography' && (
                <PhotosEditor
                  photos={photos}
                  mediaFiles={mediaFiles}
                  onPhotosUpdated={(newPhotos) => setPhotos(newPhotos)}
                />
              )}

              {activeTab === 'achievements' && (
                <AchievementsEditor achievements={achievements} onRefresh={handleRefresh} />
              )}

              {activeTab === 'media' && <MediaLibrary />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
