
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ComplaintHeader from "./complaint/ComplaintHeader";
import ComplaintForm from "./complaint/ComplaintForm";
import { useComplaintForm } from "./complaint/useComplaintForm";

const ComplaintTab = () => {
  const { formData, handleChange, handleSubmit, isSubmitting, user } = useComplaintForm();

  return (
    <Card>
      <ComplaintHeader />
      <CardContent>
        <ComplaintForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isUserEmailReadOnly={!!user?.email}
        />
      </CardContent>
    </Card>
  );
};

export default ComplaintTab;
