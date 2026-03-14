import { motion } from "framer-motion";
import { Eye, Building2, TrendingUp, Users } from "lucide-react";

const STATS = [
  { icon: Building2, value: "0", label: "Businesses Promoted" },
  { icon: Eye, value: "0", label: "Views Generated" },
  { icon: TrendingUp, value: "10+", label: "Categories Covered" },
  { icon: Users, value: "0%", label: "Client Satisfaction" },
];

const StatsBar = () => {
  return (
    <section className="py-16 border-b border-border bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
              <p className="text-3xl md:text-4xl font-heading font-extrabold text-gradient-orange">
                {stat.value}
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
