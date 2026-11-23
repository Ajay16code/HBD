import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <>
      {/* Film grain noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 film-grain opacity-40 mix-blend-screen" />
      {/* Subtle cinematic vignette */}
      <div className="fixed inset-0 pointer-events-none z-20 cinematic-vignette" />
      {/* Ambient blue top and red bottom gradients */}
      <div className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050509]/90 to-transparent pointer-events-none z-10" />
      <div className="fixed bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050509]/90 to-transparent pointer-events-none z-10" />
    </>
  );
};
