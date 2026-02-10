import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import * as THREE from "three";

export type RobotEmotion = "friendly" | "thinking" | "sad" | "excited" | "idle";

interface RobotProps {
  emotion?: RobotEmotion;
  lookAtMouse?: boolean;
  scale?: number;
}

const MODEL_PATH = "/models/robot.glb";

// Preload the model
useGLTF.preload(MODEL_PATH);

function RobotModel({ emotion = "idle", lookAtMouse = true, scale = 1 }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions, names } = useAnimations(animations, groupRef);
  const { viewport } = useThree();

  // Clone scene so multiple instances don't conflict
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Enhance materials for premium look
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) {
            mat.envMapIntensity = 1.5;
            mat.needsUpdate = true;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  // Play first available animation or manage by emotion
  useEffect(() => {
    if (!actions || names.length === 0) return;

    // Stop all current animations
    Object.values(actions).forEach((action) => action?.fadeOut(0.4));

    // Try to find animation matching emotion, fallback to first
    const emotionAnimMap: Record<string, string[]> = {
      friendly: ["greet", "wave", "hello", "happy", "Greet", "Wave"],
      thinking: ["think", "idle", "Think", "Idle"],
      sad: ["sad", "Sad", "idle", "Idle"],
      excited: ["excited", "happy", "dance", "Excited", "Happy"],
      idle: ["idle", "Idle", "breathe", "stand"],
    };

    const candidates = emotionAnimMap[emotion] || [];
    let played = false;

    for (const candidate of candidates) {
      const found = names.find(
        (n) => n.toLowerCase().includes(candidate.toLowerCase())
      );
      if (found && actions[found]) {
        actions[found]!.reset().fadeIn(0.4).play();
        played = true;
        break;
      }
    }

    // Fallback: play the first animation
    if (!played && names.length > 0 && actions[names[0]]) {
      actions[names[0]]!.reset().fadeIn(0.4).play();
    }
  }, [emotion, actions, names]);

  // Emotion-driven visual effects
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Mouse tracking
    if (lookAtMouse) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.12,
        0.04
      );
    }

    // Idle breathing motion
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.03;

    // Emotion-based posture adjustments
    switch (emotion) {
      case "thinking":
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          Math.sin(t * 0.5) * 0.08,
          0.03
        );
        break;
      case "sad":
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          0.15,
          0.03
        );
        break;
      case "excited":
        groupRef.current.position.y += Math.sin(t * 4) * 0.015;
        break;
      case "friendly":
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          Math.sin(t * 0.3) * -0.04,
          0.03
        );
        break;
      default:
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          0,
          0.02
        );
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          0,
          0.02
        );
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, -1.2, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Ambient particles
function AmbientParticles({ count = 40 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#3fb950" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// Exported canvas-wrapped robot
export function Robot3DCanvas({
  emotion = "idle",
  lookAtMouse = true,
  className = "",
  scale = 1,
}: RobotProps & { className?: string }) {
  return (
    <div className={className} style={{ pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0.3, 3.2], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#3fb950" />
        <pointLight position={[3, -1, 2]} intensity={0.3} color="#a855f7" />
        <spotLight
          position={[0, 4, 3]}
          angle={0.4}
          penumbra={0.8}
          intensity={0.6}
          color="#ffffff"
        />
        <Environment preset="city" />
        <RobotModel emotion={emotion} lookAtMouse={lookAtMouse} scale={scale} />
        <AmbientParticles />
      </Canvas>
    </div>
  );
}

export type { RobotProps };
