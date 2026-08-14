import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form States
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image_url: '', tags: '', live_url: '', github_url: '', is_featured: false });
  const [photoForm, setPhotoForm] = useState({ url: '', caption: '', location: '' });

  useEffect(() => {
    checkUser();
    fetchData();
  }, [activeTab]);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/login');
  }

  async function fetchData() {
    setLoading(true);
    const table = activeTab === 'projects' ? 'projects' : 'photos';
    const { data } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = typeof projectForm.tags === 'string' ? projectForm.tags.split(',').map(t => t.trim()) : projectForm.tags;
    await supabase.from('projects').upsert([{ ...projectForm, tags: tagsArray }]);
    setProjectForm({ title: '', description: '', image_url: '', tags: '', live_url: '', github_url: '', is_featured: false });
    fetchData();
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('photos').insert([photoForm]);
    setPhotoForm({ url: '', caption: '', location: '' });
    fetchData();
  };

  return (
    <div className="pt-32 px-4 max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-heading font-bold">Dashboard</h1>
        <button onClick={() => supabase.auth.signOut().then(() => navigate('/'))} className="text-red-500 font-bold">Logout</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('projects')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'projects' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>Projects</button>
        <button onClick={() => setActiveTab('photos')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'photos' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>Photography</button>
      </div>

      {activeTab === 'projects' ? (
        <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-10">
          <input className="admin-input" placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
          <input className="admin-input" placeholder="Image URL" value={projectForm.image_url} onChange={e => setProjectForm({...projectForm, image_url: e.target.value})} />
          <input className="admin-input" placeholder="Live URL" value={projectForm.live_url} onChange={e => setProjectForm({...projectForm, live_url: e.target.value})} />
          <input className="admin-input" placeholder="GitHub URL" value={projectForm.github_url} onChange={e => setProjectForm({...projectForm, github_url: e.target.value})} />
          <input className="admin-input md:col-span-2" placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} />
          <textarea className="admin-input md:col-span-2" placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
          <label className="flex items-center gap-2"><input type="checkbox" checked={projectForm.is_featured} onChange={e => setProjectForm({...projectForm, is_featured: e.target.checked})} /> Featured?</label>
          <button className="md:col-span-2 bg-primary-500 text-white p-4 rounded-2xl font-bold">Save Project</button>
        </form>
      ) : (
        <form onSubmit={handlePhotoSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-10">
          <input className="admin-input" placeholder="Photo URL" value={photoForm.url} onChange={e => setPhotoForm({...photoForm, url: e.target.value})} required />
          <input className="admin-input" placeholder="Location" value={photoForm.location} onChange={e => setPhotoForm({...photoForm, location: e.target.value})} />
          <input className="admin-input md:col-span-2" placeholder="Caption" value={photoForm.caption} onChange={e => setPhotoForm({...photoForm, caption: e.target.value})} />
          <button className="md:col-span-2 bg-primary-500 text-white p-4 rounded-2xl font-bold">Upload Photo</button>
        </form>
      )}

      {/* List Display */}
      <div className="grid gap-4">
        {items.map(item => (
          <div key={item.id} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl flex justify-between items-center border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <img src={item.image_url || item.url} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-bold">{item.title || item.caption}</p>
                <p className="text-xs text-slate-500">{activeTab}</p>
              </div>
            </div>
            <button onClick={async () => { await supabase.from(activeTab).delete().eq('id', item.id); fetchData(); }} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}