import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/seen-hq-logo.jpg" alt="Seen HQ" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-2xl font-heading font-extrabold">
                Seen<span className="text-gradient-orange">HQ</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-body max-w-sm mb-4">
              We film, we post, we promote - you get results. Professional short-form video promotion for UK businesses and sellers.
            </p>
            <p className="text-muted-foreground text-sm font-body">
              hello@seenhq.co.uk
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Links</h4>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/categories" className="text-foreground/80 hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/results" className="text-foreground/80 hover:text-primary transition-colors">Results</Link></li>
              <li><Link to="/media-hub" className="text-foreground/80 hover:text-primary transition-colors">Media Hub</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/submit" className="text-foreground/80 hover:text-primary transition-colors">Submit a Listing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Social</h4>
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "X", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <span className="text-xs font-heading font-bold">{s.label[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground text-xs font-body">
            © {new Date().getFullYear()} Seen HQ. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors" aria-label="Admin">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
