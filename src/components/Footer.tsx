import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-footer-foreground">HeartShare</span>
            </Link>
            <p className="text-footer-muted text-sm leading-relaxed">
              Connecting communities through the spirit of giving. Every item shared is a story of generosity.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-footer-muted text-sm leading-relaxed mb-4">
              HeartShare Platform is a community-driven initiative that connects people who want to donate unused items with those who need them. We believe in sustainability and the power of sharing.
            </p>
            <p className="text-footer-muted text-sm">
              Founded in 2024, we've helped thousands of items find new homes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#items" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  Donate an Item
                </Link>
              </li>
              <li>
                <a href="#" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-footer-muted text-sm">
                  123 Community Lane, Giving City, GC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+1234567890" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:hello@heartshare.com" className="text-footer-muted text-sm hover:text-primary transition-colors">
                  hello@heartshare.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-footer-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-footer-muted text-sm">
              © 2024 HeartShare Platform. All rights reserved.
            </p>
            <p className="text-footer-muted text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-primary" fill="currentColor" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
