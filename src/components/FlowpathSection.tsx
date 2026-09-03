import React from 'react';
import { GhostFibers } from './GhostFibers';

interface FlowpathSectionProps {
  onOpenBooking?: () => void;
  onNavigateToBoutique?: () => void;
}

export const FlowpathSection: React.FC<FlowpathSectionProps> = ({ onOpenBooking, onNavigateToBoutique }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigateToBoutique) {
      onNavigateToBoutique();
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/boutique');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="h-screen w-full overflow-hidden relative flex flex-col font-helvetica-now bg-[#131210] text-white selection:bg-white/20 selection:text-white">
      {/* Background Image */}
      <img
        src="https://static.vecteezy.com/ti/photos-gratuite/t1/50835043-une-therapeute-est-performant-une-relaxant-pied-massage-sur-une-client-qui-est-mensonge-bas-ensemble-contre-une-toile-de-fond-de-doux-chaud-ambiant-eclairage-cette-suggere-un-soir-atmosphere-concu-pour-relaxation-photo.jpg"
        alt="Soin de réflexologie et de relaxation — Les Racines du Bien-Être"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
      />

      {/* GhostFibers WebGL Flow Effect (White color, 55% opacity) */}
      <div className="absolute inset-0 pointer-events-none opacity-55 mix-blend-screen z-[1]">
        <GhostFibers
          lineColor="#FFFFFF"
          glowColor="#FFFFFF"
          speed={0.18}
          scale={2.2}
          rotation={0}
          rotationSpeed={0.2}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.0}
          vignette={0.8}
          grain={0.04}
          dpr={1}
        />
      </div>

      {/* Subtle Warm & Dark Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[#131210] pointer-events-none z-[2]" />

      {/* Full Content Container */}
      <div className="relative z-10 flex flex-col h-full w-full justify-center items-center">
        
        {/* Hero Content (Centered) */}
        <div className="flex items-center justify-center pt-16 sm:pt-20 px-4">
          <div className="text-center max-w-3xl animate-fade-in">
            
            {/* Main Headline */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] font-light font-serif-editorial">
              Mieux comprendre<br />
              votre corps pour<br />
              retrouver votre{' '}
              <span className="text-white font-normal italic animate-pulse-opacity inline-block">
                équilibre.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-6 font-light drop-shadow-sm">
              Un accompagnement holistique et individualisé pour observer vos habitudes, retrouver des repères et avancer à votre rythme.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
              <a
                href="/boutique"
                onClick={handleClick}
                className="px-8 sm:px-9 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 rounded-full text-white text-xs sm:text-sm font-medium tracking-[0.18em] uppercase transition-all shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                Découvrir les soins
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
