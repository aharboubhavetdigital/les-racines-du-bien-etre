import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FluidCursorOverlay } from './components/FluidCursorOverlay';
import { ScrollVideoHero } from './components/ScrollVideoHero';
import { ScrollPinnedSection } from './components/ScrollPinnedSection';
import { ImageRevealSection } from './components/ImageRevealSection';
import { EnsembleVivantSection } from './components/EnsembleVivantSection';
import { SoinsAuSuiviSection } from './components/SoinsAuSuiviSection';
import { ParcoursSection } from './components/ParcoursSection';
import { SpiralGallerySection } from './components/SpiralGallerySection';
import { FaqSection } from './components/FaqSection';
import { LieuxSection } from './components/LieuxSection';
import { CtaSection } from './components/CtaSection';
import { TrustpilotSection } from './components/TrustpilotSection';
import { Footer } from './components/Footer';
import { FloatingBookingButton } from './components/FloatingBookingButton';

import { BookingModal } from './components/BookingModal';
import { AProposPage } from './components/AProposPage';
import { BoutiquePage } from './components/BoutiquePage';
import { PrestationsPage } from './components/PrestationsPage';
import { LieuxPage } from './components/LieuxPage';
import { RessourcesPage } from './components/RessourcesPage';
import { CartDrawer } from './components/CartDrawer';
import { ArticleModal } from './components/ArticleModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WellnessQuizModal } from './components/WellnessQuizModal';
import { LegalModal } from './components/LegalModal';

import { Service, Product, JournalArticle, CartItem } from './types';

export default function App() {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState<'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources'>('home');

  // Check URL path on mount & listen to popstate for direct /boutique or /prestations or /lieux or /ressources routing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/prestations')) {
        setCurrentPage('prestations');
      } else if (path.startsWith('/boutique')) {
        setCurrentPage('boutique');
      } else if (path.includes('apropos')) {
        setCurrentPage('apropos');
      } else if (path.includes('lieux')) {
        setCurrentPage('lieux');
      } else if (path.includes('ressources')) {
        setCurrentPage('ressources');
      } else {
        setCurrentPage('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string>('naturopathie');

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [legalType, setLegalType] = useState<'mentions' | 'privacy' | null>(null);

  const handleNavigate = (page: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Booking trigger helper
  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setBookingServiceId(serviceId);
    }
    setIsBookingOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#131210] text-white font-sans antialiased flex flex-col selection:bg-[#AEB9A9]/30 selection:text-white">
      {/* GPU FLUID NAVIER-STOKES CURSOR OVERLAY */}
      <FluidCursorOverlay color="#aebbaa" intensity={0.25} curl={14} />

      {/* 1. TOP GLOBAL NAVIGATION (À propos, La naturopathie, Prestations | Logo Centre | Les lieux, Ressources, Boutique) */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        cartItemCount={totalCartCount}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow">
        {currentPage === 'prestations' ? (
          <PrestationsPage
            onOpenBooking={handleOpenBooking}
            onNavigateHome={(section) => handleNavigate('home', section)}
          />
        ) : currentPage === 'boutique' ? (
          <BoutiquePage
            onOpenBooking={handleOpenBooking}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onQuickViewProduct={(product) => setSelectedProduct(product)}
          />
        ) : currentPage === 'apropos' ? (
          <AProposPage
            onNavigateHome={(section) => handleNavigate('home', section)}
            onOpenBooking={handleOpenBooking}
          />
        ) : currentPage === 'lieux' ? (
          <LieuxPage
            onNavigateHome={(section) => handleNavigate('home', section)}
            onOpenBooking={handleOpenBooking}
          />
        ) : currentPage === 'ressources' ? (
          <RessourcesPage
            onNavigateHome={(section) => handleNavigate('home', section)}
            onNavigatePage={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        ) : (
          <>
            {/* HERO SECTION */}
            <ScrollVideoHero
              onOpenBooking={handleOpenBooking}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onNavigateToBoutique={() => handleNavigate('boutique')}
            />

            {/* SCROLL-PINNED HORIZONTAL HEADING + FLY-ACROSS PRODUCT CARDS */}
            <ScrollPinnedSection />

            {/* STUDIO SCROLL-POWERED IMAGE REVEAL — CLIP-PATH WIPE WITH ASCII DISSOLVE BAND */}
            <ImageRevealSection />

            {/* COMPRENDRE LA NATUROPATHIE — REGARDER LES HABITUDES COMME UN ENSEMBLE VIVANT */}
            <EnsembleVivantSection
              onOpenBooking={handleOpenBooking}
            />

            {/* DES SOINS MANUELS AU SUIVI */}
            <SoinsAuSuiviSection
              onOpenBooking={handleOpenBooking}
            />

            {/* VOTRE PARCOURS — COMPRENDRE, PROPOSER, AJUSTER */}
            <ParcoursSection
              onOpenBooking={handleOpenBooking}
            />

            {/* 📍 LES LIEUX / BAROMÈTRE & BOUTIQUE */}
            <LieuxSection
              onOpenBooking={handleOpenBooking}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />

            {/* 🌀 UNIVERS & RITUELS NATURELS (SPIRAL GALLERY) */}
            <SpiralGallerySection />

            {/* ❓ QUESTIONS FRÉQUENTES (FAQ) */}
            <FaqSection
              onOpenBooking={handleOpenBooking}
            />

            {/* FINAL CTA SECTION */}
            <CtaSection
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        )}
      </main>

      {/* TRUSTPILOT REVIEWS SECTION */}
      <TrustpilotSection />

      {/* FOOTER */}
      <Footer
        onOpenLegal={(type) => setLegalType(type)}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

      {/* FLOATING ACTION BUTTONS (Boutique & Prendre Rendez-vous) */}
      <FloatingBookingButton
        onOpenBooking={() => handleOpenBooking()}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToBoutique={() => handleNavigate('boutique')}
        cartItemCount={totalCartCount}
        isBoutiquePage={currentPage === 'boutique'}
      />

      {/* MODALS & OVERLAYS */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={bookingServiceId}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenBooking={handleOpenBooking}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <WellnessQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onOpenBooking={handleOpenBooking}
        onQuickViewProduct={(product) => setSelectedProduct(product)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

    </div>
  );
}
