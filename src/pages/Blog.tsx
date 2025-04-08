
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { Search } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Mengenal Lebih Dekat Tentang Keanekaragaman Hayati Indonesia",
    date: "10 April 2025",
    author: "Dr. Budi Santoso",
    excerpt: "Indonesia dikenal sebagai salah satu negara dengan keanekaragaman hayati tertinggi di dunia. Artikel ini membahas tentang kekayaan flora dan fauna Indonesia serta pentingnya upaya konservasi.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    category: "Keanekaragaman Hayati",
  },
  {
    id: "2",
    title: "5 Cara Mudah Menerapkan Gaya Hidup Ramah Lingkungan",
    date: "8 April 2025",
    author: "Ani Wijaya",
    excerpt: "Gaya hidup ramah lingkungan bukan lagi sekadar tren, tetapi kebutuhan untuk menjaga kelestarian bumi. Simak 5 langkah sederhana yang bisa Anda terapkan dalam kehidupan sehari-hari.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    category: "Gaya Hidup",
  },
  {
    id: "3",
    title: "Dampak Perubahan Iklim pada Ekosistem Pesisir Indonesia",
    date: "5 April 2025",
    author: "Prof. Dian Purnama",
    excerpt: "Perubahan iklim tidak hanya berdampak pada kenaikan suhu global, tetapi juga mengancam keberlangsungan ekosistem pesisir. Artikel ini mengulas dampak dan upaya mitigasi yang perlu dilakukan.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "Perubahan Iklim",
  },
  {
    id: "4",
    title: "Inovasi Teknologi dalam Pengelolaan Sampah Perkotaan",
    date: "2 April 2025",
    author: "Ir. Hendra Gunawan",
    excerpt: "Teknologi modern menawarkan solusi inovatif untuk mengatasi masalah sampah perkotaan. Artikel ini membahas beberapa teknologi terbaru yang diterapkan di berbagai kota di Indonesia.",
    image: "https://images.unsplash.com/photo-1618477202872-2c23a6dd3818",
    category: "Teknologi Lingkungan",
  },
  {
    id: "5",
    title: "Pentingnya Pendidikan Lingkungan Hidup Sejak Dini",
    date: "30 Maret 2025",
    author: "Dewi Susanti, M.Pd",
    excerpt: "Menanamkan kesadaran lingkungan sejak dini adalah kunci untuk membentuk generasi yang peduli terhadap lingkungan. Artikel ini mengulas pentingnya pendidikan lingkungan untuk anak-anak.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    category: "Pendidikan",
  },
  {
    id: "6",
    title: "Menjelajahi Taman Nasional Indonesia: Keindahan yang Harus Dijaga",
    date: "25 Maret 2025",
    author: "Rudi Hartono",
    excerpt: "Indonesia memiliki berbagai taman nasional dengan keindahan alam yang menakjubkan. Artikel ini mengajak pembaca menjelajahi beberapa taman nasional terbaik di Indonesia.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Konservasi",
  },
  {
    id: "7",
    title: "Kisah Sukses: Komunitas Peduli Lingkungan di Desa Hijau",
    date: "20 Maret 2025",
    author: "Siti Rahma",
    excerpt: "Sebuah desa kecil berhasil mengubah wajahnya menjadi desa hijau berkat inisiatif komunitas lokal. Artikel ini mengulas perjalanan dan pelajaran yang bisa diambil dari kisah sukses tersebut.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    category: "Komunitas",
  },
  {
    id: "8",
    title: "Pemanfaatan Energi Terbarukan di Indonesia: Potensi dan Tantangan",
    date: "15 Maret 2025",
    author: "Dr. Eko Prasetyo",
    excerpt: "Indonesia memiliki potensi besar untuk pengembangan energi terbarukan. Artikel ini membahas berbagai jenis energi terbarukan yang potensial dikembangkan di Indonesia.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    category: "Energi Terbarukan",
  },
];

const categories = [
  "Semua Kategori",
  "Keanekaragaman Hayati",
  "Gaya Hidup",
  "Perubahan Iklim",
  "Teknologi Lingkungan",
  "Pendidikan",
  "Konservasi",
  "Komunitas",
  "Energi Terbarukan",
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Semua Kategori" || 
                           post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Artikel dan informasi terkini tentang isu-isu lingkungan hidup, kegiatan Dinas Lingkungan Hidup, dan kontribusi dari ahli lingkungan.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari artikel..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <NewsCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    image={post.image}
                    category={post.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada artikel yang ditemukan</h3>
                <p className="text-gray-500">Coba gunakan kata kunci atau kategori yang berbeda</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Authors */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Penulis Kami
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Para ahli dan praktisi lingkungan yang berkontribusi dalam artikel blog
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Dr. Budi Santoso</h3>
                <p className="text-gray-500 text-sm mb-3">Ahli Keanekaragaman Hayati</p>
                <p className="text-gray-600 text-sm">
                  Peneliti dengan lebih dari 15 tahun pengalaman dalam konservasi keanekaragaman hayati Indonesia.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Prof. Dian Purnama</h3>
                <p className="text-gray-500 text-sm mb-3">Pakar Perubahan Iklim</p>
                <p className="text-gray-600 text-sm">
                  Profesor di Universitas Lingkungan dengan fokus penelitian pada dampak perubahan iklim di kawasan tropika.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Ir. Hendra Gunawan</h3>
                <p className="text-gray-500 text-sm mb-3">Ahli Teknologi Lingkungan</p>
                <p className="text-gray-600 text-sm">
                  Insinyur lingkungan dengan spesialisasi dalam pengembangan teknologi pengelolaan sampah perkotaan.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Dewi Susanti, M.Pd</h3>
                <p className="text-gray-500 text-sm mb-3">Pendidik Lingkungan</p>
                <p className="text-gray-600 text-sm">
                  Aktivis pendidikan lingkungan dengan pengalaman mengembangkan kurikulum pendidikan lingkungan untuk sekolah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Bagikan Pengalaman Anda
              </h2>
              <p className="text-lg text-green-100 mb-8">
                Anda memiliki pengetahuan atau pengalaman tentang lingkungan yang ingin dibagikan? Kami membuka kesempatan untuk Anda berkontribusi dalam blog kami.
              </p>
              <button className="bg-white text-green-700 hover:bg-green-100 font-medium py-3 px-6 rounded-md transition-colors">
                Kirim Artikel Anda
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
