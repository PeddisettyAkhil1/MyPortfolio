import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../lib/portfolio-data';

interface Creative3DLoaderProps {
  onComplete: () => void;
}

export const Creative3DLoader: React.FC<Creative3DLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const targetDuration = 1200; // 1.2 second fast & smooth load
    let animationFrameId: number;
    let completed = false;

    const animateProgress = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min(100, (elapsed / targetDuration) * 100);

      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else if (!completed) {
        completed = true;
        // Brief 150ms pause at 100% to let user see "SYSTEM READY" before entering site
        setTimeout(() => {
          onCompleteRef.current();
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    // Safety fallback after 1.6 seconds
    const fallbackTimer = setTimeout(() => {
      if (!completed) {
        completed = true;
        onCompleteRef.current();
      }
    }, 1600);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const getStatusText = (p: number) => {
    if (p < 30) return '01 // WELCOME TO AKHIL\'S STUDIO';
    if (p < 60) return '02 // INITIALIZING UX/UI DESIGN MATRIX';
    if (p < 90) return '03 // LOADING GAME ENGINE ASSETS';
    return '04 // SYSTEM READY — ENTERING PORTFOLIO';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onCompleteRef.current()}
      className="fixed inset-0 z-[9999] bg-[#0F1117] text-white flex flex-col justify-between p-6 sm:p-10 overflow-hidden select-none pointer-events-auto cursor-pointer"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E65F2B]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar: Minimal Logo */}
      <div className="relative z-10 flex items-center justify-between max-w-[1440px] w-full mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#E65F2B] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#E65F2B]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold font-heading tracking-widest text-white uppercase">
            {PERSONAL_INFO.name}
          </span>
        </div>
      </div>

      {/* Center Graphic: Ultra-Attractive 3D Glass Emblem */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-3xl bg-[#E65F2B]/20 animate-ping opacity-75" />
          <div className="absolute -inset-2 rounded-3xl border border-[#E65F2B]/40 animate-[spin_10s_linear_infinite]" />

          <div className="relative w-full h-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center p-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl animate-pulse"
            />
          </div>
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight mb-2">
          UX Designer & Game Developer
        </h1>
        <p className="text-xs text-zinc-400 font-mono tracking-wide">
          {getStatusText(progress)}
        </p>
      </div>

      {/* Bottom Bar: Progress Bar & Counter */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="text-[#E65F2B] font-bold tracking-widest uppercase">
            LOADING EXPERIENCE
          </span>
          <span className="text-white font-bold text-sm">
            {Math.min(100, Math.round(progress))}%
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#E65F2B] to-amber-400 rounded-full transition-all duration-75 relative shadow-lg shadow-[#E65F2B]/50"
            style={{ width: `${Math.min(100, progress)}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-white/80 blur-xs" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
