// src/app/resume/page.js
import React from 'react';
import { Divider } from '@nextui-org/react';

const ResumePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* Download Link */}
      <section className="mt-8">
        <a 
          href="/Nathan_Wakefield_Resume.pdf" 
          className="text-3xl text-blue-500 underline" 
          download
        >
          Download My Resume (PDF)
        </a>
      </section>

      <Divider className="my-4" />

      <h1 className="text-4xl font-bold mb-4">Nathan J. Wakefield</h1>
      <p className="text-lg mb-4">US Citizen | <a href="mailto:nathanjwakefield@gmail.com" className="text-blue-500">nathanjwakefield@gmail.com</a> | (562) 481-2028 | Long Beach, CA</p>

      <p className="text-lg mb-8">
        A passionate computer science undergraduate with a strong foundation in self-driven automation projects using Python. Automotive and 3D Printing hobbyist.
      </p>

      <Divider className="my-4" />

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <ul className="list-disc pl-5">
          <li>Python</li>
          <li>C++</li>
          <li>Automation</li>
          <li>Microsoft Excel</li>
          <li>Data Visualization</li>
          <li>Software Design</li>
          <li>Debugging</li>
          <li>NumPy</li>
          <li>Pandas</li>
          <li>MatPlotLib</li>
        </ul>
      </section>
      
      <Divider className="my-4" />

      {/* Work Experience Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Manager of Marketing and Social Media, DeLillo Chevrolet</h3>
          <p className="italic">Jan. 2021 – Present, Huntington Beach, CA</p>
          <ul className="list-disc pl-5">
            <li>Developed Python tooling to automate tasks, optimizing output.</li>
            <li>Performed data analysis using Excel’s visualization tools.</li>
            <li>Maintained backend price management software.</li>
            <li>Managed business marketing initiatives to drive sales and generate leads.</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold">3D Printing Technician, Self-Employed</h3>
          <p className="italic">June 2017 – Present, Long Beach, CA</p>
          <ul className="list-disc pl-5">
            <li>Printed and shipped prototypes across the US.</li>
            <li>Constructed CAD models using TinkerCAD and Fusion 360.</li>
            <li>Maintained 3D printers, including bed leveling and cleaning.</li>
            <li>Configured open-source tools to automate print jobs.</li>
          </ul>
        </div>
      </section>

      <Divider className="my-4" />

      {/* Project Experience Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Project Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">CSULB SAE Data Acquisitions Lead</h3>
          <ul className="list-disc pl-5">
            <li>Promoted use of GitHub for managing CAD, programming, and datasheets.</li>
            <li>Refactored programs for Arduinos and ESP32s.</li>
            <li>Interfaced with GPS, G-force, suspension height, and temperature sensors.</li>
            <li>Designed and 3D printed housings for data components.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Customer Review Request Automation</h3>
          <ul className="list-disc pl-5">
            <li>Automated data entry, saving 4+ hours weekly using Python and Selenium.</li>
            <li>Used NumPy for CSV manipulation and data preprocessing.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Photography and Videography Library Backup</h3>
          <ul className="list-disc pl-5">
            <li>Automated renaming and organizing over 2TB of multimedia files.</li>
            <li>Developed a duplicate detection algorithm using average per-pixel RGB values.</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold">Digital Quadrascopic Lenticular Camera</h3>
          <ul className="list-disc pl-5">
            <li>Designed and 3D printed a Quadrascopic Lenticular Camera body.</li>
            <li>Built a Python system to operate the camera and process photos.</li>
            <li>Used Raspberry PI to control 4 cameras simultaneously.</li>
          </ul>
        </div>
      </section>

      <Divider className="my-4" />

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div>
          <h3 className="text-xl font-bold">California State University, Long Beach</h3>
          <p className="italic">B.S. in Computer Science, August 2019 – December 2024</p>
          <p>Relevant Coursework: Databases, Programming Language Principles, Algorithms, Data Structures, Object-Oriented Design, Python, Software Design Principles</p>
        </div>
      </section>
    </div>
  );
};

export default ResumePage;
