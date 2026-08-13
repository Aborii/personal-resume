"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/** hydration-safe external store around the localStorage sound flag */
const soundListeners = new Set<() => void>();
const soundStore = {
  subscribe(cb: () => void) {
    soundListeners.add(cb);
    return () => soundListeners.delete(cb);
  },
  get(): boolean {
    try {
      return localStorage.getItem("nb-sound") === "1";
    } catch {
      return false;
    }
  },
  set(value: boolean) {
    try {
      localStorage.setItem("nb-sound", value ? "1" : "0");
    } catch {
      /* private mode etc. */
    }
    soundListeners.forEach((cb) => cb());
  },
};

/**
 * Tiny synthesized paper sounds (no audio assets): a filtered noise
 * "swish" for page flips and a soft tick for tab presses.
 * Off by default; preference persisted in localStorage.
 */
export function useNotebookSounds() {
  const enabled = useSyncExternalStore(soundStore.subscribe, soundStore.get, () => false);
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    if (!noiseRef.current) {
      const ctx = ctxRef.current;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      noiseRef.current = buffer;
    }
    return ctxRef.current;
  }, []);

  const toggle = useCallback(() => {
    const next = !soundStore.get();
    soundStore.set(next);
    if (next) getCtx();
  }, [getCtx]);

  const playFlip = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx || !noiseRef.current) return;
    const t = ctx.currentTime;

    const src = ctx.createBufferSource();
    src.buffer = noiseRef.current;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.9;
    band.frequency.setValueAtTime(1700, t);
    band.frequency.exponentialRampToValueAtTime(420, t + 0.3);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.16, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);

    src.connect(band).connect(gain).connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.4);
  }, [enabled, getCtx]);

  const playTap = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx || !noiseRef.current) return;
    const t = ctx.currentTime;

    const src = ctx.createBufferSource();
    src.buffer = noiseRef.current;

    const high = ctx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 2400;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

    src.connect(high).connect(gain).connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.07);
  }, [enabled, getCtx]);

  return { enabled, toggle, playFlip, playTap };
}
