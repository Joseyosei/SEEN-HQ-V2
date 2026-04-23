import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";

const SocialStrip = () => {
  return (
    <section className="py-14 border-y border-border bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-heading font-extrabold mb-1">
              Follow our journey
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              We're active on 10 platforms — catch our latest content and client features.
            </p>
          </div>
          <SocialLinks iconSize="md" animate={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default SocialStrip;
