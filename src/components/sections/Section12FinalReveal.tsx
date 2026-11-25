import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section12FinalRevealProps {
  onReplay: () => void;
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section12FinalReveal: React.FC<Section12FinalRevealProps> = ({
  onReplay,
  onInspectPhoto,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>(getPhotoUrl('final'));

  useEffect(() => {
    const handleUpdate = () => setPhotoUrl(getPhotoUrl('final'));
    window.addEventListener('ammukaka_photos_updated', handleUpdate);
    return () => window.removeEventListener('ammukaka_photos_updated', handleUpdate);
  }, []);

  return (
    <section id="section-12" className="relative w-full min-h-[140vh] flex flex-col items-center justify-center py-28 px-5 z-10 overflow-hidden">
      <div className="relative max-w-lg w-full mx-auto text-center space-y-12 sm:space-y-14">
        {/* Birthday Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4 }}
          className="space-y-3"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#7c3aed] font-medium">
            A Celebratory Moment
          </span>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-[#f4efe6] font-bold leading-none">
            Happy 26th Birthday
          </h1>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#7c3aed] font-black leading-none text-gold-glow">
            Ammuka Ka ❤️
          </h2>
        </motion.div>

        {/* Large Elegant 3D Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.6 }}
          className="relative max-w-xs sm:max-w-sm mx-auto cursor-pointer"
          onClick={() => onInspectPhoto('final', 'Happy Birthday', 'Ammuka Ka ❤️')}
        >
          <div className="rounded-2xl overflow-hidden bg-[#100d1b] border-2 border-[#7c3aed]/45 shadow-2xl gold-glow-lg relative">
            <img
              src={photoUrl}
              alt="Happy Birthday Ammuka Ka"
              className="block w-full h-auto max-h-[70vh] object-contain"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Golden Sunset Halo */}
          <div className="absolute -inset-6 bg-[#7c3aed]/20 rounded-full blur-3xl -z-10 animate-pulse" />
        </motion.div>

        {/* Heartfelt Wishes */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4 }}
          className="space-y-6 pt-2"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-light leading-relaxed tracking-wide">
            “May your days be as beautiful, happy and bright as the light you bring into my life.”
          </p>

          <p className="font-serif text-lg sm:text-xl text-stone-300 font-light leading-relaxed">
            “Keep being you. Because you’re amazing just the way you are.”
          </p>

          <div className="pt-4 space-y-1">
            <p className="font-serif text-lg text-stone-400">
              Love always,
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#7c3aed] text-gold-glow">
              Ajay ❤️
            </p>
          </div>
        </motion.div>

        {/* A handwritten-style Tamil birthday wish on warm parchment */}
        <motion.article
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="parchment-letter relative mx-auto w-full max-w-xl px-8 py-12 text-center sm:px-12 sm:py-14"
          lang="ta"
        >
          <span className="parchment-corner parchment-corner-top-left" aria-hidden="true">❧</span>
          <span className="parchment-corner parchment-corner-top-right" aria-hidden="true">❧</span>
          <span className="parchment-corner parchment-corner-bottom-left" aria-hidden="true">❧</span>
          <span className="parchment-corner parchment-corner-bottom-right" aria-hidden="true">❧</span>

          <div className="relative z-10 space-y-5 font-tamil">
            <h2 className="text-xl font-bold leading-relaxed text-[#5b351d] sm:text-2xl">
              🌸 இனிய பிறந்தநாள் வாழ்த்துகள் அம்மு அக்கா! 🌸
            </h2>
            <div className="parchment-divider mx-auto" aria-hidden="true" />
            <div className="space-y-4 text-base leading-[1.9] text-[#49331f] sm:text-lg">
              <p>
                மலரின் அழகு அதன் மலர்ச்சியில்,<br />
                மனிதரின் அழகு அவரின் நற்பண்பில்!
              </p>
              <p>
                உங்கள் புன்னகை என்றும் மலரட்டும்,<br />
                உங்கள் கனவுகள் யாவும் நனவாகட்டும்!
              </p>
              <p>
                அன்பும் மரியாதையும் கலந்த<br />
                எங்கள் நல்வாழ்த்துகள் என்றும் உங்களுடன்!
              </p>
            </div>
            <p className="pt-1 text-base font-bold leading-relaxed text-[#6b351d] sm:text-lg">
              வாழ்க வளமுடன், வளர்க சிறப்புடன்! ❤️
            </p>
          </div>
        </motion.article>

        {/* Minimal Replay Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="pt-10 pb-8"
        >
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-[#7c3aed]/35 text-xs uppercase tracking-[0.2em] text-[#f4efe6] hover:text-[#7c3aed] hover:border-[#7c3aed] transition-all hover:scale-105 active:scale-95 shadow-xl min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Our Story ↻</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
