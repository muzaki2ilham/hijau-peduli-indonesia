
import { BlogPost } from "./FeaturedPost";

export const featuredPost: BlogPost = {
  id: 1,
  title: "5 Langkah Mudah Mengurangi Jejak Karbon dalam Kehidupan Sehari-hari",
  excerpt: "Perubahan iklim menjadi isu global yang semakin mengkhawatirkan. Simak langkah-langkah sederhana yang dapat Anda lakukan untuk mengurangi emisi karbon...",
  category: "Perubahan Iklim",
  author: "Dr. Surya Wijaya",
  date: "10 April 2025",
  readTime: "8 menit",
  imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&auto=format",
};

export const blogPosts: BlogPost[] = [
  {
    id: 2,
    title: "Potensi Ekonomi dari Pengelolaan Sampah yang Berkelanjutan",
    excerpt: "Pengelolaan sampah yang tepat tidak hanya bermanfaat untuk lingkungan tetapi juga dapat membuka peluang ekonomi baru...",
    category: "Ekonomi Hijau",
    author: "Irene Kusuma",
    date: "5 April 2025",
    readTime: "6 menit",
    imageUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format",
  },
  {
    id: 3,
    title: "Konservasi Air: Urgensi dan Strategi di Era Krisis Air",
    excerpt: "Ketika dunia menghadapi krisis air yang semakin parah, konservasi air menjadi kunci penting untuk menjaga keberlanjutan sumber daya...",
    category: "Konservasi Air",
    author: "Budi Santoso",
    date: "28 Maret 2025",
    readTime: "10 menit",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format",
  },
  {
    id: 4,
    title: "Peran Masyarakat dalam Pelestarian Keanekaragaman Hayati",
    excerpt: "Indonesia memiliki keanekaragaman hayati yang luar biasa namun terancam. Bagaimana peran masyarakat dalam upaya pelestarian?",
    category: "Biodiversitas",
    author: "Dr. Rahmat Hidayat",
    date: "20 Maret 2025",
    readTime: "7 menit",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format",
  },
  {
    id: 5,
    title: "Memahami AMDAL dan Pentingnya dalam Pembangunan Berkelanjutan",
    excerpt: "Analisis Mengenai Dampak Lingkungan (AMDAL) merupakan instrumen penting dalam perencanaan pembangunan yang berwawasan lingkungan...",
    category: "Regulasi",
    author: "Rina Mardiana",
    date: "15 Maret 2025",
    readTime: "9 menit",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format",
  },
  {
    id: 6,
    title: "Inovasi Teknologi dalam Pengelolaan Limbah Industri",
    excerpt: "Perkembangan teknologi membawa solusi baru dalam pengelolaan limbah industri yang lebih efisien dan ramah lingkungan...",
    category: "Teknologi",
    author: "Andi Pratama",
    date: "8 Maret 2025",
    readTime: "5 menit",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format",
  },
];

export const categories = [
  { name: "Perubahan Iklim", count: 15 },
  { name: "Ekonomi Hijau", count: 12 },
  { name: "Konservasi Air", count: 10 },
  { name: "Biodiversitas", count: 8 },
  { name: "Regulasi", count: 7 },
  { name: "Teknologi", count: 6 },
  { name: "Energi Terbarukan", count: 5 },
];

export const archives = [
  { month: "April 2025", count: 5 },
  { month: "Maret 2025", count: 8 },
  { month: "Februari 2025", count: 6 },
  { month: "Januari 2025", count: 7 },
  { month: "Desember 2024", count: 10 },
];
