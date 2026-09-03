import React from 'react';
import { ExpandingCards, CardItem } from './ui/expanding-cards';
import { Activity, BookOpen, Sparkles, Waves, Sprout, Heart } from 'lucide-react';

interface ParcoursSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

const PARCOURS_CARDS: CardItem[] = [
  {
    id: "bilan-vitalite",
    title: "01. Bilan de vitalité",
    description: "Analyse approfondie de votre hygiène de vie, tempérament naturo et bilan morpho-physiologique pour identifier la cause fondamentale de vos déséquilibres.",
    imgSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    id: "programme-individualise",
    title: "02. Programme individualisé",
    description: "Élaboration d'un plan d'action personnalisé : nutrition bienveillante, phytothérapie, micronutrition et rituels quotidiens adaptés à votre rythme.",
    imgSrc: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "suivi-rapproche",
    title: "03. Suivi rapproché",
    description: "Accompagnement régulier pour consolider les acquis, ajuster la cure selon les ressentis et répondre à l'évolution naturelle de votre corps.",
    imgSrc: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "soins-manuels",
    title: "04. Soins manuels & Réflexologie",
    description: "Réflexologie plantaire et massages bien-être pour libérer le système nerveux, stimuler les émonctoires et dénouer les tensions physiques.",
    imgSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    icon: <Waves className="w-6 h-6" />,
  },
  {
    id: "hygiene-equilibre",
    title: "05. Hygiène de vie & Équilibre",
    description: "Gestion du stress, optimisation du sommeil et reconnexion au rythme circadien pour régénérer l'énergie vitale au quotidien.",
    imgSrc: "https://ekisantenaturopathie.be/wp-content/uploads/2024/10/DALL%C2%B7E-2024-10-03-08.50.35-A-minimalist-and-clean-illustration-with-sage-and-terracotta-tones-featuring-a-person-with-a-healthy-lifestyle.-Show-the-figure-in-a-balanced-pose-s.webp",
    icon: <Sprout className="w-6 h-6" />,
  },
  {
    id: "ancrage-serenite",
    title: "06. Ancrage & Sérénité",
    description: "Ancrage durable des habitudes saines pour vivre en pleine santé, en autonomie et en parfaite harmonie avec vos cycles.",
    imgSrc: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    icon: <Heart className="w-6 h-6" />,
  },
];

export const ParcoursSection: React.FC<ParcoursSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="votre-parcours" className="py-24 md:py-36 bg-[#E8EDE7] text-[#181D1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EYEBROW TAG - KEPT AS REQUESTED */}
        <div className="mb-6">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#617467]">
            VOTRE PARCOURS
          </span>
        </div>

        {/* MAIN TITLE - KEPT AS REQUESTED */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#181D1A] leading-[1.08] tracking-[-0.02em]">
            Comprendre, proposer,<br />
            <span className="italic font-light text-[#55695B]">ajuster.</span>
          </h2>
        </div>

        {/* EXPANDING CARDS COMPONENT */}
        <div className="my-8">
          <ExpandingCards items={PARCOURS_CARDS} defaultActiveIndex={0} />
        </div>

        {/* STEP DESCRIPTION SUMMARY & CTA BUTTON */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8 border-t border-[#181D1A]/15">
          <div className="max-w-xl space-y-2">
            <h3 className="font-serif-editorial text-2xl text-[#181D1A] font-normal">
              Un cheminement sur-mesure vers le mieux-être
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#48534C] font-light leading-relaxed">
              Du premier bilan de vitalité aux séances de suivi rapproché, chaque étape est ajustée à votre rythme, votre quotidien et vos priorités naturelles.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking?.('Bilan de vitalité')}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#55695B] hover:bg-[#435348] text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] shrink-0"
          >
            Découvrir le premier bilan
          </button>
        </div>

      </div>
    </section>
  );
};
