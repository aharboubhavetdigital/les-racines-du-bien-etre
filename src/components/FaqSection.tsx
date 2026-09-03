import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'medical-suivi',
    question: 'La naturopathie remplace-t-elle un suivi médical ?',
    answer: "Non, absolument pas. La naturopathie est une démarche complémentaire de prévention et d'hygiène de vie. Elle ne pose aucun diagnostic médical et ne modifie jamais vos traitements en cours prescrits par votre médecin."
  },
  {
    id: 'début-accompagnement',
    question: "Comment commence l'accompagnement ?",
    answer: "Tout commence par un Bilan de Vitalité complet d'environ 1h15 à 1h30. Nous faisons le point sur votre histoire, vos habitudes alimentaires, votre sommeil, votre niveau de stress et vos priorités pour établir une feuille de route réaliste."
  },
  {
    id: 'visio-suivi',
    question: 'Puis-je faire mes suivis en visioconférence ?',
    answer: "Oui. Les bilans de vitalité et séances de suivi peuvent se dérouler en visioconférence sécurisée avec la même attention et qualité d'écoute qu'au cabinet."
  },
  {
    id: 'premier-rdv-changements',
    question: 'Dois-je tout changer dès le premier rendez-vous ?',
    answer: "Non, la démarche est progressive et respecte votre rythme. Les ajustements sont proposés étape par étape pour s'intégrer naturellement dans votre quotidien sans créer de contraintes excessives."
  },
  {
    id: 'preparer-bilan',
    question: 'Comment préparer mon bilan de vitalité ?',
    answer: "Il vous suffit d'apporter vos récents bilans sanguins si vous en possédez, ainsi que la liste de vos éventuels traitements ou compléments habituels. Un petit questionnaire préalable pourra également vous être transmis."
  }
];

interface FaqSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-[#F6F3EC] text-[#1E2420] border-t border-[#2C362F]/10 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-20">
          
          {/* Left: Eyebrow + Title */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#617467]">
              AVANT DE COMMENCER
            </span>

            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[4.2rem] font-normal leading-[1.1] tracking-[-0.02em] text-[#181D1A]">
              Questions{' '}
              <span className="italic font-light text-[#55695B]">
                fréquentes.
              </span>
            </h2>
          </div>

          {/* Right Top: Voir toutes les réponses Link */}
          <div className="lg:col-span-5 lg:pt-10 flex justify-start lg:justify-end">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenBooking?.('Question Générale / Contact');
              }}
              className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-medium text-[#1E2420] border-b border-[#1E2420] pb-1 hover:text-[#617467] hover:border-[#617467] transition-colors"
            >
              <span>Voir toutes les réponses</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>

        {/* Accordion List with Hairline Dividers */}
        <div className="border-t border-b border-[#2C362F]/25 divide-y divide-[#2C362F]/20">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                className="transition-colors"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-7 sm:py-8 text-left flex items-center justify-between gap-6 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#181D1A] font-normal tracking-[-0.01em] group-hover:text-[#55695B] transition-colors pr-4">
                    {item.question}
                  </h3>

                  <motion.div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#2C362F] group-hover:text-[#55695B]"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-[#445047] font-sans text-base sm:text-[1.05rem] font-light leading-relaxed">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};
