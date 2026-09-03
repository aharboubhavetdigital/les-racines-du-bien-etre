"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ImageCardItem {
  src: string;
  title?: string;
  tag?: string;
}

interface ImageCardProps {
  item: ImageCardItem;
  onLoad?: () => void;
}

const ImageCard = ({ item, onLoad }: ImageCardProps) => {
  const [imgSrc, setImgSrc] = useState<string>(item.src);

  return (
    <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] flex-shrink-0 bg-[#131210] rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.03] cursor-pointer relative will-change-transform backface-hidden preserve-3d border border-white/10 group shadow-2xl">
      <img
        src={imgSrc}
        alt={item.title || "Bien-Être Asset"}
        loading="lazy"
        onLoad={onLoad}
        referrerPolicy="no-referrer"
        onError={() => {
          // Fallback to reliable high quality unsplash image if source fails
          setImgSrc('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80');
        }}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export interface ParallaxGalleryProps {
  items?: ImageCardItem[];
  introTitle?: string;
  introSubtitle?: string;
}

export default function ParallaxUnfurlingGallery({
  items = [],
  introTitle,
  introSubtitle,
}: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const galleryItems = useMemo(() => {
    if (items && items.length > 0) return items;
    return [
      {
        src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
        title: "Bilan de vitalité & écoute attentive",
        tag: "Naturopathie"
      },
      {
        src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
        title: "Réflexologie plantaire & détente absolue",
        tag: "Soin corporel"
      },
      {
        src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        title: "Herboristerie & phytothérapie vivante",
        tag: "Plantes médicinales"
      },
      {
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
        title: "Massage Kobido & réflexologie faciale",
        tag: "Éclat naturel"
      }
    ];
  }, [items]);

  const colMedia = useMemo(() => {
    const col1Base = galleryItems.filter((_, i) => i % 4 === 0);
    const col2Base = galleryItems.filter((_, i) => i % 4 === 1);
    const col3Base = galleryItems.filter((_, i) => i % 4 === 2);
    const col4Base = galleryItems.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base, ...col4Base],
    };
  }, [galleryItems]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#0A0908] text-white font-sans selection:bg-[#AEB9A9]/30 selection:text-white"
    >
      <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
        <motion.div
          style={{
            width: bannerWidth,
            height: bannerHeight,
            borderRadius: bannerRadius,
            borderWidth: bannerBorderWidth,
            borderColor: "rgba(255,255,255,0.1)",
          }}
          className="relative bg-[#0A0908] overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d shadow-2xl"
        >
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient Vignette & Shadow Overlay Masks */}
            <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(10,9,8,1),inset_0_-100px_150px_-50px_rgba(10,9,8,1)]" />
            <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(10,9,8,1),inset_-150px_0_150px_-50px_rgba(10,9,8,1)]" />

            {/* 3D Parallax Image Grid Matrix */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                z: translateZ,
                transformStyle: "preserve-3d",
              }}
              className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
            >
              <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col1.map((item, index) => (
                  <ImageCard key={`col1-${index}`} item={item} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col2.map((item, index) => (
                  <ImageCard key={`col2-${index}`} item={item} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col3.map((item, index) => (
                  <ImageCard key={`col3-${index}`} item={item} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col4.map((item, index) => (
                  <ImageCard key={`col4-${index}`} item={item} onLoad={handleItemLoad} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
