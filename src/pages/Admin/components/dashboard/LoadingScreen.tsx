
import React from 'react';
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingScreenProps {
  message?: string;
  error?: string | null;
  onRetry?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Memuat data...", 
  error,
  onRetry 
}) => {
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white p-6 rounded-xl shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="default" className="bg-green-600 hover:bg-green-700">
              Coba Lagi
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6 flex items-center justify-center">
      <div className="text-center bg-white p-6 rounded-xl shadow-md">
        <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
