import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Semi-humanoid robot: head, torso, arms, emissive glow lines
function RobotHead({ headRef }: { headRef: React.RefObject<THREE.Group | null> }) {
  const visorRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (visorRef.current) {
      // Pulsing visor glow
      const mat = visorRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={headRef} position={[0, 1.8, 0]}>
      {/* Main head - rounded box shape */}
      <mesh>
        <boxGeometry args={[0.7, 0.55, 0.6]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
      {/* Head top cap */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Visor / Eye strip */}
      <mesh ref={visorRef} position={[0, 0.05, 0.31]}>
        <boxGeometry args={[0.55, 0.12, 0.02]} />
        <meshStandardMaterial
          color="#3fb950"
          emissive="#3fb950"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
      {/* Side glow lines */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.36, 0, 0]}>
          <boxGeometry args={[0.02, 0.4, 0.5]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {/* Antenna */}
      <group ref={antennaRef} position={[0, 0.45, 0]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#555" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={3}
          />
        </mesh>
      </group>
    </group>
  );
}

function RobotTorso() {
  const chestGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (chestGlowRef.current) {
      const mat = chestGlowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.8;
    }
  });

  return (
    <group position={[0, 0.6, 0]}>
      {/* Main torso */}
      <mesh>
        <boxGeometry args={[0.9, 1.2, 0.55]} />
        <meshStandardMaterial
          color="#16213e"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Chest core - glowing circle */}
      <mesh ref={chestGlowRef} position={[0, 0.15, 0.281]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color="#3fb950"
          emissive="#3fb950"
          emissiveIntensity={2}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Chest ring */}
      <mesh position={[0, 0.15, 0.282]}>
        <ringGeometry args={[0.15, 0.19, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Horizontal glow lines on torso */}
      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y - 0.15, 0.281]}>
          <boxGeometry args={[0.7, 0.02, 0.01]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
      {/* Shoulder joints */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.55, 0.45, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function RobotArm({ side, time }: { side: number; time: number }) {
  const armRef = useRef<THREE.Group>(null);
  const forearmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (armRef.current) {
      // Subtle idle arm swing
      armRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8 + side * Math.PI) * 0.08;
      armRef.current.rotation.z = side * 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
    if (forearmRef.current) {
      forearmRef.current.rotation.x = -0.2 + Math.sin(state.clock.elapsedTime * 0.6 + side) * 0.05;
    }
  });

  return (
    <group ref={armRef} position={[side * 0.65, 1.0, 0]}>
      {/* Upper arm */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#16213e" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Elbow joint */}
      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* Forearm */}
      <group ref={forearmRef} position={[0, -0.55, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.12, 0.4, 0.12]} />
          <meshStandardMaterial color="#16213e" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Forearm glow strip */}
        <mesh position={[0, -0.25, 0.065]}>
          <boxGeometry args={[0.04, 0.3, 0.01]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
}

function RobotBase() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Hip / waist section */}
      <mesh>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#16213e" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Floating base / hover disc */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Base glow ring */}
      <mesh position={[0, -0.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.36, 32]} />
        <meshStandardMaterial
          color="#3fb950"
          emissive="#3fb950"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Under-glow */}
      <pointLight position={[0, -0.5, 0]} intensity={1} color="#3fb950" distance={3} />
    </group>
  );
}

// Ambient particles around the robot
function RoboParticles({ count = 60 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random() * 3;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#3fb950" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Main Robot Entity - follows cursor subtly
export function RoboEntity({ mousePos }: { mousePos?: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing / idle bob
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (headRef.current && mousePos) {
      // Head follows cursor direction (subtle)
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mousePos.x * 0.3,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mousePos.y * 0.15,
        0.05
      );
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.1}>
        <RobotHead headRef={headRef} />
        <RobotTorso />
        <RobotArm side={-1} time={0} />
        <RobotArm side={1} time={0} />
        <RobotBase />
        <RoboParticles />
      </group>
    </Float>
  );
}
