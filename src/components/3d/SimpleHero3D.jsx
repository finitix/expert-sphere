import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, RoundedBox } from "@react-three/drei";
// Simple glowing orb
function GlowingOrb({ position, color, size = 1 }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });
    return (<Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} transparent opacity={0.9}/>
      </Sphere>
    </Float>);
}
// Floating code bracket
function CodeBracket({ position, color }) {
    const groupRef = useRef(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });
    return (<Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        {/* Left bracket */}
        <RoundedBox args={[0.15, 1.2, 0.1]} position={[-0.3, 0, 0]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.9}/>
        </RoundedBox>
        <RoundedBox args={[0.3, 0.15, 0.1]} position={[-0.22, 0.52, 0]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.9}/>
        </RoundedBox>
        <RoundedBox args={[0.3, 0.15, 0.1]} position={[-0.22, -0.52, 0]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.9}/>
        </RoundedBox>
        
        {/* Right bracket */}
        <RoundedBox args={[0.15, 1.2, 0.1]} position={[0.3, 0, 0]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.9}/>
        </RoundedBox>
        <RoundedBox args={[0.3, 0.15, 0.1]} position={[0.22, 0.52, 0]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.9}/>
        </RoundedBox>
        <RoundedBox args={[0.3, 0.15, 0.1]} position={[0.22, -0.52, 0]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.9}/>
        </RoundedBox>
      </group>
    </Float>);
}
// Simple floating cube
function FloatingCube({ position, color, size = 0.5 }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });
    return (<Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <RoundedBox ref={meshRef} args={[size, size, size]} position={position} radius={0.05}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.85} transparent opacity={0.85}/>
      </RoundedBox>
    </Float>);
}
// Simple ambient scene for hero - minimal and professional
export function SimpleHeroScene() {
    return (<div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4}/>
        <directionalLight position={[10, 10, 5]} intensity={0.8}/>
        <pointLight position={[-10, 5, -5]} intensity={0.3} color="#3fb950"/>
        <pointLight position={[10, -5, 5]} intensity={0.3} color="#a855f7"/>
        
        {/* Minimal floating elements */}
        <GlowingOrb position={[-5, 2, -3]} color="#3fb950" size={0.8}/>
        <GlowingOrb position={[5, -1.5, -4]} color="#a855f7" size={0.6}/>
        <FloatingCube position={[-4, -2, -2]} color="#3b82f6" size={0.5}/>
        <FloatingCube position={[4, 2.5, -3]} color="#3fb950" size={0.4}/>
        <CodeBracket position={[0, 3, -5]} color="#a855f7"/>
      </Canvas>
    </div>);
}
// Feature card 3D icons - meaningful tech representations
export function FeatureIcon3D({ type }) {
    return (<div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[5, 5, 5]} intensity={0.7}/>
        
        {type === "shield" && (<Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group scale={1.2}>
              {/* Shield shape */}
              <RoundedBox args={[1.2, 1.4, 0.2]} position={[0, 0.1, 0]} radius={0.1}>
                <meshStandardMaterial color="#3fb950" roughness={0.2} metalness={0.8}/>
              </RoundedBox>
              <RoundedBox args={[0.8, 0.15, 0.25]} position={[0, 0.2, 0.05]} radius={0.03}>
                <meshStandardMaterial color="#22c55e" roughness={0.3} metalness={0.7}/>
              </RoundedBox>
              <RoundedBox args={[0.15, 0.5, 0.25]} position={[0, -0.1, 0.05]} radius={0.03}>
                <meshStandardMaterial color="#22c55e" roughness={0.3} metalness={0.7}/>
              </RoundedBox>
            </group>
          </Float>)}
        
        {type === "lightning" && (<Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <group scale={1.1}>
              {/* Lightning bolt */}
              <RoundedBox args={[0.6, 0.2, 0.15]} position={[0.1, 0.5, 0]} rotation={[0, 0, -0.3]} radius={0.03}>
                <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.85}/>
              </RoundedBox>
              <RoundedBox args={[0.8, 0.2, 0.15]} position={[0, 0, 0]} radius={0.03}>
                <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.85}/>
              </RoundedBox>
              <RoundedBox args={[0.6, 0.2, 0.15]} position={[-0.1, -0.5, 0]} rotation={[0, 0, -0.3]} radius={0.03}>
                <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.85}/>
              </RoundedBox>
            </group>
          </Float>)}
        
        {type === "check" && (<Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
            <group scale={1.2}>
              {/* Checkmark in circle */}
              <Sphere args={[0.8, 32, 32]}>
                <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.8} transparent opacity={0.9}/>
              </Sphere>
              <RoundedBox args={[0.35, 0.12, 0.2]} position={[-0.15, -0.05, 0.6]} rotation={[0, 0, 0.7]} radius={0.03}>
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.5}/>
              </RoundedBox>
              <RoundedBox args={[0.6, 0.12, 0.2]} position={[0.15, 0.1, 0.6]} rotation={[0, 0, -0.5]} radius={0.03}>
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.5}/>
              </RoundedBox>
            </group>
          </Float>)}
      </Canvas>
    </div>);
}
