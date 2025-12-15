import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DonateForm } from "@/components/DonateForm";
import { Heart, Sparkles, Users, Recycle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Donate = () => {
  return (
    <>
      <Helmet>
        <title>Donate an Item - HeartShare Platform</title>
        <meta
          name="description"
          content="Donate your unused items to those who need them. Upload a photo, describe your item, and help someone in your community today."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 py-12 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Info */}
              <div className="lg:sticky lg:top-24">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Make a Difference</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Donate Your Item
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Your unused items can bring joy to someone else. Fill out the form 
                  to list your donation and help build a more connected, caring community.
                </p>

                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Spread Kindness
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Every donation brightens someone's day and strengthens community bonds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Recycle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Reduce Waste
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Give items a second life instead of sending them to landfills.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Connect Locally
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Meet neighbors and build meaningful connections through giving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                <h2 className="text-xl font-bold text-card-foreground mb-6">
                  Item Details
                </h2>
                <DonateForm />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Donate;
