
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProgramCard from "@/components/ProgramCard";
import { Leaf, Tree, Earth, Calendar, Search, Users, Info } from "lucide-react";

const programsList = [
  {
    id: "1",
    title: "Penghijauan Kota",
    description: "Program penanaman pohon dan pengembangan taman kota untuk meningkatkan ruang terbuka hijau dan kualitas udara di perkotaan.",
    icon: <Tree className="h-10 w-10" />,
    link: "/programs/penghijauan-kota",
  },
  {
    id: "2",
    title: "Pengolahan Sampah",
    description: "Sistem pengelolaan sampah terpadu melalui prinsip reduce, reuse, dan recycle untuk mengurangi dampak negatif sampah terhadap lingkungan.",
    icon: <Leaf className="h-10 w-10" />,
    link: "/programs/pengolahan-sampah",
  },
  {
    id: "3",
    title: "Konservasi Air",
    description: "Perlindungan dan pemeliharaan sumber daya air untuk menjamin ketersediaan air bersih bagi seluruh masyarakat dan generasi mendatang.",
    icon: <Earth className="h-10 w-10" />,
    link: "/programs/konservasi-air",
  },
  {
    id: "4",
    title: "Edukasi Lingkungan",
    description: "Program pendidikan dan kampanye kesadaran tentang pentingnya menjaga lingkungan, ditujukan untuk semua lapisan masyarakat.",
    icon: <Calendar className="h-10 w-10" />,
    link: "/programs/edukasi-lingkungan",
  },
  {
    id: "5",
    title: "Monitoring Kualitas Udara",
    description: "Pengawasan dan pelaporan kualitas udara di berbagai titik kota untuk memastikan udara yang sehat bagi masyarakat.",
    icon: <Search className="h-10 w-10" />,
    link: "/programs/monitoring-udara",
  },
  {
    id: "6",
    title: "Pemberdayaan Masyarakat",
    description: "Program pelibatan aktif masyarakat dalam kegiatan pelestarian lingkungan melalui pendampingan dan bantuan teknis.",
    icon: <Users className="h-10 w-10" />,
    link: "/programs/pemberdayaan-masyarakat",
  },
  {
    id: "7",
    title: "Riset Lingkungan",
    description: "Penelitian dan pengembangan solusi inovatif untuk mengatasi permasalahan lingkungan hidup yang kompleks.",
    icon: <Info className="h-10 w-10" />,
    link: "/programs/riset-lingkungan",
  },
  {
    id: "8",
    title: "Energi Terbarukan",
    description: "Inisiatif pengembangan dan pemanfaatan sumber energi terbarukan untuk mengurangi ketergantungan pada bahan bakar fosil.",
    icon: <Earth className="h-10 w-10" />,
    link: "/programs/energi-terbarukan",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Program & Kegiatan</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Dinas Lingkungan Hidup menjalankan berbagai program dan kegiatan yang bertujuan untuk melestarikan, melindungi, dan meningkatkan kualitas lingkungan hidup.
            </p>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programsList.map((program) => (
                <ProgramCard
                  key={program.id}
                  id={program.id}
                  title={program.title}
                  description={program.description}
                  icon={program.icon}
                  link={program.link}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center">Kalender Kegiatan</h2>
              <p className="text-center text-gray-600 mb-8">
                Jadwal kegiatan dan acara lingkungan yang diselenggarakan oleh Dinas Lingkungan Hidup
              </p>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6 border-b pb-4">
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-md p-2 mr-4">
                      <div className="text-sm font-semibold">APR</div>
                      <div className="text-2xl font-bold">15</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Workshop Pengelolaan Sampah</h3>
                      <p className="text-gray-600 mt-1">09:00 - 12:00 | Aula Dinas Lingkungan Hidup</p>
                      <p className="text-gray-700 mt-2">Workshop tentang cara pengelolaan sampah rumah tangga dan pembuatan kompos.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 border-b pb-4">
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-md p-2 mr-4">
                      <div className="text-sm font-semibold">APR</div>
                      <div className="text-2xl font-bold">22</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Peringatan Hari Bumi</h3>
                      <p className="text-gray-600 mt-1">08:00 - 16:00 | Taman Kota</p>
                      <p className="text-gray-700 mt-2">Rangkaian acara peringatan Hari Bumi dengan tema "Pulihkan Bumi Kita".</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 border-b pb-4">
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-md p-2 mr-4">
                      <div className="text-sm font-semibold">MEI</div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Penanaman Pohon Massal</h3>
                      <p className="text-gray-600 mt-1">07:00 - 11:00 | Kawasan Hutan Kota</p>
                      <p className="text-gray-700 mt-2">Kegiatan penanaman 1000 bibit pohon melibatkan siswa, masyarakat, dan pegawai pemerintah.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-md p-2 mr-4">
                      <div className="text-sm font-semibold">MEI</div>
                      <div className="text-2xl font-bold">18</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Seminar Perubahan Iklim</h3>
                      <p className="text-gray-600 mt-1">13:00 - 16:00 | Gedung Balai Kota</p>
                      <p className="text-gray-700 mt-2">Seminar tentang dampak perubahan iklim dan upaya mitigasinya di tingkat lokal.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <a href="#" className="btn-primary">Lihat Jadwal Lengkap</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;
