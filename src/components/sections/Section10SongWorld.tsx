import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section10SongWorldProps {
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section10SongWorld: React.FC<Section10SongWorldProps> = ({ onInspectPhoto }) => {
  const [portraitUrl, setPortraitUrl] = useState<string>(getPhotoUrl('portrait'));

  useEffect(() => {
    const handleUpdate = () => setPortraitUrl(getPhotoUrl('portrait'));
    window.addEventListener('ammukaka_photos_updated', handleUpdate);
    return () => window.removeEventListener('ammukaka_photos_updated', handleUpdate);
  }, []);

  return (
    <section id="section-10" className="relative w-full min-h-[140vh] flex flex-col items-center justify-center py-28 px-5 z-10 overflow-hidden">
      {/* Floating subtle glowing petals / hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', opacity: 0, x: `${(i * 18) - 10}%` }}
            animate={{
              y: '-20%',
              opacity: [0, 0.4, 0.6, 0.2, 0],
              x: `${(i * 18) + Math.sin(i) * 12}%`,
            }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2.5,
            }}
            className="absolute bottom-0 text-[#7c3aed]/30"
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-lg w-full mx-auto text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4 }}
          className="space-y-4"
        >

        </motion.div>

        {/* Floating Illuminated Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5 }}
          className="relative max-w-xs mx-auto cursor-pointer"
          onClick={() => onInspectPhoto('portrait', 'Your Song', 'Your voice makes it special')}
        >
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#100d1b] border-2 border-[#7c3aed]/40 shadow-2xl gold-glow-lg relative group">
            <img
              src={portraitUrl}
              alt="Ammuka Ka"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-center">
              <p className="font-serif text-xl text-[#f5efe6] font-medium">
                Ammuka Ka
              </p>
              <p className="text-[11px] text-[#7c3aed] tracking-widest uppercase">
                Grace in every note
              </p>
            </div>
          </div>
          {/* Subtle golden halo behind photo */}
          <div className="absolute -inset-4 bg-[#7c3aed]/15 rounded-3xl blur-2xl -z-10 animate-pulse" />
        </motion.div>

        {/* Narrative text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4 }}
          className="space-y-6 pt-4"
        >
          <p className="font-serif text-2xl text-stone-300 font-light leading-relaxed">
            Maybe it’s just a song…
          </p>

          <p className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-light leading-relaxed">
            But somehow, it sounds different when you sing it.
          </p>

          <p className="font-serif text-2xl sm:text-3xl text-[#7c3aed] italic text-gold-glow">
            Your voice makes it special. ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
};
