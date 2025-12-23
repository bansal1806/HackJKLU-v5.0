import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface ModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  animate?: boolean;
  animationSpeed?: number;
}

export function Model({ 
  path, 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animate = false,
  animationSpeed = 1
}: ModelProps) {
  const { scene } = useGLTF(path);
  const meshRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid mutating the original
  const clonedScene = scene.clone();

  useFrame((state, delta) => {
    if (animate && meshRef.current) {
      meshRef.current.rotation.y += delta * animationSpeed;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

// Preload model for better performance
Model.preload = (path: string) => {
  useGLTF.preload(path);
};

