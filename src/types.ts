export interface Profile {
  id: number;
  name: string;
  role: string;
  location: string;
  tagline: string;
  short_bio: string;
  long_bio: string;
  email: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  updated_at?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  description?: string;
  highlights?: string[];
  sort_order?: number;
}

export interface Project {
  id: string;
  title: string;
  tech_stack: string;
  year: number;
  description: string;
  link_url?: string;
  link_label?: string;
  image_path?: string;
  sort_order: number;
  created_at?: string;
}

export interface Achievement {
  id: string;
  caption: string;
  body: string;
  achieved_on?: string;
  image_path?: string;
  sort_order: number;
  created_at?: string;
}

export interface Capability {
  id: string;
  label: string;
  sort_order: number;
}

export interface ToolItem {
  id: string;
  label: string;
  sort_order: number;
}

export interface Photo {
  id: string;
  title: string;
  caption?: string;
  image_url: string;
  location?: string;
  camera_info?: string;
  category?: string;
  year?: number;
  sort_order: number;
  is_featured?: boolean;
  created_at?: string;
}

export interface MediaFile {
  name: string;
  id?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  last_accessed_at?: string | null;
  metadata?: Record<string, any> | null;
  publicUrl: string;
}
