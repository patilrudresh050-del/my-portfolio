import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (mesh.current) { mesh.current.rotation.x += delta * 0.16; mesh.current.rotation.y += delta * 0.25; }
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.35, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.25, 0.025);
    state.camera.lookAt(0, 0, 0);
  });
  return <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.8}>
    <mesh ref={mesh}><icosahedronGeometry args={[1.18, 1]} /><meshStandardMaterial color="#6d5dfc" metalness={0.72} roughness={0.19} wireframe /></mesh>
    <mesh scale={0.72}><icosahedronGeometry args={[1.18, 1]} /><meshStandardMaterial color="#19d7d2" metalness={0.8} roughness={0.12} transparent opacity={0.22} /></mesh>
    <mesh rotation={[Math.PI / 2.6, 0.2, 0]}><torusGeometry args={[1.65, 0.012, 12, 120]} /><meshBasicMaterial color="#19d7d2" /></mesh>
    <mesh rotation={[0.7, Math.PI / 3, 0.2]}><torusGeometry args={[1.9, 0.009, 12, 120]} /><meshBasicMaterial color="#927cff" /></mesh>
  </Float>;
}
export default function Scene3D() {
  return <div className="scene-wrap" aria-label="Abstract animated 3D technology sculpture" role="img">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.65} /><pointLight position={[3, 3, 4]} intensity={35} color="#7868ff" /><pointLight position={[-3, -2, 2]} intensity={22} color="#18d8d1" />
      <Core /><Sparkles count={65} scale={5} size={2} speed={0.25} color="#b7c5ff" /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
    </Canvas>
  </div>;
}
