import React from 'react';
import { Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { FractalBloomCanvas } from './ui/fractal-bloom-tree';
import { PourquoiNaturopatheSection } from './PourquoiNaturopatheSection';

interface AProposPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const AProposPage: React.FC<AProposPageProps> = ({
  onNavigateHome,
  onOpenBooking
}) => {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#181D1A] font-sans antialiased">
      
      {/* 1. HERO SECTION WITH FRACTAL BLOOM TREE CANVAS (CENTERED NO IMAGE) */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 min-h-[80vh] flex flex-col justify-between items-center bg-[#3A4B3F] text-white overflow-hidden relative text-center">
        
        {/* Generative Fractal Bloom Canvas Layer */}
        <FractalBloomCanvas bgColor="rgba(42, 56, 46, 0.25)" branchColorRgb="232, 237, 231" />

        {/* Soft Vignette Overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#2A382E]/40 to-[#2A382E]/80 z-1 pointer-events-none" />

        {/* Center Content Block */}
        <div className="max-w-4xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-between space-y-10 relative z-10 my-auto w-full">
          
          {/* Top Breadcrumb */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] text-white/70 uppercase"
          >
            <button
              onClick={() => onNavigateHome('#hero')}
              className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/50 pb-0.5"
            >
              ACCUEIL
            </button>
            <span>—</span>
            <span className="text-white font-medium">ANNE-LAURE JOURDAN</span>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-6 max-w-3xl mx-auto flex flex-col items-center">
            <motion.span
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="block font-mono text-xs tracking-[0.25em] text-[#AEB9A9] uppercase font-semibold"
            >
              ANNE-LAURE JOURDAN
            </motion.span>

            <motion.h1
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-white tracking-tight drop-shadow-md"
            >
              Écouter l’histoire avant de proposer un chemin.
            </motion.h1>

            <motion.p
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="font-sans text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-2xl"
            >
              Anne-Laure a imaginé Les Racines du bien-être comme un espace où l’on prend le temps de relier le corps, l’esprit, les émotions, l’environnement et le quotidien.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="pt-4"
            >
              <button
                onClick={() => onOpenBooking('bilan-vitalite')}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-[#181D1A] hover:bg-[#F2F6F3] text-xs font-semibold tracking-wide uppercase rounded-full shadow-lg transition-all cursor-pointer hover:shadow-xl hover:scale-[1.03]"
              >
                <Calendar className="w-4 h-4 text-[#506456]" />
                <span>Prendre rendez-vous</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Sub-tag */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-[11px] font-mono text-white/60 tracking-widest uppercase"
          >
            Naturopathe certifiée & Spécialiste du bien-être vivant
          </motion.div>

        </div>

      </section>

      {/* 2. POURQUOI JE SUIS DEVENUE NATUROPATHE (EDITORIAL PARCOURS SECTION) */}
      <PourquoiNaturopatheSection />

      {/* 3. CONTINUER CTA SECTION (ELEGANT MODERN EDITORIAL CARDS) */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#181D1A] text-white relative overflow-hidden">
        {/* Subtle background decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3A4B3F]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <span className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-[#AEB9A9] font-semibold mb-3">
                POUR ALLER PLUS LOIN
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
                Poursuivez <span className="italic">votre découverte.</span>
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/70 font-light max-w-md">
              Que vous souhaitiez découvrir les accompagnements en cabinet ou réserver directement votre bilan, je vous accompagne pas à pas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Découvrir les prestations */}
            <div
              onClick={() => onNavigateHome('#soins-et-suivi')}
              className="group bg-[#232A26] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#AEB9A9]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div>
                <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-[#AEB9A9] font-medium mb-4">
                  01 — SOINS & ACCOMPAGNEMENT
                </span>
                <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-[#AEB9A9] transition-colors">
                  Découvrir les prestations
                </h3>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed mb-8">
                  Naturopathie, réflexologie plantaire, faciale et suivis sur-mesure adaptés à chaque période de vie.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-xs tracking-[0.16em] uppercase text-white group-hover:text-[#AEB9A9]">
                <span>Explorer</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 2: Prendre rendez-vous */}
            <div
              onClick={() => onOpenBooking()}
              className="group bg-[#232A26] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#AEB9A9]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div>
                <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-[#AEB9A9] font-medium mb-4">
                  02 — RÉSERVATION
                </span>
                <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-[#AEB9A9] transition-colors">
                  Prendre rendez-vous
                </h3>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed mb-8">
                  Choisissez votre créneau au cabinet ou en téléconsultation pour démarrer votre accompagnement.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-xs tracking-[0.16em] uppercase text-white group-hover:text-[#AEB9A9]">
                <span>Réserver</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 3: Visiter la boutique */}
            <div
              onClick={() => {
                if (window.history && window.history.pushState) {
                  window.history.pushState(null, '', '/boutique');
                }
                window.location.href = '/boutique';
              }}
              className="group bg-[#232A26] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#AEB9A9]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div>
                <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-[#AEB9A9] font-medium mb-4">
                  03 — BOUTIQUE
                </span>
                <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-[#AEB9A9] transition-colors">
                  La Boutique
                </h3>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed mb-8">
                  Découvrez l'ensemble de nos soins, compléments, huiles et objets de rituel.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-xs tracking-[0.16em] uppercase text-white group-hover:text-[#AEB9A9]">
                <span>Voir la boutique</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
