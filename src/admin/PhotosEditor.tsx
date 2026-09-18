import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Camera, Check, ExternalLink, Image as ImageIcon, Upload, X } from 'lucide-react';
import { Photo, MediaFile } from '../types';
import { createPhoto, updatePhoto, deletePhoto } from '../lib/queries';

interface PhotosEditorProps {
  photos: Photo[];
  mediaFiles: MediaFile[];
  onPhotosUpdated: (photos: Photo[]) => void;
}

export function PhotosEditor({ photos, mediaFiles, onPhotosUpdated }: PhotosEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    image_url: '',
    location: '',
    camera_info: '',
    category: 'Landscape',
    year: new Date().getFullYear(),
    sort_order: 1,
    is_featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_url: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAdd = () => {
    setEditingPhoto(null);
    setFormData({
      title: '',
      caption: '',
      image_url: '',
      location: '',
      camera_info: '',
      category: 'Landscape',
      year: new Date().getFullYear(),
      sort_order: photos.length + 1,
      is_featured: false,
    });
    setError(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (photo: Photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      caption: photo.caption || '',
      image_url: photo.image_url,
      location: photo.location || '',
      camera_info: photo.camera_info || '',
      category: photo.category || 'Landscape',
      year: photo.year || new Date().getFullYear(),
      sort_order: photo.sort_order,
      is_featured: photo.is_featured || false,
    });
    setError(null);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image_url.trim()) {
      setError('Title and Image URL are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingPhoto) {
        const updated = await updatePhoto(editingPhoto.id, formData);
        onPhotosUpdated(photos.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await createPhoto(formData);
        onPhotosUpdated([...photos, created]);
      }
      setIsEditing(false);
    } catch (err: any) {
      console.error('Failed saving photograph:', err);
      setError(err.message || 'Failed saving photograph record');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this photograph from the gallery?')) return;
    try {
      await deletePhoto(id);
      onPhotosUpdated(photos.filter((p) => p.id !== id));
    } catch (err: any) {
      alert('Failed to delete photo: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-lg font-serif text-stone-900 dark:text-stone-100">
            Photography Gallery
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Manage public portfolio photographs, 35mm film specs, locations, and homepage highlights
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-stone-800 dark:hover:bg-white transition-colors min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photograph</span>
        </button>
      </div>

      {/* Responsive Table / Cards Container */}
      {photos.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-stone-300 dark:border-stone-800 rounded-sm">
          <Camera className="w-8 h-8 mx-auto text-stone-400 mb-3" />
          <p className="text-sm text-stone-600 dark:text-stone-400">No photographs published yet.</p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="mt-3 text-xs text-stone-900 dark:text-stone-100 underline hover:no-underline"
          >
            Add your first photograph
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-sm">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-stone-100 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Preview</th>
                <th className="p-3">Title &amp; Info</th>
                <th className="p-3 hidden sm:table-cell">Location &amp; Gear</th>
                <th className="p-3 text-center">Featured</th>
                <th className="p-3 text-center">Order</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              {photos.map((photo) => (
                <tr key={photo.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/30 transition-colors">
                  <td className="p-3 w-16">
                    <div className="w-14 h-14 bg-stone-200 dark:bg-stone-900 rounded-xs overflow-hidden border border-stone-200 dark:border-stone-800">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="p-3 max-w-[200px]">
                    <span className="font-serif font-medium text-sm text-stone-900 dark:text-white block truncate">
                      {photo.title}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate mt-0.5">
                      {photo.category || 'Landscape'} &bull; {photo.year || '—'}
                    </span>
                    {/* Mobile fallback for gear/location */}
                    <span className="text-[10px] text-stone-400 sm:hidden block truncate mt-0.5">
                      {photo.location || photo.camera_info}
                    </span>
                  </td>

                  <td className="p-3 hidden sm:table-cell text-stone-500 dark:text-stone-400 text-[11px]">
                    <div className="truncate max-w-[180px]">{photo.location || '—'}</div>
                    <div className="text-[10px] font-mono text-stone-400 truncate max-w-[180px] mt-0.5">
                      {photo.camera_info || '—'}
                    </div>
                  </td>

                  <td className="p-3 text-center">
                    {photo.is_featured ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                        Home
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[10px]">—</span>
                    )}
                  </td>

                  <td className="p-3 text-center font-mono text-[11px] text-stone-500">
                    {photo.sort_order}
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-1 justify-end">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(photo)}
                        title="Edit photo"
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(photo.id)}
                        title="Delete photo"
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit / Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-sm max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 font-sans shadow-2xl">
            <h3 className="text-lg font-serif text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-3">
              {editingPhoto ? 'Edit Photograph' : 'Add New Photograph'}
            </h3>

            {error && (
              <p className="p-3 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 text-xs rounded-xs">
                {error}
              </p>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Concrete & Light"
                  className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Caption / Field Note
                </label>
                <textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Atmospheric notes, shadow play, story behind the frame..."
                  className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Image URL or Upload *
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Base64 Data or https://..."
                    className="flex-1 px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                  
                  <label className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 rounded-xs cursor-pointer transition-colors text-xs uppercase tracking-wider font-medium min-h-[38px]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {formData.image_url && (
                  <div className="relative w-32 h-24 mt-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xs overflow-hidden">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                      className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full hover:bg-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Gangtok, Sikkim"
                    className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Architecture, Landscape"
                    className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Camera / Film Gear Specs
                </label>
                <input
                  type="text"
                  value={formData.camera_info}
                  onChange={(e) => setFormData({ ...formData, camera_info: e.target.value })}
                  placeholder="e.g. 35mm Film • Olympus OM-1 / Kodak Portra 400"
                  className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-sm bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded-xs border-stone-300 text-stone-900 focus:ring-0 w-4 h-4"
                  />
                  <span className="text-stone-700 dark:text-stone-300 text-xs">
                    Feature on Homepage (Recent Photography strip)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 uppercase tracking-wider text-[11px] font-medium rounded-xs hover:bg-stone-800 dark:hover:bg-white transition-colors disabled:opacity-50 min-h-[40px]"
                >
                  {saving ? 'Saving...' : editingPhoto ? 'Update Photo' : 'Publish Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
