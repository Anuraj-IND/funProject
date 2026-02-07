import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BloomingRose from './BloomingRose';
import './RoseScene.css';

function Scene({ bloom }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} />
      <pointLight position={[-2, 2, 2]} intensity={0.8} color="#ffb6c1" />
      <pointLight position={[2, -1, 2]} intensity={0.5} color="#ffe4ec" />
      <Suspense fallback={null}>
        <BloomingRose bloom={bloom} autoRotate />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={2}
        maxDistance={5}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

export default function RoseScene({ bloom = 1, className = '' }) {
  return (
    <div className={`rose-scene-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Scene bloom={bloom} />
      </Canvas>
    </div>
  );
}
