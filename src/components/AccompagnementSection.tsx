import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Heart, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';
import './AccompagnementSection.css';

gsap.registerPlugin(ScrollTrigger);

const smoothStep = (p: number) => p * p * (3 - 2 * p);

interface AccompagnementSectionProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export const AccompagnementSection: React.FC<AccompagnementSectionProps> = ({ onOpenBooking }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only run complex ScrollTrigger on desktop viewports
    if (window.innerWidth <= 1000) return;

    let lenis: Lenis | null = null;
    let onTick: ((time: number) => void) | null = null;

    const ctx = gsap.context(() => {
      // 1. Lenis smooth scroll wiring
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on('scroll', ScrollTrigger.update);
      onTick = (time: number) => {
        if (lenis) lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      // Pre-resolve card inner elements
      const innerCards = [
        rootRef.current?.querySelector('#accomp-card-1 .accomp-flip-inner'),
        rootRef.current?.querySelector('#accomp-card-2 .accomp-flip-inner'),
        rootRef.current?.querySelector('#accomp-card-3 .accomp-flip-inner')
      ];

      // -------------------------------------------------------------
      // ScrollTrigger 1: Pin the interactive 3D card story section
      // -------------------------------------------------------------
      ScrollTrigger.create({
        trigger: '.accomp-pinned-stage',
        start: 'top top',
        end: `+=${window.innerHeight * 2.5}px`,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          const stage = rootRef.current?.querySelector('.accomp-cards-fixed-stage');
          if (stage) {
            stage.classList.add('is-active');
            gsap.set(stage, {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100svh'
            });
          }
        },
        onLeaveBack: () => {
          const stage = rootRef.current?.querySelector('.accomp-cards-fixed-stage');
          if (stage) {
            stage.classList.remove('is-active');
            gsap.set(stage, {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            });
          }
        },
        onLeave: () => {
          const stage = rootRef.current?.querySelector('.accomp-cards-fixed-stage');
          const pinnedSection = rootRef.current?.querySelector('.accomp-pinned-stage');
          if (stage && pinnedSection) {
            const rect = pinnedSection.getBoundingClientRect();
            const topOffset = window.pageYOffset + rect.top;
            gsap.set(stage, {
              position: 'absolute',
              top: `${topOffset}px`,
              left: 0,
              width: '100vw',
              height: '100vh'
            });
          }
        },
        onEnterBack: () => {
          const stage = rootRef.current?.querySelector('.accomp-cards-fixed-stage');
          if (stage) {
            stage.classList.add('is-active');
            gsap.set(stage, {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100svh'
            });
          }
        }
      });

      // -------------------------------------------------------------
      // ScrollTrigger 3: Fly-in + 3D Flip on Y-axis sequence
      // -------------------------------------------------------------
      ScrollTrigger.create({
        trigger: '.accomp-pinned-stage',
        start: 'top top',
        end: `+=${window.innerHeight * 2.5}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Header Rise
          const headerProgress = gsap.utils.clamp(0, 1, progress / 0.85);
          const headerTarget = rootRef.current?.querySelector('.accomp-services-header');
          if (headerTarget) {
            gsap.set(headerTarget, {
              y: gsap.utils.interpolate('150%', '0%', smoothStep(headerProgress)),
              opacity: gsap.utils.interpolate(0.2, 1, smoothStep(headerProgress))
            });
          }

          // 3 Cards Sequence
          const cardIds = ['#accomp-card-1', '#accomp-card-2', '#accomp-card-3'];
          cardIds.forEach((id, index) => {
            const delay = index * 0.45;
            const cardProgress = gsap.utils.clamp(0, 1, (progress - delay * 0.08) / (0.9 - delay * 0.08));

            let y = '0%';
            let scale = 1;
            let opacity = 1;
            let x = '0%';
            let rotate = 0;
            let rotationY = 0;

            // Y displacement
            if (cardProgress < 0.4) {
              const seg = smoothStep(cardProgress / 0.4);
              y = gsap.utils.interpolate('-100%', '40%', seg);
            } else if (cardProgress < 0.6) {
              const seg = smoothStep((cardProgress - 0.4) / 0.2);
              y = gsap.utils.interpolate('40%', '0%', seg);
            } else {
              y = '0%';
            }

            // Scale
            if (cardProgress < 0.4) {
              scale = gsap.utils.interpolate(0.25, 0.75, smoothStep(cardProgress / 0.4));
            } else if (cardProgress < 0.6) {
              scale = gsap.utils.interpolate(0.75, 1, smoothStep((cardProgress - 0.4) / 0.2));
            } else {
              scale = 1;
            }

            // Opacity
            if (cardProgress < 0.2) {
              opacity = smoothStep(cardProgress / 0.2);
            } else {
              opacity = 1;
            }

            // X and Rotations
            const defaultX = index === 0 ? '100%' : index === 2 ? '-100%' : '0%';
            const defaultRot = index === 0 ? -5 : index === 2 ? 5 : 0;

            if (cardProgress < 0.6) {
              x = defaultX;
              rotate = defaultRot;
              rotationY = 0;
            } else if (cardProgress < 1) {
              const n = (cardProgress - 0.6) / 0.4;
              const seg = smoothStep(n);
              x = gsap.utils.interpolate(defaultX, '0%', seg);
              rotate = gsap.utils.interpolate(defaultRot, 0, seg);
              rotationY = seg * 180;
            } else {
              x = '0%';
              rotate = 0;
              rotationY = 180;
            }

            const targetCard = rootRef.current?.querySelector(id);
            if (targetCard) {
              gsap.set(targetCard, { opacity, y, x, rotate, scale });
            }

            const inner = innerCards[index];
            if (inner) {
              gsap.set(inner, { rotationY });
            }
          });
        }
      });

    }, rootRef);

    return () => {
      if (onTick) gsap.ticker.remove(onTick);
      if (lenis) lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="accomp-section-wrapper relative">
      
      {/* -------------------------------------------------------------
          ACT 1: EDITORIAL HEADER ZONE
          ------------------------------------------------------------- */}
      <section className="accomp-header-zone border-b border-[#201E1C]/10 text-center">
        
        {/* Eyebrow */}
        <div className="mb-4">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#6B7566]">
            L’ACCOMPAGNEMENT
          </span>
        </div>

        {/* Main Editorial Headline */}
        <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#1F1D1B] leading-[1.08] tracking-[-0.02em] max-w-4xl mx-auto">
          Une seule personne.<br />
          <span className="italic font-light text-[#4A5545]">Une histoire singulière.</span>
        </h2>

      </section>

      {/* -------------------------------------------------------------
          ACT 2: PINNED 3D FLIP CARD SEQUENCE (Desktop Interactive Stage)
          ------------------------------------------------------------- */}
      <section className="accomp-pinned-stage">
        
        {/* Animated Header that rises on scroll */}
        <div className="accomp-services-header text-center max-w-2xl mx-auto mb-10 z-10">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#6B7566] block mb-2">
            Protocole & Piliers en 3 Phases
          </span>
          <h3 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1D1B]">
            Le déroulement de votre parcours.
          </h3>
          <p className="text-sm text-[#575550] mt-3 font-light max-w-lg mx-auto">
            Faites défiler pour révéler les approches et outils thérapeutiques de chaque étape.
          </p>
        </div>

        {/* Mobile-only static flip cards */}
        <div className="accomp-mobile-cards lg:hidden">
          {/* Mobile Card 1 */}
          <div className="accomp-flip-card">
            <div className="accomp-flip-inner">
              <div className="accomp-flip-front accomp-card-front-1">
                <div className="flex flex-col items-center justify-center my-auto py-8">
                  <div className="w-20 h-20 rounded-full bg-white/40 flex items-center justify-center shadow-xs">
                    <Heart className="w-11 h-11 text-[#3B3428] stroke-[1.6]" />
                  </div>
                </div>
              </div>
              <div className="accomp-flip-back">
                <div className="accomp-card-back-body">
                  <div className="w-10 h-10 rounded-full bg-[#E8E0D2] flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-[#3B3428]" />
                  </div>
                  <h4 className="font-serif-editorial text-2xl font-normal text-[#1F1D1B] mb-2">
                    Une approche holistique
                  </h4>
                  <p className="text-sm text-[#575550] font-light leading-relaxed mb-4">
                    Corps, esprit, émotions et environnement sont considérés ensemble pour comprendre la cause profonde de vos déséquilibres et régénérer votre énergie.
                  </p>
                  <div className="space-y-2 w-full pt-3 border-t border-[#201E1C]/8">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E]" />
                      <span>Bilan de vitalité approfondi (90 min)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E]" />
                      <span>Analyse globale du terrain biologique</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Card 2 */}
          <div className="accomp-flip-card">
            <div className="accomp-flip-inner">
              <div className="accomp-flip-front accomp-card-front-2">
                <div className="flex flex-col items-center justify-center my-auto py-8">
                  <div className="w-20 h-20 rounded-full bg-white/40 flex items-center justify-center shadow-xs">
                    <Sparkles className="w-11 h-11 text-[#3B3428] stroke-[1.6]" />
                  </div>
                </div>
              </div>
              <div className="accomp-flip-back">
                <div className="accomp-card-back-body">
                  <div className="w-10 h-10 rounded-full bg-[#E8E0D2] flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-[#3B3428]" />
                  </div>
                  <h4 className="font-serif-editorial text-2xl font-normal text-[#1F1D1B] mb-2">
                    Un programme individualisé
                  </h4>
                  <p className="text-sm text-[#575550] font-light leading-relaxed mb-4">
                    Votre histoire, vos habitudes et vos contraintes guident un protocole sur-mesure alliant nutrition bienveillante, phytothérapie et réflexologie.
                  </p>
                  <div className="space-y-2 w-full pt-3 border-t border-[#201E1C]/8">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E]" />
                      <span>Protocole personnalisé sous 48h</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E]" />
                      <span>Phytothérapie & gemmothérapie ciblée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Card 3 */}
          <div className="accomp-flip-card">
            <div className="accomp-flip-inner">
              <div className="accomp-flip-front accomp-card-front-3">
                <div className="flex flex-col items-center justify-center my-auto py-8">
                  <div className="w-20 h-20 rounded-full bg-white/40 flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-11 h-11 text-[#3B3428] stroke-[1.6]" />
                  </div>
                </div>
              </div>
              <div className="accomp-flip-back">
                <div className="accomp-card-back-body">
                  <div className="w-10 h-10 rounded-full bg-[#E8E0D2] flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5 text-[#3B3428]" />
                  </div>
                  <h4 className="font-serif-editorial text-2xl font-normal text-[#1F1D1B] mb-2">
                    Un suivi rapproché
                  </h4>
                  <p className="text-sm text-[#575550] font-light leading-relaxed mb-4">
                    De courts échanges par SMS et des points réguliers soutiennent vos avancées et permettent d'ajuster les conseils en douceur au quotidien.
                  </p>
                  <div className="space-y-2 w-full pt-3 border-t border-[#201E1C]/8">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E]" />
                      <span>Échanges directs par SMS & e-mail</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E]" />
                      <span>Séances de consolidation des progrès</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* -------------------------------------------------------------
          DESKTOP 3D FLIP CARDS FIXED STAGE (Managed by ScrollTrigger)
          ------------------------------------------------------------- */}
      <div className="accomp-cards-fixed-stage hidden lg:flex">
        <div className="accomp-cards-container">
          
          {/* Card 1: Une approche holistique */}
          <div className="accomp-flip-card" id="accomp-card-1">
            <div className="accomp-card-wrapper accomp-card-wrapper-1">
              <div className="accomp-flip-inner">
                {/* Front (Icon Only) */}
                <div className="accomp-flip-front accomp-card-front-1">
                  <div className="flex flex-col items-center justify-center my-auto py-8">
                    <div className="w-24 h-24 rounded-full bg-white/45 flex items-center justify-center shadow-md backdrop-blur-xs transition-transform duration-300 hover:scale-105">
                      <Heart className="w-12 h-12 text-[#3B3428] stroke-[1.6]" />
                    </div>
                  </div>
                </div>

                {/* Back (Name + Small Paragraph) */}
                <div className="accomp-flip-back">
                  <div className="accomp-card-back-body">
                    <div className="w-11 h-11 rounded-full bg-[#E8E0D2] flex items-center justify-center mb-3.5">
                      <Heart className="w-5 h-5 text-[#3B3428] stroke-[1.8]" />
                    </div>
                    <h4 className="font-serif-editorial text-2xl font-medium text-[#1F1D1B] mb-2 leading-tight">
                      Une approche holistique
                    </h4>
                    <p className="text-xs sm:text-[0.82rem] text-[#575550] font-light leading-relaxed mb-4">
                      Corps, esprit, émotions et environnement sont considérés ensemble pour comprendre l'origine de vos déséquilibres et relancer votre potentiel vital.
                    </p>
                    <div className="space-y-2 w-full pt-3 border-t border-[#201E1C]/10">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Bilan de vitalité approfondi 90 min</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Exploration du terrain & hygiène de vie</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Sphère émotionnelle et stress</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Un programme individualisé */}
          <div className="accomp-flip-card" id="accomp-card-2">
            <div className="accomp-card-wrapper accomp-card-wrapper-2">
              <div className="accomp-flip-inner">
                {/* Front (Icon Only) */}
                <div className="accomp-flip-front accomp-card-front-2">
                  <div className="flex flex-col items-center justify-center my-auto py-8">
                    <div className="w-24 h-24 rounded-full bg-white/45 flex items-center justify-center shadow-md backdrop-blur-xs transition-transform duration-300 hover:scale-105">
                      <Sparkles className="w-12 h-12 text-[#3B3428] stroke-[1.6]" />
                    </div>
                  </div>
                </div>

                {/* Back (Name + Small Paragraph) */}
                <div className="accomp-flip-back">
                  <div className="accomp-card-back-body">
                    <div className="w-11 h-11 rounded-full bg-[#E8E0D2] flex items-center justify-center mb-3.5">
                      <Sparkles className="w-5 h-5 text-[#3B3428] stroke-[1.8]" />
                    </div>
                    <h4 className="font-serif-editorial text-2xl font-medium text-[#1F1D1B] mb-2 leading-tight">
                      Un programme individualisé
                    </h4>
                    <p className="text-xs sm:text-[0.82rem] text-[#575550] font-light leading-relaxed mb-4">
                      Votre histoire et votre rythme guident chaque conseil : ajustements nutritionnels, phytothérapie adaptée et pratiques réflexologiques ciblées.
                    </p>
                    <div className="space-y-2 w-full pt-3 border-t border-[#201E1C]/10">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Feuille de route rédigée sous 48h</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Conseils nutritionnels & micronutrition</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Séances de réflexologie personnalisées</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Un suivi rapproché */}
          <div className="accomp-flip-card" id="accomp-card-3">
            <div className="accomp-card-wrapper accomp-card-wrapper-3">
              <div className="accomp-flip-inner">
                {/* Front (Icon Only) */}
                <div className="accomp-flip-front accomp-card-front-3">
                  <div className="flex flex-col items-center justify-center my-auto py-8">
                    <div className="w-24 h-24 rounded-full bg-white/45 flex items-center justify-center shadow-md backdrop-blur-xs transition-transform duration-300 hover:scale-105">
                      <MessageCircle className="w-12 h-12 text-[#3B3428] stroke-[1.6]" />
                    </div>
                  </div>
                </div>

                {/* Back (Name + Small Paragraph) */}
                <div className="accomp-flip-back">
                  <div className="accomp-card-back-body">
                    <div className="w-11 h-11 rounded-full bg-[#E8E0D2] flex items-center justify-center mb-3.5">
                      <MessageCircle className="w-5 h-5 text-[#3B3428] stroke-[1.8]" />
                    </div>
                    <h4 className="font-serif-editorial text-2xl font-medium text-[#1F1D1B] mb-2 leading-tight">
                      Un suivi rapproché
                    </h4>
                    <p className="text-xs sm:text-[0.82rem] text-[#575550] font-light leading-relaxed mb-4">
                      De courts échanges par SMS soutiennent vos avancées entre les rendez-vous, vous accompagnent dans les doutes et ajustent les pratiques.
                    </p>
                    <div className="space-y-2 w-full pt-3 border-t border-[#201E1C]/10">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Disponibilité directe par SMS et email</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Réajustements doux en temps réel</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#3B3428]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82745E] shrink-0" />
                        <span>Autonomie durable et sérénité</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

