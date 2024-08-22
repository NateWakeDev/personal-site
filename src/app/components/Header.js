// src/app/components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Nathan Wakefield
        </Link>
        <div>
          <Link href="/about" className="text-white mr-4">
            About
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
