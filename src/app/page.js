"use client"; // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import { Divider } from "@nextui-org/divider";
import { Code } from '@nextui-org/code';
import './globals.css';
import { Progress } from '@nextui-org/progress';
import { Link } from '@nextui-org/link';
import { Center } from '@react-three/drei';

const HomePage = () => {
  // Array of phrases to rotate through
  const phrases = [
    'CSULB SAE Data Acquisitions Lead',
    'Software Developer',
    'Python & C Specialist',
    'Automation Enthusiast',
    'Data Visualization Specialist',
    '3D Printing Hobbyist',
    'Photography & Videography Enthusiast',
  ];

  const programmingLanguages = [
    {
      title: "Python",
      years: 5,
    },
    {
      title: "C++",
      years: 4,
    },
    {
      title: "C",
      years: 3,
    },
    {
      title: "JavaScript",
      years: 2,
    },
    {
      title: "SQL",
      years: 2,
    },
  ];

  const otherSkills = [
    "Automation",
    "Data Visualization",
    "Software Design",
    "Debugging",
    "Git",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Blender",
    "Fusion 360",
    "SolidWorks",
  ];

  const projectList = [
    {
      title: "CSULB SAE Data Acquisitions Lead",
      date: "April 2024 - Present",
      bullets: [
        'Managed GitHub projects for CAD, programming, and datasheets.',
        'Refactored programs for Arduinos and ESP32s.',
        'Designed an embedded system with GPS, G-force, and many other sensors.',
      ],
      link: "/projects/sensors",
      linkText: "View Schematic Information",
      isDisabled: false,
    },

    {
      title: "Quadroscoptic Lenticular Camera",
      date: "Developed December 2023 - January 2024",
      bullets: [
        'Inspiration from the Nishika 8000D 3D Film Camera.',
        'Used Fusion 360 to design the camera, Blender to animate the design.',
      ],
      link: "/projects/quadcam",
      linkText: "View Camera Details",
      isDisabled: false,
    },

    {
      title: "Customer Review Request Automation",
      date: "Developed January 2022 - April 2024",
      bullets: [
        'Automated data entry tasks, saving 4+ hours weekly with Python and Selenium.',
        'Utilized NumPy for CSV manipulation and data preprocessing.',
      ],
      link: "/projects/automation",
      linkText: "View Automation Details",
      isDisabled: true,
    },

    {
      title: "Photography and Videography Library Backup",
      date: "Developed August 2023 - October 2023 -- Still in Development",
      bullets: [
        'Automated organization of over 2TB of multimedia files.',
        'Implemented duplicate detection using average per-pixel RGB values.',
      ],
      link: "/projects/backup",
      linkText: "View Backup Details",
      isDisabled: true,
    },

    {
      title: "If you want to see more projects...",
      date: "",
      bullets: [
        'Check out the projects page for more information.',
      ],
      link: "/projects",
      linkText: "View More Projects",
      isDisabled: false,
    }
  ];

  // State to keep track of the current phrase
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true); // New state to control fade-in effect

  // Use effect to rotate phrases at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Start fading out
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFadeIn(true); // Fade back in after updating phrase
      }, 1000); // 1 second for fade-out duration
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 mb-8">
        <h1 className="text-5xl font-bold text-center">Nathan Wakefield</h1>
        {/* Rotating Text Line with Fade-in Effect */}
        <p className={`text-center mt-4 text-xl transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          {phrases[currentPhraseIndex]}
        </p>
      </div>

      {/* About Me Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-lg">
          Hello! My name is <Code color="primary" size="lg">Nate</Code> and I am a <Code color="primary" size="lg">Software Developer</Code>. Currently I am currently focused in embedded programming, but have experience with web development, automation, application development, as well as UI/UX.
        </p>
      </div>

      <Divider className="my-4" />

      {/* Current Position */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Current Position</h2>
        <p className="text-lg">
          Currently, I am <Code color="primary" size="lg">Lead of Data Acquisitions</Code> for the <Code color="primary" size="lg">CSULB SAE team</Code>. I am responsible for managing and creating the system used to collect data on different aspects of the car. This includes the design of the system, the programming of the system, and the data analysis of the system.
        </p>
        <div className="flex justify-center mb-8">
          <iframe src="https://lumalabs.ai/embed/00e72c99-0aed-4278-8cdc-ed1d8062331f?mode=slf&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false" width="750" height="350" frameborder="0" title="luma embed" className='items-center'></iframe>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Programming Languages Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Programming Languages</h2>
        <section>
          {programmingLanguages.map((language, index) => (
            <div
              key={index}
              className="flex items-center mb-2"
              style={{ gap: '1rem' }} // Adds consistent spacing between elements
            >
              <div className="w-40 text-2xl font-bold text-right">{language.title}</div> {/* Fixed width for titles */}
              <div className="flex-grow">
                <Progress
                  aria-label={language.title}
                  value={language.years}
                  maxValue="5"
                  color="primary"
                  size="sm"
                  className="w-full" // Ensures the progress bar takes the remaining space
                />
              </div>
              <div className="text-2xl">{language.years} years</div> {/* Consistent spacing */}
            </div>
          ))}
        </section>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Other Skills</h2>
        <div className="flex flex-wrap gap-4">
          {otherSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-center bg-gray-800 p-2 rounded">
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider className="my-4" />

      {/* Project Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Project Experience</h2>
        <div className="flex gap-6 overflow-x-auto">
          {projectList.map((project, index) => (
            <div
              key={index}
              className="min-w-[250px] max-w-sm border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{project.date}</p>
              <ul className="list-disc pl-5 text-sm mb-4">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <Link href={project.link} passHref legacyBehavior isDisabled={project.isDisabled}>
                <Code
                  color="primary"
                  size="lg"
                  className={project.isDisabled ? 'pointer-events-none text-gray-400' : ''}
                  style={{ cursor: project.isDisabled ? 'not-allowed' : 'pointer' }}
                >
                  {project.isDisabled ? 'Page coming Soon...' : project.linkText}
                </Code>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Divider className="my-4" />

      {/* Education Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div>
          <h3 className="text-xl font-bold">California State University, Long Beach</h3>
          <p className="italic">B.S. in Computer Science, August 2019 &#45; December 2024</p>
          <p>Relevant Coursework: Databases, Programming Language Principles, Algorithms, Data Structures, Object-Oriented Design, Python, Software Design Principles</p>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Work Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Relevant Work Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Manager of Marketing and Social Media, DeLillo Chevrolet</h3>
          <p className="italic">Jan. 2021 &#45; Present, Huntington Beach, CA</p>
          <ul className="list-disc pl-5">
            <li>Developed Python tooling to automate tasks, optimizing output.</li>
            <li>Performed data analysis using Excel&apos;s visualization tools.</li>
            <li>Maintained backend price management software.</li>
            <li>Managed business marketing initiatives to drive sales and generate leads.</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold">3D Printing Technician, Self-Employed</h3>
          <p className="italic">June 2017 &#45; Present, Long Beach, CA</p>
          <ul className="list-disc pl-5">
            <li>Created and shipped prototypes using CAD modeling and 3D printing.</li>
            <li>Maintained 3D printers and automated print job workflows.</li>
          </ul>
        </div>
      </div>




    </div>
  );
};

export default HomePage;
