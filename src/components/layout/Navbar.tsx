import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WalletConnect from "@/components/wallet/WalletConnect";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
    { title: "Token Reports", href: "/token-reports" },
    { title: "DAO Governance", href: "/dao-governance" },
    { title: "Profile", href: "/profile" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold flex items-center gap-2 animate-fade-in"
        >
          <img 
            src="/logo.png" 
            alt="Inject AI Robot Logo" 
            className="h-10 w-10"
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Inject AI
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-secondary text-primary"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <WalletConnect />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/80 backdrop-blur-xl shadow-lg animate-fade-in border-t border-border">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-secondary text-primary"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <WalletConnect className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
