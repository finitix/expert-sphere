import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
const MODEL_PATH = "/models/robot.glb";
useGLTF.preload(MODEL_PATH);
function RobotModel({ emotion = "idle", lookAtMouse = true, scale = 1 }) {
    const groupRef = useRef(null);
    const { scene, animations } = useGLTF(MODEL_PATH);
    const { actions, names } = useAnimations(animations, groupRef);
    const { viewport } = useThree();
    // Clone scene
    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);
        clone.traverse((child) => {
            if (child.isMesh) {
                const mesh = child;
                if (mesh.material) {
                    const mat = mesh.material.clone();
                    mat.envMapIntensity = 1.8;
                    // Enable emissive for eye glow effect
                    if (mat.name?.toLowerCase().includes("eye") || mat.name?.toLowerCase().includes("glow") || mat.name?.toLowerCase().includes("emissive")) {
                        mat.emissive = new THREE.Color("#00ff88");
                        mat.emissiveIntensity = 2.0;
                    }
                    mesh.material = mat;
                }
            }
        });
        return clone;
    }, [scene]);
    // Auto-fit model
    const { modelScale, modelOffset } = useMemo(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fitScale = maxDim > 0 ? 2.8 / maxDim : 1;
        return {
            modelScale: fitScale,
            modelOffset: new THREE.Vector3(-center.x * fitScale, -box.min.y * fitScale - 1.4, -center.z * fitScale),
        };
    }, [clonedScene]);
    // Log available animations on mount
    useEffect(() => {
        if (names.length > 0) {
            console.log("[Robot3D] Available animations:", names);
        }
        else {
            console.warn("[Robot3D] No animations found in GLB model");
        }
    }, [names]);
    // Play animations mapped to emotions
    useEffect(() => {
        if (!actions || names.length === 0)
            return;
        Object.values(actions).forEach((a) => a?.fadeOut(0.4));
        const emotionMap = {
            friendly: ["wave", "greet", "hello", "hi", "happy", "waving"],
            thinking: ["think", "thinking", "look", "idle"],
            sad: ["sad", "unhappy", "idle"],
            excited: ["excited", "happy", "dance", "jump", "wave"],
            idle: ["idle", "breathe", "stand", "rest"],
        };
        const candidates = emotionMap[emotion] || emotionMap.idle;
        let played = false;
        for (const c of candidates) {
            const found = names.find((n) => n.toLowerCase().includes(c));
            if (found && actions[found]) {
                actions[found].reset().fadeIn(0.4).play();
                played = true;
                break;
            }
        }
        // Fallback: play first animation
        if (!played && names.length > 0 && actions[names[0]]) {
            actions[names[0]].reset().fadeIn(0.4).play();
        }
    }, [emotion, actions, names]);
    // Emotion-driven motion + mouse tracking
    useFrame((state) => {
        if (!groupRef.current)
            return;
        const t = state.clock.elapsedTime;
        // Mouse follow
        if (lookAtMouse) {
            const x = (state.pointer.x * viewport.width) / 2;
            const y = (state.pointer.y * viewport.height) / 2;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.04);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.05, 0.04);
        }
        // Breathing
        groupRef.current.position.y = modelOffset.y + Math.sin(t * 0.8) * 0.025;
        switch (emotion) {
            case "thinking":
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(t * 0.5) * 0.06, 0.03);
                break;
            case "sad":
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.12, 0.03);
                break;
            case "excited":
                groupRef.current.position.y += Math.sin(t * 4) * 0.012;
                break;
            case "friendly":
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.3) * -0.03, 0.03);
                break;
            default:
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.02);
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.02);
        }
        // Pulse emissive for eye blink effect
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                const mat = child.material;
                if (mat.emissiveIntensity !== undefined && mat.emissive && mat.emissive.r > 0) {
                    mat.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.5;
                }
            }
        });
    });
    return (<group ref={groupRef} scale={modelScale * scale} position={[modelOffset.x, modelOffset.y, modelOffset.z]}>
      <primitive object={clonedScene}/>
    </group>);
}
// Floating particles
function AmbientParticles() {
    const count = 30;
    const ref = useRef(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 6;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        return arr;
    }, []);
    useFrame((state) => {
        if (ref.current)
            ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    });
    return (<points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3}/>
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#3fb950" transparent opacity={0.3} sizeAttenuation/>
    </points>);
}
export function Robot3DCanvas({ emotion = "idle", lookAtMouse = true, className = "", scale = 1, }) {
    return (<div className={className} style={{ pointerEvents: "auto" }}>
      <Canvas camera={{ position: [0, 0.3, 4.5], fov: 35 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow/>
        <directionalLight position={[-3, 4, -2]} intensity={0.5}/>
        <pointLight position={[-2, 2, 3]} intensity={0.6} color="#3fb950"/>
        <pointLight position={[2, -1, 3]} intensity={0.3} color="#a855f7"/>
        <pointLight position={[0, 3, 2]} intensity={0.4} color="#00ffaa"/>
        <hemisphereLight intensity={0.4} groundColor="#1a1a2e"/>
        <RobotModel emotion={emotion} lookAtMouse={lookAtMouse} scale={scale}/>
        <AmbientParticles />
      </Canvas>
    </div>);
}
