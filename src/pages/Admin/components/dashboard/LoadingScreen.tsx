
import React from 'react';
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Memeriksa hak akses..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
