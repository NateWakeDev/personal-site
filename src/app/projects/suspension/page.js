"use client"; // Ensure this is a client component

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function SuspensionModel({ currentBumpSuspension, isPausedSuspension }) {
  const { scene: sceneSuspension, animations: animationsSuspension } = useGLTF('../models/SAE-Baja-Suspension-Wheel.glb');
  const mixerSuspension = useRef();
  const actionSuspension = useRef();
  const jumpPhaseSuspension = useRef(1);

  useEffect(() => {
    if (animationsSuspension.length) {
      // Reset the mixer and action when the bump type changes
      if (mixerSuspension.current) mixerSuspension.current.stopAllAction();
      mixerSuspension.current = new THREE.AnimationMixer(sceneSuspension);
      actionSuspension.current = mixerSuspension.current.clipAction(animationsSuspension[0]);

      console.log("Animation Duration:", actionSuspension.current.getClip().duration);

      if (currentBumpSuspension === 'Normal') {
        actionSuspension.current.time = 1; // Start at 1 second
        actionSuspension.current.setLoop(THREE.LoopRepeat, Infinity); // Loop infinitely
        actionSuspension.current.timeScale = 1; // Play at 1x speed
        actionSuspension.current.play(); // Start playing the action
      } else if (currentBumpSuspension === 'SmallBounce') {
        actionSuspension.current.time = 5; // Start at 5 seconds
        actionSuspension.current.setLoop(THREE.LoopOnce, 0); // Loop once, manually control ping-pong
        actionSuspension.current.timeScale = 2; // Play at 2x speed
        actionSuspension.current.play(); // Start playing the action
      } else if (currentBumpSuspension === 'SharpBumps') {
        actionSuspension.current.time = 4; // Start at 4 seconds
        actionSuspension.current.setLoop(THREE.LoopOnce, 0); // Loop once, manually control ping-pong
        actionSuspension.current.timeScale = 8; // Play at 8x speed
        actionSuspension.current.play(); // Start playing the action
      } else if (currentBumpSuspension === 'Jump') {
        actionSuspension.current.time = 6; // Start at 6 seconds
        actionSuspension.current.timeScale = 1; // Start by moving at 1x speed
        jumpPhaseSuspension.current = 1; // Reset to Phase 1 of the jump sequence
        actionSuspension.current.play(); // Start playing the action
      }
    }
  }, [animationsSuspension, sceneSuspension, currentBumpSuspension]);

  useEffect(() => {
    if (actionSuspension.current) {
      actionSuspension.current.paused = isPausedSuspension;
    }
  }, [isPausedSuspension]);

  useFrame((state, delta) => {
    if (mixerSuspension.current && !isPausedSuspension) {
      const currentTimeSuspension = actionSuspension.current.time;

      if (currentBumpSuspension === 'Normal') {
        if (currentTimeSuspension >= 9) {
          actionSuspension.current.timeScale = -1; // Reverse at 1x speed
        }
        if (currentTimeSuspension <= 1) {
          actionSuspension.current.timeScale = 1; // Forward at 1x speed
        }
      } else if (currentBumpSuspension === 'SmallBounce') {
        if (currentTimeSuspension >= 7) {
          actionSuspension.current.timeScale = -2; // Reverse at 2x speed
        }
        if (currentTimeSuspension <= 5) {
          actionSuspension.current.timeScale = 2; // Forward at 2x speed
        }
      } else if (currentBumpSuspension === 'SharpBumps') {
        if (currentTimeSuspension >= 6) {
          actionSuspension.current.timeScale = -8; // Reverse at 8x speed
        }
        if (currentTimeSuspension <= 4) {
          actionSuspension.current.timeScale = 8; // Forward at 8x speed
        }
      } else if (currentBumpSuspension === 'Jump') {
        switch (jumpPhaseSuspension.current) {
          case 1:
            if (currentTimeSuspension >= 7) {
              jumpPhaseSuspension.current = 2;
              actionSuspension.current.timeScale = -10; // Move super fast to 2s
            }
            break;
          case 2:
            if (currentTimeSuspension <= 2) {
              jumpPhaseSuspension.current = 3;
              actionSuspension.current.timeScale = 10; // Move back to 5s at 10x speed
            }
            break;
          case 3:
            if (currentTimeSuspension >= 6) {
              jumpPhaseSuspension.current = 1;
              actionSuspension.current.timeScale = 1; // Set speed back to 1x for Phase 1
            }
            break;
          default:
            break;
        }
      }

      mixerSuspension.current.update(delta);
    }
  });

  if (sceneSuspension) {
    sceneSuspension.position.set(0, -5, 0);
    sceneSuspension.scale.set(3, 3, 3); // Modify scale here if needed
  }

  return <primitive object={sceneSuspension} />;
}

