import { useRef, useEffect, useMemo, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export type RobotEmotion = "friendly" | "thinking" | "sad" | "excited" | "idle";

interface RobotProps {
  emotion?: RobotEmotion;
  lookAtMouse?: boolean;
  scale?: number;
}

const MODEL_PATH = "/models/robot.glb";

useGLTF.preload(MODEL_PATH);

function RobotModel({ emotion = "idle", lookAtMouse = true, scale = 1 }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions, names } = useAnimations(animations, groupRef);
  const { viewport } = useThree();

  // Clone scene for safe reuse
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.envMapIntensity = 1.5;
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  // Auto-fit: compute bounding box and center/scale the model
  const { modelScale, modelOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    // Target ~2.5 units tall in the scene
    const fitScale = maxDim > 0 ? 2.5 / maxDim : 1;
    return {
      modelScale: fitScale,
      modelOffset: new THREE.Vector3(-center.x * fitScale, -box.min.y * fitScale - 1.2, -center.z * fitScale),
    };
  }, [clonedScene]);

  // Play animations mapped to emotions
  useEffect(() => {
    if (!actions || names.length === 0) return;

    Object.values(actions).forEach((a) => a?.fadeOut(0.5));

    const emotionMap: Record<string, string[]> = {
      friendly: ["greet", "wave", "hello", "happy"],
      thinking: ["think", "idle"],
      sad: ["sad", "idle"],
      excited: ["excited", "happy", "dance"],
      idle: ["idle", "breathe", "stand"],
    };

    const candidates = emotionMap[emotion] || [];
    let played = false;

    for (const c of candidates) {
      const found = names.find((n) => n.toLowerCase().includes(c));
      if (found && actions[found]) {
        actions[found]!.reset().fadeIn(0.5).play();
        played = true;
        break;
      }
    }

    if (!played && names.length > 0 && actions[names[0]]) {
      actions[names[0]]!.reset().fadeIn(0.5).play();
    }
  }, [emotion, actions, names]);

  // Emotion-driven motion
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (lookAtMouse) {
      const x = (state.pointer.x * viewport.width) / 2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.12, 0.04);
    }

    // Breathing
    groupRef.current.position.y = modelOffset.y + Math.sin(t * 0.8) * 0.03;

    switch (emotion) {
      case "thinking":
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(t * 0.5) * 0.08, 0.03);
        break;
      case "sad":
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.15, 0.03);
        break;
      case "excited":
        groupRef.current.position.y += Math.sin(t * 4) * 0.015;
        break;
      case "friendly":
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.3) * -0.04, 0.03);
        break;
      default:
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.02);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.02);
    }
  });

  return (
    <group ref={groupRef} scale={modelScale * scale} position={[modelOffset.x, modelOffset.y, modelOffset.z]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Ambient particles
function AmbientParticlesInner() {
  const count = 40;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, []);

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

export function Robot3DCanvas({
  emotion = "idle",
  lookAtMouse = true,
  className = "",
  scale = 1,
}: RobotProps & { className?: string }) {
  return (
    <div className={className} style={{ pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0.2, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} />
        <pointLight position={[-2, 2, 3]} intensity={0.5} color="#3fb950" />
        <pointLight position={[2, -1, 3]} intensity={0.3} color="#a855f7" />
        <hemisphereLight intensity={0.4} groundColor="#1a1a2e" />
        <RobotModel emotion={emotion} lookAtMouse={lookAtMouse} scale={scale} />
        <AmbientParticlesInner />
      </Canvas>
    </div>
  );
}

export type { RobotProps };
