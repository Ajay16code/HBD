import React from 'react';
import { motion } from 'motion/react';

export const Section6NeverSay: React.FC = () => {
  const statements = [
    'Thank you for always being there.',
    'You probably don’t realize how much you mean to me.',
    'I’m really lucky to have you.',
    'You’re one of the important person in my life.',
  ];

  return (
    <section id="section-6" className="relative w-full min-h-[150vh] flex flex-col items-center justify-center py-36 px-6 z-10">
      <div className="relative max-w-lg w-full mx-auto text-center space-y-24 sm:space-y-28">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.6 }}
          className="space-y-3"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-stone-400 font-light">
            In Quiet Honesty
          </span>
          <p className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light italic">
            I don’t say this enough…
          </p>
          <div className="w-8 h-px bg-[#7c3aed]/30 mx-auto mt-4" />
        </motion.div>

        {/* Revealed sentences one by one */}
        <div className="space-y-16 sm:space-y-20">
          {statements.map((stmt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.4, delay: 0.1 }}
              className="py-2"
            >
              <p className="font-serif text-2xl sm:text-3xl text-stone-200 font-light leading-relaxed tracking-wide text-glow">
                “{stmt}”
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing gratitude */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.8 }}
          className="pt-16 space-y-3"
        >
          <p className="font-serif text-3xl sm:text-4xl text-[#7c3aed] font-medium text-gold-glow">
            Thank you, Ammuka Ka. ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
};
