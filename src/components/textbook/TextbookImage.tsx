'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface TextbookImageProps {
  src: string;
  alt?: string;
  [key: string]: any;
}

export function TextbookImage({ src, alt, ...props }: TextbookImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="my-6 md:my-8 flex flex-col items-center select-none no-print">
        {/* Interactive Sticker Image Frame */}
        <div
          onClick={() => setIsOpen(true)}
          className="group relative cursor-zoom-in overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-slate-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] max-w-full md:max-w-[85%] aspect-[4/3] flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src || "/api/placeholder/400/300"}
            alt={alt || "Educational picture book illustration"}
            className="w-full h-full object-cover select-none pointer-events-none"
            {...props}
          />
          
          {/* Subtle cartoon sticker shine reflection layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/25 pointer-events-none" />
          
          {/* Zoom Overlay Indicator */}
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
            <div className="p-3 bg-white/95 rounded-2xl shadow-md text-slate-800 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider scale-95 group-hover:scale-100 transition-transform duration-200">
              <ZoomIn className="w-4 h-4 text-primary" />
              <span>Zoom</span>
            </div>
          </div>
        </div>

        {/* Dynamic Figure Caption */}
        {alt && (
          <span className="mt-3 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center px-4">
            🌟 {alt}
          </span>
        )}
      </div>

      {/* Static Print Fallback (No Zoom controls, direct rendering) */}
      <div className="hidden print:flex flex-col items-center my-4 w-full">
        <div className="overflow-hidden border-2 border-slate-300 rounded-2xl w-[90%] aspect-[4/3] max-h-[120mm]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        {alt && (
          <span className="mt-2 text-[9px] font-bold text-slate-500 uppercase tracking-wider text-center">
            Figure: {alt}
          </span>
        )}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 p-4 md:p-10 no-print cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[75vh] md:max-h-[80vh] overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain max-h-[75vh] md:max-h-[80vh] mx-auto select-none"
              />
            </motion.div>

            {alt && (
              <span className="mt-4 text-xs md:text-sm font-extrabold text-white/80 uppercase tracking-widest text-center px-4 max-w-2xl leading-relaxed">
                {alt}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
