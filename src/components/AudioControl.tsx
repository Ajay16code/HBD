import React, { useEffect, useState } from 'react';
import { globalAudio } from '../services/audioManager';

interface AudioControlProps {
  started: boolean;
  onStartRequest?: () => void;
}

export const AudioControl: React.FC<AudioControlProps> = ({ started, onStartRequest }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  useEffect(() => {
    const unsubscribe = globalAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
    });
    const instructionTimer = window.setTimeout(() => setShowInstruction(false), 60000);
    return () => {
      unsubscribe();
      window.clearTimeout(instructionTimer);
    };
  }, []);

  const handleClick = async () => {
    if (!started && onStartRequest) {
      onStartRequest();
      return;
    }
    if (!isPlaying) {
      await globalAudio.startAudio();
    } else {
      globalAudio.toggleMute();
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2 pointer-events-auto">
      {showInstruction && (
        <button
          onClick={handleClick}
          className="rounded-full bg-black/70 px-3 py-2 text-[11px] font-bold text-[#f5efe6] border border-[#7c3aed]/35 shadow-xl whitespace-nowrap"
        >
          Akka, idha click panni start pannunga ka 💛
        </button>
      )}
      <button
        onClick={handleClick}
        aria-label={!isPlaying ? 'Tap to play music' : isMuted ? 'Unmute music' : 'Mute music'}
        title={!isPlaying ? 'Tap to play music' : isMuted ? 'Unmute music' : 'Mute music'}
        className={`w-10 h-10 flex items-center justify-center rounded-full bg-black/55 backdrop-blur-md border border-[#7c3aed]/45 text-base transition-all hover:scale-110 active:scale-95 shadow-xl ${
          !isPlaying ? 'animate-pulse' : ''
        }`}
      >
        {!isPlaying ? (
          <span className="select-none text-lg" aria-hidden="true">👆</span>
        ) : isMuted ? (
          <span className="select-none" aria-hidden="true">🔇</span>
        ) : (
          <span className="select-none" aria-hidden="true">🎶</span>
        )}
      </button>
    </div>
  );
};
