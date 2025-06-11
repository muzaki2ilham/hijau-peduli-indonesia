
import { TreeDeciduous, Leaf, Recycle, Info, BookOpen, Image, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState, useEffect } from "react";
import { useGalleryItems } from "@/pages/Admin/hooks/useGalleryItems";
import { useBlogPosts } from "@/pages/Admin/hooks/useBlogPosts";
import { usePrograms } from "@/pages/Admin/hooks/usePrograms";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { galleryItems, loading: galleryLoading } = useGalleryItems();
  const { blogPosts, loading: blogLoading } = useBlogPosts();
  const { programs, loading: programsLoading } = usePrograms();
  
  // Ambil konten yang telah ditambahkan admin untuk ditampilkan di halaman utama
  const recentPhotos = galleryItems
    .filter(item => item.type === 'photo')
    .slice(0, 3);
  
  const recentPosts = blogPosts
    .filter(post => post.published) // Hanya tampilkan yang sudah dipublish admin
    .slice(0, 2);
    
  const activePrograms = programs
    .filter(program => program.status === 'active') // Hanya tampilkan program aktif
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-green-800">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Tegal Asri
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

        {/* Program Aktif dari Admin */}
        {!programsLoading && activePrograms.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <TreeDeciduous className="h-5 w-5" /> Program Aktif
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activePrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-lg p-4 shadow-sm">
                  {program.image_url && (
                    <img 
                      src={program.image_url} 
                      alt={program.title}
                      className="w-full h-32 object-cover rounded-md mb-3" 
                    />
                  )}
                  <h3 className="font-semibold text-green-800 text-sm mb-2 line-clamp-2">{program.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{program.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" asChild>
                <Link to="/programs">Lihat Semua Program</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Galeri Terbaru dari Admin */}
        {!galleryLoading && recentPhotos.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Image className="h-5 w-5" /> Galeri Terbaru
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentPhotos.map((photo) => (
                <div key={photo.id} className="relative h-48 overflow-hidden rounded-md group">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
                    <h3 className="text-sm font-medium truncate">{photo.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" asChild>
                <Link to="/gallery">Lihat Semua Galeri</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Blog Terbaru dari Admin */}
        {!blogLoading && recentPosts.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Artikel Terbaru
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg p-4 shadow-sm">
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-md mb-3" 
                    />
                  )}
                  <h3 className="font-semibold text-green-800 text-sm mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" asChild>
                <Link to="/blog">Lihat Semua Artikel</Link>
              </Button>
            </div>
          </div>
        )}

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
