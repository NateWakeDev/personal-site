"use client";

import Link from 'next/link';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

const Header = () => {
  return (
    <nav className="bg-gray-800 p-2 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold flex items-center">
          <img src="/favicon.ico" alt="favicon" className="w-10 h-10 mr-2 inline-block" />
          <span>Nathan Wakefield</span>
        </Link>
        <div>
        
          <Link href="/Resume" className="text-white mr-4">
            Resume
          </Link>
          <Link href="/projects" className="text-white mr-4">
            Projects
          </Link>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
        
        </div>
      </div>
    </nav>
  );
};

export default Header;