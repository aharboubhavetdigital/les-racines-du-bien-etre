import React from 'react';
import { Compass, Feather, Sun } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section id="intro" className="py-20 md:py-32 bg-[#131210] text-white border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image & Texture Side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-3/4 rounded-sm overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1512290900673-7002fc313815?auto=format&fit=crop&w=900&q=85"
                  alt="Atmosphère naturelle et fleurs séchées — Les Racines du Bien-Être"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                />
              </div>

              {/* Decorative Off-axis Frame */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border border-white/10 rounded-sm -z-10 hidden sm:block pointer-events-none" />

              {/* Quote overlay card */}
              <div className="mt-6 p-6 liquid-glass rounded-xl border border-white/10 shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="font-serif-editorial text-4xl text-[#AEB9A9] leading-none">“</span>
                  <div>
                    <p className="font-serif-editorial text-base text-white/90 italic leading-relaxed">
                      La nature ne se presse pas, et pourtant tout est accompli. L’accompagnement holistique respecte ce rythme naturel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            {/* Small Editorial Label */}
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-[#AEB9A9]" />
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
                Notre Approche
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-[1.15]">
              « Prendre soin de soi commence par revenir à l’essentiel. »
            </h2>

            {/* Editorial Paragraphs */}
            <div className="space-y-4 font-sans text-base text-white/80 leading-relaxed font-light">
              <p>
                Dans un monde accéléré où les sollicitations sont permanentes, le corps exprime parfois son surmenage par la fatigue, les somatisations ou une perte d’énergie vitale. Chez <strong className="font-medium text-white">Les Racines du Bien-Être</strong>, nous croyons qu’un accompagnement réussi s’enracine dans la compréhension fine de vos besoins physiologiques et émotionnels.
              </p>
              <p>
                Notre méthode réconcilie le savoir traditionnel naturopathique avec la précision des techniques réflexologiques manuelles. Pas de solutions préconçues ni de régimes punitifs : nous co-construisons une hygiène de vie pérenne qui s’intègre harmonieusement à vos contraintes quotidiennes.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#AEB9A9]">
                  <Compass className="w-4 h-4 stroke-[1.5]" />
                </div>
                <h3 className="font-serif-editorial text-lg font-medium text-white">Rechercher la Cause</h3>
                <p className="font-sans text-xs text-white/60 leading-snug">
                  Traiter le terrain en profondeur plutôt que masquer le symptôme.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#AEB9A9]">
                  <Feather className="w-4 h-4 stroke-[1.5]" />
                </div>
                <h3 className="font-serif-editorial text-lg font-medium text-white">Douceur Thérapeutique</h3>
                <p className="font-sans text-xs text-white/60 leading-snug">
                  Des rituels respectueux de votre réceptivité et de votre rythme.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#AEB9A9]">
                  <Sun className="w-4 h-4 stroke-[1.5]" />
                </div>
                <h3 className="font-serif-editorial text-lg font-medium text-white">Résultats Durables</h3>
                <p className="font-sans text-xs text-white/60 leading-snug">
                  Des outils concrets pour devenir pleinement autonome dans votre santé.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
