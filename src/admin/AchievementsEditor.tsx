import React, { useState } from 'react';
import { Achievement } from '../types';
import { createAchievement, updateAchievement, deleteAchievement } from '../lib/queries';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Upload } from 'lucide-react';

interface AchievementsEditorProps {
  achievements: Achievement[];
  onRefresh: () => Promise<void>;
}

export function AchievementsEditor({ achievements, onRefresh }: AchievementsEditorProps) {
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_path: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const [formData, setFormData] = useState({
    caption: '',
    body: '',
    achieved_on: new Date().toISOString().split('T')[0],
    image_path: '',
    sort_order: 0,
  });

  const openCreateModal = () => {
    setFormData({
      caption: '',
      body: '',
      achieved_on: new Date().toISOString().split('T')[0],
      image_path: '',
      sort_order: achievements.length + 1,
    });
    setEditingItem(null);
    setIsCreating(true);
  };

  const openEditModal = (item: Achievement) => {
    setFormData({
      caption: item.caption,
      body: item.body || '',
      achieved_on: item.achieved_on || new Date().toISOString().split('T')[0],
      image_path: item.image_path || '',
      sort_order: item.sort_order || 0,
    });
    setEditingItem(item);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      if (editingItem) {
        await updateAchievement(editingItem.id, formData);
        setToast({ type: 'success', message: `Updated log entry successfully.` });
      } else {
        await createAchievement(formData);
        setToast({ type: 'success', message: `Created log entry successfully.` });
      }
      await onRefresh();
      closeModal();
      setTimeout(() => setToast(null), 4000);
    } catch (err: any) {
      console.error('Achievement save error:', err);
      setToast({ type: 'error', message: err.message || 'Failed to save log entry' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Achievement) => {
    if (!window.confirm(`Delete log entry "${item.caption}"?`)) return;

    try {
      await deleteAchievement(item.id);
      await onRefresh();
      setToast({ type: 'success', message: 'Log entry deleted.' });
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      console.error('Delete achievement error:', err);
      setToast({ type: 'error', message: err.message || 'Failed to delete' });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif text-stone-900 dark:text-stone-100">
            Achievements &amp; Log Entries
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Manage records displayed on the Log masonry grid and Home page teaser
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors rounded-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Log Entry</span>
        </button>
      </div>

      {toast && (
        <div
          className={`p-3 rounded-sm text-xs border ${
            toast.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Log list / table */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
            <tr>
              <th className="py-3 px-4 w-12 text-center">Order</th>
              <th className="py-3 px-4">Caption</th>
              <th className="py-3 px-4 hidden md:table-cell">Body Preview</th>
              <th className="py-3 px-4 hidden sm:table-cell">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
            {achievements.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-stone-500">
                  No log entries recorded yet.
                </td>
              </tr>
            ) : (
              achievements.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors"
                >
                  <td className="py-3 px-4 text-center font-mono text-stone-400 dark:text-stone-500">
                    {item.sort_order}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-stone-900 dark:text-stone-100 block">
                      {item.caption}
                    </span>
                    <span className="text-[11px] text-stone-500 md:hidden block line-clamp-1 mt-0.5">
                      {item.body}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 dark:text-stone-400 hidden md:table-cell max-w-xs truncate">
                    {item.body}
                  </td>
                  <td className="py-3 px-4 text-stone-500 font-mono hidden sm:table-cell">
                    {item.achieved_on || '—'}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                        title="Edit Entry"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="p-1.5 text-stone-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#fcfcfc] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-sm w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
              <h3 className="text-lg font-serif text-stone-900 dark:text-stone-100">
                {editingItem ? 'Edit Log Entry' : 'Add Log Entry'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-stone-400 hover:text-stone-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Editorial Caption / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="e.g. Anti-Slop CTF 2026 — Global Rank ~103"
                  className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.achieved_on}
                    onChange={(e) => setFormData({ ...formData, achieved_on: e.target.value })}
                    className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })}
                    className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Description / Body Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Details about the competition, methodology, or milestone..."
                  className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                />
              </div>

              {/* Image attachment */}
              <div>
                <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Log Photo / Attachment (Optional)
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={formData.image_path}
                    onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                    placeholder="Base64 Data or URL..."
                    className="flex-1 text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                  
                  <label className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 rounded-xs cursor-pointer transition-colors text-xs uppercase tracking-wider font-medium">
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

                {formData.image_path && (
                  <div className="relative w-32 h-24 mt-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xs overflow-hidden">
                    <img
                      src={formData.image_path}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_path: '' })}
                      className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full hover:bg-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors rounded-xs disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Entry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
