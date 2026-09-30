import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

interface WellnessQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceId?: string, initialNotes?: string) => void;
}

interface QuizOption {
  id: string;
  title: string;
  desc: string;
  serviceId?: string;
}

export const WellnessQuizModal: React.FC<WellnessQuizModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedQ1, setSelectedQ1] = useState<QuizOption | null>(null);
  const [selectedQ2, setSelectedQ2] = useState<QuizOption | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSelectedQ1(null);
    setSelectedQ2(null);
  };

  const q1Options: QuizOption[] = [
    {
      id: 'fatigue-anxiete',
      title: 'Fatigue, surcharge mentale & anxiété',
      desc: "Besoin d'apaiser le système nerveux et de lâcher prise."
    },
    {
      id: 'digestion-alimentation',
      title: 'Digestion & alimentation',
      desc: 'Besoin de retrouver un meilleur équilibre au quotidien.'
    },
    {
      id: 'tensions-detente',
      title: 'Tensions, stress & besoin de détente',
      desc: 'Besoin de relâcher les tensions du corps et du visage.'
    },
    {
      id: 'preventif-vitalite',
      title: 'Démarche préventive & maintien de la vitalité',
      desc: 'Soutenir votre organisme à chaque changement de saison.'
    }
  ];

  const q2Options: QuizOption[] = [
    {
      id: 'bilan-naturopathie',
      title: 'Bilan de naturopathie',
      desc: 'Faire le point sur votre hygiène de vie et vos priorités.',
      serviceId: 'naturopathie'
    },
    {
      id: 'reflexologie-plantaire',
      title: 'Réflexologie plantaire',
      desc: 'Une séance de bien-être centrée sur les pieds.',
      serviceId: 'reflexologie-plantaire'
    },
    {
      id: 'reflexologie-visage',
      title: 'Réflexologie du visage',
      desc: 'Une séance douce centrée sur le visage.',
      serviceId: 'reflexologie-faciale'
    },
    {
      id: 'indecis',
      title: 'Je ne sais pas encore',
      desc: 'Je souhaite en discuter avant de choisir.',
      serviceId: ''
    }
  ];

  const handleBookingClick = () => {
    const notesSummary = [
      "[Réponses au Questionnaire d'Équilibre]",
      selectedQ1 ? `• Besoin prioritaire : ${selectedQ1.title}` : null,
      selectedQ2 ? `• Format souhaité : ${selectedQ2.title}` : null
    ]
      .filter(Boolean)
      .join('\n');

    onClose();
    onOpenBooking(selectedQ2?.serviceId || '', notesSummary);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#343633]/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#D8CCBC] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#F5F1E8] border-b border-[#D8CCBC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#667467]" />
            <span className="font-serif-editorial text-xl text-[#343633]">
              Diagnostic d'Équilibre (30s)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#343633]/60 hover:text-[#343633] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
              <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#667467]">
                Question 1 / 2
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#343633]">
                Quel est votre besoin prioritaire en ce moment ?
              </h3>

              <div className="space-y-3 pt-2">
                {q1Options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedQ1(opt);
                      setStep(2);
                    }}
                    className="w-full p-4 text-left rounded-xs bg-[#F5F1E8] border border-[#D8CCBC]/80 hover:border-[#667467] transition-all group"
                  >
                    <span className="font-serif-editorial text-lg text-[#343633] font-medium group-hover:text-[#667467] block">
                      {opt.title}
                    </span>
                    <span className="font-sans text-xs text-[#756456] font-light">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#667467]">
                Question 2 / 2
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#343633]">
                Quel format de rendez-vous vous intéresse ?
              </h3>

              <div className="space-y-3 pt-2">
                {q2Options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedQ2(opt);
                      setStep(3);
                    }}
                    className="w-full p-4 text-left rounded-xs bg-[#F5F1E8] border border-[#D8CCBC]/80 hover:border-[#667467] transition-all group"
                  >
                    <span className="font-serif-editorial text-lg text-[#343633] font-medium group-hover:text-[#667467] block">
                      {opt.title}
                    </span>
                    <span className="font-sans text-xs text-[#756456] font-light">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#756456] underline pt-2 hover:text-[#667467]"
              >
                Retour à la question 1
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center animate-fade-in py-2">
              <div className="w-14 h-14 rounded-full bg-[#667467]/10 text-[#667467] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-editorial text-3xl text-[#343633]">
                  Merci pour vos réponses
                </h3>
                <p className="font-sans text-sm text-[#756456] font-light max-w-md mx-auto leading-relaxed">
                  Vos réponses m'aideront à préparer notre rendez-vous.
                </p>
              </div>

              <div className="pt-4 flex flex-col items-center gap-4">
                <button
                  onClick={handleBookingClick}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#667467] hover:bg-[#525E53] text-[#FAF8F5] text-xs uppercase font-semibold tracking-wider rounded-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Prendre rendez-vous</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between w-full pt-4 border-t border-[#D8CCBC]/60 text-xs">
                  <button
                    onClick={handleReset}
                    className="text-[#756456] flex items-center gap-1.5 hover:text-[#667467]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Recommencer le test</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="text-[#343633] font-semibold hover:text-[#667467]"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
