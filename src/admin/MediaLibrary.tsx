import React, { useState, useEffect } from 'react';
import { MediaFile } from '../types';
import { listMediaFiles, uploadMediaFile, deleteMediaFile } from '../lib/queries';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  isPicker?: boolean;
}

export function MediaLibrary({ onSelectImage, isPicker = false }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listMediaFiles();
      setFiles(data);
    } catch (err: any) {
      console.error('Failed to load media files:', err);
      setError(err.message || 'Failed to list media files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        await uploadMediaFile(file);
      }
      await loadFiles();
    } catch (err: any) {
      console.error('File upload error:', err);
      setError(err.message || 'File upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!window.confirm(`Delete image "${fileName}"?`)) return;

    try {
      await deleteMediaFile(fileName);
      setFiles((prev) => prev.filter((f) => f.name !== fileName));
    } catch (err: any) {
      console.error('Failed to delete file:', err);
      setError(err.message || 'Could not delete file');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif text-stone-900 dark:text-stone-100">
            Media Library
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Supabase Storage bucket <code className="font-mono bg-stone-100 dark:bg-stone-900 px-1 py-0.5 rounded">portfolio-media</code>
          </p>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors rounded-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-sm text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-stone-200 dark:bg-stone-900 rounded-sm"></div>
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-200 dark:border-stone-800 rounded-sm">
          <ImageIcon className="w-8 h-8 mx-auto text-stone-400 mb-2" />
          <p className="text-xs text-stone-500">No media uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="group relative bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-950 overflow-hidden relative">
                <img
                  src={file.publicUrl}
                  alt={file.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {isPicker && onSelectImage && (
                  <button
                    type="button"
                    onClick={() => onSelectImage(file.publicUrl)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase font-medium tracking-wider"
                  >
                    Select Image
                  </button>
                )}
              </div>

              <div className="p-2.5 bg-stone-50 dark:bg-stone-900/90 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-1 text-xs">
                <span className="truncate text-stone-700 dark:text-stone-300 text-[11px]" title={file.name}>
                  {file.name}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(file.publicUrl)}
                    title="Copy Public URL"
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    {copiedUrl === file.publicUrl ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(file.name)}
                    title="Delete Image"
                    className="p-1 text-stone-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
