
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Users, MessageSquare, FileText } from "lucide-react";

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
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.allSettled([
        fetchDashboardData(),
        fetchUserProfiles()
      ]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                userProfiles.length
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keluhan Baru</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                recentComplaints.length
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permohonan Baru</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                recentRequests.length
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Keluhan Terbaru</CardTitle>
              <CardDescription>5 keluhan terbaru yang masuk</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
              </div>
            ) : recentComplaints.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Belum ada keluhan</p>
            ) : (
              <div className="space-y-3">
                {recentComplaints.slice(0, 5).map((complaint, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p className="font-medium text-sm">{complaint.name}</p>
                    <p className="text-xs text-gray-600">{complaint.complaint_type}</p>
                    <p className="text-xs text-gray-500">{complaint.location}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permohonan Terbaru</CardTitle>
            <CardDescription>5 permohonan layanan terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
              </div>
            ) : recentRequests.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Belum ada permohonan</p>
            ) : (
              <div className="space-y-3">
                {recentRequests.slice(0, 5).map((request, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <p className="font-medium text-sm">{request.name}</p>
                    <p className="text-xs text-gray-600">{request.service_type}</p>
                    <p className="text-xs text-gray-500">{request.address}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
