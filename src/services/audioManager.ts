// Global Audio Manager for Ammuka Ka's cinematic birthday journey
// Handles /audio/vathayo-punaithayo.mp3 with smooth volume fades + Web Audio emotional melodic accompaniment fallback

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isStarted: boolean = false;
  private isPlaying: boolean = false;
  private targetVolume: number = 0.75;
  private currentVolume: number = 0;
  private fadeInterval: number | null = null;
  private audioCtx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private isSynthPlaying: boolean = false;
  private synthTimer: number | null = null;
  private listeners: Set<(state: { isPlaying: boolean; isMuted: boolean }) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    this.audio = new Audio('/audio/vathayo-punaithayo.mp3');
    this.audio.loop = true;
    this.audio.volume = 0;
    this.audio.preload = 'auto';
    this.audio.autoplay = true;

    // Handle end or errors gracefully
    this.audio.addEventListener('error', () => {
      console.log('Using cinematic Web Audio melody accompaniment.');
    });
  }

  public subscribe(cb: (state: { isPlaying: boolean; isMuted: boolean }) => void) {
    this.listeners.add(cb);
    cb({ isPlaying: this.isPlaying, isMuted: this.isMuted });
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb({ isPlaying: this.isPlaying, isMuted: this.isMuted }));
  }

  public async startAudio(): Promise<boolean> {
    this.isStarted = true;
    let audioSuccess = false;

    // Try playing MP3 element
    if (this.audio) {
      try {
        await this.audio.play();
        audioSuccess = true;
        this.isPlaying = true;
        this.fadeIn();
      } catch (e) {
        console.warn('Audio play request had interaction restrictions or file waiting:', e);
      }
    }

    // Also start or prepare emotional cinematic Web Audio melody synth.
    // If the browser blocks autoplay, keep the state stopped so a later
    // user interaction can retry the real audio playback.
    if (audioSuccess) {
      this.startMelodicSynthesizer();
    }
    this.isPlaying = audioSuccess || this.isSynthPlaying;
    this.notify();
    return audioSuccess;
  }

  // Emotional acoustic/piano ambient synthesis echoing the tender melodic spirit of "Eppadi Vandhaayo"
  private startMelodicSynthesizer() {
    if (this.isSynthPlaying) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      this.audioCtx = new AudioCtxClass();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.synthGain = this.audioCtx.createGain();
      this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : 0.22, this.audioCtx.currentTime);
      this.synthGain.connect(this.audioCtx.destination);

      this.isSynthPlaying = true;
      this.playMelodyLoop();
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  }

  private playMelodyLoop() {
    if (!this.audioCtx || !this.synthGain || !this.isSynthPlaying) return;

    // Tender pentatonic & emotional raga notes (D, E, F#, A, B, C#)
    const notes = [
      293.66, 329.63, 369.99, 440.00, 493.88, 554.37, 587.33, 659.25,
      554.37, 493.88, 440.00, 369.99, 329.63, 293.66, 369.99, 440.00
    ];
    let noteIndex = 0;

    const scheduleNext = () => {
      if (!this.audioCtx || !this.isSynthPlaying) return;
      const ctx = this.audioCtx;
      const freq = notes[noteIndex % notes.length];
      noteIndex++;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Soft warm sine + triangle blend
      osc.type = noteIndex % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Acoustic envelope (soft attack, slow lingering decay)
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(noteGain);
      if (this.synthGain) {
        noteGain.connect(this.synthGain);
      }

      osc.start(now);
      osc.stop(now + 2.0);

      // Next note in ~550ms
      this.synthTimer = window.setTimeout(scheduleNext, 520);
    };

    scheduleNext();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.22, this.audioCtx.currentTime, 0.1);
    }
    this.notify();
    return this.isMuted;
  }

  public setProgress(progress: number) {
    // Near the end (Section 12), fade out slowly as specified in user instructions
    if (progress > 0.88) {
      const fadeFactor = Math.max(0, 1 - (progress - 0.88) / 0.12);
      this.setVolume(this.targetVolume * fadeFactor);
    } else if (this.isStarted && !this.isMuted) {
      this.setVolume(this.targetVolume);
    }
  }

  private setVolume(vol: number) {
    if (this.isMuted) return;
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.currentVolume;
    }
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.setValueAtTime(this.currentVolume * 0.25, this.audioCtx.currentTime);
    }
  }

  private fadeIn(duration: number = 2500) {
    const steps = 25;
    const stepTime = duration / steps;
    const volIncrement = this.targetVolume / steps;
    let current = 0;

    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.fadeInterval = window.setInterval(() => {
      current += volIncrement;
      if (current >= this.targetVolume) {
        this.setVolume(this.targetVolume);
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      } else {
        this.setVolume(current);
      }
    }, stepTime);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsStarted(): boolean {
    return this.isStarted;
  }
}

export const globalAudio = new AudioManager();
