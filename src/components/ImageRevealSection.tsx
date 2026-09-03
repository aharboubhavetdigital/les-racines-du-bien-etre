import React, { useMemo } from 'react';
import ParallaxUnfurlingGallery from './ui/3d-parallax-unfurling-gallery';
import bilanVitaliteImg from '../assets/images/naturopathie_vitalite_assessment_1788190900642.jpg';
import nutritionVivanteImg from '../assets/images/nutrition_vivante_naturopathie_1788191302696.jpg';
import reflexologieImg from '../assets/images/reflexologie_soin_naturopathie_1788191325082.jpg';
import phytotherapieImg from '../assets/images/phytotherapie_herboristerie_naturopathie_1788191340631.jpg';
import vitaliteNatureImg from '../assets/images/vitalite_reconnexion_nature_1788191355171.jpg';
import bilanVitalite2Img from '../assets/images/bilan_vitalite_1788190672705.jpg';

interface SpotlightItem {
  tag: string;
  title: string;
  image: string;
}

const NATUROPATHIE_GALLERY_ITEMS: SpotlightItem[] = [
  {
    tag: 'BILAN INITIAL // ÉCOUTE BIENVEILLANTE',
    title: 'Consultation approfondie & bilan de vitalité individualisé',
    image: bilanVitaliteImg
  },
  {
    tag: 'PILIER 01 // NUTRITION VIVANTE',
    title: 'Alimentation vivante, jus frais & superaliments régénérants',
    image: nutritionVivanteImg
  },
  {
    tag: 'PILIER 02 // RÉFLEXOLOGIE & DÉTENTE',
    title: 'Réflexologie plantaire, régulation nerveuse & relance énergétique',
    image: reflexologieImg
  },
  {
    tag: 'PILIER 03 // PHYTOTHÉRAPIE & HERBORISTERIE',
    title: 'Plantes médicinales, macérats de bourgeons & tisanes personnalisées',
    image: phytotherapieImg
  },
  {
    tag: 'PILIER 04 // ANCRAGE & VITALITÉ GLOBALE',
    title: 'Régénération durable & reconnexion profonde à la nature',
    image: vitaliteNatureImg
  },
  {
    tag: 'PILIER 05 // AROMATHÉRAPIE HOLISTIQUE',
    title: 'Synergies d’huiles essentielles pures & diffusion bien-être',
    image: bilanVitalite2Img
  },
  {
    tag: 'PILIER 06 // MASSAGES CORPORELS',
    title: 'Massages drainants, enveloppements aux huiles tièdes & relaxation',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    tag: 'PILIER 07 // RITUELS DE BOTANIQUE',
    title: 'Infusions de fleurs séchées, décoctions & remèdes ancestraux',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
  },
  {
    tag: 'PILIER 08 // ÉCLAT NATUREL & KOBIDO',
    title: 'Gua Sha, réflexologie faciale & soin regalbant du visage',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    tag: 'PILIER 09 // HARMONIZATION VIBRATOIRE',
    title: 'Sonothérapie, bols tibétains & apaisement du système nerveux',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    tag: 'PILIER 10 // GESTION DU STRESS',
    title: 'Respiration consciente, sophrologie & méditation d’ancrage',
    image: phytotherapieImg
  },
  {
    tag: 'PILIER 11 // JARDIN BOTANIQUE',
    title: 'Culture bio de plantes aromatiques & herbes de santé',
    image: reflexologieImg
  }
];

export function ImageRevealSection() {
  const galleryItems = useMemo(() => {
    return NATUROPATHIE_GALLERY_ITEMS.map((item) => ({
      src: item.image,
      title: item.title,
      tag: item.tag
    }));
  }, []);

  return (
    <div id="image-reveal-section" className="relative bg-[#0A0908] text-white">
      {/* 1. INTRO EDITORIAL HEADER */}
      <section className="intro bg-[#0A0908] py-20 sm:py-28 px-6 text-center text-white relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#AEB9A9]">
            Notre Vision Holistique
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-4xl md:text-5xl font-light text-[#FAF8F5] leading-relaxed italic">
            « Vous rendre autonome dans la responsabilité de votre bien-être, avec des conseils que vous comprenez et que vous pouvez réellement mettre en place. »
          </h2>
          <div className="pt-4 flex justify-center">
            <a
              href="#comprendre-naturopathie"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF8F5] text-[#131210] font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#344E41] hover:text-white shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Comprendre la naturopathie</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. 3D PARALLAX UNFURLING GALLERY MATRIX WITH NATUROPATHY & BIEN-ÊTRE IMAGES */}
      <ParallaxUnfurlingGallery items={galleryItems} />
    </div>
  );
}
