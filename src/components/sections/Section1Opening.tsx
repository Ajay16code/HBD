import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section1OpeningProps {
  hasStarted: boolean;
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section1Opening: React.FC<Section1OpeningProps> = ({ hasStarted, onInspectPhoto }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(getPhotoUrl('hero'));

  useEffect(() => {
    const handleUpdate = () => setPhotoUrl(getPhotoUrl('hero'));
    window.addEventListener('ammukaka_photos_updated', handleUpdate);
    return () => window.removeEventListener('ammukaka_photos_updated', handleUpdate);
  }, []);

  return (
    <section
      id="section-1"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col items-center gap-5"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#d8b8ff]">
            Etho Ennala Mudijathu Ka
          </span>
          <h1 className="font-serif text-7xl font-black leading-[0.9] tracking-tight text-[#f4efe6] text-glow sm:text-8xl">
            <span className="block text-3xl font-bold leading-none text-[#e3c9ff] sm:text-4xl">For</span>
            <span className="block">Ammuka Ka</span>
          </h1>
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => onInspectPhoto('hero', 'Ammuka Ka', 'Every moment with you')}
            aria-label="View Ammuka Ka's portrait"
            className="aspect-[3/4] w-52 overflow-hidden border-2 border-[#d4af37]/70 bg-[#100d1b] p-1.5 shadow-xl sm:w-64"
          >
            <img
              src={photoUrl}
              alt="Ammuka Ka"
              className="h-full w-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </motion.button>
          <p className="pt-2 text-xs uppercase tracking-widest text-stone-100">
            Porumaiya scroll pannuga ka👇
          </p>
        </motion.div>
      </div>

      {hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="pointer-events-none absolute bottom-8 z-20 text-center"
        >
          <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-stone-500/50 p-1">
            <div className="h-2.5 w-1.5 animate-bounce rounded-full bg-[#7c3aed]" />
          </div>
        </motion.div>
      )}
    </section>
  );
};
