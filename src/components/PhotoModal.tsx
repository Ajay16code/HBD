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
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-[#050509]/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="relative h-[min(82vh,760px)] w-[min(92vw,820px)] overflow-hidden rounded-[22px] border border-[#7c3aed]/35 bg-[#0b0912] shadow-[0_30px_100px_rgba(0,0,0,.85)]"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            onClick={onClose}
            aria-label="Close photo view"
            className="absolute top-4 right-4 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full flex items-center justify-center"
          >
            <motion.img
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={getPhotoUrl(activeKey)}
              alt={title}
              className="h-full w-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
