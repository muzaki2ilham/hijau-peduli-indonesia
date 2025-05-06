
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2, UserCheck, MessageCircle, ClipboardList, Image, FileText, FilePlus, BarChart3, Settings, Users } from "lucide-react";
import AdminMenu from './components/AdminMenu';
import ComplaintsPanel from './components/ComplaintsPanel';
import RequestsPanel from './components/RequestsPanel';
import BlogManagement from './components/BlogManagement';
import GalleryManagement from './components/GalleryManagement';
import ProgramsManagement from './components/ProgramsManagement';
import DepartmentInfoManagement from './components/DepartmentInfoManagement';
import UsersPanel from './components/UsersPanel';
import { useAdminDashboard } from './hooks/useAdminDashboard';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    recentComplaints, 
    recentRequests, 
    userProfiles,
    loading, 
    usersLoading,
    fetchUserProfiles,
    fetchAllComplaints,
    fetchAllRequests
  } = useAdminDashboard();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [allComplaints, setAllComplaints] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (activeTab === "users") {
      setAllUsers(userProfiles);
    } else if (activeTab === "complaints") {
      loadAllComplaints();
    } else if (activeTab === "requests") {
      loadAllRequests();
    }
  }, [activeTab]);

  const loadAllComplaints = async () => {
    const complaints = await fetchAllComplaints();
    setAllComplaints(complaints);
  };

  const loadAllRequests = async () => {
    const requests = await fetchAllRequests();
    setAllRequests(requests);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
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
              onClick={handleLogout}
            >
              Keluar
            </Button>
          </CardHeader>
          <CardContent>
            {activeTab === "dashboard" ? (
              <AdminMenu onNavigate={(tab) => setActiveTab(tab)} />
            ) : (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveTab("dashboard")}
                  className="flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {activeTab === "dashboard" ? (
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Complaints */}
              <ComplaintsPanel complaints={recentComplaints} loading={loading} />

              {/* Recent Requests */}
              <RequestsPanel requests={recentRequests} loading={loading} />
            </div>
            
            {/* Recent Users */}
            <UsersPanel 
              users={userProfiles.slice(0, 5)} 
              loading={usersLoading} 
              onRefresh={() => setActiveTab("users")}
            />
          </div>
        ) : activeTab === "complaints" ? (
          <ComplaintsPanel complaints={allComplaints} loading={loading} showAll={true} />
        ) : activeTab === "requests" ? (
          <RequestsPanel requests={allRequests} loading={loading} showAll={true} />
        ) : activeTab === "users" ? (
          <UsersPanel users={allUsers} loading={usersLoading} showAll={true} />
        ) : activeTab === "gallery" ? (
          <GalleryManagement />
        ) : activeTab === "blog" ? (
          <BlogManagement />
        ) : activeTab === "programs" ? (
          <ProgramsManagement />
        ) : activeTab === "department" ? (
          <DepartmentInfoManagement />
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
