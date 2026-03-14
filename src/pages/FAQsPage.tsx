import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const FAQ_PAGE_ITEMS = [
  {
    question: "How long does it take for my promo to go live?",
    answer:
      "Most listings go live within 5–7 working days of payment being received. Mega Promo packages are prioritised and typically go live within 3 working days.",
  },
  {
    question: "What areas do you currently cover?",
    answer:
      "We're currently based in East London and cover the surrounding areas for in-person filming. We work UK-wide for remote promotions using assets you provide. Nationwide in-person coverage is coming soon.",
  },
  {
    question: "Do I need to be present for filming?",
    answer:
      "Not always. For in-person packages, we'll arrange a convenient time to visit. For remote listings, you simply upload your photos, videos, or assets during the submission process and we handle the rest.",
  },
  {
    question: "Which social media platforms will my promo be posted on?",
    answer:
      "It depends on your chosen package. Basic Promo covers 1 platform (TikTok or Instagram Reels). Full Promo covers 2 platforms (TikTok + Instagram Reels). Mega Promo covers all platforms: TikTok, Instagram Reels, YouTube Shorts, X, and Story posts.",
  },
  {
    question: "Can I request edits or changes after my promo is posted?",
    answer:
      "One round of revisions is included in Full Promo and Mega Promo packages. Basic Promo does not include revisions. Additional revision rounds can be purchased separately.",
  },
  {
    question: "What categories can I list in?",
    answer:
      "We currently accept listings in: Businesses & Brands, Property (Houses/Apartments/Commercial), Restaurants & Food, Cars & Vehicles, Events & Experiences, Services & Freelancers, Fashion & Retail, Health & Wellness, Tech & Gadgets, and Education & Coaching.",
  },
  {
    question: "Is my listing fee refundable?",
    answer:
      "All listing fees are non-refundable once payment is confirmed. Please review your selected package carefully before completing checkout. If you have any questions before purchasing, contact us first.",
  },
  {
    question: "How do I track the performance of my promo?",
    answer:
      "After 7 days of your promo going live, we send you a performance report by email showing total views, engagement rate, reach, and platform breakdown.",
  },
  {
    question: "Can I submit more than one listing?",
    answer:
      "Yes! You can submit as many listings as you like. Each listing requires its own fee. Bulk discount pricing is coming soon.",
  },
  {
    question: "How do I contact you if I have an issue?",
    answer:
      "Email us at hello@seenhq.co.uk or use the contact form on our website. We respond within 1 working day.",
  },
];

const FAQsPage = () => {
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
            Frequently Asked <span className="text-gradient-orange">Questions</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            Everything you need to know about Seen HQ.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_PAGE_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-gradient-card px-6"
              >
                <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 text-center">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Still have <span className="text-gradient-orange">questions?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 font-body">
            We're happy to help before you commit to a listing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:hello@seenhq.co.uk">Contact Us</a>
            </Button>
            <Button variant="hero-ghost" size="lg" asChild>
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQsPage;
