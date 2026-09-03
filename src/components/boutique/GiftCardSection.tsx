import React, { useState } from 'react';
import { Gift, ArrowRight, CheckCircle2 } from 'lucide-react';

interface GiftCardSectionProps {
  onOpenBooking: () => void;
}

export const GiftCardSection: React.FC<GiftCardSectionProps> = ({ onOpenBooking }) => {
  const [showGiftModal, setShowGiftModal] = useState(false);

  return (
    <>
      <section className="bg-[#E8EDE7] text-[#181D1A] py-20 sm:py-28 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* SMALL LABEL */}
          <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-[#3A4B3F] font-semibold mb-4">
            FAIRE PLAISIR
          </span>

          {/* HEADING */}
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#181D1A] mb-6">
            Offrir un moment <span className="italic font-normal">de bien-être.</span>
          </h2>

          {/* TEXT */}
          <p className="font-sans text-base sm:text-lg text-[#181D1A]/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Parce que prendre soin de soi peut aussi être un cadeau, offrez à une personne qui vous
            est chère un moment rien que pour elle.
          </p>

          {/* CTA */}
          <button
            onClick={() => setShowGiftModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#181D1A] text-white hover:bg-[#2A382E] transition-all duration-300 font-mono text-xs tracking-[0.18em] uppercase shadow-md group cursor-pointer"
          >
            <Gift className="w-4 h-4 text-[#AEB9A9]" />
            <span>Découvrir les cartes cadeaux</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* SUBTLE STATUS BADGE */}
          <div className="mt-4 text-[11px] font-mono tracking-[0.14em] uppercase text-[#3A4B3F]/70">
            Cartes cadeaux personnalisées · Disponibles au cabinet ou sur demande
          </div>
        </div>
      </section>

      {/* GIFT CARD INFORMATION MODAL */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131210]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#F7F5F0] text-[#181D1A] rounded-2xl max-w-lg w-full p-8 shadow-2xl relative border border-[#131210]/10">
            <span className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#3A4B3F] font-semibold mb-3">
              CARTE CADEAU SUR-MESURE
            </span>

            <h3 className="font-serif text-2xl font-light text-[#181D1A] mb-4">
              Offrir un bon soin Les Racines du Bien-Être
            </h3>

            <p className="font-sans text-sm text-[#181D1A]/80 font-light leading-relaxed mb-6">
              Nos bons cadeaux sont personnalisables selon le soin souhaité (Réflexologie plantaire, Naturopathie, Réflexologie faciale) ou selon un montant libre.
            </p>

            <div className="space-y-3 mb-8 bg-[#E8EDE7] p-4 rounded-xl text-xs font-sans text-[#181D1A]/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3A4B3F] shrink-0" />
                <span>Format élégant papier calque remis en main propre au cabinet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3A4B3F] shrink-0" />
                <span>Format numérique PDF instantané pour envoi par e-mail</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3A4B3F] shrink-0" />
                <span>Valable 1 an sur l’ensemble des soins du cabinet</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowGiftModal(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-[#181D1A] text-white hover:bg-[#2A382E] text-xs font-mono uppercase tracking-[0.16em] transition-colors cursor-pointer"
              >
                Commander / Réserver un bon
              </button>

              <button
                onClick={() => setShowGiftModal(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#181D1A]/20 text-[#181D1A] hover:bg-[#181D1A]/5 text-xs font-mono uppercase tracking-[0.16em] transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
