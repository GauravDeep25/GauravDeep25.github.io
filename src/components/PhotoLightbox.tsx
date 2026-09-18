import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Photo } from '../types';

interface PhotoLightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onSelectPhoto: (photo: Photo) => void;
}

export function PhotoLightbox({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}: PhotoLightboxProps) {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectPhoto(photos[currentIndex - 1]);
    } else if (currentIndex === 0) {
      onSelectPhoto(photos[photos.length - 1]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < photos.length - 1) {
      onSelectPhoto(photos[currentIndex + 1]);
    } else if (currentIndex === photos.length - 1) {
      onSelectPhoto(photos[0]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [photo, onClose, handlePrev, handleNext]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="photo-lightbox-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex flex-col justify-between text-stone-200 select-none"
        onClick={onClose}
      >
        {/* Top Bar: Title & Close Button */}
        <div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-stone-300">
              {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <span className="h-3.5 w-px bg-stone-700 hidden sm:inline-block" />
            <h2 className="font-serif font-bold text-sm sm:text-base text-stone-50 truncate max-w-[200px] sm:max-w-md">
              {photo.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-[11px] font-mono text-stone-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              ESC to close &bull; &larr; &rarr; to navigate
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Lightbox"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-300 hover:text-white transition-colors rounded-full hover:bg-white/15"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div
          className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-2 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Photo"
              className="absolute left-2 sm:left-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors bg-black/40 backdrop-blur-xs"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Display Image with Key Transition */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center"
          >
            <img
              src={photo.image_url}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain shadow-2xl rounded-xs select-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </motion.div>

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Photo"
              className="absolute right-2 sm:right-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors bg-black/40 backdrop-blur-xs"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Bar: Metadata / Caption */}
        <div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-stone-800/60 z-10 text-xs font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-0.5">
            {photo.caption && (
              <p className="text-stone-300 font-serif text-sm italic">{photo.caption}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-400 font-mono text-[11px]">
            {photo.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-500" />
                <span>{photo.location}</span>
              </span>
            )}

            {photo.camera_info && (
              <span className="inline-flex items-center gap-1">
                <Camera className="w-3 h-3 text-stone-500" />
                <span>{photo.camera_info}</span>
              </span>
            )}

            {photo.year && (
              <span>{photo.year}</span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
