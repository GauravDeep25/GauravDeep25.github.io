import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Helper function to sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Photography helper functions
export const fetchPhotos = async () => {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return { data: null, error };
  return { data, error: null };
};

export const createPhoto = async (photoData) => {
  const { data, error } = await supabase
    .from('photos')
    .insert([photoData])
    .select();

  if (error) return { data: null, error };
  return { data, error: null };
};

export const updatePhoto = async (id, photoData) => {
  const { data, error } = await supabase
    .from('photos')
    .update(photoData)
    .eq('id', id)
    .select();

  if (error) return { data: null, error };
  return { data, error: null };
};

export const deletePhoto = async (id) => {
  const { error } = await supabase
    .from('photos')
    .delete()
    .eq('id', id);

  if (error) return { error };
  return { error: null };
};

export const uploadPhotoFile = async (file, folder = 'photography') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('photography')
    .upload(filePath, file);

  if (uploadError) return { url: null, error: uploadError };

  const { data: { publicUrl } } = supabase.storage
    .from('photography')
    .getPublicUrl(filePath);

  return { url: publicUrl, error: null };
};
