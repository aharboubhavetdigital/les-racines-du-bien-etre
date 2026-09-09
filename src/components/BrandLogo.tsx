import React from 'react';
import logoV4Url from '../assets/images/logo v4 .svg';
import logoV5Png from '../assets/images/logo v5 .png';

export interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'original';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  showSubtitle?: boolean;
  showText?: boolean;
  useMobileV5?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'original',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
  showText = true,
  useMobileV5 = true,
  className = ''
}) => {
  // Height sizing for the desktop logo image
  const logoHeight = {
    sm: 'h-10 sm:h-12',
    md: 'h-16 sm:h-20 md:h-22',
    lg: 'h-20 sm:h-24 md:h-28 lg:h-32',
    xl: 'h-32 sm:h-44 md:h-52'
  }[size];

  // Balanced mobile height sizing for mobile logo v5 on phone screens
  const mobileLogoHeight = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-22'
  }[size];

  // Optional filter adjustments for dark vs light variants
  const getVariantFilter = () => {
    switch (variant) {
      case 'light':
        return 'brightness-[1.25] contrast-[1.1] drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]';
      case 'dark':
        return 'brightness-[0.9] contrast-[1.1]';
      case 'original':
      default:
        return 'brightness-[1.15] contrast-[1.05]';
    }
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {useMobileV5 ? (
        <>
          {/* Mobile Logo: logo v5 .png (minimized compact scale) */}
          <img
            src={logoV5Png}
            alt="Les Racines du Bien-Être"
            className={`block md:hidden ${mobileLogoHeight} w-auto object-contain ${getVariantFilter()}`}
          />
          {/* Desktop Logo: logo v4 .svg */}
          <img
            src={logoV4Url}
            alt="Les Racines du Bien-Être"
            className={`hidden md:block ${logoHeight} w-auto object-contain ${getVariantFilter()}`}
          />
        </>
      ) : (
        <img
          src={logoV4Url}
          alt="Les Racines du Bien-Être"
          className={`${logoHeight} w-auto object-contain ${getVariantFilter()}`}
        />
      )}
    </div>
  );
};

