import React from 'react';
import InfiniteSpiral, { SpiralItem } from './InfiniteSpiral';
import { Sparkles } from 'lucide-react';

const NATUROPATHY_SPIRAL_IMAGES: SpiralItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    alt: 'Réflexologie plantaire et massage des pieds',
    label: 'Réflexologie Plantaire'
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    alt: 'Massage crânien et soin visage apaisant',
    label: 'Soin Apaisant Visage'
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    alt: 'Huiles de massage naturelles et phytothérapie',
    label: 'Huiles Végétales'
  },
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
    alt: 'Technique manuelle réflexe des mains',
    label: 'Réflexologie Palmaire'
  },
  {
    src: 'https://images.unsplash.com/photo-1512290900673-7002ddb928f2?auto=format&fit=crop&w=600&q=80',
    alt: 'Lâcher-prise profond et relaxation',
    label: 'Lâcher-prise'
  },
  {
    src: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=600&q=80',
    alt: 'Point de pression réflexe et bien-être',
    label: 'Points Réflexes'
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    alt: 'Consultation personnalisée et écoute',
    label: 'Accompagnement'
  },
  {
    src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    alt: 'Synergie d’huiles essentielles',
    label: 'Aromathérapie'
  }
];

export const SpiralGallerySection: React.FC = () => {
  return (
    <section id="univers-visuel" className="py-20 sm:py-28 bg-[#141311] text-white relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#AEB9A9]" />
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
            Réflexologie
          </span>
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-5xl font-light text-white leading-tight">
          Le geste juste, dans un cadre rassurant.
        </h2>

        <p className="font-sans text-xs sm:text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
          des techniques manuelles douces qui peuvent compléter une démarche globale de bien-être
        </p>
      </div>

      <div className="w-full h-[520px] sm:h-[600px] relative">
        <InfiniteSpiral
          items={NATUROPATHY_SPIRAL_IMAGES}
          animationMode="all"
          speed={0.5}
          radius={210}
          cardWidth={130}
          cardHeight={170}
          verticalSpacing={65}
          perspective={1100}
          cardRadius={14}
          centerScale={1.25}
          edgeBlur={5}
          cardsPerTurn={7}
          pauseOnHover
        />
      </div>
    </section>
  );
};
