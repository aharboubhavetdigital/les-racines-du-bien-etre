import React, { useEffect } from 'react';
import { X, Calendar, ArrowLeft, Clock, CheckCircle2, Info } from 'lucide-react';
import { BoutiqueSoin } from '../../types';

interface TreatmentDetailModalProps {
  soin: BoutiqueSoin | null;
  onClose: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  soin,
  onClose,
  onOpenBooking,
}) => {
  useEffect(() => {
    if (soin) {
      document.body.style.overflow = 'hidden';
      // Push slug into URL history for SEO & deep linking
      const slug = soin.slug || soin.id;
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `/boutique/${slug}`);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [soin]);

  const handleClose = () => {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '/boutique');
    }
    onClose();
  };

  if (!soin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131210]/85 backdrop-blur-md overflow-y-auto animate-fade-in p-4 sm:p-6 lg:p-10">
      <div className="bg-[#F7F5F0] text-[#181D1A] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border border-[#131210]/10 flex flex-col">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="sticky top-6 right-6 self-end z-20 w-11 h-11 rounded-full bg-[#181D1A] text-white flex items-center justify-center hover:bg-[#2A382E] transition-all duration-300 shadow-lg cursor-pointer border border-white/20"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 lg:p-12 -mt-10">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs font-mono tracking-[0.16em] uppercase text-[#3A4B3F]/70 mb-6">
            <button
              onClick={handleClose}
              className="hover:text-[#181D1A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Boutique
            </button>
            <span>/</span>
            <span>Soins</span>
            <span>/</span>
            <span className="text-[#181D1A] font-semibold">{soin.title}</span>
          </nav>

          {/* HEADER INFO */}
          <span className="inline-block text-xs font-mono tracking-[0.22em] uppercase text-[#3A4B3F] font-semibold mb-3">
            {soin.categoryTag}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181D1A] leading-[1.15] mb-4">
            {soin.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-[#181D1A]/80 font-light italic mb-6">
            {soin.subtitle}
          </p>

          {/* DURATION & PRICE BANNER */}
          <div className="flex items-center gap-4 sm:gap-6 mb-8 py-3.5 px-6 bg-[#E8EDE7] rounded-xl w-fit text-sm font-mono text-[#181D1A]">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3A4B3F]" />
              <strong>Durée :</strong> {soin.duration}
            </span>
            {soin.price && (
              <>
                <span className="text-[#131210]/20">|</span>
                <span className="flex items-center gap-1">
                  <strong>Tarif :</strong> {soin.price} €
                </span>
              </>
            )}
          </div>

          {/* HERO IMAGE */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={soin.image}
              alt={soin.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* SHORT INTRO / FULL DESCRIPTION */}
          <div className="mb-10 text-base sm:text-lg text-[#181D1A]/85 font-light leading-relaxed space-y-4">
            <p>{soin.fullDescription || soin.description}</p>
          </div>

          {/* QUOTE IF AVAILABLE */}
          {soin.quote && (
            <div className="p-6 rounded-2xl bg-[#E8EDE7] text-[#181D1A] font-serif italic text-base sm:text-lg border-l-4 border-[#3A4B3F] mb-10">
              {soin.quote}
            </div>
          )}

          {/* POUR QUI ? */}
          {soin.forWhom && soin.forWhom.length > 0 && (
            <div className="mb-10">
              <h3 className="font-serif text-xl sm:text-2xl font-light text-[#181D1A] mb-4">
                Pour qui ?
              </h3>
              <ul className="space-y-3 font-sans text-sm sm:text-base text-[#181D1A]/80 font-light">
                {soin.forWhom.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3A4B3F] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* COMMENT SE DÉROULE LA SÉANCE ? */}
          {soin.sessionFlow && soin.sessionFlow.length > 0 && (
            <div className="mb-10">
              <h3 className="font-serif text-xl sm:text-2xl font-light text-[#181D1A] mb-4">
                Comment se déroule la séance ?
              </h3>
              <div className="space-y-4">
                {soin.sessionFlow.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/60 border border-[#131210]/5">
                    <span className="w-7 h-7 rounded-full bg-[#181D1A] text-white text-xs font-mono flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="font-sans text-sm sm:text-base text-[#181D1A]/85 font-light leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRACTICAL INFORMATIONS */}
          {soin.practicalInfo && soin.practicalInfo.length > 0 && (
            <div className="mb-10 p-6 rounded-2xl bg-white/70 border border-[#131210]/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#3A4B3F] font-semibold mb-3">
                <Info className="w-4 h-4" />
                Informations pratiques
              </div>
              <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#181D1A]/80 font-light">
                {soin.practicalInfo.map((info, idx) => (
                  <li key={idx}>• {info}</li>
                ))}
              </ul>
            </div>
          )}

          {/* BOTTOM ACTIONS */}
          <div className="pt-8 border-t border-[#131210]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#181D1A]/30 text-[#181D1A] hover:bg-[#181D1A]/5 text-xs font-mono uppercase tracking-[0.16em] transition-colors cursor-pointer"
            >
              ← Retour aux soins
            </button>

            <button
              onClick={() => {
                handleClose();
                onOpenBooking(soin.bookingServiceId || soin.id);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181D1A] text-white hover:bg-[#2A382E] transition-all duration-300 font-mono text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <Calendar className="w-4 h-4 text-[#AEB9A9]" />
              Prendre rendez-vous pour ce soin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
