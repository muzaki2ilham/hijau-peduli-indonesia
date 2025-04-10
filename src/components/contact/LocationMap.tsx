
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LocationMap = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Lokasi Kami</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Peta Lokasi</p>
          {/* Ini adalah placeholder untuk peta. Dalam implementasi nyata, Anda bisa menggunakan Google Maps atau peta lainnya */}
        </div>
        <Button variant="outline" className="w-full mt-4 text-green-600 hover:bg-green-50">
          Lihat di Google Maps
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
