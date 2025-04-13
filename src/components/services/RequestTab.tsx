
import React, { useState } from "react";
import RequestListView from "./RequestListView";
import RequestFormView from "./RequestFormView";

const RequestTab = () => {
  const [activeRequestTab, setActiveRequestTab] = useState<string>("list");
  const [selectedService, setSelectedService] = useState<string>("");
  
  const handleServiceRequest = (service: string) => {
    setSelectedService(service);
    setActiveRequestTab("form");
  };
  
  const handleSubmitSuccess = () => {
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
          onSubmit={handleSubmitSuccess}
          onBack={handleBackToList}
        />
      )}
    </>
  );
};

export default RequestTab;
