
import React from 'react';
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick}
      className="flex items-center gap-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Kembali ke Dashboard
    </Button>
  );
};

export default BackButton;
