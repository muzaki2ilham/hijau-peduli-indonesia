
import { TreeDeciduous, Leaf, Recycle, Info, BookOpen, Image, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-green-800">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Dinas Lingkungan Hidup Kota Tegal
          </h1>
          <p className="text-lg md:text-xl text-white max-w-xl mx-auto mb-8">
            Bersama menjaga lingkungan untuk masa depan yang lebih baik
          </p>
          <div className="flex gap-4 justify-center">
            <Button size={isMobile ? "sm" : "default"} className="bg-green-600 hover:bg-green-700 text-white" asChild>
              <Link to="/programs">Program Kami</Link>
            </Button>
            <Button size={isMobile ? "sm" : "default"} variant="outline" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30" asChild>
              <Link to="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Layanan Kami
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <MenuCard 
              icon={<TreeDeciduous className="h-6 w-6" />} 
              title="Program" 
              link="/programs" 
            />
            <MenuCard 
              icon={<Leaf className="h-6 w-6" />} 
              title="Edukasi" 
              link="/education" 
            />
            <MenuCard 
              icon={<Recycle className="h-6 w-6" />} 
              title="Layanan" 
              link="/services" 
            />
            <MenuCard 
              icon={<BookOpen className="h-6 w-6" />} 
              title="Blog" 
              link="/blog" 
            />
            <MenuCard 
              icon={<Image className="h-6 w-6" />} 
              title="Galeri" 
              link="/gallery" 
            />
            <MenuCard 
              icon={<Phone className="h-6 w-6" />} 
              title="Kontak" 
              link="/contact" 
            />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" /> Tentang Kami
          </h2>
          <p className="text-sm md:text-base text-gray-700">
            Dinas Lingkungan Hidup adalah lembaga pemerintah yang bertanggung jawab untuk menjaga kelestarian lingkungan. 
            Kami bekerja untuk meningkatkan kesadaran masyarakat tentang pentingnya menjaga lingkungan hidup, 
            memberikan edukasi, serta mengembangkan program-program yang berkelanjutan.
          </p>
          <Button className="mt-4" variant="outline" size={isMobile ? "sm" : "default"} asChild>
            <Link to="/about">Pelajari Lebih Lanjut</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const MenuCard = ({ icon, title, link }: { icon: React.ReactNode; title: string; link: string }) => (
  <Link to={link}>
    <Card className="hover:bg-green-50 transition-colors h-full border-green-100">
      <CardContent className="flex flex-col items-center justify-center p-4 h-full">
        <div className="text-green-600 mb-2">
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-medium text-green-800">{title}</h3>
      </CardContent>
    </Card>
  </Link>
);

export default Index;
