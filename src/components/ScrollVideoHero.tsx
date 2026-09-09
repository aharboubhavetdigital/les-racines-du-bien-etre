import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import droneVideoUrl from '../assets/images/video 1.mp4';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollVideoHeroProps {
  onOpenBooking?: (serviceId?: string, locationId?: string) => void;
  onOpenQuiz?: () => void;
  onNavigateToBoutique?: () => void;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({
  onOpenBooking,
  onOpenQuiz,
  onNavigateToBoutique
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sequential Step Refs
  const titleRef = useRef<HTMLDivElement>(null);
  const equilibreRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    if (!container || !sticky || !video) return;

    video.pause();
    video.muted = true;
    video.playsInline = true;

    let targetTime = 0;
    let animFrameId: number;

    const ctx = gsap.context(() => {
      // 1. Dedicated ScrollTrigger for smooth Video Time Scrubbing
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=500%',
        pin: sticky,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            targetTime = self.progress * video.duration;
          }
        },
      });

      // 2. High-performance RAF lerp loop for ultra-smooth video scrubbing on desktop
      const updateVideoTime = () => {
        if (video.duration && !isNaN(video.duration)) {
          const delta = targetTime - video.currentTime;
          if (Math.abs(delta) > 0.005) {
            video.currentTime += delta * 0.12;
          }
        }
        animFrameId = requestAnimationFrame(updateVideoTime);
      };
      updateVideoTime();

      // 3. Text Reveal Timeline (Step 1, Step 2, Step 3)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=500%',
          scrub: 0.3,
        },
      });

      // Initial Hidden States
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 45, filter: 'blur(12px)' });
      if (equilibreRef.current) gsap.set(equilibreRef.current, { opacity: 0.15, filter: 'blur(6px)' });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0, y: 45, filter: 'blur(12px)' });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' });

      // Scroll Indicator fade out
      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.08 }, 0.06);
      }

      // STEP 1: TITLE ONLY (0.04 -> 0.34)
      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 0.1 }, 0.04);
        if (equilibreRef.current) {
          tl.to(equilibreRef.current, { opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.14 }, 0.09);
        }
        tl.to(titleRef.current, { opacity: 0, y: -35, filter: 'blur(10px)', ease: 'power2.in', duration: 0.08 }, 0.26);
      }

      // STEP 2: SUBTITLE ONLY (0.34 -> 0.64)
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 0.1 }, 0.34);
        tl.to(subtitleRef.current, { opacity: 0, y: -35, filter: 'blur(10px)', ease: 'power2.in', duration: 0.08 }, 0.56);
      }

      // STEP 3: BUTTONS ONLY (0.64 -> 0.98)
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'back.out(1.2)', duration: 0.1 }, 0.64);
        tl.to(ctaRef.current, { opacity: 0, y: -30, filter: 'blur(8px)', ease: 'power2.in', duration: 0.1 }, 0.88);
      }
    }, container);

    return () => {
      cancelAnimationFrame(animFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#0A0908] text-white selection:bg-[#AEB9A9]/30 selection:text-white"
      style={{ height: '600vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0A0908]"
      >
        {/* Video Element for video 1.mp4 (Pure Scroll Scrubbing) */}
        <video
          ref={videoRef}
          src={droneVideoUrl}
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-cover block absolute inset-0"
          style={{ width: '100vw', height: '100vh' }}
        />

        {/* Soft luxury dark gradient film overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75 pointer-events-none z-10" />

        {/* Center Container for Sequential Reveal */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          
          {/* STEP 1: TITLE */}
          <div
            ref={titleRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
          >
            <div className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[86px] font-light tracking-[-0.03em] leading-[1.04] text-white drop-shadow-2xl max-w-5xl">
              <div className="block">Mieux comprendre votre corps</div>
              <div className="block text-[#FAF8F5]/90 mt-1 sm:mt-2">
                pour retrouver votre{' '}
                <span
                  ref={equilibreRef}
                  className="inline-block italic text-[#E5DEC9] font-serif-editorial drop-shadow-[0_0_30px_rgba(229,222,201,0.6)] transition-all"
                >
                  équilibre.
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: SUBTITLE */}
          <div
            ref={subtitleRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
          >
            <p className="text-xl sm:text-3xl md:text-4xl font-light text-[#FAF8F5]/95 tracking-wide max-w-3xl leading-relaxed drop-shadow-2xl font-serif-editorial italic">
              Naturopathie • Réflexologie • Hygiène de vie au centre de Saint-Lô
            </p>
          </div>

          {/* STEP 3: BUTTONS */}
          <div
            ref={ctaRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={() => onOpenBooking?.()}
                className="group relative px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-[#344E41] hover:bg-[#2A3F34] text-white font-medium text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(52,78,65,0.4)] hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#AEB9A9] group-hover:rotate-12 transition-transform duration-300" />
                <span>Réserver un rendez-vous</span>
                <ArrowRight className="w-4 h-4 text-[#AEB9A9] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>

        {/* Animated Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 text-xs tracking-widest uppercase pointer-events-none animate-pulse"
        >
          <span>Défiler pour explorer</span>
          <ChevronDown className="w-4 h-4 text-[#AEB9A9]" />
        </div>
      </div>
    </section>
  );
};
