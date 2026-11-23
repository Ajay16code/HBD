import React from 'react';
import { motion } from 'motion/react';

export const Section7TaughtMe: React.FC = () => {
  const lessons = [
    { title: 'To be stronger.', desc: 'Standing tall through storms' },
    { title: 'To be kinder.', desc: 'Choosing empathy in every word' },
    { title: 'To see the good in people.', desc: 'Even when the world forgets' },
    { title: 'To never give up.', desc: 'One courageous step after another' },
    { title: 'To enjoy the little things in life.', desc: 'The quiet beauty in simple moments' },
  ];

  return (
    <section id="section-7" className="relative w-full min-h-[130vh] flex flex-col items-center justify-center py-28 px-5 z-10">
      <div className="max-w-xl w-full mx-auto space-y-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="space-y-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#7c3aed]/80">
            Life Lessons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Ammuka Ka, you’ve taught me…
          </h2>
        </motion.div>

        {/* Minimal elegant cards */}
        <div className="space-y-4 pt-4">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1, delay: idx * 0.12 }}
              className="p-5 rounded-2xl bg-[#100d1b]/70 border border-[#7c3aed]/20 backdrop-blur-sm hover:border-[#7c3aed]/50 transition-colors gold-glow"
            >
              <p className="font-serif text-2xl text-[#f5efe6] font-light">
                {lesson.title}
              </p>
              <p className="text-xs text-stone-300 tracking-wider pt-1">
                {lesson.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4 }}
          className="pt-6"
        >
          <p className="font-serif text-2xl sm:text-3xl text-[#7c3aed] italic">
            More than you probably realize.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
