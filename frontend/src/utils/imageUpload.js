import { supabase } from '../supabaseClient';

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name (default: 'portfolio-images')
 * @param {string} folder - Optional folder path within the bucket
 * @returns {Promise<{url: string, path: string} | {error: string}>}
 */
export const uploadImage = async (file, bucket = 'portfolio-images', folder = '') => {
  try {
    // Validate file
    if (!file) {
      return { error: 'No file provided' };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { error: 'File size must be less than 5MB' };
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return { error: 'File must be an image (JPEG, PNG, GIF, or WebP)' };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Upload exception:', error);
    return { error: error.message || 'Failed to upload image' };
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} filePath - The file path in storage
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<{success: boolean} | {error: string}>}
 */
export const deleteImage = async (filePath, bucket = 'portfolio-images') => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: error.message || 'Failed to delete image' };
  }
};

/**
 * Get the public URL for an image
 * @param {string} filePath - The file path in storage
 * @param {string} bucket - The storage bucket name
 * @returns {string} - The public URL
 */
export const getImageUrl = (filePath, bucket = 'portfolio-images') => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};
