import { motion } from "framer-motion";
import { Eye, TrendingUp, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const CASE_STUDIES: { business: string; category: string; package: string; views: string; engagement: string; reach: string; quote: string; gradient: string }[] = [];

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="container px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-4">
              Real <span className="text-gradient-orange">results</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              See how businesses like yours used Seen HQ to drive views, engagement, and real-world growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 max-w-5xl mx-auto">
          {CASE_STUDIES.length === 0 ? (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold mb-2">No case studies yet</h3>
              <p className="text-muted-foreground font-body mb-6">
                Be our first success story - results will be showcased here.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs, i) => (
                <motion.div
                  key={cs.business}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border border-border bg-gradient-card p-8`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg">{cs.business}</h3>
                      <p className="text-xs text-muted-foreground">{cs.category} · {cs.package}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="rounded-xl bg-muted/50 p-3 text-center">
                      <Eye className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="font-heading font-extrabold text-lg">{cs.views}</p>
                      <p className="text-[10px] text-muted-foreground">Views</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3 text-center">
                      <TrendingUp className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="font-heading font-extrabold text-lg">{cs.engagement}</p>
                      <p className="text-[10px] text-muted-foreground">Engagement</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3 text-center">
                      <Share2 className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="font-heading font-extrabold text-lg">{cs.reach}</p>
                      <p className="text-[10px] text-muted-foreground">Reach</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 font-body italic">"{cs.quote}"</p>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground font-body mb-6">Ready to get results like these?</p>
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/submit">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResultsPage;
