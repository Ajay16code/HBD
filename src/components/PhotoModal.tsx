import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getPhotoUrl } from '../services/photoStorage';

interface PhotoModalProps {
  photoKey: string | null;
  title: string;
  subtitle: string;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photoKey,
  title,
  subtitle,
  onClose,
}) => {
  const activeKey = photoKey ?? 'hero';

  useEffect(() => {
    if (!photoKey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, photoKey]);

  if (!photoKey) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-[#050509]/88 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 48 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[min(400px,calc(100vw-24px))] max-h-[92vh] overflow-y-auto rounded-[18px] border border-[#7c3aed]/25 bg-[#111018] shadow-[0_24px_70px_rgba(0,0,0,.82)] p-3 sm:p-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            onClick={onClose}
            aria-label="Close photo view"
            className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/55 text-[#f5f0e8]/80 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="space-y-1 px-10 pb-3"
          >
            <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] tracking-wide font-medium">
              {title}
            </h3>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#7c3aed]">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[14px] border border-[#7c3aed]/55 bg-black/60 shadow-[0_10px_25px_rgba(0,0,0,.38)]"
          >
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              src={getPhotoUrl(activeKey)}
              alt={title}
              className="max-h-[70vh] w-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/5" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/70 to-transparent" />
            <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-[9px] tracking-[0.18em] text-[#f4efe6]/80 backdrop-blur-sm">
              PHOTO
            </span>
          </motion.div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
