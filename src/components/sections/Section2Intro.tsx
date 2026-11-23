import React from 'react';
import { motion } from 'motion/react';

export const Section2Intro: React.FC = () => {
  return (
    <section id="section-2" className="relative w-full min-h-[120vh] flex flex-col items-center justify-center py-32 px-6 text-center z-10">
      <div className="max-w-xl w-full mx-auto space-y-16 sm:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <p className="font-serif text-2xl sm:text-3xl text-stone-300 font-light tracking-wide leading-relaxed">
            Not a gift you can hold.
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-normal tracking-wide text-glow">
            But something you can keep.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-[#7c3aed]/90 font-light">
            Something made just for you.
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f5efe6] font-medium text-gold-glow">
            AKKA ❤️
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 pt-6"
        >
          <p className="text-base sm:text-lg text-stone-300 font-light tracking-wide leading-relaxed">
            Some people make life a little brighter…
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-[#7c3aed] italic">
            You’re one of them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="pt-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
            Keep scrolling ↓
          </p>
        </motion.div>
      </div>
    </section>
  );
};
