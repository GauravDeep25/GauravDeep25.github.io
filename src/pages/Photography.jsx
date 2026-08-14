import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Photography() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
      setPhotos(data || []);
    }
    fetchPhotos();
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-heading font-bold mb-4">Photography 📷</h1>
        <p className="font-hand text-2xl text-primary-500">Capturing moments through my lens.</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 transition-transform hover:scale-[1.02]">
            <img src={photo.url} alt={photo.caption} className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <p className="text-white font-bold text-lg">{photo.caption}</p>
              {photo.location && <p className="text-white/70 text-sm italic">📍 {photo.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}