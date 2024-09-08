// src/app/projects/suspension/page.js
"use client"; // Ensure this is a client component

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import Loader from '../../components/Loader';
import { Divider, Switch, Slider } from '@nextui-org/react';

function SuspensionModel({ currentBumpSuspension, isPausedSuspension, sliderValueSuspension, useSliderSuspension }) {
  const { scene: sceneSuspension, animations: animationsSuspension } = useGLTF('../models/SAE-Baja-Suspension-Wheel.glb');
  const mixerSuspension = useRef();
  const actionSuspension = useRef();
  const jumpPhaseSuspension = useRef(1);

  useEffect(() => {
    if (animationsSuspension.length) {
      if (mixerSuspension.current) mixerSuspension.current.stopAllAction();
      mixerSuspension.current = new THREE.AnimationMixer(sceneSuspension);
      actionSuspension.current = mixerSuspension.current.clipAction(animationsSuspension[0]);

      actionSuspension.current.setLoop(THREE.LoopOnce, 0); // Stop looping to use time control
      actionSuspension.current.clampWhenFinished = true; // Hold the last frame when finished
      actionSuspension.current.play();
    }
  }, [animationsSuspension, sceneSuspension]);

  useEffect(() => {
    if (actionSuspension.current) {
      actionSuspension.current.paused = isPausedSuspension;
    }
  }, [isPausedSuspension]);

  useFrame((state, delta) => {
    if (mixerSuspension.current && !isPausedSuspension) {
      const currentTimeSuspension = actionSuspension.current.time;
  
      if (!useSliderSuspension) {
        // Default: Using buttons (timeScale-based control)
        // Adjust time scale and animation behavior based on current bump suspension type
        if (currentBumpSuspension === 'Normal') {
          if (currentTimeSuspension >= 9) {
            actionSuspension.current.timeScale = -1; // Reverse animation at 1x speed
          }
          if (currentTimeSuspension <= 1) {
            actionSuspension.current.timeScale = 1; // Forward animation at 1x speed
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
      } else {
        // Slider: Control exact time based on sliderValueSuspension
        const animationDuration = actionSuspension.current.getClip().duration;
        const newTime = (sliderValueSuspension / 100) * animationDuration;
        actionSuspension.current.time = newTime;
        mixerSuspension.current.update(0); // Update the mixer
      }
  
      mixerSuspension.current.update(delta); // Always update the mixer
    }
  });
  

  if (sceneSuspension) {
    sceneSuspension.position.set(-5, -5, 0);
    sceneSuspension.scale.set(3, 3, 3); // Modify scale here if needed
  }

  return <primitive object={sceneSuspension} />;
}


function SensorModel({ currentBumpSensor, isPausedSensor, sliderValueSensor, useSliderSensor }) {
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
        actionSensor.current.timeScale = sliderValueSensor / 50; // Adjust with slider value
        actionSensor.current.play();
      } else if (currentBumpSensor === 'SmallBounce') {
        actionSensor.current.time = 5;
        actionSensor.current.setLoop(THREE.LoopOnce, 0);
        actionSensor.current.timeScale = sliderValueSensor / 50; // Adjust with slider value
        actionSensor.current.play();
      } else if (currentBumpSensor === 'SharpBumps') {
        actionSensor.current.time = 4;
        actionSensor.current.setLoop(THREE.LoopOnce, 0);
        actionSensor.current.timeScale = sliderValueSensor / 50; // Adjust with slider value
        actionSensor.current.play();
      } else if (currentBumpSensor === 'Jump') {
        actionSensor.current.time = 6;
        actionSensor.current.timeScale = sliderValueSensor / 50; // Adjust with slider value
        jumpPhaseSensor.current = 1;
        actionSensor.current.play();
      }
    }
  }, [animationsSensor, sceneSensor, currentBumpSensor, sliderValueSensor]);

  useEffect(() => {
    if (actionSensor.current) {
      actionSensor.current.paused = isPausedSensor;
    }
  }, [isPausedSensor]);

  useFrame((state, delta) => {
    if (mixerSensor.current && !isPausedSensor) {
      const currentTimeSensor = actionSensor.current.time;
  
      if (!useSliderSensor) {
        // Default: Using buttons (timeScale-based control)
        if (currentBumpSensor === 'Normal') {
          if (currentTimeSensor >= 9) {
            actionSensor.current.timeScale = -1; // Reverse animation at 1x speed
          }
          if (currentTimeSensor <= 1) {
            actionSensor.current.timeScale = 1; // Forward animation at 1x speed
          }
        } else if (currentBumpSensor === 'SmallBounce') {
          if (currentTimeSensor >= 7) {
            actionSensor.current.timeScale = -2; // Reverse at 2x speed
          }
          if (currentTimeSensor <= 5) {
            actionSensor.current.timeScale = 2; // Forward at 2x speed
          }
        } else if (currentBumpSensor === 'SharpBumps') {
          if (currentTimeSensor >= 6) {
            actionSensor.current.timeScale = -8; // Reverse at 8x speed
          }
          if (currentTimeSensor <= 4) {
            actionSensor.current.timeScale = 8; // Forward at 8x speed
          }
        } else if (currentBumpSensor === 'Jump') {
          switch (jumpPhaseSensor.current) {
            case 1:
              if (currentTimeSensor >= 7) {
                jumpPhaseSensor.current = 2;
                actionSensor.current.timeScale = -10; // Move super fast to 2s
              }
              break;
            case 2:
              if (currentTimeSensor <= 2) {
                jumpPhaseSensor.current = 3;
                actionSensor.current.timeScale = 10; // Move back to 5s at 10x speed
              }
              break;
            case 3:
              if (currentTimeSensor >= 6) {
                jumpPhaseSensor.current = 1;
                actionSensor.current.timeScale = 1; // Set speed back to 1x for Phase 1
              }
              break;
            default:
              break;
          }
        }
      } else {
        // Slider: Control exact time based on sliderValueSensor
        const animationDuration = actionSensor.current.getClip().duration; // Get animation duration
        const newTime = (sliderValueSensor / 100) * animationDuration; // Map slider (0-100) to animation time (0-10s)
        actionSensor.current.time = newTime; // Set animation to the new time
        mixerSensor.current.update(0); // Update the mixer with the new time
      }
  
      mixerSensor.current.update(delta); // Always update the mixer
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

  const [useSliderSuspension, setUseSliderSuspension] = useState(false);
  const [sliderValueSuspension, setSliderValueSuspension] = useState(0);
  
  const [useSliderSensor, setUseSliderSensor] = useState(false);
  const [sliderValueSensor, setSliderValueSensor] = useState(0);

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

  const handleSliderChangeSuspension = (event) => {
    setSliderValueSuspension(event.target.value);
  }

  const handleSliderChangeSensor = (event) => {
    setSliderValueSensor(event.target.value);
  }

  {/* Slider for Suspension */}
  <input
    type="range"
    min="0"
    max="100"
    value={sliderValueSuspension}
    onChange={handleSliderChangeSuspension} // Here is where it's used
    className="w-full md:w-1/2"
  />

  {/* Slider for Sensor */}
  <input
    type="range"
    min="0"
    max="100"
    value={sliderValueSensor}
    onChange={handleSliderChangeSensor} // Here is where it's used
    className="w-full md:w-1/2"
  />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Suspension Simulation with Three.js</h1>
      <p className="text-lg mb-8">
        This project simulates the suspension system of a Baja car going over different types of bumps. Select a bump type below to start the simulation.
      </p>
      <Divider className="my-4" />
      <p className="text-3xl font-bold mt-8 mb-8">At the moment, this is only a simulation, not based on any sort of data! (This feature is coming soon :)</p>
      
      <Divider className="my-4" />

      {/* Suspension Model */}
      <div className="w-full h-96">
        <h2 className="text-4xl font-bold mt-4 mb-4">Front Suspension Simulation</h2>
          <Canvas>
            <ambientLight intensity={0.75} />
            <directionalLight position={[0, 2, 10]} intensity={1} />
            <SuspensionModel 
              currentBumpSuspension={currentBumpSuspension} 
              isPausedSuspension={isPausedSuspension} 
              sliderValueSuspension={sliderValueSuspension} // Pass slider value here
              useSliderSuspension={useSliderSuspension} // Pass slider toggle state here
            />
            <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
          </Canvas>
      </div>

      {/* Switch to toggle between buttons and slider for suspension */}
      <div className="flex flex-col items-center justify-center my-4 gap-2">
        <Switch
          className="text-white"
          isSelected={useSliderSuspension} // Use the state for toggle
          onValueChange={(value) => {
            setUseSliderSuspension(value); // Handle the state change
            // Restart the suspension animation
            if (actionSuspension.current) {
              actionSuspension.current.stop(); // Stop the current animation
              actionSuspension.current.reset(); // Reset the animation
              actionSuspension.current.play(); // Play the animation from the start
            }
          }}
          color="primary"
          size="md"
        >
          Suspension Control
        </Switch>
        <p className="text-small text-default-500">
          Selected: {useSliderSuspension ? "Slider" : "Buttons"}
        </p>
      </div>



      {/* Responsive button container for Suspension - shown if buttons are used */}
      {!useSliderSuspension ? (
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          <button 
            onClick={() => handleBumpChangeSuspension('Normal')} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Normal
          </button>
          <button 
            onClick={() => handleBumpChangeSuspension('SmallBounce')} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Slow Rolling
          </button>
          <button 
            onClick={() => handleBumpChangeSuspension('SharpBumps')} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Washboard Road
          </button>
          <button 
            onClick={() => handleBumpChangeSuspension('Jump')} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Jump
          </button>
          <button 
            onClick={togglePauseSuspension} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            {isPausedSuspension ? 'Resume' : 'Pause'} Animation
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <Slider
            label="Suspension Control"
            step={1} // Adjust for precision
            maxValue={90} // Set the max value you need
            minValue={1} // Set the min value you need
            hideValue={true}
            value={sliderValueSuspension} // Bind slider to value state
            onChange={(value) => setSliderValueSuspension(value)} // Update slider value
            className="max-w-md"
          />
        </div>
      )}

      <Divider className="my-4" />

      <h1 className="text-4xl font-bold mb-4">How the sensor works:</h1>
      <p className="text-lg mb-8">
        The sensor is a device that measures the angle of the suspension arm relative to the body of the vehicle. It sends this data to the microcontroller, which then logs the data.
      </p>

      {/* Sensor Sensor Model */}
      <div className="w-full h-96">
        <Canvas camera={{ position: cameraPosition }}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[2, 4, 10]} intensity={1} />
          <SensorModel 
            currentBumpSensor={currentBumpSensor}
            isPausedSensor={isPausedSensor}
            sliderValueSensor={sliderValueSensor}
            useSliderSensor={useSliderSensor} // Ensure this is passed correctly
          />

          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Switch to toggle between buttons and slider for sensor */}
      <div className="flex flex-col items-center justify-center my-4 gap-2">
        <Switch
          className="text-white"
          isSelected={useSliderSensor} // Use the state for toggle
          onValueChange={(value) => {
            setUseSliderSensor(value); // Handle the state change
            // Restart the sensor animation
            if (actionSensor.current) {
              actionSensor.current.stop(); // Stop the current animation
              actionSensor.current.reset(); // Reset the animation
              actionSensor.current.play(); // Play the animation from the start
            }
          }}
          color="primary"
          size="md"
        >
          Sensor Control
        </Switch>
        <p className="text-small text-default-500">
          Selected: {useSliderSensor ? "Slider" : "Buttons"}
        </p>
      </div>



      {/* Responsive button container for Sensor or Slider depending on switch */}
      {!useSliderSensor ? (
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          <button 
            onClick={() => handleBumpChangeSensor('Normal')} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Normal Sensor
          </button>
          <button 
            onClick={() => handleBumpChangeSensor('SmallBounce')} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Slow Rolling Sensor
          </button>
          <button 
            onClick={() => handleBumpChangeSensor('SharpBumps')} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Washboard Road Sensor
          </button>
          <button 
            onClick={() => handleBumpChangeSensor('Jump')} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Jump Sensor
          </button>
          <button 
            onClick={togglePauseSensor} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            {isPausedSensor ? 'Resume' : 'Pause'} Sensor Animation
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <Slider
            label="Control Sensor"
            step={1} // Adjust this to match the desired precision
            maxValue={90} // Set the max value you need
            minValue={1} // Set the min value you need
            hideValue={true}
            value={sliderValueSensor} // Bind slider to value state
            onChange={(value) => setSliderValueSensor(value)} // Update slider value
            className="max-w-md"
          />
        </div>
      )}

      
      <p className="text-lg mb-8 mt-8">
        The sensor is a rotary potentiometer, the voltage output of which is proportional to the angle of the suspension arm. The microcontroller reads this voltage and converts it to an angle.
      </p>
    </div>
  );
}
