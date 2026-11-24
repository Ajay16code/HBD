import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section5LittleMomentsProps {
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section5LittleMoments: React.FC<Section5LittleMomentsProps> = ({ onInspectPhoto }) => {
  const [photoUrls, setPhotoUrls] = useState<{ [key: string]: string }>({});

  const update = () => {
    setPhotoUrls({
      memory3: getPhotoUrl('memory3'),
      memory4: getPhotoUrl('memory4'),
    });
  };

  useEffect(() => {
    update();
    window.addEventListener('ammukaka_photos_updated', update);
    return () => window.removeEventListener('ammukaka_photos_updated', update);
  }, []);

  return (
    <section id="section-5" className="relative w-full min-h-[130vh] flex flex-col items-center justify-center py-28 px-5 z-10">
      <div className="max-w-xl w-full mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#7c3aed]/80">
            Little Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            The Magic in Ordinary Days
          </h2>
        </motion.div>

        {/* Message 1 + Photo 1 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
        >
          <div
            onClick={() => onInspectPhoto('memory3', 'Unconditional Support', 'You always believed in me')}
            className="w-48 sm:w-56 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden bg-[#100d1b] border border-[#7c3aed]/30 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer gold-glow"
          >
            <img
              src={photoUrls.memory3 || getPhotoUrl('memory3')}
              alt="You always believed in me"
              className="w-full h-full object-contain"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <p className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-light leading-relaxed">
              “You always believed in me.”
            </p>
            <p className="text-xs text-stone-300">
              Even when I doubted myself, your faith was steadfast.
            </p>
          </div>
        </motion.div>

        {/* Message 2 + Photo 2 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.3, delay: 0.15 }}
          className="flex flex-col-reverse sm:flex-row items-center gap-6 sm:gap-8"
        >
          <div className="text-center sm:text-right space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#7c3aed]">Everyday Grace</span>
            <p className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-light leading-relaxed">
              “You make ordinary days special.”
            </p>
          </div>
          <div
            onClick={() => onInspectPhoto('memory4', 'Everyday Grace', 'You make ordinary days special')}
            className="w-48 sm:w-56 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden bg-[#100d1b] border border-[#7c3aed]/30 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer gold-glow"
          >
            <img
              src={photoUrls.memory4 || getPhotoUrl('memory4')}
              alt="You make ordinary days special"
              className="w-full h-full object-contain"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Closing messages */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4 }}
          className="text-center space-y-4 pt-10"
        >
          <p className="text-stone-300 text-lg font-light tracking-wide">
            “Even in my silly moments…”
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-[#7c3aed] italic">
            “You’re always there.”
          </p>
        </motion.div>
      </div>
    </section>
  );
};
