// src/app/projects/quadcam/page.js
"use client"; // Ensure this is a client component

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Divider } from '@nextui-org/divider';
import { Switch } from '@nextui-org/switch';
import { Slider } from '@nextui-org/slider';
import { Image } from '@nextui-org/image';

function CameraModel({ isPausedCamera, sliderValueCamera, useSliderCamera }) {
    const { scene: sceneCamera, animations: animationsCamera } = useGLTF('../models/Quadroscopic_Camera_Whole.glb');
    const mixerCamera = useRef();
    const actionCamera = useRef();
  
    useEffect(() => {
      if (animationsCamera.length) {
        if (mixerCamera.current) mixerCamera.current.stopAllAction();
        mixerCamera.current = new THREE.AnimationMixer(sceneCamera);
        actionCamera.current = mixerCamera.current.clipAction(animationsCamera[0]);
  
        actionCamera.current.setLoop(THREE.LoopOnce, 0); // Prevents standard looping behavior
        actionCamera.current.clampWhenFinished = true; // Stops at the last frame
        actionCamera.current.play();
      }
    }, [animationsCamera, sceneCamera]);
  
    useEffect(() => {
      if (actionCamera.current) {
        actionCamera.current.paused = isPausedCamera;
      }
    }, [isPausedCamera]);
  
    useFrame((state, delta) => {
      if (mixerCamera.current && !isPausedCamera) {
        const currentTime = actionCamera.current.time;
  
        if (!useSliderCamera) {
          // Continuous forward play with seamless looping
          if (currentTime >= 9.99) {
            // Instead of resetting directly, smoothly transition the time to create fluidity
            actionCamera.current.time = 0.01 + (currentTime - 9.99); // Continuously loop back smoothly
          }
          actionCamera.current.timeScale = 1; // Ensure the animation always plays forward
          mixerCamera.current.update(delta);
        } else {
          // Slider control
          const animationDuration = actionCamera.current.getClip().duration;
          const newTime = (sliderValueCamera / 100) * animationDuration;
          actionCamera.current.time = newTime;
          mixerCamera.current.update(0);
        }
      }
    });
  
    return <primitive object={sceneCamera} />;
  }
  
function CameraExplodingModel({ isPausedExplodingCamera, sliderValueExplodingCamera, useSliderExplodingCamera }) {
    const { scene: sceneExplodingCamera, animations: animationsExplodingCamera } = useGLTF('../models/Quadroscopic_Camera_Exploding.glb');
    const mixerExplodingCamera = useRef();
    const actionExplodingCamera = useRef();

    useEffect(() => {
        if (animationsExplodingCamera.length) {
        if (mixerExplodingCamera.current) mixerExplodingCamera.current.stopAllAction();
        mixerExplodingCamera.current = new THREE.AnimationMixer(sceneExplodingCamera);
        actionExplodingCamera.current = mixerExplodingCamera.current.clipAction(animationsExplodingCamera[0]);

        actionExplodingCamera.current.setLoop(THREE.LoopOnce, 0); // Stop looping to use time control
        actionExplodingCamera.current.clampWhenFinished = true; // Hold the last frame when finished
        actionExplodingCamera.current.play();
        }
    }, [animationsExplodingCamera, sceneExplodingCamera]);

    useEffect(() => {
        if (actionExplodingCamera.current) {
        actionExplodingCamera.current.paused = isPausedExplodingCamera;
        }
    }, [isPausedExplodingCamera]);

    useFrame((state, delta) => {
        if (mixerExplodingCamera.current && !isPausedExplodingCamera) {
        const currentTimeExplodingCamera = actionExplodingCamera.current.time;

        if (!useSliderExplodingCamera) {
            // Continuous ping-pong play between 1 and 9 seconds
            if (currentTimeExplodingCamera >= 9) {
            actionExplodingCamera.current.timeScale = -1; // Reverse animation at 1x speed
            }
            if (currentTimeExplodingCamera <= 1) {
            actionExplodingCamera.current.timeScale = 1; // Forward animation at 1x speed
            }
        } else {
            // Slider: Control exact time based on sliderValueExplodingCamera
            const animationDuration = actionExplodingCamera.current.getClip().duration;
            const newTime = (sliderValueExplodingCamera / 100) * animationDuration;
            actionExplodingCamera.current.time = newTime;
            mixerExplodingCamera.current.update(0); // Update the mixer with the new time
        }

        mixerExplodingCamera.current.update(delta); // Always update the mixer
        }
    });

    return <primitive object={sceneExplodingCamera} />;
}
  
