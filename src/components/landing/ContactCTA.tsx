import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactCTA = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Not sure yet? <span className="text-gradient-orange">Talk to us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            Get a free consultation. We'll help you choose the right package for your needs.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-2">Message sent!</h3>
            <p className="text-muted-foreground font-body">We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border bg-gradient-card p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="font-heading text-xs">Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 bg-card border-border"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <Label className="font-heading text-xs">Email *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 bg-card border-border"
                  maxLength={255}
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-heading text-xs">Message *</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 bg-card border-border"
                rows={4}
                maxLength={1000}
                required
              />
            </div>
            <Button variant="hero" className="w-full py-6 text-base" disabled={loading}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default ContactCTA;
