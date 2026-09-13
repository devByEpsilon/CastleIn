"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface GothicRelicProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced?: boolean;
}

/**
 * The hero centerpiece: a dark, distorting relic that drifts and tilts
 * toward the pointer. Deliberately abstract — reads as "cybernetic gothic
 * artifact" rather than any one literal object.
 */
export function GothicRelic({ pointer, reduced = false }: GothicRelicProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetX = reduced ? 0 : pointer.current.y * 0.35;
    const targetY = reduced ? 0 : pointer.current.x * 0.5;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      4,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY + state.clock.elapsedTime * 0.08,
      4,
      delta,
    );

    if (core.current) {
      core.current.rotation.z += delta * 0.15;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.06;
      shell.current.rotation.x += delta * 0.03;
    }

    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
  });

  return (
    <group ref={group}>
      {/* Inner obsidian core */}
      <mesh ref={core} castShadow receiveShadow>
        <icosahedronGeometry args={[1.15, 6]} />
        <MeshDistortMaterial
          color="#0d0d10"
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={1.4}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Outer wireframe shell — the "gothic tracery" layer */}
      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.28} />
      </mesh>

      <mesh scale={1.9}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ff2f4e" wireframe transparent opacity={0.12} />
      </mesh>

      <Sparkles count={60} scale={4.5} size={2} speed={0.25} color="#d6ff3f" opacity={0.5} />
    </group>
  );
}
