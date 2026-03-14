import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CATEGORIES } from "@/lib/constants";

const categoryDescs: Record<string, string> = {
  businesses: "Get your brand in front of thousands of local and national customers.",
  property: "Sell faster with a professional short-form video tour of your property.",
  restaurants: "Showcase your menu, atmosphere, and deals to hungry local audiences.",
  cars: "Reach serious buyers with a dynamic video walkthrough of your vehicle.",
  events: "Sell more tickets and build hype for your upcoming event.",
  services: "Promote your skills and services to clients actively searching online.",
  fashion: "Put your products in front of style-conscious shoppers on every platform.",
  health: "Reach people who are actively investing in their wellbeing.",
  tech: "Showcase your product to an engaged, tech-savvy audience.",
  education: "Grow your student base with compelling promotional content.",
};

const CategoriesPage = () => {
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
            What Can We <span className="text-gradient-orange">Promote?</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            From local restaurants to luxury properties - if you want it seen, we'll promote it.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border overflow-hidden flex flex-col"
              >
                <div className="group relative h-48 overflow-hidden">
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:via-background/30 transition-all duration-500" />
                </div>
                <div className="p-8 pt-4 flex flex-col flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2">{cat.label}</h3>
                  <p className="text-muted-foreground font-body mb-6 flex-1">{categoryDescs[cat.id] || ""}</p>
                  <Button variant="hero" size="sm" className="self-start" asChild>
                    <Link to={`/submit?category=${cat.id}`}>
                      List in this category <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure Banner */}
      <section className="py-12">
        <div className="container px-4">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-2">Not sure which category fits you?</h3>
            <p className="text-muted-foreground font-body mb-6">
              Contact us and we'll help you find the right fit.
            </p>
            <Button variant="hero" asChild>
              <a href="mailto:hello@seenhq.co.uk">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
