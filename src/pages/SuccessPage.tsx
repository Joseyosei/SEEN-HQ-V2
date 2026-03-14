import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PartyPopper, ArrowRight, Share2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 pt-32 pb-16 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8 animate-pulse-glow">
            <PartyPopper className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
            You're on the list! 🎉
          </h1>

          <p className="text-lg text-muted-foreground font-body max-w-md mx-auto mb-8">
            Thank you for submitting your listing. Here's what happens next:
          </p>

          <div className="rounded-xl border border-border bg-gradient-card p-8 text-left space-y-4 mb-10">
            {[
              "We'll review your submission within 24 hours",
              "Our team will get in touch to arrange filming",
              "Your content will be filmed and edited professionally",
              "We'll post across your selected platforms",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-orange flex items-center justify-center text-primary-foreground text-xs font-heading font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm font-body text-foreground/90">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                Back to Home <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="hero-ghost" size="lg">
              <Share2 className="mr-2 w-4 h-4" /> Share on Social Media
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
