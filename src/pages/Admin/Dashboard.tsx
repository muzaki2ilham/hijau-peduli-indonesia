
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  UserCheck, 
  ClipboardList, 
  MessageCircle, 
  Settings 
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const menuItems = [
    { 
      title: "Kelola Pengguna", 
      icon: <UserCheck className="h-6 w-6" />,
      onClick: () => navigate('/admin/users')
    },
    { 
      title: "Pengaduan", 
      icon: <MessageCircle className="h-6 w-6" />,
      onClick: () => navigate('/admin/complaints')
    },
    { 
      title: "Daftar Permohonan", 
      icon: <ClipboardList className="h-6 w-6" />,
      onClick: () => navigate('/admin/requests')
    },
    { 
      title: "Pengaturan", 
      icon: <Settings className="h-6 w-6" />,
      onClick: () => navigate('/admin/settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-green-800">
              Dashboard Admin
            </CardTitle>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleLogout}
            >
              Keluar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <Card 
                  key={index} 
                  className="hover:bg-green-50 cursor-pointer transition-colors"
                  onClick={item.onClick}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                    <div className="text-green-600">{item.icon}</div>
                    <h3 className="text-base font-medium text-green-800">
                      {item.title}
                    </h3>
                </CardContent>
              </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
