import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <h1 className="text-5xl font-bold text-center">Nathan J. Wakefield</h1>
        <p className="text-center mt-4 text-xl">Software Developer & Automation Enthusiast</p>
      </div>

      {/* Existing Content */}
      <h1 className="text-4xl font-bold mb-4">Welcome! My name&apos;s Nate :)</h1>
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