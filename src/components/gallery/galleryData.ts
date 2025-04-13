
export interface Photo {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

export interface Video {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    title: "Penanaman Pohon di Taman Kota",
    category: "kegiatan",
    date: "15 Maret 2025",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format",
  },
  {
    id: 2,
    title: "Pembersihan Pantai Bersama Komunitas",
    category: "kegiatan",
    date: "22 Februari 2025",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format",
  },
  {
    id: 3,
    title: "Workshop Daur Ulang Sampah Plastik",
    category: "edukasi",
    date: "5 Januari 2025",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format",
  },
  {
    id: 4,
    title: "Sosialisasi Pengelolaan Sampah di Sekolah",
    category: "edukasi",
    date: "18 Desember 2024",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format",
  },
  {
    id: 5,
    title: "Pelestarian Mangrove di Pesisir",
    category: "konservasi",
    date: "10 November 2024",
    imageUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format",
  },
  {
    id: 6,
    title: "Pengembangan Taman Kota",
    category: "konservasi",
    date: "5 Oktober 2024",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format",
  },
  {
    id: 7,
    title: "Kampanye Lingkungan Bersih",
    category: "kampanye",
    date: "20 September 2024",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format",
  },
  {
    id: 8,
    title: "Seminar Lingkungan Hidup",
    category: "edukasi",
    date: "15 Agustus 2024",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format",
  },
];

export const videos: Video[] = [
  {
    id: 1,
    title: "Dokumenter: Hutan Indonesia",
    category: "dokumenter",
    duration: "15:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format",
  },
  {
    id: 2,
    title: "Tutorial Pembuatan Kompos",
    category: "tutorial",
    duration: "08:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format",
  },
  {
    id: 3,
    title: "Kampanye Lingkungan Bersih",
    category: "kampanye",
    duration: "03:20",
    thumbnailUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format",
  },
  {
    id: 4,
    title: "Laporan Kegiatan Penanaman Pohon",
    category: "kegiatan",
    duration: "05:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format",
  },
];
