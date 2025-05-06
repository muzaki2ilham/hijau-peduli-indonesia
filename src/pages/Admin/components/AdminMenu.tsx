
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ClipboardList, Image, FileText, FilePlus, BarChart3, Settings, Users } from "lucide-react";

interface AdminMenuProps {
  onNavigate: (tab: string) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ onNavigate }) => {
  const menuItems = [
    {
      id: 'complaints',
      title: 'Manajemen Pengaduan',
      description: 'Kelola pengaduan dari masyarakat',
      icon: <MessageCircle className="h-8 w-8 text-orange-500" />,
      color: 'bg-orange-100'
    },
    {
      id: 'requests',
      title: 'Manajemen Permohonan',
      description: 'Kelola permohonan layanan',
      icon: <ClipboardList className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: 'users',
      title: 'Manajemen Pengguna',
      description: 'Kelola data pengguna',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      id: 'gallery',
      title: 'Manajemen Galeri',
      description: 'Kelola foto dan video',
      icon: <Image className="h-8 w-8 text-red-500" />,
      color: 'bg-red-100'
    },
    {
      id: 'blog',
      title: 'Manajemen Blog',
      description: 'Kelola artikel dan berita',
      icon: <FileText className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-100'
    },
    {
      id: 'programs',
      title: 'Manajemen Program',
      description: 'Kelola program dan kegiatan',
      icon: <FilePlus className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    {
      id: 'department',
      title: 'Informasi Dinas',
      description: 'Kelola informasi tentang dinas',
      icon: <Settings className="h-8 w-8 text-gray-500" />,
      color: 'bg-gray-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item) => (
        <Card 
          key={item.id}
          className="hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => onNavigate(item.id)}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminMenu;
