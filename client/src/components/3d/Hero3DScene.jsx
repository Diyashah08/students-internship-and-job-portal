import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Central interactive 3D Core with organic distortion and glass-metallic reflections
const CentralCore = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} castShadow receiveShadow scale={1.35}>
        <icosahedronGeometry args={[1.3, 4]} />
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#1e1b4b"
          roughness={0.15}
          metalness={0.85}
          distort={0.42}
          speed={2.2}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
};

// Orbital Rings representing career growth paths and global opportunities
const OrbitalRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((_, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= delta * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, Math.PI / 3]}>
        <torusGeometry args={[2.7, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#9333ea"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, Math.PI / 2.5, -Math.PI / 5]}>
        <torusGeometry args={[3.1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </>
  );
};

// Floating skill nodes orbiting the core
const FloatingSkillNode = ({ position, color, shape = 'octahedron', speed = 2, scale = 0.35 }) => {
  const nodeRef = useRef();

  useFrame((_, delta) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.x += delta * 0.8;
      nodeRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={nodeRef} position={position} scale={scale}>
        {shape === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {shape === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
};

// Mouse follower / subtle responsive camera rig
const CameraRig = () => {
  useFrame((state) => {
    // Soft pointer tilt
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.8,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.8,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};


const Hero3DScene = () => {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.8]} // Optimized for Retina and mobile performance
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={1.2} color="#6366f1" />
        <pointLight position={[5, -5, 5]} intensity={1.5} color="#38bdf8" />

        {/* Ambient constellation sparkles */}
        <Sparkles count={45} scale={6.5} size={2.4} speed={0.4} color="#60a5fa" />

        {/* 3D Core & Orbital Paths */}
        <CentralCore />
        <OrbitalRings />

        {/* Floating Skill & Opportunity Spheres */}
        <FloatingSkillNode position={[-2.4, 1.5, 0.4]} color="#38bdf8" shape="octahedron" speed={3} scale={0.32} />
        <FloatingSkillNode position={[2.2, 1.6, -0.6]} color="#818cf8" shape="dodecahedron" speed={2.5} scale={0.35} />
        <FloatingSkillNode position={[-2.1, -1.5, 0.2]} color="#c084fc" shape="tetrahedron" speed={2.2} scale={0.3} />
        <FloatingSkillNode position={[2.4, -1.2, 0.8]} color="#34d399" shape="octahedron" speed={3.2} scale={0.34} />

        <CameraRig />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
