// src/app/projects/page.js
"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import SuspensionPreview from '../components/SuspensionPreview'; // Adjust the path if needed

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">My Projects</h1>
      <p className="text-lg mb-8">
        Here are some of the projects I&apos;ve worked on. Click on a project to learn more.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Project preview box */}
        <Link href="/projects/suspension">
          <div className="border-2 border-gray-300 p-4 rounded-md cursor-pointer hover:border-gray-500">
            <div className="w-full h-48 bg-gray-200">
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
