
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ComplaintHeader from "./complaint/ComplaintHeader";
import ComplaintForm from "./complaint/ComplaintForm";
import { useComplaintForm } from "./complaint/useComplaintForm";

const ComplaintTab = () => {
  const { 
    formData, 
    handleChange, 
    handleSubmit, 
    handleFileChange, 
    isSubmitting, 
    user,
    selectedFileName 
  } = useComplaintForm();

  return (
    <Card>
      <ComplaintHeader />
      <CardContent>
        <ComplaintForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          isSubmitting={isSubmitting}
          isUserEmailReadOnly={!!user?.email}
          selectedFileName={selectedFileName}
        />
      </CardContent>
    </Card>
  );
};

export default ComplaintTab;
