import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PACKAGES } from "@/lib/constants";

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Simple, transparent <span className="text-gradient-orange">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One-time listing fees. No subscriptions. Pay once, get promoted.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border ${
                pkg.popular
                  ? "border-primary bg-gradient-card glow-primary"
                  : "border-border bg-gradient-card"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-orange text-primary-foreground text-xs font-heading font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm text-muted-foreground font-body mb-1">{pkg.tier}</p>
                <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-extrabold">£{pkg.price}</span>
                  <span className="text-muted-foreground text-sm">one-time</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-body">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? "hero" : "outline"}
                className="w-full py-5"
                asChild
              >
                <Link to={`/submit?package=${pkg.id}`}>
                  Get Started
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
