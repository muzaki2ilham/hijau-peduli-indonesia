
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
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 2,
    title: "Pembersihan Pantai Bersama Komunitas",
    category: "kegiatan",
    date: "22 Februari 2025",
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 3,
    title: "Workshop Daur Ulang Sampah Plastik",
    category: "edukasi",
    date: "5 Januari 2025",
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 4,
    title: "Sosialisasi Pengelolaan Sampah di Sekolah",
    category: "edukasi",
    date: "18 Desember 2024",
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 5,
    title: "Pelestarian Mangrove di Pesisir",
    category: "konservasi",
    date: "10 November 2024",
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 6,
    title: "Pengembangan Taman Kota",
    category: "konservasi",
    date: "5 Oktober 2024",
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 7,
    title: "Kampanye Lingkungan Bersih",
    category: "kampanye",
    date: "20 September 2024",
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    id: 8,
    title: "Seminar Lingkungan Hidup",
    category: "edukasi",
    date: "15 Agustus 2024",
    imageUrl: "https://via.placeholder.com/400x300",
  },
];

export const videos: Video[] = [
  {
    id: 1,
    title: "Dokumenter: Hutan Indonesia",
    category: "dokumenter",
    duration: "15:30",
    thumbnailUrl: "https://via.placeholder.com/400x225",
  },
  {
    id: 2,
    title: "Tutorial Pembuatan Kompos",
    category: "tutorial",
    duration: "08:45",
    thumbnailUrl: "https://via.placeholder.com/400x225",
  },
  {
    id: 3,
    title: "Kampanye Lingkungan Bersih",
    category: "kampanye",
    duration: "03:20",
    thumbnailUrl: "https://via.placeholder.com/400x225",
  },
  {
    id: 4,
    title: "Laporan Kegiatan Penanaman Pohon",
    category: "kegiatan",
    duration: "05:15",
    thumbnailUrl: "https://via.placeholder.com/400x225",
  },
];
