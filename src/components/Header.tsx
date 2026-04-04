import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mmn-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/executives", label: "Leadership" },
  { to: "/programs", label: "Programs & Events" },
  { to: "/blog", label: "Blog" },
  { to: "/impact", label: "Impact" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/gallery", label: "Gallery" },
  { to: "/store", label: "Bookstore" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-card border-b"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-[72px]">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="MMN Logo"
            className="h-10 md:h-11 w-auto transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-heading font-bold text-base tracking-tight text-foreground">
              MeaningMatters
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
              Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/get-involved">
            <Button
              size="sm"
              className="gradient-primary border-0 text-primary-foreground shadow-glow hover:opacity-90 transition-opacity font-semibold px-5"
            >
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="lg:hidden bg-background border-t animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/get-involved" onClick={() => setOpen(false)}>
              <Button className="gradient-primary border-0 text-primary-foreground w-full mt-2 font-semibold">
                Donate Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
