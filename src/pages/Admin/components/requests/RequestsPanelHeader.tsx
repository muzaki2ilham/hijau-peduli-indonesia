
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardList, RefreshCw } from "lucide-react";

interface RequestsPanelHeaderProps {
  showAll: boolean;
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
}

const RequestsPanelHeader: React.FC<RequestsPanelHeaderProps> = ({
  showAll,
  onRefresh,
  isRefreshing
}) => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-blue-500" />
          {showAll ? "Data Permohonan" : "Permohonan Layanan Terbaru"}
        </CardTitle>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span className="ml-1">Refresh</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default RequestsPanelHeader;
