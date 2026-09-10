import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import { ShoppingBag, ArrowUpRight, Check, Leaf, Pill, Droplet, Coffee } from 'lucide-react';
import gsap from 'gsap';

interface BoutiqueCatalogueSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickViewProduct: (product: Product) => void;
}

const CATEGORY_FILTERS = [
  { id: 'tous', label: 'Tous', categoryValue: 'Tout', icon: Leaf },
  { id: 'complements', label: 'Compléments', categoryValue: 'Compléments alimentaires', icon: Pill },
  { id: 'huiles', label: 'Huiles', categoryValue: 'Huiles', icon: Droplet },
  { id: 'infusions', label: 'Infusions', categoryValue: 'Infusions', icon: Coffee },
  { id: 'maison-rituel', label: 'Maison & rituel', categoryValue: 'Maison & rituel', icon: ShoppingBag },
];

export const BoutiqueCatalogueSection: React.FC<BoutiqueCatalogueSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickViewProduct
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = selectedCategory === 'Tout' || !selectedCategory
    ? products
    : products.filter(
        (p) =>
          p.fullCategory?.toLowerCase() === selectedCategory.toLowerCase() ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory.toLowerCase() === 'infusions' && (p.category === 'infusions' || p.fullCategory?.toLowerCase().includes('infusion')))
      );

  // Animate grid cards when category changes
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  }, [selectedCategory]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setToastMessage(`« ${product.name} » a été ajouté à votre panier`);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section
      id="catalogue-section"
      className="w-full bg-[#F8F6F1] text-[#26372E] py-20 sm:py-28 px-6 sm:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* CATALOGUE HEADER & CIRCULAR ICON FILTERS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#20352B]/15">
          {/* TITLE */}
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#6F8275] font-medium block">
              LE CATALOGUE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20352B] leading-tight tracking-tight">
              Choisir selon votre{' '}
              <span className="italic font-normal text-[#6F8275]">
                intention.
              </span>
            </h2>
          </div>

          {/* CIRCULAR ICON CATEGORY FILTER BAR */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto p-3 no-scrollbar shrink-0 -mx-2 px-2">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = (selectedCategory || 'Tout').toLowerCase() === cat.categoryValue.toLowerCase() ||
                (selectedCategory === 'Tout' && cat.categoryValue === 'Tout');
              const IconComp = cat.icon;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.categoryValue)}
                  className="group flex flex-col items-center gap-2 cursor-pointer shrink-0 transition-all duration-300 focus:outline-none"
                >
                  {/* Outer halo wrapper prevents clipping */}
                  <div className={`p-1 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#506456]/25 shadow-sm' : 'bg-transparent'
                  }`}>
                    {/* Inner Circle Icon Container */}
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#506456] text-white shadow-md'
                          : 'bg-[#EFF3EE] hover:bg-[#E2E8E0] text-[#344E41] border border-[#D0DDD0] shadow-xs group-hover:scale-105'
                      }`}
                    >
                      <IconComp className={`w-5.5 h-5.5 sm:w-6 sm:h-6 transition-transform duration-300 ${isActive ? 'text-white' : 'text-[#344E41] group-hover:scale-110'}`} />
                    </div>
                  </div>

                  {/* Label below */}
                  <span
                    className={`font-sans text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap ${
                      isActive ? 'font-semibold text-[#1C1A17]' : 'font-medium text-[#555048] group-hover:text-[#1C1A17]'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-start"
        >
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;
            const categoryDisplay =
              product.fullCategory ||
              (product.category === 'complements'
                ? 'Compléments alimentaires'
                : product.category === 'huiles'
                ? 'Huiles'
                : 'Maison & rituel');

            return (
              <div
                key={product.id}
                onClick={() => onQuickViewProduct(product)}
                className="group relative bg-white rounded-2xl border border-[#20352B]/12 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 cursor-pointer"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#E7ECE5]/50 mb-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* TOP-LEFT CATEGORY PILL */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/90 backdrop-blur-xs text-[#20352B] font-mono text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full shadow-xs border border-black/5">
                      {categoryDisplay}
                    </span>
                  </div>

                  {/* QUICK VIEW OVERLAY ICON */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickViewProduct(product);
                      }}
                      className="w-9 h-9 rounded-full bg-white/90 text-[#20352B] hover:bg-[#20352B] hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      title="Aperçu rapide"
                      aria-label="Aperçu rapide"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                    </button>
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* INDICATIVE PRICE */}
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#6F8275] block">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </span>

                    {/* PRODUCT TITLE */}
                    <h3 className="font-serif text-xl font-medium text-[#20352B] group-hover:text-[#6F8275] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* SHORT DESCRIPTION */}
                    <p className="font-sans text-xs text-[#26372E]/75 font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* BOTTOM ACTIONS */}
                  <div className="pt-2 flex items-center gap-2">
                    {/* PRIMARY CTA: AJOUTER AU PANIER */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`flex-1 py-3 px-4 rounded-full font-mono text-xs font-semibold tracking-[0.12em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#6F8275] text-white'
                          : 'bg-[#20352B] hover:bg-[#182820] text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Ajouter au panier</span>
                        </>
                      )}
                    </button>

                    {/* SECONDARY CTA: ARROW BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickViewProduct(product);
                      }}
                      className="w-10 h-10 rounded-full border border-[#20352B]/20 text-[#20352B] hover:bg-[#20352B] hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                      title="Détails"
                      aria-label="Voir les détails"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#20352B] text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-fade-in font-sans text-xs sm:text-sm">
          <div className="w-7 h-7 rounded-full bg-[#6F8275] flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
