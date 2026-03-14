import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const Testimonials = () => {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Trusted by <span className="text-gradient-orange">sellers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Hear from people who've used Seen HQ to grow their reach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-8 bg-gradient-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/90 font-body mb-6 leading-relaxed">
                "{t.quote}"
              </p>
              <div>
                <p className="font-heading font-bold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
