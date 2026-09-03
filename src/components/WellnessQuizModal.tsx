import React, { useState } from 'react';
import { SERVICES_DATA, PRODUCTS_DATA } from '../data/brandData';
import { X, Sparkles, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface WellnessQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceId: string) => void;
  onQuickViewProduct: (product: any) => void;
}

export const WellnessQuizModal: React.FC<WellnessQuizModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onQuickViewProduct
}) => {
  const [step, setStep] = useState<number>(1);
  const [answer1, setAnswer1] = useState<string>('');
  const [answer2, setAnswer2] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setAnswer1('');
    setAnswer2('');
  };

  const q1Options = [
    { id: 'stress', title: 'Fatigue, surcharge mentale & anxiété', desc: 'Besoin d’apaiser le système nerveux et de lâcher-prise.' },
    { id: 'digestion', title: 'Troubles digestifs ou déséquilibres alimentaires', desc: 'Besoin de réorganiser votre hygiène de vie et traiter la cause.' },
    { id: 'peau', title: 'Peau terne, tensions du visage ou fatigue oculaire', desc: 'Recherche d’éclat naturel, de lissage et de décongestion.' },
    { id: 'prevention', title: 'Démarche préventive & maintien de la vitalité', desc: 'Soutenir votre organisme à chaque changement de saison.' }
  ];

  const q2Options = [
    { id: 'touch', title: 'Un soin corporel manuel doux et enveloppant', desc: 'Priorité au lâcher-prise physique direct.' },
    { id: 'bilan', title: 'Un bilan approfondi avec conseils personnalisés', desc: 'Comprendre et recevoir un protocole complet d’hygiène de vie.' },
    { id: 'facial', title: 'Un soin ciblé du visage et de l’esprit', desc: 'Lier beauté holistique et relaxation profonde.' }
  ];

  const getResult = () => {
    if (answer1 === 'peau' || answer2 === 'facial') {
      return {
        service: SERVICES_DATA.find((s) => s.id === 'reflexologie-faciale') || SERVICES_DATA[2],
        product: PRODUCTS_DATA[0], // Huile Botanique
        reason: 'La Réflexologie faciale est idéale pour détendre vos traits et stimuler la micro-circulation faciale.'
      };
    }
    if (answer1 === 'digestion' || answer2 === 'bilan') {
      return {
        service: SERVICES_DATA.find((s) => s.id === 'naturopathie') || SERVICES_DATA[0],
        product: PRODUCTS_DATA[1], // Tisane Racines
        reason: 'Un Bilan de Naturopathie permettra de rechercher l’origine de vos déséquilibres digestifs et vitaux.'
      };
    }
    return {
      service: SERVICES_DATA.find((s) => s.id === 'reflexologie-plantaire') || SERVICES_DATA[1],
      product: PRODUCTS_DATA[3], // Baume Alpes
      reason: 'La Réflexologie plantaire agira directement sur le système nerveux autonome pour libérer le stress accumulé.'
    };
  };

  const result = getResult();

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
                      setAnswer1(opt.id);
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
                Quel format de rendez-vous préférez-vous ?
              </h3>

              <div className="space-y-3 pt-2">
                {q2Options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswer2(opt.id);
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
                className="text-xs text-[#756456] underline pt-2"
              >
                Retour à la question 1
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#667467]/10 text-[#667467] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#667467]">
                  Votre recommandation sur-mesure
                </span>
                <h3 className="font-serif-editorial text-3xl text-[#343633]">
                  {result.service.title}
                </h3>
                <p className="font-sans text-xs text-[#756456] font-light max-w-md mx-auto">
                  {result.reason}
                </p>
              </div>

              {/* Recommended Service Card */}
              <div className="p-4 bg-[#F5F1E8] border border-[#667467] rounded-xs flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif-editorial text-lg text-[#343633] font-medium">
                    {result.service.title}
                  </h4>
                  <p className="font-sans text-xs text-[#756456]">
                    Durée : {result.service.duration} • {result.service.price} €
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking(result.service.id);
                  }}
                  className="px-4 py-2 bg-[#667467] text-[#FAF8F5] text-xs uppercase font-semibold rounded-xs shrink-0"
                >
                  Réserver ce soin
                </button>
              </div>

              {/* Recommended Product */}
              <div className="p-4 bg-[#F5F1E8]/60 border border-[#D8CCBC] rounded-xs flex items-center gap-4">
                <img
                  src={result.product.image}
                  alt={result.product.name}
                  className="w-14 h-14 object-cover rounded-xs border border-[#D8CCBC]"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-sans text-[10px] uppercase text-[#756456]">Soin complémentaire recommandé</span>
                  <h5 className="font-serif-editorial text-base text-[#343633] truncate">{result.product.name}</h5>
                  <span className="font-sans text-xs font-semibold text-[#667467]">{result.product.price} €</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onQuickViewProduct(result.product);
                  }}
                  className="px-3 py-1.5 border border-[#D8CCBC] text-[#343633] text-[11px] font-semibold uppercase rounded-xs shrink-0 hover:bg-[#FAF8F5]"
                >
                  Voir
                </button>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={handleReset}
                  className="text-[#756456] flex items-center gap-1 hover:text-[#667467]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Recommencer le test</span>
                </button>

                <button
                  onClick={onClose}
                  className="text-[#343633] font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
