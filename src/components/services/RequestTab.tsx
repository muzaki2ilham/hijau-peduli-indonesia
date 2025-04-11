
import React, { useState } from "react";
import RequestListView from "./RequestListView";
import RequestFormView from "./RequestFormView";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RequestTab = () => {
  const [activeRequestTab, setActiveRequestTab] = useState<string>("list");
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();
  
  const handleServiceRequest = (service: string) => {
    setSelectedService(service);
    setActiveRequestTab("form");
  };
  
  const handleSubmitRequest = async (e: React.FormEvent) => {
    // Prevent default form submission
    if (e) e.preventDefault();
    
    try {
      // Will be handled by the RequestFormView component now
      // The actual submission to Supabase happens there
      
      toast({
        title: "Permohonan Terkirim",
        description: `Permohonan ${selectedService} Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`,
      });
      
      // Return to list view after successful submission
      setActiveRequestTab("list");
    } catch (error) {
      console.error("Error in handleSubmitRequest:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengirim permohonan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    }
  };

  const handleBackToList = () => {
    setActiveRequestTab("list");
  };

  return (
    <>
      {activeRequestTab === "list" ? (
        <RequestListView onServiceSelect={handleServiceRequest} />
      ) : (
        <RequestFormView 
          selectedService={selectedService} 
          onSubmit={handleSubmitRequest}
          onBack={handleBackToList}
        />
      )}
    </>
  );
};

export default RequestTab;
