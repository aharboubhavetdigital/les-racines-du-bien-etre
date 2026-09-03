import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "../../lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl p-7 sm:p-9 shadow-sm transition-all duration-300 hover:shadow-xl border border-[#2C362F]/15 group",
  {
    variants: {
      gradient: {
        sage: "bg-gradient-to-br from-[#EAF0E9] via-[#E2EAE0] to-[#D5E1D3] text-[#181D1A]",
        sand: "bg-gradient-to-br from-[#F8F5EE] via-[#F2EDE2] to-[#E8E0D1] text-[#181D1A]",
        taupe: "bg-gradient-to-br from-[#F2EDE8] via-[#E6DED5] to-[#D8CCC0] text-[#181D1A]",
        forest: "bg-gradient-to-br from-[#27322A] via-[#1F2922] to-[#161F18] text-white border-white/15",
        gray: "bg-gradient-to-br from-[#F4F4F3] to-[#E5E5E3] text-[#181D1A]",
        green: "bg-gradient-to-br from-[#ECF4EB] to-[#D8E8D5] text-[#181D1A]",
        orange: "bg-gradient-to-br from-[#FBF3EB] to-[#F5E5D5] text-[#181D1A]",
        purple: "bg-gradient-to-br from-[#F4F0F7] to-[#E6DCF0] text-[#181D1A]",
      },
    },
    defaultVariants: {
      gradient: "sage",
    },
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText?: string;
  badgeColor?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl: string;
  onCtaClick?: () => void;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      gradient,
      badgeText,
      badgeColor = "#55695B",
      title,
      description,
      ctaText = "En savoir plus",
      ctaHref = "#",
      imageUrl,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const isDark = gradient === "forest";

    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.02, y: -5 },
    };

    const imageAnimation = {
      rest: { scale: 1, rotate: 0, opacity: isDark ? 0.35 : 0.65 },
      hover: { scale: 1.08, rotate: 2, opacity: isDark ? 0.5 : 0.85 },
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onCtaClick) {
        e.preventDefault();
        onCtaClick();
      }
    };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="h-full"
        ref={ref}
      >
        <div className={cn(cardVariants({ gradient }), className)} {...props}>
          {/* Decorative background image with animation */}
          <motion.img
            src={imageUrl}
            alt={`${title} visual`}
            referrerPolicy="no-referrer"
            variants={imageAnimation}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -right-10 -bottom-10 w-3/5 sm:w-1/2 h-4/5 object-cover rounded-full mix-blend-multiply filter contrast-105 pointer-events-none"
          />

          {/* Card Content */}
          <div className="z-10 flex flex-col justify-between h-full min-h-[260px] sm:min-h-[290px]">
            {/* Badge */}
            <div>
              {badgeText && (
                <div
                  className={cn(
                    "mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider uppercase backdrop-blur-md w-fit border",
                    isDark
                      ? "bg-white/10 text-white/90 border-white/20"
                      : "bg-white/70 text-[#2C362F] border-black/5 shadow-xs"
                  )}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: badgeColor }}
                  />
                  {badgeText}
                </div>
              )}

              {/* Title and Description */}
              <h3
                className={cn(
                  "font-serif-editorial text-2xl sm:text-3xl font-normal leading-snug mb-3 tracking-[-0.01em]",
                  isDark ? "text-white" : "text-[#181D1A]"
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "font-sans text-xs sm:text-sm font-light leading-relaxed max-w-sm",
                  isDark ? "text-white/80" : "text-[#48534C]"
                )}
              >
                {description}
              </p>
            </div>

            {/* Call to Action Link */}
            <a
              href={ctaHref}
              onClick={handleClick}
              className={cn(
                "group/btn mt-8 inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors w-fit",
                isDark ? "text-white hover:text-[#AEB9A9]" : "text-[#2C362F] hover:text-[#55695B]"
              )}
            >
              <span>{ctaText}</span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1",
                  isDark ? "bg-white/15 text-white" : "bg-[#55695B] text-white"
                )}
              >
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }
);

GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
