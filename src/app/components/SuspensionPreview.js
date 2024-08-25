// src/components/SuspensionPreview.js

"use client"; // Ensure this is a client component

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SuspensionPreview = () => {
  const { scene, animations } = useGLTF('/models/SAE-Baja-Suspension-Wheel.glb');
  const mixer = useRef();
  const action = useRef();

  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]);
      action.current.time = 5; // Pause the animation at 5 seconds
      action.current.play(); // This will not play continuously due to lack of update
    }
    // Scale up the model
    if (scene) {
      scene.scale.set(4, 4, 4); // Adjust the scaling factor as needed
      scene.position.set(-8, -8, 0); // Adjust position to bring model down and center it
    }
  }, [animations, scene]);

  useFrame(() => {
    if (mixer.current) {
      mixer.current.update(0); // No delta, keeping it paused at 5 seconds
    }
  });

  return <primitive object={scene} />;
};

export default SuspensionPreview;
