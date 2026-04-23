import { motion } from "framer-motion";
import { ExternalLink, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";

const CLIENTS = [
  {
    id: "nero-lounge",
    name: "Nero Lounge Restaurant",
    category: "Restaurant & Dining",
    location: "UK",
    logo: "/seen-hq-logo.jpg",
    logoLetter: "N",
    logoColor: "from-yellow-600 to-yellow-800",
    description:
      "Nero Lounge is a premium restaurant and lounge experience blending bold flavours with an electric atmosphere. Think sophisticated cocktails, showstopping mains, and a vibe that keeps guests coming back. Seen HQ partnered with Nero Lounge to capture their ambiance, food, and energy in short-form content that brought their story to life on TikTok and Instagram Reels.",
    highlight: "Dining experience captured for TikTok & Instagram Reels",
    website: "https://nerolounge.co.uk/",
    quote:
      "Seen HQ perfectly captured the atmosphere and energy of Nero Lounge. The content felt authentic and our bookings have noticeably increased since.",
    quoteName: "Nero Lounge Team",
  },
  {
    id: "br-studios",
    name: "BR Reformer Studios",
    category: "Health & Wellness",
    location: "London",
    logo: "/seen-hq-logo.jpg",
    logoLetter: "BR",
    logoColor: "from-amber-800 to-stone-700",
    description:
      "Bella Rae Studios is London's premier reformer Pilates destination — a boutique wellness space where expert instruction meets a calm, luxurious environment. Clients come for the results and stay for the experience. Seen HQ created short-form content showcasing their studio, classes, and community to attract new members across social media.",
    highlight: "Studio and class content for social media growth",
    website: "https://bellaraestudios.com/london/",
    quote:
      "The videos Seen HQ produced for us were exactly on-brand. We saw a spike in enquiries from Instagram within the first week of posting.",
    quoteName: "Bella Rae Studios",
  },
];

const ClientsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Our Clients — Seen HQ"
        description="Businesses we've helped grow through professional short-form video content. From restaurants to fitness studios, see who trusts Seen HQ."
        path="/clients"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="container px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm font-body font-medium text-primary">
              Recent clients
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-4">
              Brands we've <span className="text-gradient-orange">got seen</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              From restaurants to reformer studios — real businesses we've helped grow through authentic short-form video content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20">
        <div className="container px-4 max-w-5xl mx-auto space-y-12">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-gradient-card overflow-hidden"
            >
              {/* Card header */}
              <div className={`bg-gradient-to-r ${client.logoColor} p-8 flex items-center gap-6`}>
                <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-heading font-extrabold text-2xl">{client.logoLetter}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-extrabold text-white">{client.name}</h2>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-white/80 text-sm font-body">{client.category}</span>
                    <span className="text-white/40">·</span>
                    <span className="flex items-center gap-1 text-white/80 text-sm font-body">
                      <MapPin className="w-3 h-3" /> {client.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-8">
                <p className="text-foreground/80 font-body leading-relaxed mb-6">
                  {client.description}
                </p>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-body text-primary mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {client.highlight}
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-primary pl-5 mb-8">
                  <p className="text-foreground/90 font-body italic leading-relaxed mb-2">
                    "{client.quote}"
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground font-body">{client.quoteName}</span>
                  </div>
                </blockquote>

                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-body text-primary hover:underline"
                >
                  Visit website <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-extrabold mb-4">
              Want to be our next <span className="text-gradient-orange">success story?</span>
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">
              Join businesses like Nero Lounge and BR Reformer Studios — get your content created and posted across social media today.
            </p>
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/submit">List Your Business</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientsPage;
