import React from 'react';

interface EntreprisesSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export const EntreprisesSection: React.FC<EntreprisesSectionProps> = ({ onOpenBooking }) => {
  const scrollToLieux = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('lieux');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking?.('Deux lieux d’accueil');
    }
  };

  return (
    <section id="entreprises" className="w-full bg-[#1C2C24] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[680px]">
        
        {/* Left Column: Photo */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
            alt="Consultation naturopathique à Saint-Lô"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95"
          />
        </div>

        {/* Right Column: Dark Forest Green Panel */}
        <div className="bg-[#1D2C23] p-8 sm:p-14 lg:p-20 xl:p-24 flex flex-col justify-between">
          
          <div className="space-y-8">
            {/* Eyebrow */}
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A6B5A6] uppercase font-medium block">
              DEUX LIEUX D'ACCUEIL
            </span>

            {/* Main Title */}
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.6rem] font-light text-white leading-[1.15] tracking-[-0.01em]">
              Une présence à Saint-Lô et un lieu au bord de l’eau.
            </h2>

            {/* Top Divider */}
            <div className="w-full h-px bg-white/20 my-6 sm:my-8" />

            {/* List Item 01 */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-white/50 font-light">01</span>
                <h3 className="font-serif-editorial text-xl sm:text-2xl font-normal text-white">
                  Institut Belle et Zen
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/70 font-light pl-9">
                Un cadre pratique, confortable et professionnel à Saint-Lô.
              </p>
            </div>

            {/* Middle Divider */}
            <div className="w-full h-px bg-white/15 my-5 sm:my-6" />

            {/* List Item 02 */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-white/50 font-light">02</span>
                <h3 className="font-serif-editorial text-xl sm:text-2xl font-normal text-white">
                  Le Chant des Oiseaux
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/70 font-light pl-9">
                Un environnement apaisant et ressourçant, ouvert sur la nature.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-10 sm:pt-14">
            <a
              href="#lieux"
              onClick={scrollToLieux}
              className="inline-block px-7 py-3 rounded-full border border-white/30 hover:border-white text-white text-xs font-sans tracking-wide transition-all duration-300 hover:bg-white/10"
            >
              Découvrir les lieux
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

