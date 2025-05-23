
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useAdminDashboard } from './hooks/useAdminDashboard';
import { useAdminAccess } from './hooks/useAdminAccess';
import DashboardHeader from './components/dashboard/DashboardHeader';
import DashboardContent from './components/dashboard/DashboardContent';
import LoadingScreen from './components/dashboard/LoadingScreen';
import DashboardOverview from './components/dashboard/DashboardOverview';
import ContentTabs from './components/dashboard/ContentTabs';

const AdminDashboard: React.FC = () => {
  const { 
    recentComplaints, 
    recentRequests, 
    userProfiles,
    loading, 
    usersLoading,
    fetchUserProfiles,
    fetchAllComplaints,
    fetchAllRequests,
    fetchDashboardData
  } = useAdminDashboard();
  
  const { isAdmin, isInitialLoading, handleLogout } = useAdminAccess();
  
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [allComplaints, setAllComplaints] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      console.log("Dashboard mounted, fetching data...");
      fetchDashboardData();
      
      if (activeTab === "complaints") {
        loadAllComplaints();
      } else if (activeTab === "requests") {
        loadAllRequests();
      } else if (activeTab === "users") {
        fetchUserProfiles();
      }
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === "complaints") {
        loadAllComplaints();
      } else if (activeTab === "requests") {
        loadAllRequests();
      } else if (activeTab === "users") {
        fetchUserProfiles();
      }
    }
  }, [activeTab, isAdmin]);

  const loadAllComplaints = async () => {
    console.log("Loading all complaints...");
    const complaints = await fetchAllComplaints();
    console.log("Loaded complaints:", complaints.length);
    setAllComplaints(complaints);
  };

  const loadAllRequests = async () => {
    console.log("Loading all requests...");
    const requests = await fetchAllRequests();
    console.log("Loaded requests:", requests.length);
    setAllRequests(requests);
  };

  // Show loading indicator while checking admin status and fetching initial data
  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  // Only show content if user is admin
  if (!isAdmin) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <DashboardHeader 
            activeTab={activeTab} 
            onLogout={handleLogout} 
          />
          <DashboardContent 
            activeTab={activeTab} 
            onNavigate={setActiveTab} 
          />
        </Card>

        {activeTab === "dashboard" ? (
          <DashboardOverview
            recentComplaints={recentComplaints}
            recentRequests={recentRequests}
            userProfiles={userProfiles}
            loading={loading}
            usersLoading={usersLoading}
            fetchDashboardData={fetchDashboardData}
            fetchUserProfiles={fetchUserProfiles}
          />
        ) : (
          <ContentTabs 
            activeTab={activeTab}
            allComplaints={allComplaints}
            allRequests={allRequests}
            userProfiles={userProfiles}
            loading={loading}
            usersLoading={usersLoading}
            loadAllComplaints={loadAllComplaints}
            loadAllRequests={loadAllRequests}
            fetchUserProfiles={fetchUserProfiles}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
