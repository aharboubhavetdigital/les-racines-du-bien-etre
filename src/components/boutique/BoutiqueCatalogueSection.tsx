import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import { ShoppingBag, ArrowUpRight, Check, Leaf, Pill, Droplet, Coffee, Heart } from 'lucide-react';
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
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

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

        {/* PRODUCT GRID: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-start */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-start"
        >
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;
            const isFav = !!favorites[product.id];
            const categoryDisplay =
              product.fullCategory ||
              (product.category === 'complements'
                ? 'COMPLÉMENTS ALIMENTAIRES'
                : product.category === 'huiles'
                ? 'HUILES'
                : 'MAISON & RITUEL');

            return (
              <div
                key={product.id}
                onClick={() => onQuickViewProduct(product)}
                className="group relative bg-white rounded-[20px] border border-[#20352B]/10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-350 ease-out flex flex-col justify-between p-4 sm:p-5 cursor-pointer"
              >
                <div>
                  {/* PRODUCT IMAGE AREA (55-60% Height) */}
                  <div className="relative aspect-[4/4.4] w-full rounded-[16px] overflow-hidden bg-[#F4F3EE] mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.98] contrast-[1.02]"
                    />

                    {/* TOP-LEFT CATEGORY PILL BADGE */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#FAF9F5]/90 backdrop-blur-xs text-[#1B2B22] font-mono text-[10px] tracking-wider uppercase font-semibold px-3 py-1.5 rounded-full shadow-2xs border border-black/5">
                        {categoryDisplay}
                      </span>
                    </div>

                    {/* TOP-RIGHT CIRCULAR ARROW BUTTON */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickViewProduct(product);
                        }}
                        className="w-8.5 h-8.5 rounded-full bg-white/95 text-[#1B2B22] hover:bg-[#173D2C] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs border border-black/5 cursor-pointer"
                        title="Aperçu rapide"
                        aria-label="Aperçu rapide"
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                      </button>
                    </div>
                  </div>

                  {/* CONTENT AREA BELOW IMAGE */}
                  <div className="space-y-2 px-1">
                    {/* PRICE & FAVORITE HEART ROW */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#506456]">
                        {product.price.toFixed(2).replace('.', ',')} €
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="p-1 cursor-pointer transition-colors"
                        title="Ajouter aux favoris"
                      >
                        <Heart className={`w-4.5 h-4.5 transition-colors ${isFav ? 'fill-[#173D2C] text-[#173D2C]' : 'text-[#1B2B22]/40 hover:text-[#1B2B22]'}`} />
                      </button>
                    </div>

                    {/* PRODUCT TITLE */}
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1B2B22] group-hover:text-[#506456] transition-colors leading-snug tracking-tight mt-1 mb-1">
                      {product.name}
                    </h3>

                    {/* SHORT DESCRIPTION */}
                    <p className="font-sans text-xs sm:text-sm text-[#1B2B22]/70 font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* FULL-WIDTH DARK FOREST GREEN CTA BUTTON */}
                <div className="pt-4 px-1">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`w-full min-h-[48px] py-3.5 px-4 rounded-full font-mono text-xs font-semibold tracking-widest uppercase whitespace-nowrap flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-xs ${
                      isAdded
                        ? 'bg-[#506456] text-white'
                        : 'bg-[#173D2C] hover:bg-[#204A37] active:scale-[0.98] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" />
                        <span>AJOUTÉ AU PANIER</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 shrink-0 text-white" />
                        <span>AJOUTER AU PANIER</span>
                      </>
                    )}
                  </button>
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
