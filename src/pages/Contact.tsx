
import ContactInformation from "@/components/contact/ContactInformation";
import LocationMap from "@/components/contact/LocationMap";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information and Location Map */}
          <div className="space-y-6">
            <ContactInformation />
            <LocationMap />
          </div>
          
          {/* Contact Form */}
          <ContactForm />
        </div>
        
        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
};

export default Contact;
