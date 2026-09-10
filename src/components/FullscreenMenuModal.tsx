import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, Calendar, ArrowUpRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import logoRectanglePng from '../assets/images/logo rectangle .png';

export interface SubMenuItem {
  id: string;
  name: string;
}

export interface MenuItemData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  action: () => void;
  subItems?: SubMenuItem[];
}

interface FullscreenMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources', sectionId?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const FullscreenMenuModal: React.FC<FullscreenMenuModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBooking,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [prestationsSubOpen, setPrestationsSubOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const isNavigatingRef = useRef<boolean>(false);

  // Helper to get active menu button center coordinates in viewport
  const getButtonCoords = () => {
    if (typeof document === 'undefined') return 'calc(100% - 48px) 36px';
    const btns = document.querySelectorAll('header button[title="Menu"]');
    for (let i = 0; i < btns.length; i++) {
      const rect = btns[i].getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        return `${Math.round(x)}px ${Math.round(y)}px`;
      }
    }
    return 'calc(100% - 48px) 36px';
  };

  // Smooth reverse animation helper before closing/navigating
  const handleSmoothClose = (afterCloseAction?: () => void) => {
    if (isClosing) return;
    setIsClosing(true);
    if (afterCloseAction) {
      isNavigatingRef.current = true;
    }

    if (timelineRef.current) {
      timelineRef.current.timeScale(1.2).reverse().then(() => {
        setIsClosing(false);
        onClose();
        if (afterCloseAction) {
          afterCloseAction();
          window.scrollTo(0, 0);
        }
      });
    } else {
      setIsClosing(false);
      onClose();
      if (afterCloseAction) {
        afterCloseAction();
        window.scrollTo(0, 0);
      }
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleSmoothClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing]);

  // GSAP Entrance Animation (Soft circular expansion & staggered upward link fade)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal = modalRef.current;
    const coords = getButtonCoords();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' }
      });

      // 1. Soft circular expansion originating from menu button
      tl.fromTo(
        modal,
        {
          clipPath: `circle(0% at ${coords})`,
          opacity: 1,
        },
        {
          clipPath: `circle(160% at ${coords})`,
          duration: 0.72,
          ease: 'power3.inOut',
        }
      );

      // 2. Staggered upward fade-in for navigation items
      const menuItemsEls = modal.querySelectorAll('.stagger-menu-item');
      if (menuItemsEls.length > 0) {
        tl.fromTo(
          menuItemsEls,
          { opacity: 0, y: 32, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
          },
          '-=0.48'
        );
      }

      // 3. Staggered fade-in for headers & details
      const detailEls = modal.querySelectorAll('.stagger-menu-detail');
      if (detailEls.length > 0) {
        tl.fromTo(
          detailEls,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }

      timelineRef.current = tl;
    }, modal);

    return () => ctx.revert();
  }, [isOpen]);

  // Lock body scroll and handle scroll position
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (isNavigatingRef.current) {
        window.scrollTo(0, 0);
        isNavigatingRef.current = false;
      } else if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (isNavigatingRef.current) {
        window.scrollTo(0, 0);
        isNavigatingRef.current = false;
      } else if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  const menuItems: MenuItemData[] = [
    {
      id: 'accueil',
      num: '(1)',
      title: 'Accueil',
      subtitle: 'Cabinet de naturopathie & réflexologie à Saint-Lô',
      tag: '(1) CABINET & VISION',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
      action: () => {
        handleSmoothClose(() => {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '/');
          }
          onNavigate('home');
        });
      },
    },
    {
      id: 'apropos',
      num: '(2)',
      title: 'À propos',
      subtitle: 'Votre praticienne certifiée & démarche holistique',
      tag: '(2) PARCOURS & PHILOSOPHIE',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
      action: () => {
        handleSmoothClose(() => {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '/#apropos');
          }
          onNavigate('apropos');
        });
      },
    },
    {
      id: 'prestations',
      num: '(3)',
      title: 'Prestations',
      subtitle: 'Soins naturels, Réflexologie, Naturopathie & Massages',
      tag: '(3) SOINS & RITUELS SUR-MESURE',
      image: 'https://racines-v2.vercel.app/images/reflexologie-plantaire.jpeg',
      action: () => {
        setPrestationsSubOpen(!prestationsSubOpen);
      },
      subItems: [
        { id: 'la-naturopathie', name: 'La naturopathie' },
        { id: 'massage-bien-etre', name: 'Massage bien-être' },
        { id: 'reflexologie-plantaire', name: 'Réflexologie plantaire' },
        { id: 'reflexologie-faciale', name: 'Réflexologie faciale' },
        { id: 'location-jacuzzi-5-places', name: 'Location de jacuzzi – 5 places' },
        { id: 'suivi-personnalise', name: 'Suivi personnalisé' },
      ],
    },
    {
      id: 'lieux',
      num: '(4)',
      title: 'Les lieux',
      subtitle: 'Institut Belle & Zen (Saint-Lô) & Le Chant des Oiseaux',
      tag: '(4) SANCTUAIRES & LIEUX DE SOIN',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85',
      action: () => {
        handleSmoothClose(() => {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '/lieux');
          }
          onNavigate('lieux');
        });
      },
    },
    {
      id: 'ressources',
      num: '(5)',
      title: 'Ressources',
      subtitle: 'Des repères pour mieux comprendre votre équilibre',
      tag: '(5) BIBLIOTHÈQUE PÉDAGOGIQUE & REPÈRES',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
      action: () => {
        handleSmoothClose(() => {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '/ressources');
          }
          onNavigate('ressources');
        });
      },
    },
    {
      id: 'boutique',
      num: '(6)',
      title: 'Boutique',
      subtitle: 'Produits naturels, huiles & cartes cadeaux',
      tag: '(6) BOUTIQUE & CARTE CADEAU',
      image: 'https://www.maisoncerezy.fr/wp-content/uploads/2024/03/istockphoto-1441979693-612x612-1.jpg',
      action: () => {
        handleSmoothClose(() => {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '/boutique');
          }
          onNavigate('boutique');
        });
      },
    },
  ];

  const activeItem = menuItems[activeItemIndex] || menuItems[0];

  const handleSubItemClick = (subId: string) => {
    handleSmoothClose(() => {
      onNavigate('prestations', subId);
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      {/* Dark translucent overlay with subtle background blur */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-md transition-opacity duration-500 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => handleSmoothClose()}
      />

      {/* Fullscreen Circular Reveal Modal */}
      <div
        ref={modalRef}
        id="fullscreen-menu-modal"
        className="fixed inset-0 w-screen h-screen min-h-screen z-[100000] flex flex-col lg:flex-row overflow-hidden bg-[#FAF8F5]/98 text-[#1C1A17] font-sans select-none shadow-2xl"
      >
        
        {/* LEFT PANEL - Menu Items & Details */}
        <div className="w-full lg:w-[58%] h-full flex flex-col justify-between p-4 sm:p-8 lg:p-10 xl:p-12 overflow-y-auto lg:overflow-hidden bg-[#FAF8F5] text-[#1C1A17] z-10 border-r border-[#E5E0D8]">
          
          {/* Top Header with Brand & Close/Book actions */}
          <div className="stagger-menu-detail flex items-center justify-between gap-3 mb-2 sm:mb-4 lg:mb-6 shrink-0 pb-3 border-b border-[#E8E3DA]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  handleSmoothClose(() => {
                    if (window.history && window.history.pushState) {
                      window.history.pushState(null, '', '/');
                    }
                    onNavigate('home');
                  });
                }}
                className="flex items-center gap-2 group cursor-pointer focus:outline-none"
                title="Retour à l'accueil"
              >
                {/* Mobile Phone Logo: logo rectangle .png */}
                <img
                  src={logoRectanglePng}
                  alt="Les Racines du Bien-Être"
                  className="block sm:hidden h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />

                {/* Desktop Logo */}
                <div className="hidden sm:flex items-center gap-2">
                  <BrandLogo showText={false} className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105" />
                  <span className="font-serif text-sm sm:text-base font-medium tracking-tight text-[#1C1A17]">
                    Les Racines du Bien-Être
                  </span>
                </div>
              </button>
            </div>

            {/* Close & Booking actions on mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => {
                  handleSmoothClose(() => {
                    onOpenBooking();
                  });
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#344E41] hover:bg-[#283d33] text-white text-[11px] font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#AEB9A9]" />
                <span>Réserver</span>
              </button>

              <button
                onClick={() => handleSmoothClose()}
                className="p-2 rounded-full bg-[#1C1A17]/10 text-[#1C1A17] hover:bg-[#1C1A17]/20 transition-colors cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Middle Navigation Menu List */}
          <div className="my-auto space-y-2 py-2 flex-1 flex flex-col justify-center">
            {menuItems.map((item, index) => {
              const isHovered = activeItemIndex === index;
              const isPrestations = item.id === 'prestations';

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setActiveItemIndex(index);
                    if (isPrestations) {
                      setPrestationsSubOpen(true);
                    }
                  }}
                  className={`stagger-menu-item group border-b border-[#E8E3DA] pb-2 sm:pb-3 transition-all duration-300 ${
                    isHovered ? 'border-[#20352B]' : ''
                  }`}
                >
                  <div
                    onClick={() => {
                      setActiveItemIndex(index);
                      if (isPrestations) {
                        setPrestationsSubOpen(!prestationsSubOpen);
                      } else {
                        item.action();
                      }
                    }}
                    className={`flex items-baseline gap-2 sm:gap-3 cursor-pointer select-none rounded-lg p-1.5 -ml-1.5 transition-all duration-200 ${
                      isHovered ? 'pl-2.5 bg-[#506456]/10' : 'hover:pl-2'
                    }`}
                  >
                    <span className={`font-mono text-xs tracking-wider transition-colors shrink-0 ${
                      isHovered ? 'text-[#344E41] font-bold' : 'text-neutral-400'
                    }`}>
                      {item.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-serif text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight transition-all duration-300 flex items-center justify-between ${
                        isHovered ? 'text-[#20352B] italic' : 'text-[#1C1A17]'
                      }`}>
                        <span className="truncate">{item.title}</span>
                        {isPrestations ? (
                          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 ${
                            prestationsSubOpen ? 'rotate-180 text-[#344E41]' : 'text-neutral-400'
                          }`} />
                        ) : (
                          <ArrowUpRight className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-all duration-300 ${
                            isHovered ? 'opacity-100 text-[#344E41] translate-x-0' : 'opacity-0 -translate-x-2'
                          }`} />
                        )}
                      </h3>
                      <p className="font-sans text-[11px] sm:text-xs text-neutral-500 font-light mt-0.5 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Dropdown panel for Prestations */}
                  {isPrestations && (prestationsSubOpen || isHovered) && (
                    <div className="nav-dropdown-panel mt-2.5 ml-6 sm:ml-8 pl-3 border-l-2 border-[#344E41]/30 py-1 space-y-1.5">
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubItemClick(sub.id);
                          }}
                          className="block w-full text-left py-1 px-2 rounded-lg text-xs sm:text-sm font-medium text-neutral-700 hover:text-[#20352B] hover:bg-[#20352B]/5 transition-colors cursor-pointer"
                        >
                          • {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Back to Home Button placed under Boutique div */}
            <div className="stagger-menu-detail pt-4 sm:pt-6 shrink-0">
              <button
                onClick={() => {
                  handleSmoothClose(() => {
                    if (window.history && window.history.pushState) {
                      window.history.pushState(null, '', '/');
                    }
                    onNavigate('home');
                  });
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#20352B] hover:bg-[#2A4237] text-white font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg group"
                title="Retour à l'accueil"
              >
                <ArrowLeft className="w-4 h-4 text-[#AEB9A9] transition-transform group-hover:-translate-x-1" />
                <span>Retour à l'accueil</span>
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL - Image Preview & Actions (Desktop) */}
        <div className="hidden lg:flex w-full lg:w-[42%] h-full relative flex-col justify-between p-12 overflow-hidden bg-[#16161a]">
          
          {/* Dynamic Background Image with Smooth Fade */}
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                activeItemIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
            </div>
          ))}

          {/* Top Right Bar: Réserver Button + Exit / Fermer Button */}
          <div className="stagger-menu-detail relative z-20 flex items-center justify-end gap-3 ml-auto">
            <button
              onClick={() => {
                handleSmoothClose(() => {
                  onOpenBooking();
                });
              }}
              className="px-5 py-2.5 rounded-full bg-[#344E41] hover:bg-[#283d33] text-white text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <Calendar className="w-3.5 h-3.5 text-[#AEB9A9]" />
              <span>Réserver</span>
            </button>

            <div className="h-6 w-[1px] bg-white/30" />

            {/* Dedicated Exit Button on Right panel */}
            <button
              id="menu-exit-button-right"
              onClick={() => handleSmoothClose()}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 active:bg-black text-white border border-white/30 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg group"
              aria-label="Fermer le menu"
              title="Fermer et retourner à la page"
            >
              <X className="w-5 h-5 text-[#AEB9A9] transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>

          {/* Bottom Preview Overlay Info */}
          <div className="stagger-menu-detail relative z-20 text-white space-y-3 max-w-lg mt-auto pt-12">
            <span className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-[#AEB9A9] font-bold">
              {activeItem.tag}
            </span>
            <h2 className="font-serif text-3xl xl:text-4xl font-light text-white leading-tight">
              {activeItem.title}
            </h2>
            <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
              {activeItem.subtitle}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  if (activeItem.id === 'prestations') {
                    handleSmoothClose(() => {
                      if (window.history && window.history.pushState) {
                        window.history.pushState(null, '', '/prestations');
                      }
                      onNavigate('prestations');
                    });
                  } else {
                    activeItem.action();
                  }
                }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1C1A17] backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg group"
              >
                <span>Découvrir {activeItem.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};
