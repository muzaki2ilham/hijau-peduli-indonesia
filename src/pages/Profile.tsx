
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, LogOut, Inbox, ClipboardList, RefreshCw } from "lucide-react";

type ComplaintType = {
  id: string;
  created_at: string;
  complaint_type: string;
  location: string;
  description: string;
  status: string;
};

type ServiceRequestType = {
  id: string;
  created_at: string;
  service_type: string;
  request_date: string;
  description: string;
  status: string;
};

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<ComplaintType[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate("/auth");
        return;
      }
      
      setUser(data.session.user);
      setLoading(false);
      fetchUserData(data.session.user.id);
    };

    checkUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/auth");
        } else if (session) {
          setUser(session.user);
          fetchUserData(session.user.id);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch complaints
      const { data: complaintsData, error: complaintsError } = await supabase
        .from("complaints")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (complaintsError) throw complaintsError;
      setComplaints(complaintsData || []);

      // Fetch service requests
      const { data: requestsData, error: requestsError } = await supabase
        .from("service_requests")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (requestsError) throw requestsError;
      setServiceRequests(requestsData || []);
    } catch (error: any) {
      toast({
        title: "Gagal memuat data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const refreshData = async () => {
    if (!user) return;
    
    setRefreshing(true);
    await fetchUserData(user.id);
    setRefreshing(false);
    
    toast({
      title: "Data diperbarui",
      description: "Data terbaru berhasil dimuat",
    });
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast({
        title: "Berhasil keluar",
        description: "Anda telah berhasil keluar dari akun",
      });
    } catch (error: any) {
      toast({
        title: "Gagal keluar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full inline-block mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl text-green-800">Profil Pengguna</CardTitle>
              <CardDescription>
                {user?.email}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </Button>
          </CardHeader>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-800">Histori Aktivitas</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Memperbarui...' : 'Perbarui Data'}
          </Button>
        </div>

        <Tabs defaultValue="complaints">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <Inbox className="h-4 w-4" /> Pengaduan
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" /> Permohonan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daftar Pengaduan</CardTitle>
                <CardDescription>
                  Riwayat pengaduan yang telah Anda kirimkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {complaints.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Inbox className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>Belum ada pengaduan yang diajukan</p>
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/services')}
                      className="mt-2"
                    >
                      Buat pengaduan baru
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Jenis</TableHead>
                          <TableHead>Lokasi</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {complaints.map((complaint) => (
                          <TableRow key={complaint.id}>
                            <TableCell>{formatDate(complaint.created_at)}</TableCell>
                            <TableCell>{complaint.complaint_type}</TableCell>
                            <TableCell>{complaint.location}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                complaint.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : complaint.status === 'in progress' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {complaint.status === 'pending' 
                                  ? 'Menunggu' 
                                  : complaint.status === 'in progress'
                                  ? 'Diproses'
                                  : 'Selesai'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daftar Permohonan</CardTitle>
                <CardDescription>
                  Riwayat permohonan layanan yang telah Anda ajukan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {serviceRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>Belum ada permohonan yang diajukan</p>
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/services')}
                      className="mt-2"
                    >
                      Buat permohonan baru
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Tanggal Permintaan</TableHead>
                          <TableHead>Jenis Layanan</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {serviceRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{formatDate(request.created_at)}</TableCell>
                            <TableCell>{formatDate(request.request_date)}</TableCell>
                            <TableCell>{request.service_type}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                request.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : request.status === 'in progress' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {request.status === 'pending' 
                                  ? 'Menunggu' 
                                  : request.status === 'in progress'
                                  ? 'Diproses'
                                  : 'Selesai'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
