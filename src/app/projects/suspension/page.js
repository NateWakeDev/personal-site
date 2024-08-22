"use client"; // Ensure this is a client component

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function SuspensionModel({ currentBump, isPaused }) {
  const { scene, animations } = useGLTF('/models/SAE-Baja-Suspension-Wheel.glb');
  const mixer = useRef();
  const action = useRef();
  const jumpPhase = useRef(1);

  useEffect(() => {
    if (animations.length) {
      // Reset the mixer and action when the bump type changes
      if (mixer.current) mixer.current.stopAllAction();
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]);

      console.log("Animation Duration:", action.current.getClip().duration);

      if (currentBump === 'Normal') {
        action.current.time = 1; // Start at 1 seconds
        action.current.setLoop(THREE.LoopRepeat, Infinity); // Loop infinitely
        action.current.timeScale = 1; // Play at 1x speed
        action.current.play(); // Start playing the action
      } else if (currentBump === 'SmallBounce') {
        action.current.time = 5; // Start at 4 seconds
        action.current.setLoop(THREE.LoopOnce, 0); // Loop once, we'll manually control the ping-pong
        action.current.timeScale = 2; // Play at 2x speed
        action.current.play(); // Start playing the action
      } else if (currentBump === 'SharpBumps') {
        action.current.time = 4; // Start at 3 seconds
        action.current.setLoop(THREE.LoopOnce, 0); // Loop once, we'll manually control the ping-pong
        action.current.timeScale = 8; // Play at 8x speed
        action.current.play(); // Start playing the action
      } else if (currentBump === 'Jump') {
        action.current.time = 6; // Start at 5 seconds
        action.current.timeScale = 1; // Start by moving at 1x speed
        jumpPhase.current = 1; // Reset to Phase 1 of the jump sequence
        action.current.play(); // Start playing the action
      }
    }
  }, [animations, scene, currentBump]);

  useEffect(() => {
    if (action.current) {
      action.current.paused = isPaused;
    }
  }, [isPaused]);

  useFrame((state, delta) => {
    if (mixer.current && !isPaused) {
      const currentTime = action.current.time;

        if (currentBump === 'Normal') {
            // If the animation reaches 5 seconds, reverse the direction
            if (currentTime >= 9) {
                action.current.timeScale = -1; // Reverse at 1x speed
            }
            // If the animation goes back to 0 seconds, forward the direction
            if (currentTime <= 1) {
                action.current.timeScale = 1; // Forward at 1x speed
            }
        } else if (currentBump === 'SmallBounce') {
            // If the animation reaches 7 seconds, reverse the direction
            if (currentTime >= 7) {
            action.current.timeScale = -2; // Reverse at 2x speed
            }
            // If the animation goes back to 5 seconds, forward the direction
            if (currentTime <= 5) {
            action.current.timeScale = 2; // Forward at 2x speed
            }
        } else if (currentBump === 'SharpBumps') {
            // If the animation reaches 5 seconds, reverse the direction
            if (currentTime >= 6) {
            action.current.timeScale = -8; // Reverse at 8x speed
            }
            // If the animation goes back to 0 seconds, forward the direction
            if (currentTime <= 4) {
            action.current.timeScale = 8; // Forward at 8x speed
            }
        } else if (currentBump === 'Jump') {
            switch (jumpPhase.current) {
            case 1:
                // Phase 1: Move from 5s to 7s at 1x speed
                if (currentTime >= 7) {
                jumpPhase.current = 2;
                action.current.timeScale = -10; // Move super fast to 2s
                }
                break;
            case 2:
                // Phase 2: Drop to 2s at 10x speed
                if (currentTime <= 2) {
                jumpPhase.current = 3;
                action.current.timeScale = 10; // Move back to 5s at 10x speed
                }
                break;
            case 3:
                // Phase 3: Move back up to 5s at 10x speed
                if (currentTime >= 6) {
                jumpPhase.current = 1; // Go back to Phase 1 and repeat
                action.current.timeScale = 1; // Set speed back to 1x for Phase 1
                }
                break;
            default:
                break;
            }
        }

      mixer.current.update(delta);
    }
  });

  // Center and scale the model (adjust these values as necessary)
  scene.position.set(0, -5, 0);
  scene.scale.set(3, 3, 3); // Modify scale here if needed

  return <primitive object={scene} />;
}

export default function SuspensionProject() {
  const [currentBump, setCurrentBump] = useState('Normal'); // Default to Normal Mode
  const [isPaused, setIsPaused] = useState(false);

  const handleBumpChange = (bumpType) => {
    setCurrentBump(bumpType);
    setIsPaused(false); // Automatically resume the animation when a new bump is selected
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Suspension Simulation with Three.js</h1>
      <p className="text-lg mb-8">
        This project simulates the suspension system of a Baja car going over different types of bumps. Select a bump type below to start the simulation.
      </p>
      <div className="w-full h-96">
        <Canvas>
          <ambientLight intensity={0.75} />
          <directionalLight position={[0, 2, 10]} intensity={1} />
          <SuspensionModel currentBump={currentBump} isPaused={isPaused} />
          <OrbitControls />
        </Canvas>
      </div>
          <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => handleBumpChange('Normal')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Normal Mode
      </button>
      <button
        onClick={() => handleBumpChange('SmallBounce')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Slow RollingBounce
      </button>
      <button
        onClick={() => handleBumpChange('SharpBumps')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Washboard Road
      </button>
      <button
        onClick={() => handleBumpChange('Jump')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Jump
      </button>
      <button
        onClick={togglePause}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        {isPaused ? 'Resume' : 'Pause'} Animation
      </button>
    </div>
    </div>
  );
}
