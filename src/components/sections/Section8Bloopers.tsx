import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section8BloopersProps {
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section8Bloopers: React.FC<Section8BloopersProps> = ({ onInspectPhoto }) => {
  const [photoUrls, setPhotoUrls] = useState<{ [key: string]: string }>({});

  const update = () => {
    setPhotoUrls({
      funny1: getPhotoUrl('funny1'),
      funny2: getPhotoUrl('funny2'),
      funny3: getPhotoUrl('funny3'),
    });
  };

  useEffect(() => {
    update();
    window.addEventListener('ammukaka_photos_updated', update);
    return () => window.removeEventListener('ammukaka_photos_updated', update);
  }, []);

  const bloopers = [
    {
      key: 'funny1',
      caption: 'Okay… this one 😂',
      subtext: 'No explanation needed',
      rotation: '-rotate-3',
    },
    {
      key: 'funny2',
      caption: 'Why were we like this?',
      subtext: 'Peak chaotic sibling energy',
      rotation: 'rotate-4',
    },
    {
      key: 'funny3',
      caption: 'Never deleting this.',
      subtext: 'Framed forever in history',
      rotation: '-rotate-2',
    },
  ];

  return (
    <section id="section-8" className="relative w-full min-h-[130vh] flex flex-col items-center justify-center py-28 px-5 z-10">
      <div className="max-w-xl w-full mx-auto space-y-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="space-y-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#ef244c]">
            Uncensored Sibling Vault
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Our bloopers 😂
          </h2>
          <p className="text-xs text-stone-300">
            Because perfection is boring anyway
          </p>
        </motion.div>

        {/* 3D Scrapbook Arrangement */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          {bloopers.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.1, delay: idx * 0.18 }}
              className={`transform ${item.rotation} hover:rotate-0 transition-transform duration-500 cursor-pointer`}
              onClick={() => onInspectPhoto(item.key, 'Our bloopers 😂', item.caption)}
            >
              <div className="p-3 bg-[#100d1b] rounded-2xl border border-[#ef244c]/25 shadow-2xl hover:border-[#ef244c]/60 transition-all gold-glow">
                <div className="aspect-square rounded-xl overflow-hidden bg-black/50 relative">
                  <img
                    src={photoUrls[item.key] || getPhotoUrl(item.key)}
                    alt={item.caption}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="pt-3 pb-1 text-center">
                  <p className="font-serif text-lg text-[#f5efe6] font-medium leading-snug">
                    {item.caption}
                  </p>
                  <p className="text-[11px] text-stone-300 pt-0.5">
                    {item.subtext}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
