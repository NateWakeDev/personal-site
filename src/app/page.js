// src/app/page.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome! My name's Nate :)</h1>
      <p className="text-lg">
        I am a software developer with a passion for all sorts of programming.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Current Project:</h2>
      <p className="text-lg">
        Currently, I am working on the embedded system for an SAE Baja vehicle.
      </p>
    </div>
  );
};

export default HomePage;
