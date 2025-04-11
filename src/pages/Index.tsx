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
      <div className="relative">
        <div className="text-center p-6 z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Hijau Peduli Indonesia
          </h1>
          <p className="text-lg md:text-xl text-white max-w-xl mx-auto">
            Bersama menjaga lingkungan untuk masa depan yang lebih baik
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Button size={isMobile ? "sm" : "default"} asChild>
              <Link to="/programs">Program Kami</Link>
            </Button>
            <Button size={isMobile ? "sm" : "default"} variant="outline" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30" asChild>
              <Link to="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Masuk/Daftar
          </Button>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="flex-1 p-4 md:p-8">
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

        {/* About Section */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
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

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
          <BottomNavItem icon={<TreeDeciduous size={20} />} label="Beranda" link="/" active />
          <BottomNavItem icon={<Leaf size={20} />} label="Program" link="/programs" />
          <BottomNavItem icon={<Recycle size={20} />} label="Layanan" link="/services" />
          <BottomNavItem icon={<Info size={20} />} label="Info" link="/about" />
        </div>
      )}
    </div>
  );
};

const MenuCard = ({ icon, title, link }: { icon: React.ReactNode; title: string; link: string }) => (
  <Link to={link}>
    <Card className="hover:bg-green-50 transition-colors h-full">
      <CardContent className="flex flex-col items-center justify-center p-4 h-full">
        <div className="text-green-600 mb-2">
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-medium text-green-800">{title}</h3>
      </CardContent>
    </Card>
  </Link>
);

const BottomNavItem = ({ 
  icon, 
  label, 
  link, 
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  link: string; 
  active?: boolean 
}) => (
  <Link 
    to={link} 
    className={`flex flex-col items-center px-2 ${active ? 'text-green-600' : 'text-gray-500'}`}
  >
    <div>{icon}</div>
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default Index;
