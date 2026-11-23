/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CinematicCanvas3D } from './components/CinematicCanvas3D';
import { FilmGrain } from './components/FilmGrain';
import { AudioControl } from './components/AudioControl';
import { PhotoModal } from './components/PhotoModal';
import { globalAudio } from './services/audioManager';
import { PhotoCustomizer } from './components/PhotoCustomizer';

import { Section1Opening } from './components/sections/Section1Opening';
import { Section2Intro } from './components/sections/Section2Intro';
import { Section3MemoryWorld } from './components/sections/Section3MemoryWorld';
import { Section4Timeline } from './components/sections/Section4Timeline';
import { Section5LittleMoments } from './components/sections/Section5LittleMoments';
import { Section6NeverSay } from './components/sections/Section6NeverSay';
import { Section7TaughtMe } from './components/sections/Section7TaughtMe';
import { Section8Bloopers } from './components/sections/Section8Bloopers';
import { Section9SongMoment } from './components/sections/Section9SongMoment';
import { Section10SongWorld } from './components/sections/Section10SongWorld';
import { Section11Letter } from './components/sections/Section11Letter';
import { Section12FinalReveal } from './components/sections/Section12FinalReveal';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inspectPhoto, setInspectPhoto] = useState<{
    key: string | null;
    title: string;
    subtitle: string;
  }>({
    key: null,
    title: '',
    subtitle: '',
  });

  // Handle gentle scroll progress for 3D camera and audio volume fades
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
        setScrollProgress(progress);
        globalAudio.setProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBegin = useCallback(async () => {
    setHasStarted(true);
    await globalAudio.startAudio();

    // Gentle slow scroll invite
    setTimeout(() => {
      window.scrollBy({ top: 180, behavior: 'smooth' });
    }, 1200);
  }, []);

  useEffect(() => {
    let interactionHandled = false;

    const startOnInteraction = () => {
      if (interactionHandled) return;
      interactionHandled = true;
      void handleBegin();
      window.removeEventListener('pointerdown', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
    };

    const tryAutoplay = async () => {
      const audioStarted = await globalAudio.startAudio();
      if (audioStarted) {
        setHasStarted(true);
        return;
      }

      window.addEventListener('pointerdown', startOnInteraction, { once: true });
      window.addEventListener('keydown', startOnInteraction, { once: true });
      window.addEventListener('touchstart', startOnInteraction, { once: true });
    };

    void tryAutoplay();

    return () => {
      window.removeEventListener('pointerdown', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
    };
  }, [handleBegin]);

  const handleInspectPhoto = useCallback((key: string, title: string, subtitle: string) => {
    setInspectPhoto({ key, title, subtitle });
  }, []);

  const handleCloseInspect = useCallback(() => {
    setInspectPhoto({ key: null, title: '', subtitle: '' });
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050509] text-[#f7f5ff] overflow-x-hidden selection:bg-[#7c3aed]/35 selection:text-white">
      {/* 3D Cinematic Canvas background */}
      <CinematicCanvas3D
        scrollProgress={scrollProgress}
        onSelectPhoto={handleInspectPhoto}
      />

      {/* Atmospheric overlays (grain, vignette, safe gradients) */}
      <FilmGrain />

      {/* Floating Audio Manager (Music control ♪ / ♪̸) */}
      <AudioControl
        started={hasStarted}
        onStartRequest={handleBegin}
      />
      <PhotoCustomizer />

      {/* Photo inspection modal on tap */}
      <PhotoModal
        photoKey={inspectPhoto.key}
        title={inspectPhoto.title}
        subtitle={inspectPhoto.subtitle}
        onClose={handleCloseInspect}
      />

      {/* Small GIPHY decorations anchored to the bottom corners */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex items-end justify-between px-3 sm:bottom-5 sm:px-5">
        <iframe
          src="https://giphy.com/embed/FQxpCWS4ZyvNFCTKHJ"
          title="Stitch waving GIF"
          width="120"
          height="120"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          className="h-24 w-24 rounded-xl sm:h-32 sm:w-32"
        />
        <iframe
          src="https://giphy.com/embed/ifXWIrbONpgB5B6n5m"
          title="Happy dancing GIF"
          width="120"
          height="120"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          className="h-24 w-24 rounded-xl sm:h-32 sm:w-32"
        />
      </div>

      {/* 12 Cinematic Sections with slow, natural breathing space */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Section 1: Cinematic Opening */}
        <Section1Opening
          hasStarted={hasStarted}
          onBegin={handleBegin}
          onInspectPhoto={handleInspectPhoto}
        />

        {/* The remaining sections are unveiled after start */}
        <div className={`transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
          {/* Section 2: Introduction */}
          <Section2Intro />

          {/* Section 3: Memory World */}
          <Section3MemoryWorld onInspectPhoto={handleInspectPhoto} />

          {/* Section 4: Memory Timeline */}
          <Section4Timeline onInspectPhoto={handleInspectPhoto} />

          {/* Section 5: Little Moments */}
          <Section5LittleMoments onInspectPhoto={handleInspectPhoto} />

          {/* Section 6: Things I Never Say */}
          <Section6NeverSay />

          {/* Section 7: What You Taught Me */}
          <Section7TaughtMe />

          {/* Section 8: Fun Memories */}
          <Section8Bloopers onInspectPhoto={handleInspectPhoto} />

          {/* Section 9: Special Song Moment */}
          <Section9SongMoment />

          {/* Section 10: Your Song 3D World */}
          <Section10SongWorld onInspectPhoto={handleInspectPhoto} />

          {/* Section 11: Personal Letter */}
          <Section11Letter />

          {/* Section 12: Final Cinematic Reveal */}
          <Section12FinalReveal
            onReplay={handleReplay}
            onInspectPhoto={handleInspectPhoto}
          />
        </div>
      </main>
    </div>
  );
}
