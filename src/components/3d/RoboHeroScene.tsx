import { Suspense, useRef, useState, useEffect, useCallback, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { RoboEntity } from "./RoboEntity";

// Lightweight fallback for low-end devices or while loading
function RoboFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Static robot silhouette */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-3xl animate-pulse" />
        <div className="absolute inset-4 rounded-2xl bg-card/50 backdrop-blur border border-border flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-primary/20 flex items-center justify-center">
              <div className="w-10 h-2 rounded bg-primary animate-pulse" />
            </div>
            <div className="w-12 h-16 mx-auto rounded-lg bg-card border border-border" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Detect low-end device
function useIsLowEnd() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  useEffect(() => {
    const nav = navigator as any;
    if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) {
      setIsLowEnd(true);
      return;
    }
    // Check device memory if available
    if (nav.deviceMemory && nav.deviceMemory < 4) {
      setIsLowEnd(true);
      return;
    }
    // Mobile check
    if (/Android|iPhone|iPad/.test(navigator.userAgent) && window.innerWidth < 768) {
      setIsLowEnd(true);
    }
  }, []);
  return isLowEnd;
}

export function RoboHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isLowEnd = useIsLowEnd();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize mouse position to -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (isLowEnd) {
    return <RoboFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <Suspense fallback={<RoboFallback />}>
        <Canvas
          camera={{ position: [0, 0.5, 5.5], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          {/* Ambient lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
          
          {/* Colored accent lights */}
          <pointLight position={[-3, 2, 3]} intensity={0.6} color="#3fb950" distance={10} />
          <pointLight position={[3, -1, 2]} intensity={0.4} color="#a855f7" distance={8} />
          <pointLight position={[0, 3, -2]} intensity={0.3} color="#3b82f6" distance={8} />
          
          {/* Rim light from behind */}
          <pointLight position={[0, 1, -4]} intensity={0.5} color="#3b82f6" distance={10} />

          <RoboEntity mousePos={mousePos} />
        </Canvas>
      </Suspense>
    </div>
  );
}
