
import React from 'react';
import ComplaintsPanel from '../../components/ComplaintsPanel';
import RequestsPanel from '../../components/RequestsPanel';
import UsersPanel from '../../components/UsersPanel';
import GalleryManagement from '../../components/GalleryManagement';
import BlogManagement from '../../components/BlogManagement';
import ProgramsManagement from '../../components/ProgramsManagement';
import DepartmentInfoManagement from '../../components/DepartmentInfoManagement';

interface ContentTabsProps {
  activeTab: string;
  allComplaints: any[];
  allRequests: any[];
  userProfiles: any[];
  loading: boolean;
  usersLoading: boolean;
  loadAllComplaints: () => Promise<void>;
  loadAllRequests: () => Promise<void>;
  fetchUserProfiles: () => Promise<void>;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  allComplaints,
  allRequests,
  userProfiles,
  loading,
  usersLoading,
  loadAllComplaints,
  loadAllRequests,
  fetchUserProfiles
}) => {
  if (activeTab === "dashboard") return null;
  
  return (
    <>
      {activeTab === "complaints" && (
        <ComplaintsPanel 
          complaints={allComplaints} 
          loading={loading} 
          showAll={true} 
          onRefresh={loadAllComplaints}
        />
      )}
      {activeTab === "requests" && (
        <RequestsPanel 
          requests={allRequests} 
          loading={loading} 
          showAll={true}
          onRefresh={loadAllRequests} 
        />
      )}
      {activeTab === "users" && (
        <UsersPanel 
          users={userProfiles} 
          loading={usersLoading} 
          showAll={true}
          onRefresh={fetchUserProfiles}
        />
      )}
      {activeTab === "gallery" && <GalleryManagement />}
      {activeTab === "blog" && <BlogManagement />}
      {activeTab === "programs" && <ProgramsManagement />}
      {activeTab === "department" && <DepartmentInfoManagement />}
    </>
  );
};

export default ContentTabs;
