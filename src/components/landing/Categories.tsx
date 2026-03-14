import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CATEGORIES } from "@/lib/constants";

const Categories = () => {
  return (
    <section id="categories" className="py-24 bg-gradient-hero">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What do you want to <span className="text-gradient-orange">promote</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose your category to get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/submit?category=${cat.id}`}
                className="group relative overflow-hidden flex items-end h-36 rounded-xl border border-border hover:border-primary/50 transition-all duration-500 card-glow hover:shadow-lg hover:shadow-primary/10"
              >
                <img src={cat.image} alt={cat.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500" />
                <span className="relative z-10 text-sm font-heading font-semibold text-white p-4 text-center w-full leading-tight">
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