function SensorModel({ currentBumpSensor, isPausedSensor }) {
  const { scene: sceneSensor, animations: animationsSensor } = useGLTF('../models/sensor.glb');
  const mixerSensor = useRef();
  const actionSensor = useRef();
  const jumpPhaseSensor = useRef(1);

  useEffect(() => {
    if (animationsSensor.length) {
      if (mixerSensor.current) mixerSensor.current.stopAllAction();
      mixerSensor.current = new THREE.AnimationMixer(sceneSensor);
      actionSensor.current = mixerSensor.current.clipAction(animationsSensor[0]);

      console.log("Animation Duration:", actionSensor.current.getClip().duration);

      if (currentBumpSensor === 'Normal') {
        actionSensor.current.time = 1;
        actionSensor.current.setLoop(THREE.LoopRepeat, Infinity);
        actionSensor.current.timeScale = 1;
        actionSensor.current.play();
      } else if (currentBumpSensor === 'SmallBounce') {
        actionSensor.current.time = 5;
        actionSensor.current.setLoop(THREE.LoopOnce, 0);
        actionSensor.current.timeScale = 2;
        actionSensor.current.play();
      } else if (currentBumpSensor === 'SharpBumps') {
        actionSensor.current.time = 4;
        actionSensor.current.setLoop(THREE.LoopOnce, 0);
        actionSensor.current.timeScale = 8;
        actionSensor.current.play();
      } else if (currentBumpSensor === 'Jump') {
        actionSensor.current.time = 6;
        actionSensor.current.timeScale = 1;
        jumpPhaseSensor.current = 1;
        actionSensor.current.play();
      }
    }
  }, [animationsSensor, sceneSensor, currentBumpSensor]);

  useEffect(() => {
    if (actionSensor.current) {
      actionSensor.current.paused = isPausedSensor;
    }
  }, [isPausedSensor]);

  useFrame((state, delta) => {
    if (mixerSensor.current && !isPausedSensor) {
      const currentTimeSensor = actionSensor.current.time;

      if (currentBumpSensor === 'Normal') {
        if (currentTimeSensor >= 9) {
          actionSensor.current.timeScale = -1;
        }
        if (currentTimeSensor <= 1) {
          actionSensor.current.timeScale = 1;
        }
      } else if (currentBumpSensor === 'SmallBounce') {
        if (currentTimeSensor >= 7) {
          actionSensor.current.timeScale = -2;
        }
        if (currentTimeSensor <= 5) {
          actionSensor.current.timeScale = 2;
        }
      } else if (currentBumpSensor === 'SharpBumps') {
        if (currentTimeSensor >= 6) {
          actionSensor.current.timeScale = -8;
        }
        if (currentTimeSensor <= 4) {
          actionSensor.current.timeScale = 8;
        }
      } else if (currentBumpSensor === 'Jump') {
        switch (jumpPhaseSensor.current) {
          case 1:
            if (currentTimeSensor >= 7) {
              jumpPhaseSensor.current = 2;
              actionSensor.current.timeScale = -10;
            }
            break;
          case 2:
            if (currentTimeSensor <= 2) {
              jumpPhaseSensor.current = 3;
              actionSensor.current.timeScale = 10;
            }
            break;
          case 3:
            if (currentTimeSensor >= 6) {
              jumpPhaseSensor.current = 1;
              actionSensor.current.timeScale = 1;
            }
            break;
          default:
            break;
        }
      }

      mixerSensor.current.update(delta);
    }
  });

  if (sceneSensor) {
    sceneSensor.position.set(-15, -5, 0);
    sceneSensor.scale.set(1, 1, 1);
  }

  return <primitive object={sceneSensor} />;
}

export default function SuspensionProject() {
  const [cameraPosition, setCameraPosition] = useState([4, 10, 8]);
  const [currentBumpSuspension, setCurrentBumpSuspension] = useState('Normal');
  const [currentBumpSensor, setCurrentBumpSensor] = useState('Normal');
  const [isPausedSuspension, setIsPausedSuspension] = useState(false);
  const [isPausedSensor, setIsPausedSensor] = useState(false);

  const handleBumpChangeSuspension = (bumpType) => {
    setCurrentBumpSuspension(bumpType);
    setIsPausedSuspension(false);
  };

  const togglePauseSuspension = () => {
    setIsPausedSuspension((prev) => !prev);
  };

  const handleBumpChangeSensor = (bumpType) => {
    setCurrentBumpSensor(bumpType);
    setIsPausedSensor(false);
  };

  const togglePauseSensor = () => {
    setIsPausedSensor((prev) => !prev);
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
          <SuspensionModel currentBumpSuspension={currentBumpSuspension} isPausedSuspension={isPausedSuspension} />
          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={() => handleBumpChangeSuspension('Normal')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Normal</button>
        <button onClick={() => handleBumpChangeSuspension('SmallBounce')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Slow Rolling</button>
        <button onClick={() => handleBumpChangeSuspension('SharpBumps')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Washboard Road</button>
        <button onClick={() => handleBumpChangeSuspension('Jump')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Jump</button>
        <button onClick={togglePauseSuspension} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">{isPausedSuspension ? 'Resume' : 'Pause'} Animation</button>
      </div>

      <h2 className="text-4xl font-bold mt-8 mb-4">At the moment, this is only a simulation, not based on any sort of data! (This feature is coming soon :)</h2>
      <h1 className="text-4xl font-bold mb-4">How the sensor works:</h1>
      <p className="text-lg mb-8">
        The sensor is a device that measures the angle of the suspension arm relative to the body of the vehicle. It sends this data to the microcontroller, which then logs the data.
      </p>

      {/* Second Sensor Model Section */}
      <div className="w-full h-96">
        <Canvas camera={{ position: cameraPosition }}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[2, 4, 10]} intensity={1} />
          <SensorModel currentBumpSensor={currentBumpSensor} isPausedSensor={isPausedSensor} />
          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={() => handleBumpChangeSensor('Normal')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Normal Sensor</button>
        <button onClick={() => handleBumpChangeSensor('SmallBounce')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Slow Rolling Sensor</button>
        <button onClick={() => handleBumpChangeSensor('SharpBumps')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Washboard Road Sensor</button>
        <button onClick={() => handleBumpChangeSensor('Jump')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Jump Sensor</button>
        <button onClick={togglePauseSensor} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">{isPausedSensor ? 'Resume' : 'Pause'} Sensor Animation</button>
      </div>

      <p className="text-lg">
        The sensor is a rotary potentiometer, the voltage output of which is proportional to the angle of the suspension arm. The microcontroller reads this voltage and converts it to an angle.
      </p>
      
    </div>
  );
}
