import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone, Facebook, Instagram, Youtube, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/api";
import logo from "@/assets/mmn-logo.png";

// Replace these with real social media URLs
const SOCIAL_LINKS = {
  facebook: "https://facebook.com/meaningmattersnetwork",
  instagram: "https://instagram.com/meaningmattersnetwork",
  youtube: "https://youtube.com/@meaningmattersnetwork",
  whatsapp: "https://chat.whatsapp.com/REPLACE_WITH_GROUP_LINK",
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await subscribeNewsletter(email);
      toast.success(res.message);
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleNewsletter}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/15 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 transition-colors shadow-elevated disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Subscribing…</> : "Subscribe"}
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
              <img src={logo} alt="MeaningMatters Network Logo" className="h-10 w-auto brightness-200" />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-base">MeaningMatters</span>
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary-foreground/50">
                  Network
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/50 mb-4 leading-relaxed">
              Committed to helping individuals discover their identity, unlock their potential, and live purposeful, impactful lives.
            </p>
            <p className="text-xs text-primary-foreground/30 italic font-heading mb-5">
              "Everything Starts and Ends With Purpose."
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-[#E1306C] transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-[#FF0000] transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Community" className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-sm tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-primary-foreground/50">
              {[
                { to: "/about", label: "About Us" },
                { to: "/programs", label: "Programs & Events" },
                { to: "/blog", label: "Blog" },
                { to: "/impact", label: "Impact" },
                { to: "/gallery", label: "Gallery" },
                { to: "/store", label: "Bookstore" },
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
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Join WhatsApp Community</a>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-5 text-sm tracking-wide">Contact</h4>
            <div className="flex flex-col gap-3.5 text-sm text-primary-foreground/50">
              <a href="mailto:info@meaningmatters.org" className="flex items-start gap-2.5 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info@meaningmatters.org</span>
              </a>
              <a href="tel:+233537081030" className="flex items-start gap-2.5 hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+233 53 708 1030</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>V151 Darko Street<br />Accra, Ghana</span>
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
