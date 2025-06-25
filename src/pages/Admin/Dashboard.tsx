
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
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
    isInitialLoading,
    error,
    fetchUserProfiles,
    fetchAllComplaints,
    fetchAllRequests,
    fetchDashboardData
  } = useAdminDashboard();
  
  const { isAdmin, isInitialLoading: authLoading, handleLogout } = useAdminAccess();
  
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [allComplaints, setAllComplaints] = useState<any[]>([]);
  const [allRequests, setAllRequests] = useState<any[]>([]);

  // Handle tab changes with lazy loading
  useEffect(() => {
    if (!isAdmin || isInitialLoading) return;
    
    const loadTabData = async () => {
      try {
        if (activeTab === "complaints" && allComplaints.length === 0) {
          console.log("Loading complaints for tab...");
          const complaints = await fetchAllComplaints();
          setAllComplaints(complaints);
        } else if (activeTab === "requests" && allRequests.length === 0) {
          console.log("Loading requests for tab...");
          const requests = await fetchAllRequests();
          setAllRequests(requests);
        } else if (activeTab === "users" && userProfiles.length === 0) {
          console.log("Loading users for tab...");
          await fetchUserProfiles();
        }
      } catch (error) {
        console.error("Error loading tab data:", error);
      }
    };

    loadTabData();
  }, [activeTab, isAdmin, isInitialLoading]);

  const handleRetry = () => {
    window.location.reload();
  };

  // Show loading indicator while checking admin status
  if (authLoading) {
    return <LoadingScreen message="Memeriksa hak akses..." />;
  }

  // Only show content if user is admin
  if (!isAdmin) {
    return <LoadingScreen message="Mengarahkan..." />;
  }

  // Show loading for initial data fetch
  if (isInitialLoading) {
    return <LoadingScreen 
      message="Memuat dashboard..." 
      error={error} 
      onRetry={handleRetry}
    />;
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
            loadAllComplaints={async () => {
              const complaints = await fetchAllComplaints();
              setAllComplaints(complaints);
            }}
            loadAllRequests={async () => {
              const requests = await fetchAllRequests();
              setAllRequests(requests);
            }}
            fetchUserProfiles={fetchUserProfiles}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
