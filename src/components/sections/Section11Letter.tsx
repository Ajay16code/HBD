import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Feather, Edit3, Check } from 'lucide-react';

export const Section11Letter: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [letterParagraphs, setLetterParagraphs] = useState([
    'Thank you for being my support, my guide, my biggest cheerleader and sometimes my only problem solver.',
    'You’ve been there in my highs, my lows, my silly doubts and my big decisions.',
    'I hope you always know how special you are to me.',
    'I’m really proud of you.',
  ]);

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...letterParagraphs];
    updated[index] = val;
    setLetterParagraphs(updated);
  };

  return (
    <section id="section-11" className="relative w-full min-h-[140vh] flex flex-col items-center justify-center py-28 px-4 sm:px-6 z-10">
      <div className="max-w-xl w-full mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#7c3aed]/90">
            <Feather className="w-3.5 h-3.5" />
            <span>A Personal Letter</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Words From The Heart
          </h2>
        </motion.div>

        {/* Textured blue-purple letter panel */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl bg-[#100d1b] border border-[#7c3aed]/35 shadow-2xl p-6 sm:p-10 paper-texture gold-glow overflow-hidden"
        >
          {/* Subtle wax seal / decorative corner marks */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[11px] text-[#7c3aed]/80 hover:text-[#7c3aed] flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-[#7c3aed]/20"
              title="Edit letter text"
            >
              {isEditing ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8 text-stone-200">
            {/* Salutation */}
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-medium tracking-wide">
                Dear Ammuka Ka,
              </p>
              <div className="w-16 h-px bg-[#7c3aed]/40 mt-3" />
            </div>

            {/* Letter Body */}
            {letterParagraphs.map((para, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1, delay: idx * 0.15 }}
              >
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={para}
                    onChange={(e) => handleParagraphChange(idx, e.target.value)}
                    className="w-full bg-black/50 border border-[#7c3aed]/40 rounded-lg p-2 text-sm text-[#f5efe6] font-serif focus:outline-none"
                  />
                ) : (
                  <p className="font-serif text-lg sm:text-xl text-[#f4efe6] font-light leading-relaxed tracking-wide">
                    {para}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Sign-off */}
            <div className="pt-6 sm:pt-8 text-right space-y-1">
              <p className="font-serif text-base text-stone-400 italic">
                With all my heart,
              </p>
              <p className="font-script text-3xl sm:text-4xl text-[#7c3aed] text-gold-glow">
                Ajay ❤️
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
