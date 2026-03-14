import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const packages = [
  {
    name: "Basic Promo",
    tier: "Starter",
    price: 49,
    popular: false,
    features: [
      "1 short-form promotional video",
      "Posted on 1 platform (TikTok or Instagram Reels)",
      "Professional caption and hashtags",
      "Delivered within 5–7 working days",
    ],
  },
  {
    name: "Full Promo",
    tier: "Popular",
    price: 99,
    popular: true,
    features: [
      "2 short-form promotional videos",
      "Posted on 2 platforms (TikTok + Instagram Reels)",
      "Professional captions and hashtags",
      "1 round of revisions included",
      "Performance report after 7 days",
      "Delivered within 5–7 working days",
    ],
  },
  {
    name: "Mega Promo",
    tier: "Premium",
    price: 199,
    popular: false,
    features: [
      "4 short-form promotional videos",
      "Posted on ALL platforms (TikTok, Reels, Shorts, X, Stories)",
      "Professional captions and hashtags",
      "1 round of revisions included",
      "7-day active promotion window",
      "Priority turnaround (3 working days)",
      "Full performance report",
    ],
  },
];

const comparisonRows = [
  { label: "Number of videos", basic: "1", full: "2", mega: "4" },
  { label: "Platforms covered", basic: "1", full: "2", mega: "All (5+)" },
  { label: "Captions & hashtags", basic: true, full: true, mega: true },
  { label: "Revisions", basic: false, full: true, mega: true },
  { label: "Performance report", basic: false, full: true, mega: true },
  { label: "Turnaround time", basic: "5–7 days", full: "5–7 days", mega: "3 days" },
  { label: "Price", basic: "£49", full: "£99", mega: "£199" },
];

const miniFaqs = [
  {
    q: "Can I upgrade my package after paying?",
    a: "Contact us within 24 hours of payment and we'll arrange an upgrade for the price difference.",
  },
  {
    q: "Do you offer discounts for multiple listings?",
    a: "Bulk pricing is coming soon. Contact us to discuss.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe. Apple Pay and Google Pay also supported.",
  },
];

const CellValue = ({ value }: { value: boolean | string }) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-primary mx-auto" />
    ) : (
      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="text-sm font-body">{value}</span>;
};

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="container px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-extrabold mb-4"
          >
            Simple, Transparent <span className="text-gradient-orange">Pricing</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            One-time listing fee. No subscriptions. No hidden costs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  pkg.popular
                    ? "border-primary glow-primary bg-gradient-card"
                    : "border-border bg-gradient-card"
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-orange text-primary-foreground border-0 font-heading">
                    Most Popular
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground font-body uppercase tracking-wider mb-2">
                  {pkg.tier}
                </p>
                <h3 className="text-2xl font-heading font-bold mb-1">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-heading font-extrabold">£{pkg.price}</span>
                  <span className="text-muted-foreground font-body text-sm ml-1">one-time</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-body">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.popular ? "hero" : "hero-ghost"}
                  className="w-full"
                  asChild
                >
                  <Link to="/submit">Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-10">
            Compare <span className="text-gradient-orange">packages</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="p-4 font-heading font-semibold text-sm">Feature</th>
                  <th className="p-4 font-heading font-semibold text-sm text-center">Basic</th>
                  <th className="p-4 font-heading font-semibold text-sm text-center text-primary">Full</th>
                  <th className="p-4 font-heading font-semibold text-sm text-center">Mega</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="p-4 font-body text-sm">{row.label}</td>
                    <td className="p-4 text-center"><CellValue value={row.basic} /></td>
                    <td className="p-4 text-center"><CellValue value={row.full} /></td>
                    <td className="p-4 text-center"><CellValue value={row.mega} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Secure Payment Banner */}
      <section className="py-12">
        <div className="container px-4">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-lg md:text-xl font-heading font-bold">
              🔒 All payments are secure and processed via Stripe. Listing fees are non-refundable once paid.
            </p>
          </div>
        </div>
      </section>

      {/* Mini FAQs */}
      <section className="py-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-10">
            Have questions about <span className="text-gradient-orange">pricing?</span>
          </h2>
          <div className="space-y-8">
            {miniFaqs.map((faq) => (
              <div key={faq.q}>
                <h4 className="font-heading font-semibold mb-1">{faq.q}</h4>
                <p className="text-muted-foreground font-body text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="hero-ghost" asChild>
              <Link to="/faqs">See all FAQs →</Link>
            </Button>
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
            Join businesses across the UK already using Seen HQ.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/submit">List Your Business Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
