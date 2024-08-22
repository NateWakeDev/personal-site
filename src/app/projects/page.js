// src/app/projects/page.js
import React from 'react';
import Link from 'next/link';

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">My Projects</h1>
      <p className="text-lg mb-8">
        Here are some of the projects I&pos;ve worked on. Click on a project to learn more.
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-4">
          <Link href="/projects/suspension" className="text-blue-500 hover:underline">
            Suspension Simulation with Three.js
          </Link>
        </li>
        {/* Add more projects here */}
      </ul>
    </div>
  );
};

export default ProjectsPage;
