
import React, { useState } from "react";
import RequestListView from "./RequestListView";
import RequestFormView from "./RequestFormView";
import { useToast } from "@/hooks/use-toast";

const RequestTab = () => {
  const [activeRequestTab, setActiveRequestTab] = useState<string>("list");
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();
  
  const handleServiceRequest = (service: string) => {
    setSelectedService(service);
    setActiveRequestTab("form");
  };
  
  // Modify to accept form event parameter to match expected type
  const handleSubmitRequest = (e: React.FormEvent) => {
    // Prevent default form submission
    if (e) e.preventDefault();
    
    toast({
      title: "Permohonan Terkirim",
      description: `Permohonan ${selectedService} Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`,
    });
    setActiveRequestTab("list");
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
