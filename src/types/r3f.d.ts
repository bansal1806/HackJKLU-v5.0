import { extend, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Extend the catalog with Three.js objects
extend({ 
  Mesh: THREE.Mesh, 
  SphereGeometry: THREE.SphereGeometry, 
  MeshBasicMaterial: THREE.MeshBasicMaterial 
});

declare module '@react-three/fiber' {
  namespace JSX {
    interface IntrinsicElements {
      group: ThreeElements['group'];
      mesh: ThreeElements['mesh'];
      sphereGeometry: ThreeElements['sphereGeometry'];
      meshBasicMaterial: ThreeElements['meshBasicMaterial'];
      primitive: {
        object: any;
        [key: string]: any;
      };
    }
  }
}

