
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TreeDeciduous, Leaf, Recycle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: "Penanaman 1000 Pohon",
      description: "Program penanaman pohon di berbagai wilayah perkotaan untuk meningkatkan ruang hijau.",
      category: "Penghijauan",
      icon: <TreeDeciduous className="h-6 w-6" />,
      date: "15 Mei 2025",
    },
    {
      id: 2,
      title: "Pembersihan Sungai Citarum",
      description: "Kegiatan pembersihan sungai Citarum dari sampah dan limbah untuk mengembalikan ekosistem sungai.",
      category: "Konservasi Air",
      icon: <Leaf className="h-6 w-6" />,
      date: "22 Juni 2025",
    },
    {
      id: 3,
      title: "Bank Sampah Masyarakat",
      description: "Program pengelolaan sampah berbasis masyarakat melalui sistem bank sampah.",
      category: "Pengelolaan Sampah",
      icon: <Recycle className="h-6 w-6" />,
      date: "10 Juli 2025",
    },
    {
      id: 4,
      title: "Festival Lingkungan Hidup",
      description: "Festival tahunan untuk mengedukasi masyarakat tentang lingkungan hidup melalui berbagai kegiatan interaktif.",
      category: "Edukasi",
      icon: <Calendar className="h-6 w-6" />,
      date: "8-10 Agustus 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Program Lingkungan</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Program-program lingkungan hidup yang diselenggarakan untuk melestarikan dan memperbaiki kualitas lingkungan di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50 flex flex-row items-start space-x-4 pb-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  {program.icon}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl text-green-800">{program.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {program.category}
                    </Badge>
                    <span className="ml-2 text-sm text-gray-500">{program.date}</span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Button variant="outline" className="text-green-600 hover:bg-green-50" asChild>
                  <Link to={`/programs/${program.id}`}>Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Jadwal Kegiatan</h2>
          <p className="text-gray-600 mb-6">
            Lihat jadwal lengkap kegiatan lingkungan hidup yang akan diadakan dalam waktu dekat.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">Lihat Kalender Kegiatan</Button>
        </div>
      </div>
    </div>
  );
};

export default Programs;
