
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-black/5 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-semibold flex items-center gap-2">
              <img 
                src="/lovable-uploads/1bd601ff-cfe9-4f25-b538-588df83756ff.png" 
                alt="Inject AI Robot Logo" 
                className="h-10 w-10"
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Inject AI
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-powered crypto insights platform built on the Injective blockchain,
              providing real-time market analytics and predictive insights.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-foreground transition-colors">
                  Token Reports
                </Link>
              </li>
              <li>
                <Link to="/token-reports" className="text-muted-foreground hover:text-foreground transition-colors">
                  Detailed Token Analysis
                </Link>
              </li>
              <li>
                <Link to="/dao-governance" className="text-muted-foreground hover:text-foreground transition-colors">
                  DAO Governance
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://x.com/Inject_AI" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/InjectAI" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://github.com/Inject-AI" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Inject AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
