import React from 'react';
import { GradientCard } from './ui/gradient-card';
import bilanVitaliteImg from '../assets/images/naturopathie_vitalite_assessment_1788190900642.jpg';
import nutritionVivanteImg from '../assets/images/nutrition_vivante_naturopathie_1788191302696.jpg';
import reflexologieImg from '../assets/images/reflexologie_soin_naturopathie_1788191325082.jpg';
import phytotherapieImg from '../assets/images/phytotherapie_herboristerie_naturopathie_1788191340631.jpg';
import vitaliteNatureImg from '../assets/images/vitalite_reconnexion_nature_1788191355171.jpg';

interface SoinsAuSuiviSectionProps {
  onSelectService?: (serviceName: string) => void;
  onOpenBooking?: (serviceName?: string) => void;
}

interface CareCardItem {
  id: string;
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  gradient: 'sage' | 'sand' | 'taupe' | 'forest' | 'green' | 'orange' | 'purple';
}

const CARE_CARDS: CareCardItem[] = [
  {
    id: 'massage',
    badgeText: '01 // SOIN MANUEL',
    badgeColor: '#55695B',
    title: 'Massage bien-être',
    description: 'Un moment de détente manuelle adapté à votre confort, dans un cadre apaisant et non thérapeutique.',
    ctaText: 'Prendre rendez-vous',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    gradient: 'sage'
  },
  {
    id: 'reflexologie-plantaire',
    badgeText: '02 // RÉFLEXOLOGIE',
    badgeColor: '#736355',
    title: 'Réflexologie plantaire',
    description: 'Une technique manuelle douce sur les zones réflexes du pied, intégrée à une démarche globale de vitalité.',
    ctaText: 'Découvrir la séance',
    imageUrl: reflexologieImg,
    gradient: 'sand'
  },
  {
    id: 'reflexologie-faciale',
    badgeText: '03 // SOIN VISAGE',
    badgeColor: '#68584B',
    title: 'Réflexologie faciale',
    description: 'Une pratique manuelle apaisante proposée selon vos besoins spécifiques et le cadre de votre bilan.',
    ctaText: 'Réserver un soin',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    gradient: 'taupe'
  },
  {
    id: 'bilan-vitalite',
    badgeText: '04 // CONSULTATION D’ANCRAGE',
    badgeColor: '#AEB9A9',
    title: 'Bilan de vitalité',
    description: 'Le premier rendez-vous approfondi pour explorer votre histoire, votre hygiène de vie et vos priorités.',
    ctaText: 'Organiser le bilan',
    imageUrl: bilanVitaliteImg,
    gradient: 'forest'
  },
  {
    id: 'programme-vitalite',
    badgeText: '05 // PROGRAMME SUR-MESURE',
    badgeColor: '#4A5D50',
    title: 'Programme de vitalité',
    description: 'Un protocole d’action individualisé, réaliste et bienveillant, totalement adapté à votre quotidien.',
    ctaText: 'En savoir plus',
    imageUrl: nutritionVivanteImg,
    gradient: 'green'
  },
  {
    id: 'suivi-personnalise',
    badgeText: '06 // CONTINUITÉ & ÉCOUTE',
    badgeColor: '#7C6F82',
    title: 'Suivi personnalisé',
    description: 'Une continuité bienveillante entre les rendez-vous avec des ajustements réguliers et des encouragements.',
    ctaText: 'Suivre mon parcours',
    imageUrl: phytotherapieImg,
    gradient: 'purple'
  }
];

export const SoinsAuSuiviSection: React.FC<SoinsAuSuiviSectionProps> = ({
  onOpenBooking
}) => {
  return (
    <section id="soins-et-suivi" className="py-24 md:py-36 bg-[#F6F3EC] text-[#1E2420] border-t border-[#2C362F]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER ROW — KEEPING ORIGINAL H2 AND P AS REQUESTED */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 md:mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[4.4rem] font-normal leading-[1.1] tracking-[-0.02em] text-[#181D1A]">
              Des soins manuels<br />
              au <span className="italic font-light text-[#55695B]">suivi.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4">
            <p className="font-sans text-base sm:text-[1.05rem] text-[#4A554E] font-light leading-relaxed">
              Massage bien-être, réflexologie ou accompagnement en naturopathie : choisissez la démarche qui correspond à votre besoin du moment.
            </p>
          </div>
        </div>

        {/* GRADIENT CARD GRID WITH ADVANCED INTERACTION & DESIGN SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CARE_CARDS.map((card) => (
            <GradientCard
              key={card.id}
              title={card.title}
              description={card.description}
              ctaText={card.ctaText}
              imageUrl={card.imageUrl}
              gradient={card.gradient}
              onCtaClick={() => onOpenBooking?.(card.title)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
