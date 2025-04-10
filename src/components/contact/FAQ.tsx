
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">Pertanyaan Umum</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800">Bagaimana cara melaporkan masalah lingkungan?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Anda dapat melaporkan masalah lingkungan melalui menu Layanan Masyarakat {'>'}{'>'} Pengaduan
              di website ini, mengirim email ke pengaduan@dlh.go.id, atau menghubungi hotline kami di 0800-1234-5678.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800">Apa saja layanan yang disediakan oleh Dinas Lingkungan Hidup?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Dinas Lingkungan Hidup menyediakan berbagai layanan seperti pengangkutan sampah, pengolahan limbah,
              pemantauan kualitas lingkungan, edukasi lingkungan, dan konsultasi lingkungan.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800">Bagaimana cara mengajukan permohonan izin lingkungan?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Untuk mengajukan permohonan izin lingkungan, Anda dapat mengunjungi kantor Dinas Lingkungan Hidup
              dengan membawa dokumen-dokumen yang diperlukan atau menghubungi kami melalui email untuk informasi lebih lanjut.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800">Apakah ada program edukasi lingkungan untuk sekolah?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Ya, kami memiliki program edukasi lingkungan untuk sekolah yang dapat disesuaikan dengan kebutuhan.
              Untuk informasi lebih lanjut, silakan hubungi bagian Edukasi Lingkungan kami melalui email atau telepon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
