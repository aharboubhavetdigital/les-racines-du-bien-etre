import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowDown } from "lucide-react";

interface CurvedVideoWallProps {
  title?: string;
  badgeText?: string;
  onDiscoverClick?: () => void;
  className?: string;
}

const DEFAULT_VIDEO_SOURCES = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2013.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
];

const FALLBACK_IMAGE_SOURCES = [
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512290900673-700200411798?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
];

export const CurvedVideoWall: React.FC<CurvedVideoWallProps> = ({
  title = "FRAMECAST",
  badgeText,
  onDiscoverClick,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const params = {
      rows: 7,
      columns: 7,
      curvature: 5,
      spacing: 10,
      imageWidth: 7,
      imageHeight: 4.5,
      depth: 7.5,
      elevation: 0,
      lookAtRange: 20,
      verticalCurvature: 0.5,
    };

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x181d1a); // Sophisticated dark background

    container.appendChild(renderer.domElement);

    // Position & Rotation math for Parabolic Curved Wall
    const calculatePosition = (row: number, col: number) => {
      const x = (col - params.columns / 2 + 0.5) * params.spacing;
      let y = (row - params.rows / 2 + 0.5) * params.spacing;

      let z = (x * x) / (params.depth * params.curvature);
      const normalizedY = y / ((params.rows * params.spacing) / 2);
      z += Math.abs(normalizedY) * normalizedY * params.verticalCurvature * 5;

      y += params.elevation;
      return { x, y, z };
    };

    const calculateRotations = (x: number, y: number) => {
      const a = 1 / (params.depth * params.curvature);
      const slopeY = -2 * a * x;
      const rotationY = Math.atan(slopeY);

      const maxYDistance = (params.rows * params.spacing) / 2;
      const normalizedY = y / maxYDistance;
      const rotationX = normalizedY * params.verticalCurvature;

      return { rotationX, rotationY };
    };

    // Pre-create Image / Video textures
    const textureLoader = new THREE.TextureLoader();
    const imageTextures = FALLBACK_IMAGE_SOURCES.map((url) => {
      const tex = textureLoader.load(url);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    });

    const planes: THREE.Mesh[] = [];
    const videosToClean: HTMLVideoElement[] = [];

    // Create 7x7 Grid of Planes
    for (let r = 0; r < params.rows; r++) {
      for (let c = 0; c < params.columns; c++) {
        const { x, y, z } = calculatePosition(r, c);
        const { rotationX, rotationY } = calculateRotations(x, y);

        const geometry = new THREE.PlaneGeometry(
          params.imageWidth,
          params.imageHeight
        );

        // High reliability material: Start with fallback texture or color
        const randomImageTex =
          imageTextures[(r * params.columns + c) % imageTextures.length];

        const material = new THREE.MeshBasicMaterial({
          color: 0x344e41,
          map: randomImageTex,
          side: THREE.DoubleSide,
        });

        // Try binding video texture dynamically
        const videoSrc =
          DEFAULT_VIDEO_SOURCES[
            (r * params.columns + c) % DEFAULT_VIDEO_SOURCES.length
          ];
        const video = document.createElement("video");
        video.src = videoSrc;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        const showVideo = () => {
          material.map = videoTexture;
          material.color.set(0xffffff);
          material.needsUpdate = true;
        };

        video.addEventListener("loadeddata", showVideo);
        video.addEventListener("playing", showVideo);
        video.play().catch(() => {});
        videosToClean.push(video);

        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(x, y, z);
        plane.rotation.x = rotationX;
        plane.rotation.y = rotationY;

        plane.userData = {
          basePosition: { x, y, z },
          baseRotation: { x: rotationX, y: rotationY, z: 0 },
          parallaxFactor: Math.random() * 0.5 + 0.5,
          randomOffset: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1,
          },
          rotationModifier: {
            x: Math.random() * 0.15 - 0.075,
            y: Math.random() * 0.15 - 0.075,
            z: Math.random() * 0.2 - 0.1,
          },
          phaseOffset: Math.random() * Math.PI * 2,
          video,
        };

        scene.add(plane);
        planes.push(plane);
      }
    }

    // Mouse Tracking & Easing
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let headerRotationX = 0;
    let headerRotationY = 0;
    let headerTranslateZ = 0;

    const lookAtTarget = new THREE.Vector3(0, 0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      headerRotationX = -mouseY * 25;
      headerRotationY = mouseX * 25;
      headerTranslateZ = Math.abs(mouseX * mouseY) * 40;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // 1. Header CSS-3D Tilt
      if (headerRef.current) {
        headerRef.current.style.transform = `
          translate(-50%, -50%)
          perspective(1000px)
          rotateX(${headerRotationX}deg)
          rotateY(${headerRotationY}deg)
          translateZ(${headerTranslateZ}px)`;
        headerRef.current.style.transition =
          "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)";
      }

      // 2. Ease Camera LookAt Target
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      lookAtTarget.x = targetX * params.lookAtRange;
      lookAtTarget.y = -targetY * params.lookAtRange;
      lookAtTarget.z =
        (lookAtTarget.x * lookAtTarget.x) / (params.depth * params.curvature);

      camera.lookAt(lookAtTarget);

      // 3. Per-plane Parallax & Oscillation
      const time = performance.now() * 0.001;
      const mouseDistance = Math.sqrt(targetX * targetX + targetY * targetY);

      planes.forEach((plane) => {
        const {
          basePosition,
          baseRotation,
          parallaxFactor,
          randomOffset,
          rotationModifier,
          phaseOffset,
        } = plane.userData;

        const parallaxX = targetX * parallaxFactor * 3 * randomOffset.x;
        const parallaxY = targetY * parallaxFactor * 3 * randomOffset.y;
        const oscillation =
          Math.sin(time + phaseOffset) * mouseDistance * 0.1;

        plane.position.x =
          basePosition.x + parallaxX + oscillation * randomOffset.x;
        plane.position.y =
          basePosition.y + parallaxY + oscillation * randomOffset.y;
        plane.position.z =
          basePosition.z + oscillation * randomOffset.z * parallaxFactor;

        plane.rotation.x =
          baseRotation.x +
          targetY * rotationModifier.x * mouseDistance +
          oscillation * rotationModifier.x * 0.2;
        plane.rotation.y =
          baseRotation.y +
          targetX * rotationModifier.y * mouseDistance +
          oscillation * rotationModifier.y * 0.2;
        plane.rotation.z =
          baseRotation.z +
          targetX * targetY * rotationModifier.z * 2 +
          oscillation * rotationModifier.z * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      videosToClean.forEach((v) => {
        v.pause();
        v.src = "";
        v.load();
      });

      planes.forEach((plane) => {
        scene.remove(plane);
        plane.geometry.dispose();
        if (Array.isArray(plane.material)) {
          plane.material.forEach((m) => m.dispose());
        } else {
          plane.material.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-[88vh] min-h-[600px] overflow-hidden bg-[#181D1A] ${className}`}>
      {/* WEBGL CANVAS CONTAINER */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* TOP FLOATING LIME BADGE (OPTIONAL) */}
      {badgeText && (
        <nav className="absolute top-6 left-0 w-full flex justify-center z-20 pointer-events-none">
          <p className="text-xs uppercase font-semibold px-3 py-1 bg-[#d4f70c] text-black tracking-widest rounded-full shadow-lg">
            {badgeText}
          </p>
        </nav>
      )}

      {/* 3D-TILTING CENTER HEADLINE & CTA */}
      <div
        ref={headerRef}
        className="absolute top-1/2 left-1/2 z-20 text-center will-change-transform flex flex-col items-center justify-center pointer-events-none select-none max-w-4xl px-4"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1
          className="uppercase font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light text-white tracking-tight leading-[1.05] drop-shadow-2xl mb-8"
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          {title}
        </h1>

        {onDiscoverClick && (
          <button
            onClick={onDiscoverClick}
            className="pointer-events-auto px-9 py-4 rounded-[12px] bg-[#344E41] hover:bg-[#2C4237] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer border border-[#AEB9A9]/30 group"
          >
            <span>Découvrir le catalogue</span>
            <ArrowDown className="w-4 h-4 text-[#AEB9A9] group-hover:text-white transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        )}
      </div>
    </div>
  );
};
