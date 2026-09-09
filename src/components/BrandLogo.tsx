import React from 'react';
import logoV4Url from '../assets/images/logo v4 .svg';
import logoRectanglePng from '../assets/images/logo rectangle .png';

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
    sm: 'h-9 sm:h-[72px]',
    md: 'h-13 sm:h-16 md:h-[76px]',
    lg: 'h-16 sm:h-20 md:h-24',
    xl: 'h-28 sm:h-36 md:h-44'
  }[size];

  // Balanced mobile height sizing for mobile logo rectangle on phone screens
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
          {/* Mobile Logo: logo rectangle .png */}
          <img
            src={logoRectanglePng}
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

