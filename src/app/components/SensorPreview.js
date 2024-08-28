// src/components/SensorPreview.js

"use client"; // Ensure this is a client component

import React from 'react';

const SensorPreview = () => {
  return (
    <div className="w-full h-48 bg-gray-200 flex items-center justify-center border-2 border-gray-300 rounded-md overflow-hidden">
      <img
        src="/images/projects/sensors/dash_parent_schematic.png"
        alt="Dash Parent Schematic"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default SensorPreview;