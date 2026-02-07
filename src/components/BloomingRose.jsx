import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ROSE_RED = new THREE.Color('#e91e63');
const ROSE_PINK = new THREE.Color('#ff69b4');
const ROSE_DEEP = new THREE.Color('#c71585');
const CENTER_COLOR = new THREE.Color('#f0c040');

function PetalLayer({ count, radius, tilt, bloom, layerIndex }) {
  const groupRef = useRef(null);
  const petals = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (layerIndex * 0.2);
      arr.push({ angle, color: i % 3 === 0 ? ROSE_RED : i % 3 === 1 ? ROSE_PINK : ROSE_DEEP });
    }
    return arr;
  }, [count, layerIndex]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.006;
  });

  return (
    <group ref={groupRef}>
      {petals.map(({ angle, color }, i) => {
        const closedRotX = -0.7;
        const openRotX = tilt;
        const rotX = closedRotX + (openRotX - closedRotX) * bloom;
        const scale = 0.25 + 0.75 * bloom;
        const px = Math.cos(angle) * radius * 0.5;
        const py = Math.sin(angle) * radius * 0.5;
        return (
          <group key={i} position={[px, py, 0]}>
            <mesh rotation={[rotX, angle, 0]} scale={[0.5, scale, scale]}>
              <coneGeometry args={[0.35, 0.45, 12]} />
              <meshStandardMaterial color={color} roughness={0.5} metalness={0.15} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function RoseCenter({ bloom }) {
  const meshRef = useRef(null);
  const scale = 0.15 + 0.1 * bloom;
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.02;
  });
  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={CENTER_COLOR} roughness={0.5} metalness={0.2} />
    </mesh>
  );
}

export default function BloomingRose({ bloom: targetBloom = 1, autoRotate = true }) {
  const groupRef = useRef(null);
  const [bloom, setBloom] = useState(0);

  useFrame((_, delta) => {
    setBloom((b) => b + (targetBloom - b) * Math.min(delta * 4, 0.12));
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      <RoseCenter bloom={bloom} />
      <PetalLayer count={5} radius={0.35} tilt={0.5} bloom={bloom} layerIndex={0} />
      <PetalLayer count={8} radius={0.5} tilt={0.7} bloom={bloom} layerIndex={1} />
      <PetalLayer count={10} radius={0.65} tilt={0.9} bloom={bloom} layerIndex={2} />
    </group>
  );
}
