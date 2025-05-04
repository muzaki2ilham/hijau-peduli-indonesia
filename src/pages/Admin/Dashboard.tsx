
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recentComplaints, setRecentComplaints] = useState<any[]>([]);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch recent complaints
        const { data: complaints, error: complaintsError } = await supabase
          .from('complaints')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (complaintsError) throw complaintsError;
        setRecentComplaints(complaints || []);

        // Fetch recent service requests
        const { data: requests, error: requestsError } = await supabase
          .from('service_requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (requestsError) throw requestsError;
        setRecentRequests(requests || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const adminMenuItems = [
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" /> Pengaduan Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4 text-gray-500">Memuat data...</p>
              ) : recentComplaints.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentComplaints.map((complaint) => (
                      <TableRow 
                        key={complaint.id}
                        className="cursor-pointer hover:bg-green-50"
                        onClick={() => navigate(`/admin/complaints/${complaint.id}`)}
                      >
                        <TableCell>{complaint.name}</TableCell>
                        <TableCell>{complaint.complaint_type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {complaint.status === 'pending' ? 'Menunggu' :
                             complaint.status === 'in_progress' ? 'Diproses' :
                             complaint.status === 'resolved' ? 'Selesai' : complaint.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center py-4 text-gray-500">Tidak ada pengaduan terbaru</p>
              )}
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/admin/complaints')}
                >
                  Lihat Semua
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                <ClipboardList className="h-5 w-5" /> Permohonan Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4 text-gray-500">Memuat data...</p>
              ) : recentRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Layanan</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((request) => (
                      <TableRow 
                        key={request.id}
                        className="cursor-pointer hover:bg-green-50"
                        onClick={() => navigate(`/admin/requests/${request.id}`)}
                      >
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.service_type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status === 'pending' ? 'Menunggu' :
                             request.status === 'in_progress' ? 'Diproses' :
                             request.status === 'completed' ? 'Selesai' : request.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center py-4 text-gray-500">Tidak ada permohonan terbaru</p>
              )}
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/admin/requests')}
                >
                  Lihat Semua
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
