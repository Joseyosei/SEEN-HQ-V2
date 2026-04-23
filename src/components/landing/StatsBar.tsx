import { motion } from "framer-motion";
import { Eye, Building2, Target, Star } from "lucide-react";

const STATS = [
  { icon: Building2, value: "2", label: "Businesses Promoted", suffix: "" },
  { icon: Eye, value: "467", label: "Views Generated", suffix: "" },
  { icon: Target, value: "100K", label: "Business Goal", suffix: "" },
  { icon: Star, value: "100", label: "Client Satisfaction", suffix: "%" },
];

const StatsBar = () => {
  return (
    <section className="py-16 border-b border-border bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-heading font-extrabold text-gradient-orange">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
