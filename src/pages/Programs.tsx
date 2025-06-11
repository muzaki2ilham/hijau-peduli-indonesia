
import React from "react";
import { Calendar, MapPin, Users, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePrograms } from "@/pages/Admin/hooks/usePrograms";

const Programs = () => {
  const { programs, loading } = usePrograms();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Filter active programs only
  const activePrograms = programs.filter(program => program.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Program Lingkungan Hidup
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berbagai program dan kegiatan yang dirancang untuk meningkatkan kesadaran dan partisipasi masyarakat dalam menjaga kelestarian lingkungan hidup.
          </p>
        </div>

        {activePrograms.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada program tersedia</h3>
            <p className="text-gray-500">Program akan segera hadir. Silakan kembali lagi nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {program.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={program.image_url} 
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-green-800 line-clamp-2">
                      {program.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {program.status === 'active' ? 'Aktif' : 'Selesai'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {program.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    {program.start_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Mulai: {new Date(program.start_date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    )}
                    {program.end_date && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          Selesai: {new Date(program.end_date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
