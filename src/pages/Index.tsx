import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import SocialStrip from "@/components/landing/SocialStrip";
import PlatformLogos from "@/components/landing/PlatformLogos";
import HowItWorks from "@/components/landing/HowItWorks";
import Categories from "@/components/landing/Categories";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import ContactCTA from "@/components/landing/ContactCTA";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Seen HQ - Professional Video Promotion for UK Businesses"
        description="Get seen. Get sold. Professional short-form video content for your business, property, or product. Filmed with Meta AI Glasses."
        path="/"
      />
      <Navbar />
      <Hero />
      <StatsBar />
      <SocialStrip />
      <PlatformLogos />
      <HowItWorks />
      <Categories />
      <Pricing />
      <Testimonials />
      <ContactCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
