
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-800">Dinas Lingkungan Hidup</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="nav-link">Beranda</Link>
            <Link to="/programs" className="nav-link">Program</Link>
            <Link to="/education" className="nav-link">Edukasi</Link>
            <Link to="/services" className="nav-link">Layanan</Link>
            <Link to="/gallery" className="nav-link">Galeri</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Kontak</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-green-800 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="nav-link py-2" onClick={toggleMenu}>Beranda</Link>
              <Link to="/programs" className="nav-link py-2" onClick={toggleMenu}>Program</Link>
              <Link to="/education" className="nav-link py-2" onClick={toggleMenu}>Edukasi</Link>
              <Link to="/services" className="nav-link py-2" onClick={toggleMenu}>Layanan</Link>
              <Link to="/gallery" className="nav-link py-2" onClick={toggleMenu}>Galeri</Link>
              <Link to="/blog" className="nav-link py-2" onClick={toggleMenu}>Blog</Link>
              <Link to="/contact" className="nav-link py-2" onClick={toggleMenu}>Kontak</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
