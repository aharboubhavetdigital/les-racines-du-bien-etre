import React, { useState } from 'react';
import { Activity, Compass, CheckCircle2, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

interface BarometreVitaliteSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
  onOpenQuiz?: () => void;
}

interface Question {
  id: string;
  category: string;
  label: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'sommeil',
    category: 'Sommeil & Récupération',
    label: 'Comment évaluez-vous la qualité de votre réveil le matin ?',
    options: [
      { label: 'Fatigué(e), besoin de temps pour démarrer', score: 1 },
      { label: 'Forme moyenne, variable selon les jours', score: 2 },
      { label: 'Frais, frais et naturellement disponible', score: 3 }
    ]
  },
  {
    id: 'digestion',
    category: 'Soutien Digestif',
    label: 'Ressentez-vous régulièrement de la lourdeur ou des ballonnements après les repas ?',
    options: [
      { label: 'Fréquemment après la plupart des repas', score: 1 },
      { label: 'Occasionnellement selon ce que je mange', score: 2 },
      { label: 'Rarement, sensation de légèreté constante', score: 3 }
    ]
  },
  {
    id: 'stress',
    category: 'Charge Mentale & Stress',
    label: 'Quelle est la fréquence de vos moments de tension nerveuse au quotidien ?',
    options: [
      { label: 'Quotidienne, sentiment de surcharge', score: 1 },
      { label: 'Ponctuelle selon la période professionnelle', score: 2 },
      { label: 'Bien maîtrisée, bonne capacité de pause', score: 3 }
    ]
  },
  {
    id: 'energie',
    category: 'Niveau de Vitalité',
    label: 'Avez-vous un coup de pompe ou baisse de régime dans l’après-midi ?',
    options: [
      { label: 'Systematique vers 14h-16h', score: 1 },
      { label: 'Leger coup de fatigue occasionnel', score: 2 },
      { label: 'Energie fluide et constante toute la journée', score: 3 }
    ]
  }
];

export const BarometreVitaliteSection: React.FC<BarometreVitaliteSectionProps> = ({
  onOpenBooking
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const isComplete = Object.keys(answers).length === QUESTIONS.length;
  const totalScore = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);

  const getDiagnosis = () => {
    if (totalScore <= 6) {
      return {
        level: 'Surcharge & Besoin de Récupération',
        statusColor: 'text-amber-400',
        badgeBg: 'bg-amber-400/10 border-amber-400/30',
        summary: 'Votre organisme montre des signes de fatigue accumulée. Un bilan de vitalité vous aidera à identifier les leviers prioritaires (alimentation, rythme de sommeil et apaisement nerveux).',
        recommendedService: 'Bilan de vitalité'
      };
    } else if (totalScore <= 9) {
      return {
        level: 'Équilibre À Consolider',
        statusColor: 'text-[#AEB9A9]',
        badgeBg: 'bg-[#AEB9A9]/10 border-[#AEB9A9]/30',
        summary: 'Vous disposez d’un bon socle de santé, mais certaines fluctuations méritent des ajustements doux et ciblés pour sécuriser votre énergie sur la durée.',
        recommendedService: 'Programme de vitalité'
      };
    } else {
      return {
        level: 'Vitalité Fluide & Robuste',
        statusColor: 'text-emerald-400',
        badgeBg: 'bg-emerald-400/10 border-emerald-400/30',
        summary: 'Excellente dynamique corporelle ! Une séance de massage bien-être ou de réflexologie est idéale pour entretenir cet état de grâce et prévenir les déséquilibres saisonniers.',
        recommendedService: 'Massage bien-être'
      };
    }
  };

  const diagnosis = isComplete ? getDiagnosis() : null;

  return (
    <section id="barometre-vitalite" className="py-24 md:py-32 bg-[#181614] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#AEB9A9]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
              ÉVALUATION RAPIDE
            </span>
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-5xl font-light text-white leading-tight">
            Baromètre Vitalité.
          </h2>

          <p className="font-sans text-base text-white/70 font-light leading-relaxed">
            Mesurez en 4 questions simples votre niveau d’énergie global et identifiez l’accompagnement le plus adapté à vos besoins actuels.
          </p>
        </div>

        {/* Diagnostic Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Questions (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {QUESTIONS.map((q, idx) => {
              const currentScore = answers[q.id];

              return (
                <div
                  key={q.id}
                  className="p-6 sm:p-7 rounded-2xl bg-[#221F1C] border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-[#AEB9A9] tracking-wider font-medium">
                      0{idx + 1} · {q.category}
                    </span>
                    {currentScore && (
                      <CheckCircle2 className="w-4 h-4 text-[#AEB9A9]" />
                    )}
                  </div>

                  <h3 className="font-sans text-sm sm:text-base font-normal text-white">
                    {q.label}
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = currentScore === opt.score;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelect(q.id, opt.score)}
                          className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-light transition-all flex items-center justify-between border ${
                            isSelected
                              ? 'bg-[#617467] text-white border-[#617467] font-medium shadow-sm'
                              : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                              isSelected
                                ? 'border-white bg-white'
                                : 'border-white/30'
                            }`}
                          >
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-[#617467]" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results Box (Right 5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-2xl bg-[#23201C] border border-[#AEB9A9]/30 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#AEB9A9]" />
                  <span className="font-serif-editorial text-xl font-normal text-white">
                    Résultat du Baromètre
                  </span>
                </div>

                {isComplete && (
                  <button
                    onClick={() => setAnswers({})}
                    className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Réinitialiser</span>
                  </button>
                )}
              </div>

              {isComplete && diagnosis ? (
                <div className="space-y-6 animate-fade-in">
                  <div className={`p-4 rounded-xl border ${diagnosis.badgeBg} space-y-1`}>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      Score Vitalité : {totalScore} / 12
                    </span>
                    <h4 className={`font-serif-editorial text-2xl font-normal ${diagnosis.statusColor}`}>
                      {diagnosis.level}
                    </h4>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                    {diagnosis.summary}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenBooking?.(diagnosis.recommendedService)}
                      className="w-full py-3.5 px-5 rounded-xl bg-[#AEB9A9] text-[#131210] font-sans text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#131210]" />
                      <span>Réserver · {diagnosis.recommendedService}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#AEB9A9]">
                    <Compass className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-serif-editorial text-lg text-white font-normal">
                    {Object.keys(answers).length} / {QUESTIONS.length} questions répondues
                  </h4>
                  <p className="font-sans text-xs text-white/50 font-light max-w-xs mx-auto">
                    Répondez à l'ensemble des questions pour faire apparaître votre bilan et recommandation sur-mesure.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