export default function QuadcamProject() {
    const [useSliderCamera, setUseSliderCamera] = useState(false);
    const [sliderValueCamera, setSliderValueCamera] = useState(50);
    const [isPausedCamera, setIsPausedCamera] = useState(false);

    const [useSliderExplodingCamera, setUseSliderExplodingCamera] = useState(false);
    const [sliderValueExplodingCamera, setSliderValueExplodingCamera] = useState(50);
    const [isPausedExplodingCamera, setIsPausedExplodingCamera] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Quadroscopic Camera Project</h1>
        <h2 className="text-2xl font-bold mt-4 mb-4"> Project Overview:</h2>
        <p className="text-lg mb-4">
            A while ago I found the video below on youtube, a quadroscopic camera that captures 4 photos simultaneously and then stitches them together to make a gif that has qualities of a 3D image. I thought it was a cool project and decided to recreate it. The model was created in Fusion360 and the animations were done in Blender. The model was then exported to a glb file and imported into this project using the react-three-fiber library. This is just a prototype and I plan to add more features and finish this project in the future.
        </p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/_aofxbH0elo?si=wYHZbxkoG7ACRu04" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p className="text-lg mt-4">
            Now to give you a summary of the video: The camera is based on the Nishika N8000, a 35mm film camera that captures 4 photos simultaneously. The film is then developed and the photos are stitched together to create a gif that has qualities of a 3D image. The creator of the video decided to recreate the camera using 3D printing and a raspberry pi. The camera captures 4 photos using 4 Arducams as well as an QuadArducam hat for the raspberry pi. The photos are then stitched together using a python script and the final gif is stored. A battery pack is used to power the cameras and pi.
        </p>

        <Divider className="my-4" />

        <h2 className="text-2xl font-bold mt-4 mb-4">How the Nishika 8000D Works:</h2>
            <Image src="/images/projects/quadcam/nishika-8000d.jpg" alt="Nishika 8000D Camera" className='w-full sm:w-3/4 md:w-1/2 h-auto' />
            <p className="text-lg mt-4 mb-4">
                The Nishika 8000D is a 35mm film camera that captures 4 photos simultaneously. The camera has 4 lenses and 4 shutters that are triggered at the same time.
            </p>
            <Image src="/images/projects/quadcam/nishika-8000d-x4.jpg" alt="Nishika 8000D Film Roll" className='w-full sm:w-3/4 md:w-1/2 h-auto' />
            <p className="text-lg mt-4 mb-4">
                The film is then developed and the photos are stitched together to create a gif that has qualities of a 3D image.
            </p>
            <Image src="/images/projects/quadcam/nishika-8000d-gif1.gif" alt="Nishika 8000D 3D Gif" className='w-full sm:w-3/4 md:w-1/2 h-auto' />

        <Divider className="my-4" />

        <h2 className="text-2xl font-bold mt-4">How can I recreate this?</h2>
        <p className="text-lg mt-4 mb-4">
            Well, it was a bit difficult trying to get everything to work with no reference whatsoever, but I was able to get some test footage out of it, and soon I will have it fully working. Credit to <a href='https://github.com/MarkCarsonDev' className="text-blue-500 underline">Mark Carson</a> for help with this project!
        </p>
        {/* Whole Camera Model */}
        <h2 className="text-2xl font-bold mb-4">360° Camera View</h2>
        <div className="w-full h-96">
        <Canvas
            camera={{
            position: [0, 5, 15], // Adjust these values to move the camera back and up
            fov: 50, // Field of view, adjust if you need more or less zoom
            }}
        >
            <ambientLight intensity={0.75} />
            <directionalLight position={[0, 2, 10]} intensity={1} />
            <CameraModel
            isPausedCamera={isPausedCamera}
            sliderValueCamera={sliderValueCamera}
            useSliderCamera={useSliderCamera}
            />
            <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
        </div>

        <div className="flex flex-col items-center justify-center my-4 gap-2">
            <Switch
            className="text-white"
            isSelected={useSliderCamera}
            onValueChange={(value) => {
                setUseSliderCamera(value);
                // Ensure actionCamera reference is updated when switching
                if (mixerCamera.current) {
                actionCamera.current.stop();
                actionCamera.current.reset();
                actionCamera.current.play();
                }
            }}
            color="primary"
            size="lg"
            />
            <p className="text-small text-default-500">
            Selected: {useSliderCamera ? "Manual" : "Rotate"}
            </p>
        </div>

        <button 
            onClick={() => setIsPausedCamera((prev) => !prev)} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 my-4"
        >
            {isPausedCamera ? 'Resume' : 'Pause'} Animation
        </button>

        {useSliderCamera && (
            <div className="flex flex-col items-center mt-4">
            <Slider
                label="Camera Control"
                step={1}
                maxValue={100}
                minValue={0}
                hideValue={true}
                value={sliderValueCamera}
                onChange={(value) => setSliderValueCamera(value)}
                className="max-w-md"
            />
            </div>
        )}

        <Divider className="my-8" />

        {/* Exploding Camera Model */}
        <h2 className="text-2xl font-bold mt-4 mb-4">Exploding Camera View</h2>
        <div className="w-full h-96">
        <Canvas
            camera={{
            position: [8, 8, 17], // Move the camera to the right while keeping the model centered
            fov: 50,
            }}
        >
            <ambientLight intensity={0.75} />
            <directionalLight position={[0, 2, 10]} intensity={1} />
            <CameraExplodingModel
            isPausedExplodingCamera={isPausedExplodingCamera}
            sliderValueExplodingCamera={sliderValueExplodingCamera}
            useSliderExplodingCamera={useSliderExplodingCamera}
            />
            <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
        </div>

        <div className="flex flex-col items-center justify-center my-4 gap-2">
            <Switch
            className="text-white"
            isSelected={useSliderExplodingCamera}
            onValueChange={(value) => {
                setUseSliderExplodingCamera(value);
                // Ensure actionExplodingCamera reference is updated when switching
                if (mixerExplodingCamera.current) {
                actionExplodingCamera.current.stop();
                actionExplodingCamera.current.reset();
                actionExplodingCamera.current.play();
                }
            }}
            color="primary"
            size="lg"
            />
            <p className="text-small text-default-500">
            Selected: {useSliderExplodingCamera ? "Manual" : "Auto"}
            </p>
        </div>

        <button 
            onClick={() => setIsPausedExplodingCamera((prev) => !prev)} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 my-4"
        >
            {isPausedExplodingCamera ? 'Resume' : 'Pause'} Animation
        </button>

        {useSliderExplodingCamera && (
            <div className="flex flex-col items-center mt-4">
            <Slider
                label="Exploded Camera Control"
                step={1}
                maxValue={100}
                minValue={0}
                hideValue={true}
                value={sliderValueExplodingCamera}
                onChange={(value) => setSliderValueExplodingCamera(value)}
                className="max-w-md"
            />
            </div>
        )}
        </div>
    );
}