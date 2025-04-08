
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6" />
              <h3 className="text-xl font-bold text-white">Dinas Lingkungan Hidup</h3>
            </div>
            <p className="text-green-100 mb-4">
              Berkomitmen untuk menjaga kelestarian alam dan menciptakan lingkungan yang bersih, sehat, dan berkelanjutan bagi generasi masa depan.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-100 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/programs" className="text-green-100 hover:text-white transition-colors">Program</Link></li>
              <li><Link to="/education" className="text-green-100 hover:text-white transition-colors">Edukasi</Link></li>
              <li><Link to="/services" className="text-green-100 hover:text-white transition-colors">Layanan</Link></li>
              <li><Link to="/gallery" className="text-green-100 hover:text-white transition-colors">Galeri</Link></li>
              <li><Link to="/blog" className="text-green-100 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-green-100 hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-300 mt-0.5" />
                <span className="text-green-100">Jl. Lingkungan Hidup No. 123, Kota Hijau, Indonesia 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-300" />
                <span className="text-green-100">(021) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-300" />
                <span className="text-green-100">info@dinaslingkunganhidup.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} Dinas Lingkungan Hidup. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
