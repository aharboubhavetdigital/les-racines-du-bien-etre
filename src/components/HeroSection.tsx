import React from 'react';
import { ArrowDownRight, Sparkles, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenQuiz
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background subtle organic blur gradient */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#AEB9A9]/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#D8CCBC]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-70">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Editorial Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#D8CCBC]/60 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#667467] animate-pulse" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#756456]">
                Cabinet de Naturopathie & Réflexologie
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#343633] leading-[1.08] tracking-tight">
              « Retrouver l’équilibre en revenant à l’essentiel. »
            </h1>

            {/* Supporting paragraph */}
            <p className="font-sans text-base sm:text-lg text-[#343633]/80 max-w-xl leading-relaxed font-light">
              Une approche naturelle, globale et personnalisée pour prendre soin de soi, durablement. Retrouvez vitalité, sérénité et harmonie grâce aux vertus de la naturopathie et du toucher réflexologique.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 border border-[#667467] text-[#667467] hover:text-[#FAF8F5] hover:bg-[#667467] text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 cursor-pointer"
              >
                <span>Prendre rendez-vous</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#D8CCBC] hover:border-[#667467] text-[#343633] hover:text-[#667467] text-xs font-semibold tracking-[0.18em] uppercase rounded-full transition-all duration-300 cursor-pointer"
              >
                <span>Découvrir l’approche</span>
              </a>
            </div>

            {/* Key Value Badges */}
            <div className="pt-8 border-t border-[#D8CCBC]/40 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block font-serif-editorial text-2xl md:text-3xl font-medium text-[#667467]">100%</span>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#756456]">Naturel & Individualisé</span>
              </div>
              <div>
                <span className="block font-serif-editorial text-2xl md:text-3xl font-medium text-[#667467]">Saint-Lô</span>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#756456]">Lieux & En Ligne</span>
              </div>
              <div>
                <span className="block font-serif-editorial text-2xl md:text-3xl font-medium text-[#667467]">FENA</span>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#756456]">Naturopathe Agrée</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Photography Layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Editorial Image Frame */}
              <div className="relative aspect-4/5 rounded-xs overflow-hidden shadow-xl border border-[#D8CCBC]/60">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=85"
                  alt="Les Racines du Bien-Être — Soin holistique et huiles botaniques"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[0.98] transition-transform duration-700 hover:scale-103"
                />
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#343633]/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Embedded Quote Badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#FAF8F5]/90 backdrop-blur-md p-4 rounded-xs border border-[#D8CCBC]/60 shadow-xs">
                  <p className="font-serif-editorial italic text-xs md:text-sm text-[#343633] leading-snug">
                    « L’équilibre est un art de vivre qui commence par l’écoute du corps. »
                  </p>
                  <span className="block font-sans text-[10px] tracking-widest uppercase text-[#756456] mt-1.5">
                    — Philosophies de Soin
                  </span>
                </div>
              </div>

              {/* Floating Accent Cards */}
              <div className="hidden sm:block absolute -top-6 -left-6 bg-[#667467] text-[#FAF8F5] p-4 rounded-xs shadow-md border border-[#AEB9A9]/40 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-[#AEB9A9]" />
                  <span className="font-serif-editorial text-sm font-medium">Bilan Holistique</span>
                </div>
                <p className="text-[11px] text-[#FAF8F5]/80 font-light leading-snug">
                  Analyse globale des 4 piliers de vitalité.
                </p>
              </div>

              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#FAF8F5] border border-[#D8CCBC] p-4 rounded-xs shadow-md max-w-[200px] cursor-pointer hover:border-[#667467] transition-all" onClick={onOpenQuiz}>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#667467]" />
                  <span className="font-serif-editorial text-xs font-semibold uppercase tracking-wider text-[#343633]">Diagnostic 30s</span>
                </div>
                <p className="text-[11px] text-[#756456] leading-snug">
                  Trouvez le soin ou la consultation faite pour vous.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
