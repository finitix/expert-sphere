import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export type RobotEmotion = "friendly" | "thinking" | "sad" | "excited" | "idle";

interface RobotProps {
  emotion?: RobotEmotion;
  lookAtMouse?: boolean;
  scale?: number;
}

// Emissive eye with emotion-driven brightness and color
function Eye({ position, emotion }: { position: [number, number, number]; emotion: RobotEmotion }) {
  const ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const config = useMemo(() => {
    switch (emotion) {
      case "friendly": return { color: "#4ade80", intensity: 2.5, scale: 1.1 };
      case "thinking": return { color: "#60a5fa", intensity: 1.5, scale: 0.85 };
      case "sad": return { color: "#94a3b8", intensity: 0.8, scale: 0.7 };
      case "excited": return { color: "#a78bfa", intensity: 3, scale: 1.2 };
      default: return { color: "#3fb950", intensity: 1.8, scale: 1 };
    }
  }, [emotion]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Blink every ~4 seconds
    const blink = Math.sin(t * 0.8) > 0.97 ? 0.1 : 1;
    ref.current.scale.y = blink * config.scale;
    ref.current.scale.x = config.scale;
    if (lightRef.current) {
      lightRef.current.intensity = config.intensity * (0.8 + Math.sin(t * 2) * 0.2);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={config.intensity}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={lightRef} color={config.color} intensity={config.intensity} distance={1} />
    </group>
  );
}

// Head with visor
function Head({ emotion }: { emotion: RobotEmotion }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Head tilt based on emotion
    if (emotion === "thinking") {
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
      groupRef.current.rotation.x = -0.1;
    } else if (emotion === "sad") {
      groupRef.current.rotation.x = 0.2;
      groupRef.current.rotation.z = 0;
    } else if (emotion === "friendly") {
      groupRef.current.rotation.x = Math.sin(t * 0.3) * -0.05;
      groupRef.current.rotation.z = 0;
    } else if (emotion === "excited") {
      groupRef.current.rotation.z = Math.sin(t * 3) * 0.05;
      groupRef.current.rotation.x = -0.05;
    } else {
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.03;
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.05, 0]}>
      {/* Main head - rounded box shape */}
      <mesh>
        <boxGeometry args={[0.55, 0.5, 0.45]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Visor / face plate */}
      <mesh position={[0, -0.02, 0.23]}>
        <boxGeometry args={[0.48, 0.25, 0.02]} />
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={0.3}
          roughness={0.1}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>
      {/* Eyes */}
      <Eye position={[-0.12, 0.02, 0.24]} emotion={emotion} />
      <Eye position={[0.12, 0.02, 0.24]} emotion={emotion} />
      {/* Top accent line */}
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial color="#3fb950" emissive="#3fb950" emissiveIntensity={0.5} />
      </mesh>
      {/* Side panels */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.28, 0, 0]}>
          <boxGeometry args={[0.02, 0.35, 0.35]} />
          <meshStandardMaterial color="#16213e" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Neck connector
