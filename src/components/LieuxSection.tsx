import React from 'react';
import { Gauge, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface LieuxSectionProps {
  onOpenBooking?: (serviceId?: string) => void;
  onOpenQuiz?: () => void;
}

export const LieuxSection: React.FC<LieuxSectionProps> = ({ onOpenQuiz }) => {
  const scrollToBoutique = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('boutique') || document.getElementById('produits') || document.getElementById('ressources');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="lieux" className="w-full bg-[#161412] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[540px] lg:min-h-[600px]">
        
        {/* Left Panel: Outil Pédagogique */}
        <div className="relative bg-[#736355] p-10 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden text-white">
          {/* Concentric Circle Graphic */}
          <svg
            className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-25 stroke-white/50 fill-none"
            viewBox="0 0 600 600"
          >
            <circle cx="300" cy="300" r="140" strokeWidth="1" />
            <circle cx="300" cy="300" r="220" strokeWidth="1" />
            <circle cx="300" cy="300" r="300" strokeWidth="1" />
          </svg>

          {/* Top Header Block */}
          <div className="relative z-10 space-y-6">
            <Gauge className="w-8 h-8 text-[#D8CFBF] stroke-[1.5]" />
            
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#D8CFBF] uppercase font-medium block">
              OUTIL PÉDAGOGIQUE
            </span>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-[-0.01em] text-white">
              Faire le point sur vos{' '}
              <span className="italic font-light">habitudes.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-white/90 font-light max-w-md leading-relaxed pt-2">
              Six questions simples autour du sommeil, du rythme, de l'alimentation, de l'activité, du stress et de la récupération.
            </p>
          </div>

          {/* Bottom CTA Button */}
          <div className="relative z-10 pt-10 sm:pt-14">
            <button
              onClick={() => onOpenQuiz?.()}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1E1C19] font-sans text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-[#F3ECE4] shadow-md cursor-pointer"
            >
              <span>Commencer le baromètre</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right Panel: La Boutique */}
        <div className="relative p-10 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden text-white">
          {/* Background Image of Tote Bag */}
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
            alt="Tote bag aux couleurs de la marque Les Racines du Bien-Être"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] contrast-[1.05]"
          />
          {/* Warm Taupe Overlay */}
          <div className="absolute inset-0 bg-[#68584B]/65 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />

          {/* Top Header Block */}
          <div className="relative z-10 space-y-6">
            <ShoppingBag className="w-8 h-8 text-[#E2D8C8] stroke-[1.5]" />

            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#E2D8C8] uppercase font-medium block">
              LA BOUTIQUE
            </span>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-[-0.01em] text-white">
              Des objets aux <br className="hidden sm:inline" />
              couleurs de <span className="italic font-light">la marque.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-white/90 font-light max-w-md leading-relaxed pt-2">
              Tote bag, gourde, carnet et tisanière : découvrez la collection imaginée pour prolonger l'univers de la marque.
            </p>
          </div>

          {/* Bottom CTA Button */}
          <div className="relative z-10 pt-10 sm:pt-14">
            <a
              href="#boutique"
              onClick={scrollToBoutique}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1E1C19] font-sans text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-[#F3ECE4] shadow-md cursor-pointer"
            >
              <span>Voir la boutique</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

