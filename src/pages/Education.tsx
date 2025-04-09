
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Education = () => {
  const articles = [
    {
      id: 1,
      title: "Cara Mudah Mengelola Sampah Rumah Tangga",
      description: "Panduan praktis untuk mengelola sampah rumah tangga dan mengubahnya menjadi kompos.",
      category: "Pengelolaan Sampah",
      type: "article",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "Mengenal Perubahan Iklim dan Dampaknya",
      description: "Artikel informatif tentang perubahan iklim, penyebab, dan dampaknya terhadap lingkungan.",
      category: "Perubahan Iklim",
      type: "article",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      title: "Konservasi Air: Mengapa Penting?",
      description: "Pentingnya konservasi air dan cara-cara sederhana untuk menghemat penggunaan air sehari-hari.",
      category: "Konservasi Air",
      type: "article",
      imageUrl: "https://via.placeholder.com/300",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Tutorial Membuat Kompos dari Sampah Dapur",
      description: "Video tutorial langkah demi langkah untuk membuat kompos dari sampah organik dapur.",
      duration: "10:25",
      type: "video",
      thumbnailUrl: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "Dokumenter: Hutan Indonesia yang Terancam",
      description: "Film dokumenter tentang kondisi hutan Indonesia dan ancaman deforestasi.",
      duration: "25:18",
      type: "video",
      thumbnailUrl: "https://via.placeholder.com/300",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Panduan Lengkap Pengelolaan Sampah",
      description: "E-book yang berisi panduan lengkap tentang pengelolaan sampah rumah tangga.",
      type: "ebook",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      title: "Infografis Dampak Plastik pada Laut",
      description: "Infografis yang menjelaskan dampak penggunaan plastik terhadap ekosistem laut.",
      type: "infographic",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      title: "Modul Pembelajaran Lingkungan Hidup",
      description: "Modul pembelajaran untuk sekolah tentang lingkungan hidup dan konservasi.",
      type: "module",
      fileSize: "5.2 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Edukasi Lingkungan</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tingkatkan pengetahuan Anda tentang lingkungan hidup melalui artikel, video, dan sumber belajar lainnya.
          </p>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Artikel
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" /> Video
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Sumber Belajar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gray-200">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">{article.title}</CardTitle>
                    <CardDescription>{article.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                    <Button variant="outline" className="text-green-600 hover:bg-green-50" asChild>
                      <Link to={`/education/articles/${article.id}`}>Baca Selengkapnya</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 rounded-full p-3">
                        <Video className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <Link to={`/education/videos/${video.id}`}>Tonton Video</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Unduh Sumber Belajar</h3>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {resource.type === 'ebook' && <BookOpen className="h-10 w-10 text-green-600" />}
                      {resource.type === 'infographic' && <FileText className="h-10 w-10 text-green-600" />}
                      {resource.type === 'module' && <BookOpen className="h-10 w-10 text-green-600" />}
                      <div>
                        <h4 className="font-medium text-green-800">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <span className="text-xs text-gray-500">Format: {resource.type} • Ukuran: {resource.fileSize}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                      Unduh
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Education;
