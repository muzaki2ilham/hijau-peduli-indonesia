
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserCheck, 
  ClipboardList, 
  MessageCircle, 
  Settings,
  BarChart3,
  Image,
  FilePlus,
  FileText
} from "lucide-react";

interface AdminMenuItem {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  description: string;
}

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  
  const adminMenuItems: AdminMenuItem[] = [
    { 
      title: "Kelola Pengguna", 
      icon: <UserCheck className="h-6 w-6" />,
      onClick: () => navigate('/admin/users'),
      description: "Kelola akun dan hak akses pengguna"
    },
    { 
      title: "Pengaduan", 
      icon: <MessageCircle className="h-6 w-6" />,
      onClick: () => navigate('/admin/complaints'),
      description: "Lihat dan tanggapi pengaduan masyarakat"
    },
    { 
      title: "Permohonan", 
      icon: <ClipboardList className="h-6 w-6" />,
      onClick: () => navigate('/admin/requests'),
      description: "Kelola permohonan layanan"
    },
    { 
      title: "Galeri", 
      icon: <Image className="h-6 w-6" />,
      onClick: () => navigate('/admin/gallery'),
      description: "Kelola foto dan video"
    },
    { 
      title: "Blog", 
      icon: <FileText className="h-6 w-6" />,
      onClick: () => navigate('/admin/blog'),
      description: "Kelola artikel dan berita"
    },
    { 
      title: "Program", 
      icon: <FilePlus className="h-6 w-6" />,
      onClick: () => navigate('/admin/programs'),
      description: "Kelola program dan kegiatan"
    },
    { 
      title: "Statistik", 
      icon: <BarChart3 className="h-6 w-6" />,
      onClick: () => navigate('/admin/stats'),
      description: "Lihat statistik dan laporan"
    },
    { 
      title: "Pengaturan", 
      icon: <Settings className="h-6 w-6" />,
      onClick: () => navigate('/admin/settings'),
      description: "Konfigurasi sistem"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {adminMenuItems.map((item, index) => (
        <Card 
          key={index} 
          className="hover:bg-green-50 cursor-pointer transition-colors"
          onClick={item.onClick}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <div className="text-green-600 bg-green-100 p-3 rounded-full">{item.icon}</div>
            <h3 className="text-base font-medium text-green-800 text-center">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 text-center">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminMenu;
