
import React from 'react';
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
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface AdminMenuProps {
  onNavigate: (tab: string) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ onNavigate }) => {
  const adminMenuItems: AdminMenuItem[] = [
    { 
      id: "users",
      title: "Kelola Pengguna", 
      icon: <UserCheck className="h-6 w-6" />,
      description: "Kelola akun dan hak akses pengguna"
    },
    { 
      id: "complaints",
      title: "Pengaduan", 
      icon: <MessageCircle className="h-6 w-6" />,
      description: "Lihat dan tanggapi pengaduan masyarakat"
    },
    { 
      id: "requests",
      title: "Permohonan", 
      icon: <ClipboardList className="h-6 w-6" />,
      description: "Kelola permohonan layanan"
    },
    { 
      id: "gallery",
      title: "Galeri", 
      icon: <Image className="h-6 w-6" />,
      description: "Kelola foto dan video"
    },
    { 
      id: "blog",
      title: "Blog", 
      icon: <FileText className="h-6 w-6" />,
      description: "Kelola artikel dan berita"
    },
    { 
      id: "programs",
      title: "Program", 
      icon: <FilePlus className="h-6 w-6" />,
      description: "Kelola program dan kegiatan"
    },
    { 
      id: "department",
      title: "Informasi Dinas", 
      icon: <Settings className="h-6 w-6" />,
      description: "Kelola informasi departemen"
    },
    { 
      id: "stats",
      title: "Statistik", 
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Lihat statistik dan laporan"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {adminMenuItems.map((item) => (
        <Card 
          key={item.id} 
          className="hover:bg-green-50 cursor-pointer transition-colors"
          onClick={() => onNavigate(item.id)}
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
