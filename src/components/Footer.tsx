import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/mmn-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="gradient-primary py-12">
        <div className="container text-center">
          <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2">
            Stay Connected
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto text-sm">
            Subscribe to our newsletter for updates on programs, events, and impact stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-lg bg-background/20 text-primary-foreground placeholder:text-primary-foreground/60 border border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
            <button className="px-6 py-2.5 rounded-lg bg-background text-foreground font-semibold hover:bg-background/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="MMN Logo" className="h-10 w-auto brightness-200" />
              <span className="font-heading font-bold text-lg">MMN</span>
            </Link>
            <p className="text-sm text-background/60 mb-4">
              Empowering young minds to live with purpose through spiritual growth, moral integrity, and academic excellence.
            </p>
            <p className="text-xs text-background/40 italic">
              "Everything Starts and Ends With Purpose."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-background/60">
              {[
                { to: "/about", label: "About Us" },
                { to: "/programs", label: "Programs" },
                { to: "/events", label: "Events" },
                { to: "/blog", label: "Blog" },
                { to: "/impact", label: "Impact" },
                { to: "/get-involved", label: "Get Involved" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="hover:text-background transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Get Involved</h4>
            <nav className="flex flex-col gap-2 text-sm text-background/60">
              <Link to="/get-involved" className="hover:text-background transition-colors">Volunteer</Link>
              <Link to="/get-involved" className="hover:text-background transition-colors">Become a Mentor</Link>
              <Link to="/get-involved" className="hover:text-background transition-colors">Partner With Us</Link>
              <Link to="/get-involved" className="hover:text-background transition-colors">Donate</Link>
              <Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-background/60">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info@meaningmatters.org</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Purpose Drive, Suite 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/40">
          <p>© 2026 MeaningMatters Network (MMN). All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-destructive" /> for purpose-driven youth
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
