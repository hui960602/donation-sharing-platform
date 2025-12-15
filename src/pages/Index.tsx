import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ItemGrid } from "@/components/ItemGrid";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HeartShare Platform - Donate and Share Items with Your Community</title>
        <meta
          name="description"
          content="HeartShare Platform connects generous donors with those in need. Donate unused items or find items you need. Join our community of giving today."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <ItemGrid />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
