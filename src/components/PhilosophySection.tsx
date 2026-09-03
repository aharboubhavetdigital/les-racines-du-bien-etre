import React from 'react';
import { Sparkles } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenQuiz: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onOpenQuiz }) => {
  const pillars = [
    {
      num: '01',
      title: 'Écouter',
      desc: 'Prendre le temps d’une écoute attentive et bienveillante de votre parcours, de votre rythme de vie et des signaux uniques émis par votre organisme.'
    },
    {
      num: '02',
      title: 'Comprendre',
      desc: 'Rechercher la cause profonde des dysfonctionnements physiques ou émotionnels plutôt que d’apporter un soulagement éphémère.'
    },
    {
      num: '03',
      title: 'Accompagner',
      desc: 'Co-créer des solutions douces, réalistes et durables, ajustées à votre réceptivité naturelle sans dogmatisme ni contraintes excessives.'
    },
    {
      num: '04',
      title: 'Équilibrer',
      desc: 'Ancrer une vitalité souveraine au quotidien, en réapprenant à faire confiance aux facultés d’auto-génération de votre corps.'
    }
  ];

  return (
    <section id="philosophy" className="py-24 md:py-36 bg-[#131210] text-white relative overflow-hidden">
      <div id="naturopathie" className="absolute -top-20" />
      {/* Subtle organic background graphics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#AEB9A9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#AEB9A9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Immersive Typography Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#AEB9A9]">
            Philosophie Fondatrice
          </span>

          <h2 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight tracking-tight">
            « Naturellement en équilibre. »
          </h2>

          <p className="font-sans text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Un idéal de bien-être fondé sur la synergie entre la sagesse de la nature, la précision physiologique et le respect profond de votre individualité.
          </p>

          <div className="w-12 h-[1px] bg-white/20 mx-auto pt-4" />
        </div>

        {/* 4 Pillars Typography Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-editorial text-2xl text-[#AEB9A9] opacity-80 group-hover:opacity-100 transition-opacity">
                  {pillar.num}
                </span>
                <span className="w-6 h-[1px] bg-white/20 group-hover:w-10 transition-all" />
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white tracking-wide">
                {pillar.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Quiz Trigger Banner */}
        <div className="mt-16 p-8 rounded-2xl liquid-glass border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[#AEB9A9] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Diagnostic d'Équilibre Interactif</span>
            </div>
            <h4 className="font-serif-editorial text-2xl text-white">
              Vous ne savez pas quel soin choisir ?
            </h4>
            <p className="font-sans text-xs text-white/70 font-light">
              Répondez à 3 questions simples pour déterminer si la naturopathie ou la réflexologie vous convient.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="px-6 py-3 bg-white text-gray-900 hover:bg-white/90 text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-colors shrink-0 shadow-lg"
          >
            Lancer le diagnostic (30s)
          </button>
        </div>

      </div>
    </section>
  );
};
