
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-7xl font-bold text-green-700 mb-6">404</h1>
            <h2 className="text-3xl font-semibold text-green-800 mb-4">Halaman Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-8">
              Maaf, halaman yang Anda cari tidak ditemukan. Halaman mungkin telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
            </p>
            <Link
              to="/"
              className="btn-primary inline-block"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
