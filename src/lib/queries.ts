import { supabase, isSupabaseConfigured, BUCKET_NAME } from './supabaseClient';
import {
  Project,
  Achievement,
  MediaFile,
  Photo,
} from '../types';
import {
  initialProjects,
  initialAchievements,
  initialPhotos,
} from '../data/seedData';

// Local storage backup keys for offline / preview fallback mode
const LOCAL_STORAGE_KEYS = {
  projects: 'portfolio_projects_data',
  achievements: 'portfolio_achievements_data',
  photos: 'portfolio_photos_data',
  media: 'portfolio_media_data',
};

function getLocalData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
  } catch (e) {
    console.warn(`Failed reading local cache for ${key}`, e);
  }
  return defaultValue;
}

function setLocalData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed writing local cache for ${key}`, e);
  }
}



// ==========================================
// PROJECTS QUERIES
// ==========================================

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    return getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Error fetching projects from Supabase:', error);
      return getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
    }

    if (!data || data.length === 0) {
      return getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
    }

    return data as Project[];
  } catch (err) {
    console.error('getProjects exception:', err);
    return getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
  }
}

export async function createProject(projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
    const newProject: Project = {
      ...projectData,
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const updatedList = [newProject, ...list];
    setLocalData(LOCAL_STORAGE_KEYS.projects, updatedList);
    return newProject;
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
    const updatedList = list.map((p) => (p.id === id ? { ...p, ...projectData } : p));
    setLocalData(LOCAL_STORAGE_KEYS.projects, updatedList);
    const found = updatedList.find((p) => p.id === id);
    if (!found) throw new Error('Project not found');
    return found;
  }

  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Project[]>(LOCAL_STORAGE_KEYS.projects, initialProjects);
    const updatedList = list.filter((p) => p.id !== id);
    setLocalData(LOCAL_STORAGE_KEYS.projects, updatedList);
    return;
  }

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ==========================================
// ACHIEVEMENTS / LOG QUERIES
// ==========================================

export async function getAchievements(): Promise<Achievement[]> {
  if (!isSupabaseConfigured) {
    return getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
  }

  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('achieved_on', { ascending: false });

    if (error) {
      console.warn('Error fetching achievements from Supabase:', error);
      return getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
    }

    if (!data || data.length === 0) {
      return getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
    }

    return data as Achievement[];
  } catch (err) {
    console.error('getAchievements exception:', err);
    return getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
  }
}

export async function createAchievement(
  achievementData: Omit<Achievement, 'id' | 'created_at'>
): Promise<Achievement> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
    const newAchievement: Achievement = {
      ...achievementData,
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const updatedList = [...list, newAchievement];
    setLocalData(LOCAL_STORAGE_KEYS.achievements, updatedList);
    return newAchievement;
  }

  const { data, error } = await supabase
    .from('achievements')
    .insert([achievementData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Achievement;
}

export async function updateAchievement(
  id: string,
  achievementData: Partial<Achievement>
): Promise<Achievement> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
    const updatedList = list.map((a) => (a.id === id ? { ...a, ...achievementData } : a));
    setLocalData(LOCAL_STORAGE_KEYS.achievements, updatedList);
    const found = updatedList.find((a) => a.id === id);
    if (!found) throw new Error('Achievement not found');
    return found;
  }

  const { data, error } = await supabase
    .from('achievements')
    .update(achievementData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Achievement;
}

export async function deleteAchievement(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Achievement[]>(LOCAL_STORAGE_KEYS.achievements, initialAchievements);
    const updatedList = list.filter((a) => a.id !== id);
    setLocalData(LOCAL_STORAGE_KEYS.achievements, updatedList);
    return;
  }

  const { error } = await supabase.from('achievements').delete().eq('id', id);
  if (error) throw new Error(error.message);
}



// ==========================================
// PHOTOGRAPHY QUERIES
// ==========================================

export async function getPhotos(): Promise<Photo[]> {
  if (!isSupabaseConfigured) {
    return getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
  }

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('year', { ascending: false });

    if (error) {
      console.warn('Error fetching photos from Supabase:', error);
      return getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
    }

    if (!data || data.length === 0) {
      return getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
    }

    return data as Photo[];
  } catch (err) {
    console.error('getPhotos exception:', err);
    return getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
  }
}

export async function createPhoto(photoData: Omit<Photo, 'id' | 'created_at'>): Promise<Photo> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
    const newPhoto: Photo = {
      ...photoData,
      id: 'local-ph-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const updated = [newPhoto, ...list];
    setLocalData(LOCAL_STORAGE_KEYS.photos, updated);
    return newPhoto;
  }

  const { data, error } = await supabase
    .from('photos')
    .insert([photoData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Photo;
}

export async function updatePhoto(id: string, photoData: Partial<Photo>): Promise<Photo> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
    const updated = list.map((p) => (p.id === id ? { ...p, ...photoData } : p));
    setLocalData(LOCAL_STORAGE_KEYS.photos, updated);
    const found = updated.find((p) => p.id === id);
    if (!found) throw new Error('Photo not found');
    return found;
  }

  const { data, error } = await supabase
    .from('photos')
    .update(photoData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Photo;
}

export async function deletePhoto(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const list = getLocalData<Photo[]>(LOCAL_STORAGE_KEYS.photos, initialPhotos);
    const updated = list.filter((p) => p.id !== id);
    setLocalData(LOCAL_STORAGE_KEYS.photos, updated);
    return;
  }

  const { error } = await supabase.from('photos').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ==========================================
// STORAGE / MEDIA QUERIES
// ==========================================

const DEFAULT_MEDIA_FILES: MediaFile[] = [
  {
    name: 'detectify-hero.jpg',
    publicUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString(),
  },
  {
    name: 'ticketsphere-showcase.jpg',
    publicUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString(),
  },
  {
    name: 'monastery360-preview.jpg',
    publicUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString(),
  },
  {
    name: 'ctf-terminal.jpg',
    publicUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString(),
  },
  {
    name: 'sikkim-heritage.jpg',
    publicUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString(),
  },
];

export async function listMediaFiles(): Promise<MediaFile[]> {
  if (!isSupabaseConfigured) {
    return getLocalData<MediaFile[]>(LOCAL_STORAGE_KEYS.media, DEFAULT_MEDIA_FILES);
  }

  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      console.warn('Error listing files from Supabase Storage:', error);
      return getLocalData<MediaFile[]>(LOCAL_STORAGE_KEYS.media, DEFAULT_MEDIA_FILES);
    }

    if (!data || data.length === 0) {
      return getLocalData<MediaFile[]>(LOCAL_STORAGE_KEYS.media, DEFAULT_MEDIA_FILES);
    }

    return data
      .filter((file) => !file.name.startsWith('.'))
      .map((file) => {
        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(file.name);

        return {
          name: file.name,
          id: file.id,
          created_at: file.created_at,
          updated_at: file.updated_at,
          metadata: file.metadata,
          publicUrl: publicUrlData.publicUrl,
        };
      });
  } catch (err) {
    console.error('listMediaFiles exception:', err);
    return getLocalData<MediaFile[]>(LOCAL_STORAGE_KEYS.media, DEFAULT_MEDIA_FILES);
  }
}

export async function uploadMediaFile(file: File): Promise<{ name: string; publicUrl: string }> {
  // Sanitize filename
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueName = `${Date.now()}_${cleanName}`;

  if (!isSupabaseConfigured) {
    // In local demo mode, create an object URL or data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const publicUrl = reader.result as string;
        const newFile: MediaFile = {
          name: uniqueName,
          publicUrl,
          created_at: new Date().toISOString(),
        };
        const current = getLocalData<MediaFile[]>(LOCAL_STORAGE_KEYS.media, DEFAULT_MEDIA_FILES);
        setLocalData(LOCAL_STORAGE_KEYS.media, [newFile, ...current]);
        resolve({ name: uniqueName, publicUrl });
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(uniqueName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    name: uniqueName,
    publicUrl: publicUrlData.publicUrl,
  };
}

export async function deleteMediaFile(fileName: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const current = getLocalData<MediaFile[]>(LOCAL_STORAGE_KEYS.media, DEFAULT_MEDIA_FILES);
    const updated = current.filter((f) => f.name !== fileName);
    setLocalData(LOCAL_STORAGE_KEYS.media, updated);
    return;
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);
  if (error) throw new Error(error.message);
}
