
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ClipboardList, Image, FileText, FilePlus, BarChart3, Settings, Users } from "lucide-react";

interface DashboardHeaderProps {
  activeTab: string;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, onLogout }) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
        {activeTab === "dashboard" && "Dashboard Admin"}
        {activeTab === "complaints" && <><MessageCircle className="h-5 w-5" /> Manajemen Pengaduan</>}
        {activeTab === "requests" && <><ClipboardList className="h-5 w-5" /> Manajemen Permohonan</>}
        {activeTab === "gallery" && <><Image className="h-5 w-5" /> Manajemen Galeri</>}
        {activeTab === "blog" && <><FileText className="h-5 w-5" /> Manajemen Blog</>}
        {activeTab === "programs" && <><FilePlus className="h-5 w-5" /> Manajemen Program</>}
        {activeTab === "department" && <><Settings className="h-5 w-5" /> Informasi Dinas</>}
        {activeTab === "users" && <><Users className="h-5 w-5" /> Manajemen Pengguna</>}
      </CardTitle>
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={onLogout}
      >
        Keluar
      </Button>
    </CardHeader>
  );
};

export default DashboardHeader;
