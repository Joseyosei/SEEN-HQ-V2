import { motion } from "framer-motion";
import { ClipboardList, Video, Megaphone } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Submit your listing",
    description: "Choose your category, pick a package, and fill in your details.",
  },
  {
    icon: Video,
    title: "We film & create",
    description: "Our team creates professional short-form video content for your listing.",
  },
  {
    icon: Megaphone,
    title: "We post & you get seen",
    description: "Your content goes live across social media platforms for maximum reach.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Three simple steps to <span className="text-gradient-orange">get seen</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-3xl font-heading font-extrabold text-primary mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
