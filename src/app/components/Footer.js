import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white text-center py-4 mt-8">
    <p>© 2024 Nathan J. Wakefield. All rights reserved.</p>
    <div className="flex justify-center space-x-4 mt-2">
      <a href="https://www.linkedin.com/in/nathan-j-wakefield" className="hover:text-gray-400">
        LinkedIn
      </a>
      <a href="https://github.com/NateWakeDev" className="hover:text-gray-400">
        GitHub
      </a>
    </div>
  </footer>
);

export default Footer;