import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getPhotoUrl } from '../../services/photoStorage';

interface Section1OpeningProps {
  hasStarted: boolean;
  onBegin: () => void;
  onInspectPhoto: (key: string, title: string, subtitle: string) => void;
}

export const Section1Opening: React.FC<Section1OpeningProps> = ({ hasStarted, onBegin, onInspectPhoto }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(getPhotoUrl('hero'));
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [countdown, setCountdown] = useState<number>(10);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  const countdownQuotes = [
    'This is for you ka',
    'seri eppdiyum niga itha gift ah night pakka matiga so good morning',
    '26 ah athu ethuku enna ku nebakavaruthu',
    'Ennaku nebakam vathuruchi ka 52 va 2 divide panna 26',
    'ahhh wedding innum 52 days tha iruku la ka',
    'ayyo athuvum illa ennna nu marathuten ne',
    'tommorow monday work poganum la',
    'ayyo athu illa hmm inaiku november 29 la athu ahh today sunday leave jolly tha',
    'you are so cute ka',
    'Hi akka yerkanave sollirupen but irudhallum soldren',
  ];

  useEffect(() => {
    const handleUpdate = () => setPhotoUrl(getPhotoUrl('hero'));
    window.addEventListener('ammukaka_photos_updated', handleUpdate);
    return () => window.removeEventListener('ammukaka_photos_updated', handleUpdate);
  }, []);

  // Timed progression of opening reveals
  useEffect(() => {
    if (countdownComplete) return;

    if (countdown === 0) {
      const finishTimer = setTimeout(() => {
        setCountdownComplete(true);
        onBegin();
      }, 4000);
      return () => clearTimeout(finishTimer);
    }

    const countdownDuration = countdown === 8 ? 5000 : 4000;
    const timer = setTimeout(() => setCountdown((value) => value - 1), countdownDuration);
    return () => clearTimeout(timer);
  }, [countdown, countdownComplete, onBegin]);

  const updateScenePosition = (clientX: number, clientY: number) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    scene.style.setProperty('--pointer-x', `${x.toFixed(3)}`);
    scene.style.setProperty('--pointer-y', `${y.toFixed(3)}`);
  };

  const resetScenePosition = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty('--pointer-x', '0');
    scene.style.setProperty('--pointer-y', '0');
  };

  return (
    <section
      id="section-1"
      ref={sceneRef}
      className="cosmic-opening relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050509]"
      onPointerMove={(event) => updateScenePosition(event.clientX, event.clientY)}
      onPointerLeave={resetScenePosition}
    >
      {/* Watermark-free nebula atmosphere inspired by the supplied cosmic references. */}
      <div className="cosmic-backdrop absolute inset-0 z-0" aria-hidden="true">
        <div className="cosmic-nebula cosmic-nebula-one" />
        <div className="cosmic-nebula cosmic-nebula-two" />
        <div className="cosmic-nebula cosmic-nebula-three" />
        <div className="cosmic-stars" />
      </div>

      {/* Background Image of Ammuka Ka */}
      <div className="absolute inset-0 z-[1]">
        <motion.div
          animate={{
            filter: hasStarted ? 'blur(0px) brightness(1)' : 'blur(10px) brightness(0.38)',
            scale: hasStarted ? 1.02 : 1.08,
          }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="cosmic-photo-layer w-full h-full relative"
          onClick={() => onInspectPhoto('hero', 'Ammuka Ka', 'Every moment with you')}
        >
          <img
            src={photoUrl}
            alt="Ammuka Ka"
            className="w-full h-full object-cover object-center select-none cursor-pointer"
            loading="eager"
            referrerPolicy="no-referrer"
            onClick={() => onInspectPhoto('hero', 'Ammuka Ka', 'Every moment with you')}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={photoUrl}
            onError={() => setVideoUnavailable(true)}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center select-none ${videoUnavailable ? 'hidden' : 'block'}`}
          >
            <source src="/videos/village-birthday.mp4" type="video/mp4" />
          </video>
          {/* Subtle blue-purple ambient glow */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              hasStarted ? 'opacity-40' : 'opacity-85'
            } bg-gradient-to-t from-[#050509] via-[#050509]/35 to-[#050509]/65`}
          />
        </motion.div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 cinematic-vignette cosmic-vignette" />

      {/* Typography Overlay */}
      <div className="relative z-20 max-w-md w-full px-6 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence mode="wait">
          {!countdownComplete ? (
            countdown === 0 ? (
              <motion.div
                key="countdown-birthday"
                initial={{ opacity: 0, scale: 0.72, filter: 'blur(18px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.12, filter: 'blur(12px)' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="font-serif text-4xl sm:text-6xl font-black tracking-wide text-[#7c3aed] text-glow">
                  26th Happy Birthday Ka
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`countdown-${countdown}`}
                initial={{ opacity: 0, y: 32, scale: 0.92, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -32, scale: 1.06, filter: 'blur(14px)' }}
                transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-[220px] flex-col items-center justify-center space-y-6"
              >
                <motion.span
                  key={`number-${countdown}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: 'backOut' }}
                  className="font-serif text-5xl sm:text-6xl font-black text-[#7c3aed] text-glow"
                >
                  {countdown}
                </motion.span>
                <p className="font-serif text-xl sm:text-3xl leading-relaxed text-[#f5efe6] text-glow px-2">
                  {countdownQuotes[countdown - 1]}
                </p>
              </motion.div>
            )
          ) : (
            <motion.div
              key="post-tap-welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#7c3aed]">
                Etho Ennala Mudijathu Ka
              </span>
              
              <h1 className="font-serif text-7xl sm:text-8xl text-[#f4efe6] font-black leading-[0.85] tracking-tight text-glow">
                <span className="block text-3xl sm:text-4xl font-bold leading-none text-[#7c3aed]">For</span>
                <img
                  src="https://img.icons8.com/emoji/48/index-pointing-at-the-viewer-emoji.png"
                  alt="Pointing hand"
                  className="mx-auto my-4 h-20 w-20 sm:h-24 sm:w-24"
                />
                <span className="block">Ammuka Ka</span>
              </h1>
              <p className="text-xs text-stone-300 tracking-widest uppercase pt-2 animate-pulse">
                Porumaiya scroll pannuga ka👇
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom scroll prompt arrow */}
      {hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 z-20 text-center pointer-events-none"
        >
          <div className="w-5 h-9 rounded-full border border-stone-500/50 flex items-start justify-center p-1 mx-auto">
            <div className="w-1.5 h-2.5 rounded-full bg-[#7c3aed] animate-bounce" />
          </div>
        </motion.div>
      )}
    </section>
  );
};
