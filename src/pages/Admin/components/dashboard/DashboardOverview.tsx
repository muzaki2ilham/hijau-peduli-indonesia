
import React from 'react';
import ComplaintsPanel from '../../components/ComplaintsPanel';
import RequestsPanel from '../../components/RequestsPanel';
import UsersPanel from '../../components/UsersPanel';

interface DashboardOverviewProps {
  recentComplaints: any[];
  recentRequests: any[];
  userProfiles: any[];
  loading: boolean;
  usersLoading: boolean;
  fetchDashboardData: () => Promise<void>;
  fetchUserProfiles: () => Promise<void>;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  recentComplaints,
  recentRequests,
  userProfiles,
  loading,
  usersLoading,
  fetchDashboardData,
  fetchUserProfiles
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <ComplaintsPanel 
          complaints={recentComplaints} 
          loading={loading} 
          onRefresh={fetchDashboardData}
        />

        {/* Recent Requests */}
        <RequestsPanel 
          requests={recentRequests} 
          loading={loading} 
          onRefresh={fetchDashboardData}
        />
      </div>
      
      {/* User Profiles */}
      <UsersPanel 
        users={userProfiles} 
        loading={usersLoading} 
        onRefresh={fetchUserProfiles}
      />
    </div>
  );
};

export default DashboardOverview;
