// src/app/projects/sensors/page.js

import React from 'react';

const SensorsPage = () => {
  // Array of image objects with their source, alt text, and description
  const images = [
    {
      src: '/images/projects/sensors/dash_parent_schematic.png',
      alt: 'Dash Parent Schematic',
      description: 'Dash parent schematic representing the main ESP32 system used for the subsystem controls and recording, as well as the basic sensors.',
      list: [
        'First, the dash ESP32 with will wait until it has a signal from a GPS satellite. This will give the system a time reference.',
        'Then, the "send" flag will be sent to the children ESP32s to start sending data. The signal will be send 1/3 of a second after another to make sure that each module is not sending data at the same time (this is done round-robin style, so if a signal is not detected it will not hinder the data recording).',
        'As the data is received, it is written to the SD card. The data is written in a CSV format with a time stamp, sensor ID, and sensor data.',
        'In between this data being sent, the GPS and Accelerometer data is also being recorded.',
        'This component is the most important as it is the central hub for all the data. If a child fails, this will be able to replicate some of the data.',
        { text: 'Components used: ', isBold: true, rest: 'GPS (top-left, labeled: "gps"), Accelerometer (bottom-left), SD Card reader/writer (middle-right), and ESP32 (middle-left).' },
      ],
    },
    {
      src: '/images/projects/sensors/front_child_schematic.png',
      alt: 'Front Child Schematic',
      description: 'Front child schematic representing the ESP32 module handling the front suspension sensors as well as the two front break temperature sensors.',
      list: [
        'First, the front ESP32 will wait for a signal from the dash ESP32 to start sending and collecting data.',
        'The front ESP32 is responsible for collecting data from the front suspension height sensors and the front brake temperature sensors.',
        'The front ESP32 will then send this data to the dash ESP32.',
        { text: 'Components used: ', isBold: true, rest: '2 suspension height sensors (bottom-left, labeled: "aa-rot-120" -r and -l), 2 brake temperature sensors (top-middle, labeled: "brake-temp" -r and -l), and ESP32 (middle). Not-Pictured: logic level converter.'},
      ],
    },
    {
      src: '/images/projects/sensors/mid_child_schematic.png',
      alt: 'Mid Child Schematic',
      description: 'This schematic details the mid-section ESP32 used for controlling and collecting data from many individual sensors.',
      list: [
        'First, the mid ESP32 will wait for a signal from the dash ESP32 to start sending and collecting data.',
        'The mid ESP32 is responsible for collecting data from: 3 RTD temperature sensors, suspension height sensors for the rear left and right columns, and the rear brake temperature sensor.',
        'The mid ESP32 will then send this data to the dash ESP32.',
        { text: 'Components used: ', isBold: true, rest: '3 RTD temperature sensors (far-right, labeled as "oil-Breakout"), 2 suspension height sensors (top-left, labeled: "sus-height" r and l), 1 brake temperature sensor (bottom-left, labeled: "brake-temp" r and l), and logic level converter (middle-right, labeled: "logic converter"), ESP32 (middle-left).' },
      ],
    },
    {
      src: '/images/projects/sensors/rear_child_schematic.png',
      alt: 'Rear Child Schematic',
      description: 'This schematic details the rear-section ESP32 used for controlling and collecting the RPM.',
      list:[
        'First, the rear ESP32 will wait for a signal from the dash ESP32 to start sending and collecting data.',
        'The rear ESP32 is responsible for collecting data from the CVT input and output RPM sensors.',
        'The rear ESP32 will then send this data to the dash',
        { text: 'Components used: ', isBold: true, rest: '2 Hall-Effect RPM sensors (top-left, labeled: "hall-effect"), logic level converter (top-right, labeled: "logic-converter") and ESP32 (middle).'},
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Baja SAE ESP32 Systems</h1>
      <p className="text-lg mb-8">
        Below are schematics showcasing the design and layout of different ESP32 systems involved in the project.
      </p>
      <p className="text-lg mb-8">
      Keep in mind: Components that have 5v inputs and outputs are connected to a logic level converter to convert the signals from 5v to 3v as the ESP32 can only handle 3v for the input signals.
      </p>
      <h2 className="text-3xl font-semibold mb-4">Project Statement:</h2>
      <p className="text-lg mb-4">
        The goal of this project is to design a system that can collect data from various sensors on the Baja SAE vehicle. 
      </p>
      <h2 className="text-3xl font-semibold mb-4">Sensor Overview:</h2>
      <ul className="list-disc pl-5 mb-4">
        <li className="text-lg">GPS</li>
          <ul className="list-disc pl-5 mb-4">
            <li className="text-lg">This sensor will be used to determine the speed of the vehicle and the location of the vehicle. This will be helpful in determining the lap times, mapping the vehicle on the track. This also collects an accurate timestamp for the recording of each of the sensor readings.</li>
          </ul>
        <li className="text-lg">Accelerometer</li>
          <ul className="list-disc pl-5 mb-4">
            <li className="text-lg">This sensor will be used to determine the acceleration of the vehicle, as well as multi-axis rotation readings. This will be helpful in determining the G-forces that the driver is experiencing and will be helpful in tuning the suspension. This will also serve as redundancy in case something happens to the suspension potentiometers.</li>
          </ul>
        <li className="text-lg">Front and Rear Suspension Height Sensors</li>
          <ul className="list-disc pl-5 mb-4">
            <li className="text-lg">These sensors will be used to determine the suspension travel of the vehicle. We can use the collected data to tune the suspension and make sure it is not too soft or to hard.</li>
          </ul>
        <li className="text-lg">Front and Rear Brake Temperature Sensors</li>
          <ul className="list-disc pl-5 mb-4">
            <li className="text-lg">These sensors will be used to determine the temperature of the brakes. The rotors were designed in-house but manufactured elsewhere, so we need to see that the rotors are dissapating heat properly.</li>
          </ul>
        <li className="text-lg">RTD Temperature Sensors</li>
          <ul className="list-disc pl-5 mb-4">
            <li className="text-lg">These sensors will be used to determine the temperature of all of the different oils in the vehicle. Managing heat dissapation is very important in endurance racing.</li>
          </ul>
        <li className="text-lg">CVT Input and Output RPM Sensors</li>
          <ul className="list-disc pl-5 mb-4">
            <li className="text-lg">These sensors will be used to determine the RPM of the CVT input and output shafts. This will be helpful in determining the belt slip and will help in tuning the CVT later on.</li>
          </ul>
      </ul>

      <h2 className="text-3xl font-semibold mb-4">System Overview:</h2>

      {/* Map over the images array to display each image with its heading, description, and list */}
      {images.map((image, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{image.alt}</h2>
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full sm:w-3/4 md:w-1/2 h-auto mb-4 border-2 border-gray-300 rounded-md"
          />
          <p className="text-lg">{image.description}</p>
          {image.list && (
            <ul className="list-disc pl-5 mt-2">
              {image.list.map((item, itemIndex) => (
                <li key={itemIndex} className="text-lg">
                  {typeof item === 'string' ? (
                    item
                  ) : (
                    <>
                      <strong>{item.text}</strong>
                      {item.rest}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h1 className="text-4xl font-bold mb-4">ESP32 System Communication</h1>
      <p className="text-lg mb-8">
        All sensors communicate with each other using the ESPNOW protocol. This allows for low latency and high-speed communication between the ESP32 modules. As stated earlier: the Front, Mid, and Rear ESP32s each receive data from their respective sensors and send it to the Dash ESP32. The Dash ESP32 then sends the data to the SD card. After recording, a computer will be used for post-processing.
      </p>
      <h1 className="text-4xl font-bold mb-4">
        You can see an example of how this will be post-processed <a href="/projects/suspension" className="text-blue-500 underline">here</a>.
      </h1>
    </div>
  );
};

export default SensorsPage;