import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Calendar, Clock, Users, Award, Landmark, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const visionMission = {
    vision: "Terwujudnya lingkungan hidup yang bersih, sehat, dan berkelanjutan untuk kesejahteraan masyarakat Kota Tegal.",
    mission: [
      "Meningkatkan kualitas lingkungan hidup melalui pengendalian pencemaran dan kerusakan lingkungan di Kota Tegal.",
      "Memperkuat upaya pelestarian fungsi lingkungan hidup dan pengelolaan sumber daya alam di Kota Tegal.",
      "Meningkatkan kesadaran dan partisipasi masyarakat dalam perlindungan dan pengelolaan lingkungan hidup di Kota Tegal.",
      "Memperkuat tata kelola yang baik dalam perlindungan dan pengelolaan lingkungan hidup di Kota Tegal.",
    ],
  };

  const achievements = [
    {
      year: "2024",
      title: "Penghargaan Kota Terbersih",
      institution: "Kementerian Lingkungan Hidup dan Kehutanan",
    },
    {
      year: "2023",
      title: "PROPER Hijau untuk Pengelolaan Limbah",
      institution: "Kementerian Lingkungan Hidup dan Kehutanan",
    },
    {
      year: "2022",
      title: "Penghargaan Adipura",
      institution: "Pemerintah Republik Indonesia",
    },
    {
      year: "2021",
      title: "Inovasi Pengelolaan Lingkungan Terbaik",
      institution: "Forum Lingkungan Hidup Indonesia",
    },
  ];

  const departments = [
    {
      name: "Bidang Tata Lingkungan",
      description: "Bertanggung jawab untuk perencanaan, pengkajian, dan evaluasi dampak lingkungan.",
    },
    {
      name: "Bidang Pengelolaan Sampah",
      description: "Mengelola program pengumpulan, pengangkutan, dan pengolahan sampah kota.",
    },
    {
      name: "Bidang Pengendalian Pencemaran",
      description: "Melakukan pemantauan dan pengendalian pencemaran udara, air, dan tanah.",
    },
    {
      name: "Bidang Penegakan Hukum Lingkungan",
      description: "Menerapkan peraturan dan sanksi terkait pelanggaran lingkungan hidup.",
    },
    {
      name: "Bidang Peningkatan Kapasitas",
      description: "Mengembangkan program edukasi dan pelatihan lingkungan untuk masyarakat.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Tentang Dinas Lingkungan Hidup Kota Tegal</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mengenal lebih dekat Dinas Lingkungan Hidup Kota Tegal, visi misi, dan program-program kami untuk menjaga kelestarian lingkungan di Kota Tegal.
          </p>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
          <div className="md:flex">
            <div className="md:w-1/2 bg-green-600 text-white p-8">
              <h2 className="text-2xl font-bold mb-4">Dinas Lingkungan Hidup Kota Tegal</h2>
              <p className="mb-6">
                Dinas Lingkungan Hidup Kota Tegal adalah lembaga pemerintah yang bertanggung jawab untuk merumuskan kebijakan 
                teknis, menyelenggarakan urusan pemerintahan dan pelayanan umum, serta melakukan pembinaan dan 
                pelaksanaan tugas di bidang lingkungan hidup di Kota Tegal.
              </p>
              <p>
                Kami bekerja untuk memastikan lingkungan yang bersih, sehat, dan berkelanjutan melalui berbagai 
                program pengelolaan lingkungan, edukasi masyarakat, dan penegakan regulasi lingkungan hidup di Kota Tegal.
              </p>
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <Landmark className="mr-2 h-5 w-5" /> Visi dan Misi
              </h3>
              <div className="mb-4">
                <h4 className="font-medium text-green-700">Visi</h4>
                <p className="text-gray-600 italic">{visionMission.vision}</p>
              </div>
              <div>
                <h4 className="font-medium text-green-700">Misi</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {visionMission.mission.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
            <Users className="mr-2 h-6 w-6" /> Struktur Organisasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments.map((department, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-800">{department.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{department.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" className="text-green-600 hover:bg-green-50">
              Lihat Struktur Lengkap
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
            <Award className="mr-2 h-6 w-6" /> Prestasi & Penghargaan
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold">
                    {achievement.year}
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
            <BookOpen className="mr-2 h-6 w-6" /> Dasar Hukum
          </h2>
          <Card className="bg-white">
            <CardContent className="p-6">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold text-xs mr-2 mt-0.5">1</span>
                  <span>Undang-Undang Nomor 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold text-xs mr-2 mt-0.5">2</span>
                  <span>Peraturan Pemerintah Nomor 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold text-xs mr-2 mt-0.5">3</span>
                  <span>Peraturan Daerah Nomor 10 Tahun 2018 tentang Pengelolaan Sampah</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold text-xs mr-2 mt-0.5">4</span>
                  <span>Peraturan Daerah Nomor 15 Tahun 2020 tentang Pengendalian Pencemaran Udara</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
            <Phone className="mr-2 h-6 w-6" /> Informasi Kontak
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Alamat</h3>
                    <p className="text-gray-600">Jl. Nila No.11, Tegalsari, Kec. Tegal Bar., Kota Tegal, Jawa Tengah 52111</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Telepon</h3>
                    <p className="text-gray-600">(021) 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Email</h3>
                    <p className="text-gray-600">info@dlh.go.id</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                    <p className="text-gray-600">Sabtu, Minggu & Hari Libur: Tutup</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Pelayanan Publik</h3>
                    <p className="text-gray-600">Senin - Jumat: 09.00 - 15.00 WIB</p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 w-full mt-4" asChild>
                  <Link to="/contact">Hubungi Kami</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
