
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TreeDeciduous, Leaf, Recycle, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Program {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  image_url: string | null;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching programs:', error);
        return;
      }

      setPrograms(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (index: number) => {
    const icons = [TreeDeciduous, Leaf, Recycle, Calendar];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="h-6 w-6" />;
  };

  const getCategory = (status: string) => {
    switch (status) {
      case 'active':
        return 'Program Aktif';
      case 'completed':
        return 'Program Selesai';
      default:
        return 'Program';
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Program Lingkungan</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Program-program lingkungan hidup yang diselenggarakan untuk melestarikan dan memperbaiki kualitas lingkungan di Indonesia.
          </p>
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Belum ada program yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-green-50 flex flex-row items-start space-x-4 pb-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    {getIcon(index)}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl text-green-800">{program.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {getCategory(program.status)}
                      </Badge>
                      {program.start_date && (
                        <span className="ml-2 text-sm text-gray-500">
                          {formatDate(program.start_date)}
                          {program.end_date && ` - ${formatDate(program.end_date)}`}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <Button variant="outline" className="text-green-600 hover:bg-green-50" asChild>
                    <Link to={`/programs/${program.id}`}>Lihat Detail</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Jadwal Kegiatan</h2>
          <p className="text-gray-600 mb-6">
            Lihat jadwal lengkap kegiatan lingkungan hidup yang akan diadakan dalam waktu dekat.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">Lihat Kalender Kegiatan</Button>
        </div>
      </div>
    </div>
  );
};

export default Programs;
