
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import AdminMenu from './components/AdminMenu';
import ComplaintsPanel from './components/ComplaintsPanel';
import RequestsPanel from './components/RequestsPanel';
import { useAdminDashboard } from './hooks/useAdminDashboard';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { recentComplaints, recentRequests, loading } = useAdminDashboard();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

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
            <AdminMenu />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Complaints */}
          <ComplaintsPanel complaints={recentComplaints} loading={loading} />

          {/* Recent Requests */}
          <RequestsPanel requests={recentRequests} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
