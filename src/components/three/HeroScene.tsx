"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { GothicRelic } from "./GothicRelic";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotion";

export function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
    >
      <color attach="background" args={["#050506"]} />
      <fog attach="fog" args={["#050506", 4, 9]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={40} color="#ff2f4e" />
      <pointLight position={[-3, -1, 2]} intensity={30} color="#6f57ff" />
      <Suspense fallback={null}>
        <GothicRelic pointer={pointer} reduced={reducedMotion} />
        <Environment preset="night" environmentIntensity={0.6} />
      </Suspense>
    </Canvas>
  );
}
