
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Phone, ClipboardList } from "lucide-react";
import ComplaintTab from "@/components/services/ComplaintTab";
import ConsultationTab from "@/components/services/ConsultationTab";
import RequestTab from "@/components/services/RequestTab";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Layanan Masyarakat</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan berbagai layanan untuk membantu masyarakat dalam pelaporan dan konsultasi terkait lingkungan hidup.
          </p>
        </div>

        <Tabs defaultValue="complaint" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="complaint" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Pengaduan
            </TabsTrigger>
            <TabsTrigger value="consultation" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Konsultasi
            </TabsTrigger>
            <TabsTrigger value="request" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" /> Permohonan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="complaint">
            <ComplaintTab />
          </TabsContent>
          
          <TabsContent value="consultation">
            <ConsultationTab />
          </TabsContent>
          
          <TabsContent value="request">
            <RequestTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
