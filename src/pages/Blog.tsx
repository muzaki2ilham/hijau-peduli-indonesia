
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, User, Search, Tag, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "5 Langkah Mudah Mengurangi Jejak Karbon dalam Kehidupan Sehari-hari",
    excerpt: "Perubahan iklim menjadi isu global yang semakin mengkhawatirkan. Simak langkah-langkah sederhana yang dapat Anda lakukan untuk mengurangi emisi karbon...",
    category: "Perubahan Iklim",
    author: "Dr. Surya Wijaya",
    date: "10 April 2025",
    readTime: "8 menit",
    imageUrl: "https://via.placeholder.com/800x400",
  };

  const posts = [
    {
      id: 2,
      title: "Potensi Ekonomi dari Pengelolaan Sampah yang Berkelanjutan",
      excerpt: "Pengelolaan sampah yang tepat tidak hanya bermanfaat untuk lingkungan tetapi juga dapat membuka peluang ekonomi baru...",
      category: "Ekonomi Hijau",
      author: "Irene Kusuma",
      date: "5 April 2025",
      readTime: "6 menit",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Konservasi Air: Urgensi dan Strategi di Era Krisis Air",
      excerpt: "Ketika dunia menghadapi krisis air yang semakin parah, konservasi air menjadi kunci penting untuk menjaga keberlanjutan sumber daya...",
      category: "Konservasi Air",
      author: "Budi Santoso",
      date: "28 Maret 2025",
      readTime: "10 menit",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      title: "Peran Masyarakat dalam Pelestarian Keanekaragaman Hayati",
      excerpt: "Indonesia memiliki keanekaragaman hayati yang luar biasa namun terancam. Bagaimana peran masyarakat dalam upaya pelestarian?",
      category: "Biodiversitas",
      author: "Dr. Rahmat Hidayat",
      date: "20 Maret 2025",
      readTime: "7 menit",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 5,
      title: "Memahami AMDAL dan Pentingnya dalam Pembangunan Berkelanjutan",
      excerpt: "Analisis Mengenai Dampak Lingkungan (AMDAL) merupakan instrumen penting dalam perencanaan pembangunan yang berwawasan lingkungan...",
      category: "Regulasi",
      author: "Rina Mardiana",
      date: "15 Maret 2025",
      readTime: "9 menit",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 6,
      title: "Inovasi Teknologi dalam Pengelolaan Limbah Industri",
      excerpt: "Perkembangan teknologi membawa solusi baru dalam pengelolaan limbah industri yang lebih efisien dan ramah lingkungan...",
      category: "Teknologi",
      author: "Andi Pratama",
      date: "8 Maret 2025",
      readTime: "5 menit",
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

  const categories = [
    { name: "Perubahan Iklim", count: 15 },
    { name: "Ekonomi Hijau", count: 12 },
    { name: "Konservasi Air", count: 10 },
    { name: "Biodiversitas", count: 8 },
    { name: "Regulasi", count: 7 },
    { name: "Teknologi", count: 6 },
    { name: "Energi Terbarukan", count: 5 },
  ];

  const archives = [
    { month: "April 2025", count: 5 },
    { month: "Maret 2025", count: 8 },
    { month: "Februari 2025", count: 6 },
    { month: "Januari 2025", count: 7 },
    { month: "Desember 2024", count: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Blog Lingkungan Hidup</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Artikel dan wawasan terkini tentang lingkungan hidup, program konservasi, dan praktik berkelanjutan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Cari artikel..."
            className="pl-10 bg-white"
          />
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <BookOpen className="mr-2 h-5 w-5" /> Artikel Unggulan
          </h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-xs ml-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-3">{featuredPost.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{featuredPost.date}</span>
                </div>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <Link to={`/blog/${featuredPost.id}`}>Baca Selengkapnya</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Artikel Terbaru</h2>
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-40 w-full object-cover md:h-full"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <CardHeader className="p-0 pb-2">
                        <div className="flex items-center mb-1">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-gray-500 text-xs ml-2 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {post.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-green-800">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <CardDescription className="text-sm mb-2">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <User className="h-3 w-3 mr-1" />
                          <span className="mr-2">{post.author}</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <Button variant="link" className="text-green-600 p-0 h-auto" asChild>
                          <Link to={`/blog/${post.id}`} className="flex items-center">
                            Baca Selengkapnya <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="text-green-600 hover:bg-green-50">
                Lihat Lebih Banyak Artikel
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center">
                  <Tag className="mr-2 h-5 w-5" /> Kategori
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex justify-between items-center text-gray-600 hover:text-green-700"
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Archives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" /> Arsip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {archives.map((archive) => (
                    <li key={archive.month}>
                      <Link
                        to={`/blog/archive/${archive.month.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex justify-between items-center text-gray-600 hover:text-green-700"
                      >
                        <span>{archive.month}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          {archive.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-green-50 border-green-100">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Berlangganan Newsletter</CardTitle>
                <CardDescription>
                  Dapatkan artikel terbaru dan informasi lingkungan hidup langsung ke email Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input placeholder="Email Anda" className="bg-white" />
                  <Button className="w-full bg-green-600 hover:bg-green-700">Berlangganan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
