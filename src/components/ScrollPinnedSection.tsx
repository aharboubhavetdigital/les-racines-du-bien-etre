import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './ScrollPinnedSection.css';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardData {
  title: string;
  description: string;
  image: string;
}

const CARDS_DATA: ProductCardData[] = [
  {
    title: 'Une approche holistique',
    description: 'Corps, esprit, émotions et environnement sont considérés ensemble.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Un programme individualisé',
    description: 'Votre histoire, votre mode de vie et vos possibilités guident chaque proposition.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Un suivi rapproché',
    description: 'De courts échanges par SMS peuvent soutenir les avancées entre les rendez-vous.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85'
  }
];

const TRANSFORMS: [number[], number[]][] = [
  [ [10, 50, -10, 10], [20, -10, -45, 20] ],   // card 0
  [ [0, 47.5, -10, 15], [-25, 15, -45, 30] ],  // card 1
  [ [0, 52.5, -10, 5], [15, -5, -40, 60] ]     // card 2
];

export function ScrollPinnedSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Smooth-scroll wiring (Lenis + GSAP ticker)
    const lenis = new Lenis();
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const stickySection = root.querySelector('.sticky') as HTMLElement;
      const stickyHeader = root.querySelector('.sticky-header') as HTMLElement;
      const cards = root.querySelectorAll('.card');
      const stickyHeight = window.innerHeight * 5;

      if (!stickySection || !stickyHeader || cards.length === 0) return;

      ScrollTrigger.create({
        trigger: stickySection,
        start: 'top top',
        end: `+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // 1) The giant header pans left
          const maxTranslate = stickyHeader.offsetWidth - window.innerWidth;
          gsap.set(stickyHeader, { x: -progress * maxTranslate });

          // 2) Each card, staggered, flies across with its own path
          cards.forEach((card, index) => {
            const delay = index * 0.15;
            const cardProgress = Math.max(0, Math.min((progress - delay) * 1.7, 1));

            if (cardProgress > 0) {
              const cardStartX = 25;
              const cardEndX = -650;
              const yPos = TRANSFORMS[index][0];
              const rotations = TRANSFORMS[index][1];

              // X: single linear lerp start -> end
              const cardX = gsap.utils.interpolate(cardStartX, cardEndX, cardProgress);

              // Y & rotation: step through the 4-keyframe tracks (3 equal sub-segments)
              const yProgress = cardProgress * 3;
              const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
              const yInterpolation = yProgress - yIndex;
              const cardY = gsap.utils.interpolate(yPos[yIndex], yPos[yIndex + 1], yInterpolation);
              const cardRotation = gsap.utils.interpolate(rotations[yIndex], rotations[yIndex + 1], yInterpolation);

              gsap.set(card, {
                xPercent: cardX,
                yPercent: cardY,
                rotation: cardRotation,
                opacity: 1
              });
            } else {
              gsap.set(card, { opacity: 0 });
            }
          });
        }
      });
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-pinned-wrapper">
      <section className="sticky">
        <div className="sticky-header">
          <h1>L’accompagnement</h1>
          <p className="sticky-subtitle">Une seule personne. Une histoire singulière.</p>
        </div>

        {CARDS_DATA.map((card, idx) => (
          <div key={idx} className="card">
            <div className="card-img">
              <img src={card.image} alt={card.title} referrerPolicy="no-referrer" />
            </div>
            <div className="card-content">
              <div className="card-title">
                <h2>{card.title}</h2>
              </div>
              <div className="card-description">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
