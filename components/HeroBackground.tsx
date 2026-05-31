"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random generator to satisfy react-hooks/purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function GlitchParticles({ count = 500 }) {
  const points = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      // Use index as seed for deterministic "randomness"
      pos[i] = (pseudoRandom(i + 0.123) - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const glitchChance = Math.sin(time * 10 + i) * 0.5 + 0.5;
      if (glitchChance > 0.995) {
        positions[i3] += (Math.sin(time * 50 + i) * 0.1);
        positions[i3 + 1] += (Math.cos(time * 50 + i) * 0.1);
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function GlitchLines({ count = 20 }) {
  const lines = useRef<THREE.Group>(null!);

  const lineData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (pseudoRandom(i * 1.5 + 0.5) - 0.5) * 10, 
        (pseudoRandom(i * 2.1 + 0.2) - 0.5) * 10, 
        -2
      ] as [number, number, number],
      id: i
    }));
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    lines.current.children.forEach((line, i) => {
      const glitchChance = Math.sin(time * 5 + i) * 0.5 + 0.5;
      if (glitchChance > 0.98) {
        line.position.x = (Math.sin(time * 20 + i) * 5);
        line.scale.x = (Math.cos(time * 10 + i) + 1.5);
      }
      line.rotation.z = time * (i % 2 === 0 ? 0.1 : -0.1);
    });
  });

  return (
    <group ref={lines}>
      {lineData.map((data, i) => (
        <mesh key={i} position={data.position}>
          <planeGeometry args={[1, 0.005]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <GlitchParticles count={1000} />
        <GlitchLines count={30} />
      </Canvas>
    </div>
  );
}
