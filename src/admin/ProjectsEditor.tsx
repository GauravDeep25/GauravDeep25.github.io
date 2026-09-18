import React, { useState } from 'react';
import { Project } from '../types';
import { createProject, updateProject, deleteProject } from '../lib/queries';
import { Plus, Edit2, Trash2, ExternalLink, X, Save, Image as ImageIcon, Upload } from 'lucide-react';

interface ProjectsEditorProps {
  projects: Project[];
  onRefresh: () => Promise<void>;
}

export function ProjectsEditor({ projects, onRefresh }: ProjectsEditorProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
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
    title: '',
    tech_stack: '',
    year: new Date().getFullYear(),
    description: '',
    link_url: '',
    link_label: '',
    image_path: '',
    sort_order: 0,
  });

  const openCreateModal = () => {
    setFormData({
      title: '',
      tech_stack: '',
      year: new Date().getFullYear(),
      description: '',
      link_url: '',
      link_label: 'View project ↗',
      image_path: '',
      sort_order: projects.length + 1,
    });
    setEditingProject(null);
    setIsCreating(true);
  };

  const openEditModal = (project: Project) => {
    setFormData({
      title: project.title,
      tech_stack: project.tech_stack || '',
      year: project.year || new Date().getFullYear(),
      description: project.description || '',
      link_url: project.link_url || '',
      link_label: project.link_label || 'View project ↗',
      image_path: project.image_path || '',
      sort_order: project.sort_order || 0,
    });
    setEditingProject(project);
    setIsCreating(false);
  };

  const closeModal = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        setToast({ type: 'success', message: `Updated "${formData.title}" successfully.` });
      } else {
        await createProject(formData);
        setToast({ type: 'success', message: `Created "${formData.title}" successfully.` });
      }
      await onRefresh();
      closeModal();
      setTimeout(() => setToast(null), 4000);
    } catch (err: any) {
      console.error('Project save error:', err);
      setToast({ type: 'error', message: err.message || 'Failed to save project' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Are you sure you want to delete project "${project.title}"?`)) return;

    try {
      await deleteProject(project.id);
      await onRefresh();
      setToast({ type: 'success', message: `Deleted "${project.title}".` });
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      console.error('Failed to delete project:', err);
      setToast({ type: 'error', message: err.message || 'Failed to delete project' });
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif text-stone-900 dark:text-stone-100">
            Projects
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Manage projects displayed on the Work and Home pages
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors rounded-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
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

      {/* Projects List / Table */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
            <tr>
              <th className="py-3 px-4 w-12 text-center">Order</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 hidden md:table-cell">Tech Stack</th>
              <th className="py-3 px-4 hidden sm:table-cell">Year</th>
              <th className="py-3 px-4 hidden lg:table-cell">Link</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-stone-500">
                  No projects recorded yet.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors"
                >
                  <td className="py-3 px-4 text-center font-mono text-stone-400 dark:text-stone-500">
                    {project.sort_order}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-stone-900 dark:text-stone-100 block">
                      {project.title}
                    </span>
                    <span className="text-[11px] text-stone-500 md:hidden block">
                      {project.tech_stack} &bull; {project.year}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 dark:text-stone-400 hidden md:table-cell">
                    {project.tech_stack}
                  </td>
                  <td className="py-3 px-4 text-stone-600 dark:text-stone-400 hidden sm:table-cell font-mono">
                    {project.year}
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    {project.link_url ? (
                      <a
                        href={project.link_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:hover:text-white"
                      >
                        <span className="truncate max-w-[150px]">{project.link_label || 'Link'}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-stone-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(project)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="p-1.5 text-stone-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete Project"
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

      {/* Add / Edit Project Modal */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#fcfcfc] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
              <h3 className="text-lg font-serif text-stone-900 dark:text-stone-100">
                {editingProject ? `Edit: ${editingProject.title}` : 'Add New Project'}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Detectify"
                    className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) || 2026 })}
                    className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Tech Stack *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tech_stack}
                    onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                    placeholder="e.g. Python, Scapy, Network Security"
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
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A concise description of the project, architecture, and problem solved..."
                  className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    External Link URL
                  </label>
                  <input
                    type="url"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Link Label
                  </label>
                  <input
                    type="text"
                    value={formData.link_label}
                    onChange={(e) => setFormData({ ...formData, link_label: e.target.value })}
                    placeholder="e.g. View on GitHub ↗"
                    className="w-full text-sm px-3 py-2 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 rounded-xs"
                  />
                </div>
              </div>

              {/* Image Path & Upload */}
              <div>
                <label className="block uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Project Image (Optional)
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
                  <div className="relative w-36 h-20 mt-3 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xs overflow-hidden">
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
                  <span>{saving ? 'Saving...' : 'Save Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
