import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-foreground/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-foreground/20 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-up">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            <span className="text-sm font-medium text-primary-foreground">
              Join our community of givers
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Let Unwanted Items Find the Right Home
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            HeartShare Platform connects generous donors with those in need. Give your unused items a second life and make a real difference in someone's day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/donate" className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                I Want to Donate
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/#items" className="flex items-center gap-2">
                I Want to Claim
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">500+</div>
              <div className="text-sm text-primary-foreground/70">Items Donated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">300+</div>
              <div className="text-sm text-primary-foreground/70">Happy Recipients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">50+</div>
              <div className="text-sm text-primary-foreground/70">Communities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
