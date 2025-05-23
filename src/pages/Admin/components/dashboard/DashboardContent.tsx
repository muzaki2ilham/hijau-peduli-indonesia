
import React from 'react';
import { CardContent } from "@/components/ui/card";
import AdminMenu from '../../components/AdminMenu';
import BackButton from './BackButton';

interface DashboardContentProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activeTab, onNavigate }) => {
  return (
    <CardContent>
      {activeTab === "dashboard" ? (
        <AdminMenu onNavigate={onNavigate} />
      ) : (
        <div className="mb-4">
          <BackButton onClick={() => onNavigate("dashboard")} />
        </div>
      )}
    </CardContent>
  );
};

export default DashboardContent;
