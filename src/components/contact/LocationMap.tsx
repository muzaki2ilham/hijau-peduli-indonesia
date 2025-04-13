
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const LocationMap = () => {
  const address = "Jl. Nila No.11, Tegalsari, Kec. Tegal Bar., Kota Tegal, Jawa Tengah 52111";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const handleOpenGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Lokasi Kami</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi DLH Kota Tegal"
            className="w-full h-full"
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 text-green-600 hover:bg-green-50 flex items-center justify-center gap-2"
          onClick={handleOpenGoogleMaps}
        >
          <ExternalLink className="h-4 w-4" />
          Lihat di Google Maps
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
