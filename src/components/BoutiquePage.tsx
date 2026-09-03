import React, { useState, useEffect } from 'react';
import { BoutiqueFilterCategory, BoutiqueSoin, Product } from '../types';
import { BoutiqueHero } from './boutique/BoutiqueHero';
import { BoutiqueCategoryUniverses } from './boutique/BoutiqueCategoryUniverses';
import { BoutiqueCatalogueSection } from './boutique/BoutiqueCatalogueSection';
import { TreatmentFilters } from './boutique/TreatmentFilters';
import { TreatmentGrid } from './boutique/TreatmentGrid';
import { FeaturedTreatment } from './boutique/FeaturedTreatment';
import { TreatmentSteps } from './boutique/TreatmentSteps';
import { BoutiqueQuote } from './boutique/BoutiqueQuote';
import { GiftCardSection } from './boutique/GiftCardSection';
import { BoutiqueFinalCTA } from './boutique/BoutiqueFinalCTA';
import { TreatmentDetailModal } from './boutique/TreatmentDetailModal';
import { BOUTIQUE_SOINS } from '../data/boutiqueData';
import { BOUTIQUE_PRODUCTS } from '../data/boutiqueProductsData';

interface BoutiquePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenQuiz?: () => void;
  initialSlug?: string | null;
  onAddToCart?: (product: Product) => void;
  onOpenCart?: () => void;
  onQuickViewProduct?: (product: Product) => void;
}

export const BoutiquePage: React.FC<BoutiquePageProps> = ({
  onOpenBooking,
  onOpenQuiz,
  initialSlug,
  onAddToCart,
  onOpenCart,
  onQuickViewProduct
}) => {
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('Tout');
  const [activeSoinCategory, setActiveSoinCategory] = useState<BoutiqueFilterCategory>('TOUS');
  const [selectedSoin, setSelectedSoin] = useState<BoutiqueSoin | null>(null);

  // Check initial slug or window pathname for direct deep links e.g. /boutique/complexe-vegetal-quotidien
  useEffect(() => {
    const path = window.location.pathname;
    let targetSlug = initialSlug;

    if (!targetSlug && path.includes('/boutique/')) {
      targetSlug = path.split('/boutique/')[1];
    }

    if (targetSlug) {
      // Check if it matches a product
      const productMatch = BOUTIQUE_PRODUCTS.find(
        (p) => p.id === targetSlug || p.route?.includes(targetSlug)
      );
      if (productMatch && onQuickViewProduct) {
        onQuickViewProduct(productMatch);
        return;
      }

      // Check if it matches a treatment/soin
      const soinMatch = BOUTIQUE_SOINS.find(
        (s) => s.slug === targetSlug || s.id === targetSlug
      );
      if (soinMatch) {
        setSelectedSoin(soinMatch);
      }
    }
  }, [initialSlug, onQuickViewProduct]);

  const handleDiscoverClick = () => {
    const el = document.getElementById('universes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCartFallback = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleQuickViewFallback = (product: Product) => {
    if (onQuickViewProduct) {
      onQuickViewProduct(product);
    }
  };

  return (
    <div className="bg-[#181D1A] min-h-screen">
      {/* 1. HERO — "LA BOUTIQUE DES SOINS & RITUELS" */}
      <BoutiqueHero
        onDiscoverClick={handleDiscoverClick}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* 2. INTRO / CATEGORY UNIVERSES ("TROIS UNIVERS") */}
      <div id="universes-section">
        <BoutiqueCategoryUniverses
          onSelectCategoryFilter={(cat) => setSelectedProductCategory(cat)}
        />
      </div>

      {/* 3. PRODUCT CATALOGUE SECTION ("LE CATALOGUE" - 8 PRODUCTS, FILTERS & CARDS) */}
      <BoutiqueCatalogueSection
        products={BOUTIQUE_PRODUCTS}
        selectedCategory={selectedProductCategory}
        onSelectCategory={(cat) => setSelectedProductCategory(cat)}
        onAddToCart={handleAddToCartFallback}
        onQuickViewProduct={handleQuickViewFallback}
      />

      {/* 4. FINAL CTA */}
      <BoutiqueFinalCTA
        onOpenBooking={() => onOpenBooking()}
        onOpenQuiz={onOpenQuiz}
      />

      {/* TREATMENT DETAIL MODAL / PANEL */}
      <TreatmentDetailModal
        soin={selectedSoin}
        onClose={() => setSelectedSoin(null)}
        onOpenBooking={onOpenBooking}
      />
    </div>
  );
};
