import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section12FinalRevealProps {
  onReplay: () => void;
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section12FinalReveal: React.FC<Section12FinalRevealProps> = ({
  onReplay,
  onInspectPhoto,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>(getPhotoUrl('final'));

  useEffect(() => {
    const handleUpdate = () => setPhotoUrl(getPhotoUrl('final'));
    window.addEventListener('ammukaka_photos_updated', handleUpdate);
    return () => window.removeEventListener('ammukaka_photos_updated', handleUpdate);
  }, []);

  return (
    <section id="section-12" className="relative w-full min-h-[140vh] flex flex-col items-center justify-center py-28 px-5 z-10 overflow-hidden">
      {/* Blue-purple-red ambient background light */}
      <div className="absolute inset-0 bg-radial-gradient from-[#21104b]/45 via-[#100d1b]/80 to-[#050509] pointer-events-none" />

      <div className="relative max-w-lg w-full mx-auto text-center space-y-12 sm:space-y-14">
        {/* Birthday Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4 }}
          className="space-y-3"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#7c3aed] font-medium">
            A Celebratory Moment
          </span>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-[#f4efe6] font-bold leading-none">
            Happy Birthday
          </h1>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#7c3aed] font-black leading-none text-gold-glow">
            Ammuka Ka ❤️
          </h2>
        </motion.div>

        {/* Large Elegant 3D Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.6 }}
          className="relative max-w-xs sm:max-w-sm mx-auto cursor-pointer"
          onClick={() => onInspectPhoto('final', 'Happy Birthday', 'Ammuka Ka ❤️')}
        >
          <div className="rounded-2xl overflow-hidden bg-[#100d1b] border-2 border-[#7c3aed]/45 shadow-2xl gold-glow-lg relative">
            <img
              src={photoUrl}
              alt="Happy Birthday Ammuka Ka"
              className="block w-full h-auto max-h-[70vh] object-contain"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Golden Sunset Halo */}
          <div className="absolute -inset-6 bg-[#7c3aed]/20 rounded-full blur-3xl -z-10 animate-pulse" />
        </motion.div>

        {/* Heartfelt Wishes */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4 }}
          className="space-y-6 pt-2"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-light leading-relaxed tracking-wide">
            “May your days be as beautiful, happy and bright as the light you bring into my life.”
          </p>

          <p className="font-serif text-lg sm:text-xl text-stone-300 font-light leading-relaxed">
            “Keep being you. Because you’re amazing just the way you are.”
          </p>

          <div className="pt-4 space-y-1">
            <p className="font-serif text-lg text-stone-400">
              Love always,
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#7c3aed] text-gold-glow">
              Ajay ❤️
            </p>
          </div>
        </motion.div>

        {/* Ajay's birthday GIF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2 }}
          className="flex justify-center"
        >
          <iframe
            src="https://giphy.com/embed/d8ezFbSIzFQALyWqHJ"
            title="Birthday celebration for Ajay"
            width="240"
            height="240"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            className="h-52 w-52 rounded-2xl sm:h-60 sm:w-60"
          />
        </motion.div>

        {/* Minimal Replay Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="pt-10 pb-8"
        >
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-[#7c3aed]/35 text-xs uppercase tracking-[0.2em] text-[#f4efe6] hover:text-[#7c3aed] hover:border-[#7c3aed] transition-all hover:scale-105 active:scale-95 shadow-xl min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Our Story ↻</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
