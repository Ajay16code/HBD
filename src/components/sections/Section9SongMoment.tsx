import React from 'react';
import { motion } from 'motion/react';
import { Music } from 'lucide-react';

export const Section9SongMoment: React.FC = () => {
  return (
    <section id="section-9" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-16 px-6 z-10">
      <div className="max-w-lg w-full mx-auto text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4 }}
          className="space-y-4"
        >
          <div className="w-12 h-12 rounded-full border border-[#7c3aed]/40 flex items-center justify-center mx-auto text-[#7c3aed] gold-glow animate-pulse">
            <Music className="w-5 h-5" />
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="space-y-3"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-[#7c3aed]/90">
            Muzhumathi
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
            This is your favorite song, right?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="space-y-8 pt-4"
        >
          <p className="text-base sm:text-lg text-stone-300 font-light">
            Because whenever you sing this…
          </p>

          <p className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-medium text-gold-glow leading-relaxed">
            …I melt a little just listening to your voice. ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
};
