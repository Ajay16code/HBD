import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

interface Section4TimelineProps {
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section4Timeline: React.FC<Section4TimelineProps> = ({ onInspectPhoto }) => {
  const [missingPhotos, setMissingPhotos] = useState<Record<string, boolean>>({});

  const timelineItems = [
    {
      period: 'CHILDHOOD',
      text: 'So many small moments.',
      date: 'The golden beginning',
      photoKey: 'timelineChildhood',
      imageName: 'timeline-childhood.jpg',
    },
    {
      period: 'ADVENTURES',
      text: 'Random plans. Endless talks.',
      date: 'Countless journeys & laughter',
      photoKey: 'timelineAdventures',
      imageName: 'timeline-adventures.jpg',
    },
    {
      period: 'GROWING UP',
      text: 'Somehow, time went too fast.',
      date: 'Together through it all',
      photoKey: 'timelineGrowingUp',
      imageName: 'timeline-growing-up.jpg',
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

              <button
                type="button"
                disabled={missingPhotos[item.imageName]}
                onClick={() => onInspectPhoto(item.photoKey, item.period, item.text)}
                aria-label={`View ${item.period.toLowerCase()} photo`}
                className="block aspect-[16/10] w-full max-w-sm overflow-hidden rounded-2xl border border-[#7c3aed]/30 bg-[#100d1b] text-left shadow-xl gold-glow cursor-zoom-in disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c4b5fd]"
              >
                {missingPhotos[item.imageName] ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-stone-300">
                    <ImageIcon className="h-7 w-7 text-[#a78bfa]" aria-hidden="true" />
                    <p className="text-sm">Add your photo as</p>
                    <code className="text-xs text-[#c4b5fd]">public/images/{item.imageName}</code>
                  </div>
                ) : (
                  <img
                    src={`/images/${item.imageName}`}
                    alt={`${item.period} timeline`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    onError={() => setMissingPhotos((current) => ({ ...current, [item.imageName]: true }))}
                  />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
