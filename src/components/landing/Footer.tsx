import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/seen-hq-logo.jpg" alt="Seen HQ" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-2xl font-heading font-extrabold">
                Seen<span className="text-gradient-orange">HQ</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-body max-w-sm mb-4">
              We film, we post, we promote — you get results. Professional short-form video promotion for UK businesses and sellers.
            </p>
            <p className="text-muted-foreground text-sm font-body mb-6">
              hello@seenhq.co.uk
            </p>
            {/* Social icons */}
            <SocialLinks iconSize="sm" />
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Links</h4>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/clients" className="text-foreground/80 hover:text-primary transition-colors">Our Clients</Link></li>
              <li><Link to="/categories" className="text-foreground/80 hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/results" className="text-foreground/80 hover:text-primary transition-colors">Results</Link></li>
              <li><Link to="/media-hub" className="text-foreground/80 hover:text-primary transition-colors">Media Hub</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/submit" className="text-foreground/80 hover:text-primary transition-colors">Submit a Listing</Link></li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Follow Us</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Instagram", href: "https://www.instagram.com/hello.seenhquk?igsh=MWZtc2M0MTdqdzIwag==" },
                { label: "TikTok", href: "https://www.tiktok.com/@seenhq.uk?_r=1&_t=ZN-954TSJHMPwc" },
                { label: "YouTube", href: "https://youtube.com/@seenhquk?si=CgO9Fei5UMsIRmRW" },
                { label: "X / Twitter", href: "https://x.com/seenhquk?s=21" },
                { label: "Threads", href: "https://www.threads.com/@hello.seenhquk?igshid=NTc4MTIwNjQ2YQ==" },
                { label: "Facebook", href: "https://www.facebook.com/share/17UcM4BSdH/?mibextid=wwXIfr" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/seen-hq/" },
                { label: "Bluesky", href: "https://bsky.app/profile/seenhq.bsky.social" },
                { label: "Lemon8", href: "https://www.lemon8-app.com/@seenhq.uk?region=gb" },
                { label: "Tumblr", href: "https://www.tumblr.com/seenhq" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-foreground/70 hover:text-primary transition-colors"
                >
                  {s.label}
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
