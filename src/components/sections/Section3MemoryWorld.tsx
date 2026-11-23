import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section3MemoryWorldProps {
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section3MemoryWorld: React.FC<Section3MemoryWorldProps> = ({ onInspectPhoto }) => {
  const [photoKeys, setPhotoKeys] = useState<{ [key: string]: string }>({});

  const updatePhotos = () => {
    setPhotoKeys({
      childhood: getPhotoUrl('childhood'),
      memory1: getPhotoUrl('memory1'),
      memory2: getPhotoUrl('memory2'),
      memory3: getPhotoUrl('memory3'),
    });
  };

  useEffect(() => {
    updatePhotos();
    window.addEventListener('ammukaka_photos_updated', updatePhotos);
    return () => window.removeEventListener('ammukaka_photos_updated', updatePhotos);
  }, []);

  const memoryCards = [
    {
      key: 'childhood',
      title: 'Childhood Days',
      subtitle: 'Where every laughter began',
      caption: 'The foundation of everything good in life',
      tilt: '-rotate-2',
    },
    {
      key: 'memory1',
      title: 'Endless Talks',
      subtitle: 'Tea, sunsets and long conversations',
      caption: 'Those quiet moments that mean the most',
      tilt: 'rotate-3',
    },
    {
      key: 'memory2',
      title: 'Growing Up',
      subtitle: 'Always by my side',
      caption: 'No matter how fast years fly by',
      tilt: '-rotate-1',
    },
  ];

  return (
    <section id="section-3" className="relative w-full min-h-[130vh] flex flex-col items-center justify-center py-28 px-5 z-10">
      <div className="max-w-2xl w-full mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4 }}
          className="space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#7c3aed]/80">
            Memory World
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f5efe6] font-light leading-relaxed">
            Let’s go back for a moment…
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-stone-300 italic">
            Through all the little memories.
          </p>
          
        </motion.div>

        {/* Floating 3D Memory Frames (Touch-friendly for mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 pt-8">
          {memoryCards.map((card, idx) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, delay: idx * 0.2 }}
              className={`group relative cursor-pointer transform ${card.tilt} hover:rotate-0 transition-transform duration-500`}
              onClick={() => onInspectPhoto(card.key, card.title, card.subtitle)}
            >
              <div className="bg-[#100d1b]/80 p-3 sm:p-2.5 rounded-2xl border border-[#7c3aed]/25 shadow-xl hover:border-[#7c3aed]/60 transition-all gold-glow">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black/50 relative">
                  <img
                    src={photoKeys[card.key] || getPhotoUrl(card.key)}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-3 inset-x-3 text-left">
                    <p className="font-serif text-lg text-[#f4efe6] font-medium leading-tight">
                      {card.title}
                    </p>
                    <p className="text-[11px] text-[#7c3aed] tracking-wider uppercase truncate pt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 px-1 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Tap to view</span>
                  <span className="text-[#7c3aed]">✦</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
