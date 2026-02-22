import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Icosahedron } from "@react-three/drei";
// Floating animated sphere with distortion
function AnimatedSphere({ position, color, speed = 1, distort = 0.3 }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
        }
    });
    return (<Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} attach="material" distort={distort} speed={2} roughness={0.2} metalness={0.8}/>
      </Sphere>
    </Float>);
}
// Rotating torus ring
function AnimatedTorus({ position, color }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });
    return (<Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 32]} position={position}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.9} transparent opacity={0.8}/>
      </Torus>
    </Float>);
}
// Floating code blocks
function FloatingBox({ position, color, scale = 1 }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });
    return (<Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.2}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} transparent opacity={0.7}/>
      </Box>
    </Float>);
}
// Icosahedron with wireframe
function FloatingIcosahedron({ position, color }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
        }
    });
    return (<Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.9}>
      <Icosahedron ref={meshRef} args={[1, 0]} position={position}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} wireframe/>
      </Icosahedron>
    </Float>);
}
// Particle field background
function Particles({ count = 200 }) {
    const points = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, [count]);
    const pointsRef = useRef(null);
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });
    return (<points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3}/>
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#3fb950" transparent opacity={0.6} sizeAttenuation/>
    </points>);
}
// Main Hero 3D Scene
export function Hero3DScene() {
    return (<div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[10, 10, 5]} intensity={1}/>
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7"/>
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#3b82f6"/>
        
        {/* Main floating elements */}
        <AnimatedSphere position={[-3, 1.5, -2]} color="#3fb950" speed={0.8} distort={0.4}/>
        <AnimatedSphere position={[3.5, -1, -3]} color="#a855f7" speed={1.2} distort={0.3}/>
        <AnimatedTorus position={[2.5, 2, -4]} color="#3b82f6"/>
        <FloatingBox position={[-2.5, -1.5, -2]} color="#3fb950" scale={0.6}/>
        <FloatingBox position={[4, 0.5, -5]} color="#a855f7" scale={0.8}/>
        <FloatingIcosahedron position={[-4, 0, -4]} color="#3b82f6"/>
        <FloatingIcosahedron position={[0, -2, -3]} color="#3fb950"/>
        
        {/* Particle field */}
        <Particles count={300}/>
      </Canvas>
    </div>);
}
// Smaller 3D widget for cards/sections
export function Widget3D({ type = "sphere" }) {
    return (<div className="w-full h-full min-h-[200px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6}/>
        <directionalLight position={[5, 5, 5]} intensity={0.8}/>
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#a855f7"/>
        
        {type === "sphere" && <AnimatedSphere position={[0, 0, 0]} color="#3fb950" distort={0.5}/>}
        {type === "torus" && <AnimatedTorus position={[0, 0, 0]} color="#a855f7"/>}
        {type === "box" && <FloatingBox position={[0, 0, 0]} color="#3b82f6" scale={1.2}/>}
        {type === "icosahedron" && <FloatingIcosahedron position={[0, 0, 0]} color="#3fb950"/>}
      </Canvas>
    </div>);
}
// Code-themed 3D scene
export function CodeScene3D() {
    return (<div className="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4}/>
        <directionalLight position={[10, 10, 5]} intensity={1}/>
        <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={0.5} color="#3fb950"/>
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <group>
            {/* Stacked code blocks */}
            <Box args={[2.5, 0.3, 1.5]} position={[0, 0.8, 0]}>
              <meshStandardMaterial color="#3fb950" roughness={0.3} metalness={0.7}/>
            </Box>
            <Box args={[2.5, 0.3, 1.5]} position={[0, 0.3, 0]}>
              <meshStandardMaterial color="#a855f7" roughness={0.3} metalness={0.7}/>
            </Box>
            <Box args={[2.5, 0.3, 1.5]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color="#3b82f6" roughness={0.3} metalness={0.7}/>
            </Box>
            <Box args={[2.5, 0.3, 1.5]} position={[0, -0.7, 0]}>
              <meshStandardMaterial color="#3fb950" roughness={0.3} metalness={0.7} transparent opacity={0.7}/>
            </Box>
          </group>
        </Float>
        
        <Particles count={100}/>
      </Canvas>
    </div>);
}
