import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, Calendar, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { FullscreenMenuModal } from './FullscreenMenuModal';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  cartItemCount: number;
  currentPage?: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources';
  onNavigate?: (page: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources', sectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenCart,
  onOpenQuiz,
  cartItemCount,
  currentPage = 'home',
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl && currentPage === 'home') {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        const scrollY = window.scrollY;
        const isPastHero = scrollY > heroBottom - 140;
        setScrolled(isPastHero);
      } else {
        setScrolled(window.scrollY > 30);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  interface NavLinkItem {
    name: string;
    href: string;
    page: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources' | 'rdv';
    isCart?: boolean;
  }

  const menuLinks: NavLinkItem[] = [
    { name: 'À propos', href: '#apropos', page: 'apropos' },
    { name: 'Les lieux', href: '/lieux', page: 'lieux' },
    { name: 'Prestations', href: '/prestations', page: 'prestations' },
    { name: 'Ressources', href: '/ressources', page: 'ressources' },
    { name: 'Boutique', href: '/boutique', page: 'boutique' }
  ];

  const allNavLinks: NavLinkItem[] = [...menuLinks, { name: 'Prendre un rendez-vous', href: '#', page: 'rdv' }];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, targetPage: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources' | 'rdv', isCart?: boolean) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setNavMenuOpen(false);
    if (isCart) {
      onOpenCart();
      return;
    }
    if (targetPage === 'rdv') {
      onOpenBooking();
      return;
    }
    if (targetPage === 'prestations') {
      onNavigate?.('prestations');
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/prestations');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetPage === 'boutique') {
      onNavigate?.('boutique');
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/boutique');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetPage === 'apropos') {
      onNavigate?.('apropos');
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/#apropos');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetPage === 'lieux') {
      onNavigate?.('lieux');
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/lieux');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetPage === 'ressources') {
      onNavigate?.('ressources');
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/ressources');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        onNavigate?.('home', href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#131210]/90 backdrop-blur-xl border-b border-white/10 py-3 sm:py-4 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4 sm:py-6 lg:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left Brand Logo (Auto Layout) */}
          <div className="flex items-center shrink-0 min-w-0">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero', 'home')}
              className="flex items-center cursor-pointer transition-transform active:scale-98"
            >
              <BrandLogo
                variant="light"
                size={scrolled ? "md" : "lg"}
                className="py-0.5 transition-all duration-500 transform hover:scale-105"
              />
            </a>
          </div>

          {/* Right Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-full bg-[#344E41] hover:bg-[#2C4337] text-white text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase shadow-md whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#AEB9A9]" />
              <span>Prendre un rendez-vous</span>
            </button>

            {/* Navigation Menu Modal Button */}
            <div className="relative">
              <button
                onClick={() => setNavMenuOpen(!navMenuOpen)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer shadow-lg flex items-center justify-center transition-all"
                aria-label="Menu"
                title="Menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                  <span
                    className={`block h-[2px] w-full bg-[#AEB9A9] rounded-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform origin-center ${
                      navMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-full bg-[#AEB9A9] rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      navMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-full bg-[#AEB9A9] rounded-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform origin-center ${
                      navMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Phone Mobile Auto Layout Actions (Menu only) */}
          <div className="flex lg:hidden items-center justify-end shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setNavMenuOpen(!navMenuOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer shadow-sm flex items-center justify-center transition-all active:scale-95 hover:bg-white/20"
              aria-label="Menu"
              title="Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`block h-[2px] w-full bg-[#AEB9A9] rounded-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform origin-center ${
                    navMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`block h-[2px] w-full bg-[#AEB9A9] rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                    navMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-[2px] w-full bg-[#AEB9A9] rounded-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform origin-center ${
                    navMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Fullscreen Overlay Menu Modal */}
      <FullscreenMenuModal
        isOpen={navMenuOpen}
        onClose={() => setNavMenuOpen(false)}
        onNavigate={(page, sectionId) => onNavigate?.(page, sectionId)}
        onOpenBooking={(serviceId) => onOpenBooking(serviceId)}
      />
    </header>
  );
};
