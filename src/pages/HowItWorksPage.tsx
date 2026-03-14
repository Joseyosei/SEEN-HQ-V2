import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardList, Video, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Submit Your Listing",
    description:
      "Choose your category, pick a package, fill in your details, and pay your listing fee online. Takes less than 5 minutes.",
  },
  {
    num: "02",
    icon: Video,
    title: "We Film Your Promo",
    description:
      "Our founder visits your location or works with your provided assets to create short-form video content tailored to your brand.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "We Post & You Get Seen",
    description:
      "Your promo goes live across TikTok, Instagram Reels, YouTube Shorts, and more - reaching thousands of potential customers.",
  },
];

const platforms = [
  { name: "TikTok", letter: "T" },
  { name: "Instagram", letter: "I" },
  { name: "YouTube", letter: "Y" },
  { name: "X", letter: "X" },
  { name: "Snapchat", letter: "S" },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="container px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-extrabold mb-4"
          >
            How Seen HQ <span className="text-gradient-orange">Works</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 font-body">
            From submission to social media - we handle everything.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/submit">Start Your Listing</Link>
          </Button>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-24">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
            Three simple steps to <span className="text-gradient-orange">get seen</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-2xl border border-border bg-gradient-card p-8"
              >
                <span className="absolute -top-5 left-6 text-4xl font-heading font-extrabold text-gradient-orange">
                  {step.num}
                </span>
                <div className="mt-4 mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">
            Where your promo gets <span className="text-gradient-orange">posted</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="w-24 h-24 rounded-2xl border border-border bg-gradient-card flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl font-heading font-extrabold text-primary">{p.letter}</span>
                <span className="text-xs text-muted-foreground font-body">{p.name}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm font-body">
            Platform availability depends on your chosen package.
          </p>
        </div>
      </section>

      {/* Turnaround Banner */}
      <section className="py-12">
        <div className="container px-4">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-xl md:text-2xl font-heading font-bold">
              ⚡ Most listings go live within <span className="text-gradient-orange">5–7 working days</span> of payment.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 text-center">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Ready to get <span className="text-gradient-orange">promoted?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 font-body">
            Join businesses, restaurants, property sellers and more already on Seen HQ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/submit">List Your Business</Link>
            </Button>
            <Button variant="hero-ghost" size="lg" asChild>
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
