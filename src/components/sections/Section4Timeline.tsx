import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section4TimelineProps {
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section4Timeline: React.FC<Section4TimelineProps> = ({ onInspectPhoto }) => {
  const [photoUrls, setPhotoUrls] = useState<{ [key: string]: string }>({});

  const update = () => {
    setPhotoUrls({
      childhood: getPhotoUrl('childhood'),
      adventures: getPhotoUrl('memory1'),
      growing: getPhotoUrl('memory2'),
    });
  };

  useEffect(() => {
    update();
    window.addEventListener('ammukaka_photos_updated', update);
    return () => window.removeEventListener('ammukaka_photos_updated', update);
  }, []);

  const timelineItems = [
    {
      period: 'CHILDHOOD',
      text: 'So many small moments.',
      photoKey: 'childhood',
      photoUrl: photoUrls.childhood || getPhotoUrl('childhood'),
      date: 'The golden beginning',
    },
    {
      period: 'ADVENTURES',
      text: 'Random plans. Endless talks.',
      photoKey: 'adventures',
      photoUrl: photoUrls.adventures || getPhotoUrl('memory1'),
      date: 'Countless journeys & laughter',
    },
    {
      period: 'GROWING UP',
      text: 'Somehow, time went too fast.',
      photoKey: 'growing',
      photoUrl: photoUrls.growing || getPhotoUrl('memory2'),
      date: 'Together through it all',
    },
  ];

  return (
    <section id="section-4" className="relative w-full min-h-[140vh] flex flex-col items-center justify-center py-28 px-6 z-10">
      <div className="max-w-xl w-full mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#7c3aed]/80">
            Timeline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Chapters Of you
          </h2>
          <div className="w-12 h-px bg-[#7c3aed]/40 mx-auto mt-4" />
        </motion.div>

        {/* Timeline items */}
        <div className="relative border-l border-[#7c3aed]/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-20">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.2, delay: idx * 0.15 }}
              className="relative space-y-4"
            >
              {/* Timeline golden bead */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#050509] border-2 border-[#7c3aed] shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-[#7c3aed] font-medium">
                  {item.period}
                </span>
                <p className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-light">
                  {item.text}
                </p>
                <p className="text-xs text-stone-400 font-light">
                  {item.date}
                </p>
              </div>

              {/* Photo Frame */}
              <div
                onClick={() => onInspectPhoto(item.photoKey, item.period, item.text)}
                className="max-w-sm rounded-2xl overflow-hidden bg-[#100d1b] border border-[#7c3aed]/25 shadow-xl cursor-pointer group hover:border-[#7c3aed]/60 transition-all gold-glow"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.photoUrl}
                    alt={item.period}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2.5 right-3 text-[11px] text-[#f4efe6]/80 flex items-center gap-1">
                    <span>Tap to inspect</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
