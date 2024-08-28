// src/app/projects/sensors/page.js

import React from 'react';

const SensorsPage = () => {
  // Array of image objects with their source, alt text, and description
  const images = [
    {
      src: '/images/projects/sensors/dash_parent_schematic.png',
      alt: 'Dash Parent Schematic',
      description: 'This schematic shows the main ESP32 system used for the subsystem controls and recording, as well as the basic sensors.',
    },
    {
      src: '/images/projects/sensors/front_child_schematic.png',
      alt: 'Front Child Schematic',
      description: 'Front child schematic representing the ESP32 module handling the front suspension sensors as well as the two front break temperature sensors.',
    },
    {
      src: '/images/projects/sensors/mid_child_schematic.png',
      alt: 'Mid Child Schematic',
      description: 'This schematic details the mid-section ESP32 used for controlling and collecting data from many individual sensors. Such as; all 3 RTD temperature sensors, suspension height sensors for the rear left and right columns, and the rear brake temperature sensor.',
    },
    {
      src: '/images/projects/sensors/rear_child_schematic.png',
      alt: 'Rear Child Schematic',
      description: 'This schematic details the rear-section ESP32 used for controlling and collecting data from the input and output of the continuous variable transmission or CVT. This helps monitor the input and output RPMs as well as the belt slippage.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">ESP32 Systems - Schematics</h1>
      <p className="text-lg mb-8">
        Below are schematics showcasing the design and layout of different ESP32 systems involved in the project.
      </p>

      {/* Map over the images array to display each image with its heading and description */}
      {images.map((image, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{image.alt}</h2>
          <img src={image.src} alt={image.alt} className="w-1/2 h-auto mb-2 border-2 border-gray-300 rounded-md" />
          <p className="text-lg">{image.description}</p>
        </div>
      ))}
      <h1 className="text-4xl font-bold mb-4">ESP32 System Communication</h1>
      <p className="text-lg mb-8">
        All sensors communicate with each other using the ESPNOW protocol. This allows for low latency and high-speed communication between the ESP32 modules. The Front, Mid, and Rear ESP32s each receive data from their respective sensors and send it to the Dash ESP32. The Dash ESP32 then sends the data to the SD card. After recording, a computer will be used for processing.
      </p>
            <h1 className="text-4xl font-bold mb-4">
        You can see an example of how this will be post-processed <a href="/projects/suspension" className="text-blue-500 underline">here</a>.
      </h1>
    </div>
  );
};

export default SensorsPage;