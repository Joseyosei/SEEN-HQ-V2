import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

const HERO_STATS = [
  { value: "2", label: "Businesses Promoted" },
  { value: "467", label: "Views Generated" },
  { value: "100K", label: "Business Goal" },
  { value: "100%", label: "Client Satisfaction" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-[-15%] right-[-8%] w-[550px] h-[550px] rounded-full bg-primary/12 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[350px] h-[350px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[200px] h-[200px] rounded-full bg-primary/6 blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Decorative ring */}
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full border border-primary/6 pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-primary/4 pointer-events-none" />

      <div className="container relative z-10 px-4 pt-28 pb-24">
        <div className="max-w-5xl">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 backdrop-blur"
          >
            <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-xs font-body font-semibold text-primary tracking-widest uppercase">
              Filmed with Meta AI Glasses
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,11vw,8.5rem)] font-heading font-extrabold leading-[0.88] tracking-tight text-foreground mb-6"
          >
            Get seen.
            <br />
            <span className="text-gradient-orange">Get sold.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-body leading-relaxed mb-10"
          >
            We film your business with Meta AI Glasses, post it across TikTok, Instagram &amp; YouTube — and make you impossible to scroll past.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Button
              variant="hero"
              size="lg"
              className="text-base px-8 py-6 glow-orange-btn transition-all duration-300"
              asChild
            >
              <Link to="/submit">
                List Your Business
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-base px-8 py-6 bg-transparent border border-border text-foreground/80 hover:text-foreground hover:bg-muted/50 hover:border-primary/30 transition-all duration-300"
              asChild
            >
              <Link to="/clients">
                See Our Clients
              </Link>
            </Button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-border"
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.06 }}
              >
                <p className="text-2xl md:text-3xl font-heading font-extrabold text-gradient-orange">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
