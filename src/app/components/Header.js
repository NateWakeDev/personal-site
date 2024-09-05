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
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="accordion-border items-center">
                Open Menu
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="About" className="accordion-border">
                <Link href="/about" className="text-white items-center">
                  About
                </Link>
              </DropdownItem>
              <DropdownItem key="Projects" className="accordion-border">
                <Link href="/projects" className="text-white items-center">
                  Projects
                </Link>
              </DropdownItem>
              <DropdownItem key="Contact" className="accordion-border items-center">
                <Link href="/contact" className="text-white items-center">
                  Contact
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Header;