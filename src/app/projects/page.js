// src/app/projects/page.js
"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import SuspensionPreview from '../components/SuspensionPreview'; // Adjust the path if needed
import SensorPreview from '../components/SensorPreview';
import Loader from '../components/Loader';
import { Divider } from '@nextui-org/divider';


const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">My Projects</h1>
      <p className="text-lg mb-4">
        Here are some of the projects I&apos;ve worked on. Click on a project to learn more.
      </p>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* ESP32 System Preview */}
        <Link href="/projects/sensors">
          <div className="border-2 border-gray-300 p-4 rounded-md cursor-pointer hover:border-gray-500">
            <div className="w-full h-48 bg-gray-200">
              <SensorPreview /> {/* Using the SensorPreview component */}
            </div>
            <h3 className="mt-4 text-xl font-semibold">ESP32 System Schematics</h3>
          </div>
        </Link>

        {/* Suspension Model Preview */}
        <Link href="/projects/suspension">
          <div className="border-2 border-gray-300 p-4 rounded-md cursor-pointer hover:border-gray-500">
            <div className="w-full h-48 bg-gray-200">
              <Loader />
              <Canvas>
                <ambientLight intensity={0.75} />
                <directionalLight position={[0, 2, 10]} intensity={1} />
                <SuspensionPreview />
              </Canvas>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Suspension Simulation with Three.js</h3>
          </div>
        </Link>

        {/* Add more project preview boxes here */}

      </div>
    </div>
  );
};

export default ProjectsPage;
