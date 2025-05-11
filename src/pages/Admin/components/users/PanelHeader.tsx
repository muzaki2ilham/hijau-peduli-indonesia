
import React from 'react';
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, RefreshCw, Loader2 } from "lucide-react";

interface PanelHeaderProps {
  showAll: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const PanelHeader = ({ showAll, onRefresh, isRefreshing }: PanelHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <CardTitle className="text-xl flex items-center">
        <UserIcon className="mr-2 h-5 w-5 text-purple-500" />
        {showAll ? "Data Pengguna" : "Pengguna Terdaftar"}
      </CardTitle>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-1"
      >
        {isRefreshing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        <span>Refresh</span>
      </Button>
    </div>
  );
};
