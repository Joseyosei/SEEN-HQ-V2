import Navbar from "@/components/landing/Navbar";
import ContactCTA from "@/components/landing/ContactCTA";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Us - Seen HQ"
        description="Get in touch with the Seen HQ team. Free consultations for businesses looking for professional video promotion."
        path="/contact"
      />
      <Navbar />
      <div className="pt-16">
        <ContactCTA />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
