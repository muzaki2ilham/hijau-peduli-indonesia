
import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-green-700 overflow-hidden">
      <div className="hero-pattern absolute inset-0 opacity-10"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bersama Menjaga Lingkungan Untuk Masa Depan yang Lebih Baik
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Dinas Lingkungan Hidup berkomitmen untuk melestarikan alam dan menciptakan lingkungan yang bersih, sehat, dan berkelanjutan.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link to="/programs" className="bg-white text-green-700 hover:bg-green-100 font-medium py-3 px-6 rounded-md transition-colors">
              Lihat Program Kami
            </Link>
            <Link to="/services" className="bg-green-600 text-white hover:bg-green-800 font-medium py-3 px-6 rounded-md transition-colors border border-green-500">
              Laporkan Masalah Lingkungan
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ArrowDown className="h-6 w-6" />
      </div>
    </div>
  );
};

export default HeroSection;
