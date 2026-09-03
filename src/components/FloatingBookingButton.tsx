import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';

interface FloatingBookingButtonProps {
  onOpenBooking: () => void;
  onOpenCart?: () => void;
  onNavigateToBoutique?: () => void;
  cartItemCount?: number;
  isBoutiquePage?: boolean;
}

export const FloatingBookingButton: React.FC<FloatingBookingButtonProps> = ({
  onOpenBooking,
  onOpenCart,
  onNavigateToBoutique,
  cartItemCount = 0,
  isBoutiquePage = false,
}) => {
  const boutiqueBtnRef = useRef<HTMLButtonElement>(null);
  const bookingBtnRef = useRef<HTMLButtonElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations & Hover Effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (boutiqueBtnRef.current) {
        gsap.fromTo(
          boutiqueBtnRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
        );
      }

      if (bookingBtnRef.current) {
        gsap.fromTo(
          bookingBtnRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.35 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleBoutiqueClick = () => {
    if (isBoutiquePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigateToBoutique) {
      // Premium organic GSAP transition
      if (boutiqueBtnRef.current && transitionOverlayRef.current) {
        const rect = boutiqueBtnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        gsap.set(transitionOverlayRef.current, {
          display: 'block',
          left: centerX,
          top: centerY,
          scale: 0,
          opacity: 0.9,
        });

        gsap.timeline()
          .to(boutiqueBtnRef.current, { scale: 1.15, duration: 0.2, ease: 'power1.out' })
          .to(transitionOverlayRef.current, {
            scale: 50,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: () => {
              onNavigateToBoutique();
              if (window.history && window.history.pushState) {
                window.history.pushState(null, '', '/boutique');
              }
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              gsap.to(transitionOverlayRef.current, {
                opacity: 0,
                duration: 0.4,
                delay: 0.1,
                onComplete: () => {
                  gsap.set(transitionOverlayRef.current, { display: 'none', scale: 0 });
                },
              });
            },
          })
          .to(boutiqueBtnRef.current, { scale: 1, duration: 0.3 });
      } else {
        onNavigateToBoutique();
      }
    } else if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleMouseEnter = (element: HTMLButtonElement | null) => {
    if (!element) return;
    gsap.to(element, {
      scale: 1.08,
      y: -3,
      duration: 0.3,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = (element: HTMLButtonElement | null) => {
    if (!element) return;
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power1.out',
    });
  };

  return (
    <>
      {/* GSAP ORGANIC EXPANSION TRANSITION OVERLAY */}
      <div
        ref={transitionOverlayRef}
        className="fixed z-50 pointer-events-none hidden w-16 h-16 rounded-full bg-[#181D1A] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* FLOATING BOUTIQUE BUTTON */}
        <div className="pointer-events-auto flex items-center group relative">
          <button
            ref={boutiqueBtnRef}
            onClick={handleBoutiqueClick}
            onMouseEnter={() => handleMouseEnter(boutiqueBtnRef.current)}
            onMouseLeave={() => handleMouseLeave(boutiqueBtnRef.current)}
            className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#AEB9A9] focus:ring-offset-2 focus:ring-offset-[#131210] ${
              isBoutiquePage
                ? 'bg-[#181D1A] text-white border-white/40 shadow-[0_8px_25px_rgba(24,29,26,0.8)]'
                : 'bg-[#9EAC99] hover:bg-[#a9b7a4] text-[#131210] border-white/40 shadow-[0_8px_25px_rgba(158,172,153,0.45)]'
            }`}
            aria-label="Boutique"
            title="Boutique"
          >
            {/* Cart item count badge if items exist */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#181614] text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full border border-white/30 shadow-xs">
                {cartItemCount}
              </span>
            )}

            <ShoppingBag className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-[-6deg] ${isBoutiquePage ? 'text-[#AEB9A9]' : 'text-[#131210]'}`} />

            {/* Hover Tooltip (Desktop) */}
            <span className="hidden sm:inline-block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#181614]/95 backdrop-blur-md text-white text-xs font-medium tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10 shadow-xl">
              {isBoutiquePage ? 'La Boutique' : 'Boutique'}
            </span>
          </button>
        </div>

        {/* FLOATING PRENDRE RENDEZ-VOUS BUTTON */}
        <div className="pointer-events-auto flex items-center group relative">
          <button
            ref={bookingBtnRef}
            onClick={onOpenBooking}
            onMouseEnter={() => handleMouseEnter(bookingBtnRef.current)}
            onMouseLeave={() => handleMouseLeave(bookingBtnRef.current)}
            className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#AEB9A9] hover:bg-[#c2cdc0] text-[#131210] flex items-center justify-center shadow-xl hover:shadow-[0_8px_25px_rgba(174,185,169,0.5)] transition-shadow duration-300 border border-white/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#AEB9A9] focus:ring-offset-2 focus:ring-offset-[#131210]"
            aria-label="Prendre rendez-vous"
            title="Prendre rendez-vous"
          >
            {/* Pulsing Status Dot */}
            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#131210] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#131210]" />
            </span>

            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#131210] transition-transform duration-300 group-hover:scale-110" />

            {/* Hover Tooltip (Desktop) */}
            <span className="hidden sm:inline-block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#181614]/95 backdrop-blur-md text-white text-xs font-medium tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10 shadow-xl">
              Prendre rendez-vous
            </span>
          </button>
        </div>

      </div>
    </>
  );
};

