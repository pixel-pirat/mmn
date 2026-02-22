import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/mmn-logo.png";

const Footer = () => {
  return (
    <footer className="gradient-dark text-primary-foreground">
      {/* Newsletter */}
      <div className="gradient-primary py-14">
        <div className="container text-center">
          <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2 tracking-tight">
            Stay Connected
          </h3>
          <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto text-sm">
            Subscribe to our newsletter for updates on programs, events, and impact stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/15 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 backdrop-blur-sm"
            />
            <button className="px-6 py-2.5 rounded-xl bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 transition-colors shadow-elevated">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src={logo} alt="MMN Logo" className="h-10 w-auto brightness-200" />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-base">MeaningMatters</span>
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary-foreground/50">
                  Network
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/50 mb-4 leading-relaxed">
              Empowering young minds to live with purpose through spiritual growth, moral integrity, and academic excellence.
            </p>
            <p className="text-xs text-primary-foreground/30 italic font-heading">
              "Everything Starts and Ends With Purpose."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-sm tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-primary-foreground/50">
              {[
                { to: "/about", label: "About Us" },
                { to: "/programs", label: "Programs" },
                { to: "/events", label: "Events" },
                { to: "/blog", label: "Blog" },
                { to: "/impact", label: "Impact" },
                { to: "/get-involved", label: "Get Involved" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="hover:text-primary-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-sm tracking-wide">Get Involved</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-primary-foreground/50">
              <Link to="/get-involved" className="hover:text-primary-foreground transition-colors">Volunteer</Link>
              <Link to="/get-involved" className="hover:text-primary-foreground transition-colors">Become a Mentor</Link>
              <Link to="/get-involved" className="hover:text-primary-foreground transition-colors">Partner With Us</Link>
              <Link to="/get-involved" className="hover:text-primary-foreground transition-colors">Donate</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-sm tracking-wide">Contact</h4>
            <div className="flex flex-col gap-3.5 text-sm text-primary-foreground/50">
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info@meaningmatters.org</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Purpose Drive, Suite 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/30">
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
