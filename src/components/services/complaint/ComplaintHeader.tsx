
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ComplaintHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="text-xl text-green-800">Formulir Pengaduan Lingkungan</CardTitle>
      <CardDescription>
        Laporkan masalah lingkungan di sekitar Anda seperti pembuangan sampah ilegal, pencemaran air, atau polusi udara.
      </CardDescription>
    </CardHeader>
  );
};

export default ComplaintHeader;
