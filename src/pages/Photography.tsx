import React, { useState } from 'react';
import { Photo } from '../types';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { Camera, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotographyProps {
  photos: Photo[];
  loading: boolean;
}

export function Photography({ photos, loading }: PhotographyProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-stone-200 dark:border-stone-800 pb-6">
          <div className="space-y-2">
            <div className="h-8 bg-stone-200 dark:bg-stone-900 rounded w-48"></div>
            <div className="h-4 bg-stone-200 dark:bg-stone-900 rounded w-64"></div>
          </div>
          <div className="h-4 bg-stone-200 dark:bg-stone-900 rounded w-20 mt-4 md:mt-0"></div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-stone-200 dark:bg-stone-900 rounded-sm break-inside-avoid mb-6"
              style={{ height: `${(n % 3 + 2) * 120}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      id="photography-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 md:space-y-12"
    >
      {/* Header section matching editorial reference */}
      <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight">
            Photography
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans font-medium">
            Shot on 35mm &amp; Medium Format Film &bull; Eastern Himalayas &amp; Architecture
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Frame' : 'Frames'}
          </span>
        </div>
      </div>

      {/* Category filter pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-sans">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat as string)}
              className={`px-4 py-2 rounded-full transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 font-semibold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-medium hover:bg-stone-200 dark:hover:bg-stone-850'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      )}

      {/* Masonry-style Photography Grid */}
      {filteredPhotos.length === 0 ? (
        <p className="text-stone-600 dark:text-stone-400 text-sm py-16 text-center font-sans">No photographs found.</p>
      ) : (
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.figure
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
                onClick={() => setSelectedPhoto(photo)}
                className="photo-grid-item group relative overflow-hidden bg-stone-100 dark:bg-stone-900/50 rounded-xs break-inside-avoid mb-6 border border-stone-200 dark:border-stone-800 cursor-pointer transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-xs"
              >
                <div className="overflow-hidden bg-stone-200 dark:bg-stone-900">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none"
                  />
                </div>

                <figcaption className="p-4 text-xs font-sans">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <span className="font-serif font-bold text-base text-stone-950 dark:text-stone-50 group-hover:underline decoration-stone-400 underline-offset-4 transition-colors">
                      {String(index + 1).padStart(2, '0')}. {photo.title}
                    </span>
                    {photo.year && (
                      <span className="font-mono text-xs font-semibold text-stone-500 dark:text-stone-400 shrink-0">
                        {photo.year}
                      </span>
                    )}
                  </div>

                  {photo.caption && (
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2 leading-relaxed mb-2.5">
                      {photo.caption}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono font-medium text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-800">
                    {photo.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-stone-500 shrink-0" />
                        <span className="truncate max-w-[130px]">{photo.location}</span>
                      </span>
                    )}
                    {photo.camera_info && (
                      <span className="inline-flex items-center gap-1.5 truncate max-w-[180px]">
                        <Camera className="w-3 h-3 text-stone-500 shrink-0" />
                        <span className="truncate">{photo.camera_info}</span>
                      </span>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Interactive Lightbox View */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={filteredPhotos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
      />
    </motion.div>
  );
}
