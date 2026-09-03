import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface BoutiqueFinalCTAProps {
  onOpenBooking: () => void;
  onOpenQuiz?: () => void;
}

export const BoutiqueFinalCTA: React.FC<BoutiqueFinalCTAProps> = ({
  onOpenBooking,
  onOpenQuiz,
}) => {
  return (
    <section className="bg-[#181D1A] text-white py-24 sm:py-32 px-6 sm:px-12 relative overflow-hidden">
      {/* BOTANICAL VECTOR ELEMENT */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#AEB9A9]">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M100 20 C120 60, 140 80, 180 100 C140 120, 120 140, 100 180 C80 140, 60 120, 20 100 C60 80, 80 60, 100 20 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COMPOSITION */}
        <div className="lg:col-span-7">
          <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-[#AEB9A9] font-medium mb-4">
            VOUS NE SAVEZ PAS QUEL SOIN CHOISIR ?
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-[1.18] mb-6">
            Commençons simplement <br />
            <span className="italic font-normal text-[#D6DFD3]">par échanger.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-white/80 font-light max-w-xl leading-relaxed">
            Je peux vous aider à identifier l’accompagnement qui correspond le mieux à votre besoin du moment.
          </p>
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#AEB9A9] text-[#131210] hover:bg-[#c2cdc0] transition-all duration-300 font-mono text-xs tracking-[0.2em] uppercase shadow-xl hover:shadow-[0_0_30px_rgba(174,185,169,0.4)] flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          <button
            onClick={() => {
              if (onOpenQuiz) onOpenQuiz();
              else onOpenBooking();
            }}
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors flex items-center gap-2 underline underline-offset-8 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#AEB9A9]" />
            Me contacter / Question rapide
          </button>
        </div>
      </div>
    </section>
  );
};
