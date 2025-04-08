
import React from "react";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import ProgramCard from "@/components/ProgramCard";
import { Leaf, Tree, Earth, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const latestNews = [
  {
    id: "1",
    title: "Peluncuran Program Penanaman 1 Juta Pohon di Kota Hijau",
    date: "12 April 2025",
    excerpt: "Dinas Lingkungan Hidup meluncurkan program penanaman 1 juta pohon untuk meningkatkan ruang hijau dan kualitas udara di Kota Hijau.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    category: "Program",
  },
  {
    id: "2",
    title: "Workshop Pengelolaan Sampah Berkelanjutan untuk Masyarakat",
    date: "5 April 2025",
    excerpt: "Workshop pengelolaan sampah rumah tangga yang bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya pemilahan sampah.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    category: "Edukasi",
  },
  {
    id: "3",
    title: "Pengumuman Jadwal Pengambilan Sampah Khusus April 2025",
    date: "1 April 2025",
    excerpt: "Jadwal pengambilan sampah khusus untuk bulan April 2025 telah dirilis. Masyarakat diharapkan dapat menyesuaikan jadwal pembuangan sampah.",
    image: "https://images.unsplash.com/photo-1618477202872-2c23a6dd3818",
    category: "Pengumuman",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <HeroSection />

        {/* About Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                Tentang Dinas Lingkungan Hidup
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Dinas Lingkungan Hidup bertanggung jawab untuk melestarikan, melindungi, dan meningkatkan kualitas lingkungan hidup untuk kepentingan generasi sekarang dan masa depan. Kami berkomitmen untuk mewujudkan lingkungan yang bersih, sehat, dan berkelanjutan melalui berbagai program dan inisiatif yang melibatkan seluruh elemen masyarakat.
              </p>
              <Link
                to="/contact"
                className="bg-green-600 text-white hover:bg-green-700 font-medium py-3 px-6 rounded-md transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Program Unggulan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <ProgramCard
                id="1"
                title="Penghijauan Kota"
                description="Program penanaman pohon dan pengembangan taman kota untuk meningkatkan ruang terbuka hijau."
                icon={<Tree className="h-10 w-10" />}
                link="/programs/penghijauan-kota"
              />
              <ProgramCard
                id="2"
                title="Pengolahan Sampah"
                description="Sistem pengelolaan sampah terpadu melalui prinsip reduce, reuse, dan recycle."
                icon={<Leaf className="h-10 w-10" />}
                link="/programs/pengolahan-sampah"
              />
              <ProgramCard
                id="3"
                title="Konservasi Air"
                description="Perlindungan dan pemeliharaan sumber daya air untuk menjamin ketersediaan air bersih."
                icon={<Earth className="h-10 w-10" />}
                link="/programs/konservasi-air"
              />
              <ProgramCard
                id="4"
                title="Edukasi Lingkungan"
                description="Program pendidikan dan kampanye kesadaran tentang pentingnya menjaga lingkungan."
                icon={<Calendar className="h-10 w-10" />}
                link="/programs/edukasi-lingkungan"
              />
            </div>
            <div className="text-center mt-10">
              <Link
                to="/programs"
                className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
              >
                Lihat Semua Program
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Berita & Pengumuman Terbaru
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {latestNews.map((news) => (
                <NewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  date={news.date}
                  excerpt={news.excerpt}
                  image={news.image}
                  category={news.category}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/blog"
                className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
              >
                Lihat Semua Berita
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Bergabunglah dalam Misi Kami
              </h2>
              <p className="text-lg text-green-100 mb-8">
                Masa depan lingkungan ada di tangan kita semua. Mari berpartisipasi aktif dalam menjaga kelestarian alam untuk generasi mendatang.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <Link to="/services" className="bg-white text-green-700 hover:bg-green-100 font-medium py-3 px-6 rounded-md transition-colors">
                  Laporkan Masalah Lingkungan
                </Link>
                <Link to="/programs" className="bg-green-600 text-white hover:bg-green-800 font-medium py-3 px-6 rounded-md transition-colors border border-green-500">
                  Jelajahi Program Kami
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
