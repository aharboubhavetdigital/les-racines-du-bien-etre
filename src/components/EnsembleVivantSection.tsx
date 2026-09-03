import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Moon, Activity, Heart, Sun, Sparkles, ArrowUpRight } from 'lucide-react';

// 1. Alimentation: Interactive Vital Energy & Micro-nutrition Pulse
function NutritionVisual() {
  const [activeNutrient, setActiveNutrient] = useState(0);
  const nutrients = [
    { name: "Vitalité crue", badge: "80%" },
    { name: "Anti-inflammatoire", badge: "Équilibre" },
    { name: "Hydratation pure", badge: "Cellulaire" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNutrient((prev) => (prev + 1) % nutrients.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [nutrients.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-2">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-[#617467]/15 border border-[#617467]/30 flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf className="w-7 h-7 text-[#617467]" />
        </motion.div>
        
        {/* Pulsing botanical aura */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#617467]/30"
          animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      <div className="h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={nutrients[activeNutrient].name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="font-mono text-xs font-medium text-[#49574D] bg-[#617467]/10 px-2.5 py-0.5 rounded-full"
          >
            {nutrients[activeNutrient].name} · {nutrients[activeNutrient].badge}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// 2. Sommeil & Récupération: Dynamic Circadian Phase Morph
function SleepCycleVisual() {
  const [phase, setPhase] = useState(0);
  const phases = ["Ralentissement", "Sommeil Profond", "Régénération"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-2">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`h-12 rounded-lg flex flex-col items-center justify-center transition-all ${
              phase === i 
                ? 'w-14 bg-[#617467] text-white shadow-sm' 
                : 'w-10 bg-[#617467]/10 text-[#49574D]'
            }`}
            layout
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Moon className={`w-4 h-4 ${phase === i ? 'text-white' : 'text-[#617467]'}`} />
            <span className="font-mono text-[9px] mt-1 font-semibold">
              {i === 0 ? '22h' : i === 1 ? '02h' : '06h'}
            </span>
          </motion.div>
        ))}
      </div>
      <span className="font-mono text-xs text-[#526356] font-medium">
        Phase · {phases[phase]}
      </span>
    </div>
  );
}

// 3. Mouvement & Vitalité: Adaptive Rhythm Wave
function MovementVisual() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-2">
      <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-[150px]">
        {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3].map((height, i) => (
          <motion.div
            key={i}
            className="w-3 rounded-full bg-[#617467]"
            animate={{
              scaleY: [height, height * 1.5, height * 0.7, height],
              opacity: [0.5, 0.9, 0.6, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{ height: '28px' }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5 font-mono text-xs text-[#526356]">
        <Activity className="w-3.5 h-3.5 text-[#617467]" />
        <span>Activité douce & fluide</span>
      </div>
    </div>
  );
}

// 4. Stress & Émotions: Breathing Coherence Loop
function StressCoherenceVisual() {
  const [breatheIn, setBreatheIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheIn((prev) => !prev);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2.5 py-2">
      <div className="relative flex items-center justify-center w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#617467]/30 bg-[#617467]/10"
          animate={{ scale: breatheIn ? 1.3 : 0.85 }}
          transition={{ duration: 3.2, ease: "easeInOut" }}
        />
        <Heart className="w-6 h-6 text-[#617467] z-10" />
      </div>
      <span className="font-mono text-xs text-[#526356] font-medium">
        {breatheIn ? "Inspiration douce" : "Expiration apaisante"}
      </span>
    </div>
  );
}

// 5. Rythmes de vie: Circadian Orbit
function RhythmVisual() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-2">
      <div className="relative w-28 h-12 flex items-center justify-center">
        <div className="absolute w-full h-[1px] bg-[#617467]/30" />
        <motion.div
          className="w-8 h-8 rounded-full bg-[#617467] text-white flex items-center justify-center shadow-sm z-10"
          animate={{ x: [-36, 36, -36] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sun className="w-4 h-4" />
        </motion.div>
      </div>
      <span className="font-mono text-xs text-[#526356] font-medium">
        Harmonisation des cycles
      </span>
    </div>
  );
}

// 6. Moyens naturels: Apothecary & Botanicals
function NaturalRemediesVisual() {
  const [remedies, setRemedies] = useState([
    { id: 1, label: 'Plantes', active: true },
    { id: 2, label: 'Huiles', active: false },
    { id: 3, label: 'Fleurs', active: false }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemedies((prev) => {
        const nextIndex = prev.findIndex((s) => !s.active);
        if (nextIndex === -1) {
          return prev.map((s, idx) => ({ ...s, active: idx === 0 }));
        }
        return prev.map((s, i) => ({ ...s, active: i <= nextIndex }));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-2">
      <div className="flex items-center justify-center gap-2">
        {remedies.map((remedy) => (
          <motion.div
            key={remedy.id}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              remedy.active
                ? 'bg-[#617467] text-white border-[#617467] shadow-sm'
                : 'bg-[#617467]/5 text-[#5A6C5F] border-[#617467]/20'
            }`}
            animate={{ scale: remedy.active ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{remedy.label}</span>
          </motion.div>
        ))}
      </div>
      <span className="font-mono text-xs text-[#526356] font-medium">
        Synergies ciblées
      </span>
    </div>
  );
}

interface EnsembleVivantSectionProps {
  onOpenFaq?: () => void;
  onOpenBooking?: () => void;
}

export const EnsembleVivantSection: React.FC<EnsembleVivantSectionProps> = ({ onOpenFaq }) => {
  return (
    <section id="comprendre-naturopathie" className="py-24 md:py-36 bg-[#E8EDE7] text-[#1E2420] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP EDITORIAL HEADER ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 md:mb-24">
          
          {/* Left Column: Eyebrow + Large Title */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.22em] uppercase text-[#617467]">
              COMPRENDRE LA NATUROPATHIE
            </span>

            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[4.2rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#181D1A]">
              Regarder les habitudes comme{' '}
              <span className="italic font-light text-[#55695B]">
                un ensemble vivant.
              </span>
            </h2>
          </div>

          {/* Right Column: Narrative Copy + Link */}
          <div className="lg:col-span-5 lg:pt-10 flex flex-col justify-between space-y-8">
            <p className="font-sans text-base sm:text-lg text-[#3E4841] font-light leading-relaxed">
              La naturopathie s'intéresse aux grands équilibres du quotidien. Elle ne cherche pas une règle universelle : elle aide à observer ce qui soutient la personne, ce qui la fatigue et ce qu'elle souhaite faire évoluer.
            </p>

            <div>
              <a
                href="#services"
                className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#1E2420] border-b border-[#1E2420] pb-1 hover:text-[#617467] hover:border-[#617467] transition-colors"
              >
                <span>Approfondir l'approche</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* BENTO GRID DESIGN SYSTEM (6-BLOCK INTERACTIVE MATRIX) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-auto md:auto-rows-[270px] lg:auto-rows-[300px] mb-12">
          
          {/* 1. Alimentation - Tall Bento (2 cols x 2 rows) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-[#EFF3EE] border border-[#2C362F]/20 rounded-2xl p-6 sm:p-7 lg:p-9 flex flex-col justify-between min-h-[280px] md:min-h-0 hover:border-[#617467]/60 hover:shadow-md transition-all duration-300 group cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B796F] tracking-widest font-semibold">01</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#617467] bg-[#617467]/10 px-2.5 py-1 rounded-full">Pilier Vital</span>
            </div>

            <div className="my-6 md:my-auto">
              <NutritionVisual />
            </div>

            <div className="space-y-2 pt-4 border-t border-[#2C362F]/10">
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#181D1A] font-normal leading-snug group-hover:text-[#4A5D50] transition-colors">
                Alimentation
              </h3>
              <p className="font-sans text-sm text-[#424D46] font-light leading-relaxed">
                Observer la régularité des repas, la variété, l'hydratation et la place du plaisir, sans imposer un modèle unique.
              </p>
            </div>
          </motion.div>

          {/* 2. Sommeil & Récupération - Standard (2 cols x 1 row) */}
          <motion.div
            className="md:col-span-2 bg-[#EFF3EE] border border-[#2C362F]/20 rounded-2xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[220px] md:min-h-0 hover:border-[#617467]/60 hover:shadow-md transition-all duration-300 group cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B796F] tracking-widest font-semibold">02</span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#181D1A] font-normal group-hover:text-[#4A5D50] transition-colors">
                Sommeil & récupération
              </h3>
            </div>

            <div className="my-4 md:my-auto">
              <SleepCycleVisual />
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#424D46] font-light leading-relaxed">
              Mieux comprendre les horaires, les transitions du soir et les moments où le corps peut ralentir.
            </p>
          </motion.div>

          {/* 3. Moyens Naturels - Tall Bento (2 cols x 2 rows) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-[#EFF3EE] border border-[#2C362F]/20 rounded-2xl p-6 sm:p-7 lg:p-9 flex flex-col justify-between min-h-[280px] md:min-h-0 hover:border-[#617467]/60 hover:shadow-md transition-all duration-300 group cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B796F] tracking-widest font-semibold">06</span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#617467] bg-[#617467]/10 px-2.5 py-1 rounded-full">Phytothérapie</span>
            </div>

            <div className="my-6 md:my-auto">
              <NaturalRemediesVisual />
            </div>

            <div className="space-y-2 pt-4 border-t border-[#2C362F]/10">
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#181D1A] font-normal leading-snug group-hover:text-[#4A5D50] transition-colors">
                Moyens naturels
              </h3>
              <p className="font-sans text-sm text-[#424D46] font-light leading-relaxed">
                Envisager, lorsque le cadre le permet, la phytothérapie, l'aromathérapie, la relaxation ou les techniques manuelles.
              </p>
            </div>
          </motion.div>

          {/* 4. Mouvement - Standard (2 cols x 1 row) */}
          <motion.div
            className="md:col-span-2 bg-[#EFF3EE] border border-[#2C362F]/20 rounded-2xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[220px] md:min-h-0 hover:border-[#617467]/60 hover:shadow-md transition-all duration-300 group cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B796F] tracking-widest font-semibold">03</span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#181D1A] font-normal group-hover:text-[#4A5D50] transition-colors">
                Mouvement
              </h3>
            </div>

            <div className="my-4 md:my-auto">
              <MovementVisual />
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#424D46] font-light leading-relaxed">
              Une activité compatible avec votre quotidien et énergie, plutôt qu'un objectif irréaliste.
            </p>
          </motion.div>

          {/* 5. Stress & Émotions - Wide (3 cols x 1 row) */}
          <motion.div
            className="md:col-span-3 bg-[#EFF3EE] border border-[#2C362F]/20 rounded-2xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[220px] md:min-h-0 hover:border-[#617467]/60 hover:shadow-md transition-all duration-300 group cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B796F] tracking-widest font-semibold">04</span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#181D1A] font-normal group-hover:text-[#4A5D50] transition-colors">
                Stress & émotions
              </h3>
            </div>

            <div className="my-4 md:my-auto">
              <StressCoherenceVisual />
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#424D46] font-light leading-relaxed">
              Repérer les situations qui sollicitent le plus et créer des espaces simples pour souffler et récupérer.
            </p>
          </motion.div>

          {/* 6. Rythmes de vie - Wide (3 cols x 1 row) */}
          <motion.div
            className="md:col-span-3 bg-[#EFF3EE] border border-[#2C362F]/20 rounded-2xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[220px] md:min-h-0 hover:border-[#617467]/60 hover:shadow-md transition-all duration-300 group cursor-default"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B796F] tracking-widest font-semibold">05</span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#181D1A] font-normal group-hover:text-[#4A5D50] transition-colors">
                Rythmes de vie
              </h3>
            </div>

            <div className="my-4 md:my-auto">
              <RhythmVisual />
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#424D46] font-light leading-relaxed">
              Relier travail, temps personnel, écrans et pauses afin d'identifier les ajustements réellement possibles.
            </p>
          </motion.div>

        </div>

        {/* BOTTOM SAGE COMPLEMENTARY CARE BANNER */}
        <div className="bg-[#5B6C5F] text-[#F5F8F4] p-8 sm:p-10 lg:p-12 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-md">
          <div className="flex items-start gap-5 max-w-3xl">
            <div className="p-2.5 rounded-full bg-white/10 shrink-0 text-[#E5EFE4] mt-0.5">
              <Leaf className="w-5 h-5" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-serif-editorial text-xl sm:text-2xl text-white font-normal">
                Une démarche complémentaire
              </h4>
              <p className="font-sans text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                La naturopathie ne pose pas de diagnostic et ne remplace ni un traitement ni le suivi d'un professionnel de santé. Elle s'inscrit dans une démarche d'hygiène de vie et d'autonomie.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto text-left md:text-right pt-2 md:pt-0">
            <a
              href="#faq"
              onClick={onOpenFaq}
              className="inline-block font-sans text-xs sm:text-sm text-white font-medium border-b border-white pb-0.5 hover:text-white/80 hover:border-white/80 transition-colors"
            >
              Lire les questions fréquentes
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
