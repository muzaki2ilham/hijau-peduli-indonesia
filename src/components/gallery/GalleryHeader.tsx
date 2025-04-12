
import React from "react";

const GalleryHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Galeri</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Dokumentasi kegiatan dan kampanye lingkungan hidup yang telah dilaksanakan oleh Dinas Lingkungan Hidup.
      </p>
    </div>
  );
};

export default GalleryHeader;
