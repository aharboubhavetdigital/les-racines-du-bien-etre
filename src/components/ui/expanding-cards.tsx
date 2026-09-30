"use client";

import * as React from "react";
import { cn } from "../../lib/utils"; 

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl gap-4",
        "flex flex-col h-auto md:grid md:h-[520px]",
        "transition-[grid-template-columns] duration-500 ease-out",
        className,
      )}
      style={
        isDesktop
          ? {
              gridTemplateColumns: items.map((_, index) => (index === activeIndex ? "5fr" : "1fr")).join(" "),
              gridTemplateRows: '1fr'
            }
          : {}
      }
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-2xl border border-[#181D1A]/10 bg-[#FFFFFF] text-card-foreground shadow-sm transition-all duration-300",
            "h-[260px] sm:h-[280px] md:h-full md:min-w-[70px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={isDesktop ? activeIndex === index : true}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out scale-105 opacity-100",
              "md:scale-110 md:grayscale md:opacity-90 md:group-data-[active=true]:scale-105 md:group-data-[active=true]:grayscale-0 md:group-data-[active=true]:opacity-100"
            )}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-[#181D1A]/95 via-[#181D1A]/50 to-black/10 transition-opacity duration-300",
            "md:from-[#181D1A]/90 md:via-[#181D1A]/40 md:group-data-[active=true]:from-[#181D1A]/95 md:group-data-[active=true]:via-[#181D1A]/50"
          )} />

          <article
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6"
          >
            {/* Top Bar inside active/inactive card */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#8BB28A] md:text-white/70 md:group-data-[active=true]:text-[#8BB28A] tracking-widest uppercase">
                0{index + 1}
              </span>
              <div className="text-white scale-110 md:text-white/80 md:group-data-[active=true]:text-white md:group-data-[active=true]:scale-110">
                {item.icon}
              </div>
            </div>

            {/* Rotated text for collapsed desktop cards only */}
            <h3 className="hidden origin-left rotate-90 text-sm font-semibold uppercase tracking-widest text-white/90 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0 font-sans whitespace-nowrap absolute bottom-12 left-6">
              {item.title}
            </h3>

            {/* Expanded content */}
            <div className="space-y-2 text-white opacity-100 md:opacity-0 transition-all duration-300 delay-100 ease-out md:group-data-[active=true]:opacity-100">
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold leading-tight text-white">
                {item.title}
              </h3>

              <p className="w-full max-w-lg font-sans text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