function Neck() {
  return (
    <mesh position={[0, 0.72, 0]}>
      <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
      <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

// Torso with chest light
function Torso({ emotion }: { emotion: RobotEmotion }) {
  const lightRef = useRef<THREE.Mesh>(null);

  const chestColor = useMemo(() => {
    switch (emotion) {
      case "friendly": return "#4ade80";
      case "thinking": return "#60a5fa";
      case "sad": return "#64748b";
      case "excited": return "#a78bfa";
      default: return "#3fb950";
    }
  }, [emotion]);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    const mat = lightRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1 + Math.sin(t * 1.5) * 0.5;
  });

  return (
    <group position={[0, 0.25, 0]}>
      {/* Main torso */}
      <mesh>
        <boxGeometry args={[0.65, 0.7, 0.35]} />
        <meshStandardMaterial color="#16213e" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.05, 0.18]}>
        <boxGeometry args={[0.45, 0.45, 0.02]} />
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={0.3}
          roughness={0.1}
          transmission={0.2}
          clearcoat={1}
        />
      </mesh>
      {/* Chest light / core */}
      <mesh ref={lightRef} position={[0, 0.05, 0.2]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={chestColor}
          emissive={chestColor}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 0.05, 0.3]} color={chestColor} intensity={1} distance={2} />
      {/* Shoulder connectors */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.35, 0.28, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Accent lines on torso */}
      {[-0.15, 0, 0.15].map((y, i) => (
        <mesh key={i} position={[0, y - 0.1, 0.181]}>
          <boxGeometry args={[0.35, 0.008, 0.001]} />
          <meshStandardMaterial color="#3fb950" emissive="#3fb950" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Arm with gesture capability
function Arm({ side, emotion }: { side: "left" | "right"; emotion: RobotEmotion }) {
  const groupRef = useRef<THREE.Group>(null);
  const forearmRef = useRef<THREE.Group>(null);
  const s = side === "left" ? -1 : 1;

  useFrame((state) => {
    if (!groupRef.current || !forearmRef.current) return;
    const t = state.clock.elapsedTime;

    if (emotion === "friendly" && side === "right") {
      // Wave gesture
      groupRef.current.rotation.z = s * -0.5 + Math.sin(t * 3) * 0.3;
      forearmRef.current.rotation.x = -0.8 + Math.sin(t * 3) * 0.2;
    } else if (emotion === "thinking") {
      groupRef.current.rotation.z = s * (side === "right" ? -0.3 : -0.1);
      forearmRef.current.rotation.x = side === "right" ? -1.2 : -0.1;
    } else if (emotion === "sad") {
      groupRef.current.rotation.z = s * 0.05;
      forearmRef.current.rotation.x = 0;
    } else if (emotion === "excited") {
      groupRef.current.rotation.z = s * (-0.4 + Math.sin(t * 4 + s) * 0.2);
      forearmRef.current.rotation.x = -0.5 + Math.sin(t * 4 + s * 2) * 0.3;
    } else {
      // Idle subtle sway
      groupRef.current.rotation.z = s * (-0.1 + Math.sin(t * 0.5 + s) * 0.03);
      forearmRef.current.rotation.x = Math.sin(t * 0.3 + s * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[s * 0.42, 0.5, 0]}>
      {/* Upper arm */}
      <mesh position={[0, -0.18, 0]}>
        <capsuleGeometry args={[0.045, 0.2, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Elbow joint */}
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Forearm */}
      <group ref={forearmRef} position={[0, -0.32, 0]}>
        <mesh position={[0, -0.17, 0]}>
          <capsuleGeometry args={[0.04, 0.18, 8, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.32, 0]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color="#16213e" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Wrist accent */}
        <mesh position={[0, -0.26, 0]}>
          <torusGeometry args={[0.045, 0.008, 8, 16]} />
          <meshStandardMaterial color="#3fb950" emissive="#3fb950" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Mouse-following logic
function MouseTracker({ groupRef, enabled }: { groupRef: React.RefObject<THREE.Group>; enabled: boolean }) {
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current || !enabled) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    // Subtle look-at-cursor
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.15, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.08, 0.05);
  });

  return null;
}

// Breathing / idle float
function IdleAnimation({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.04;
  });
  return null;
}

// Full robot assembly
function RobotModel({ emotion = "idle", lookAtMouse = true }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <group ref={groupRef}>
      <MouseTracker groupRef={groupRef} enabled={lookAtMouse} />
      <IdleAnimation groupRef={groupRef} />
      <Head emotion={emotion} />
      <Neck />
      <Torso emotion={emotion} />
      <Arm side="left" emotion={emotion} />
      <Arm side="right" emotion={emotion} />
    </group>
  );
}

// Ambient particles around robot
function AmbientParticles({ count = 60 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#3fb950" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Exported canvas-wrapped robot
export function Robot3DCanvas({ emotion = "idle", lookAtMouse = true, className = "" }: RobotProps & { className?: string }) {
  return (
    <div className={className} style={{ pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#3fb950" />
        <pointLight position={[3, -1, 2]} intensity={0.3} color="#a855f7" />
        <RobotModel emotion={emotion} lookAtMouse={lookAtMouse} />
        <AmbientParticles />
      </Canvas>
    </div>
  );
}
