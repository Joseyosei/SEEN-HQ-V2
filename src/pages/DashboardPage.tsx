import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, LogOut, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface Listing {
  id: string;
  name: string;
  category: string;
  package: string;
  status: string | null;
  stripe_payment_status: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: typeof Clock; className: string }> = {
  pending: { label: "Pending", icon: Clock, className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  paid: { label: "Paid", icon: CheckCircle, className: "bg-green-500/10 text-green-500 border-green-500/20" },
  filming: { label: "Filming", icon: Clock, className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  live: { label: "Live", icon: CheckCircle, className: "bg-primary/10 text-primary border-primary/20" },
  cancelled: { label: "Cancelled", icon: AlertCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const DashboardPage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchListings = async () => {
      const { data } = await supabase
        .from("listings")
        .select("id, name, category, package, status, stripe_payment_status, created_at")
        .eq("email", user.email ?? "")
        .order("created_at", { ascending: false });
      setListings(data || []);
      setLoading(false);
    };
    fetchListings();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getStatus = (listing: Listing) => {
    const key = listing.stripe_payment_status === "paid" ? (listing.status || "paid") : (listing.status || "pending");
    return statusConfig[key] || statusConfig.pending;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 pt-24 pb-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">My Dashboard</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">
              {user?.email}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="hero" size="sm" asChild>
              <Link to="/submit"><Plus className="w-4 h-4 mr-1" /> New Listing</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Listings", value: listings.length },
            { label: "Paid", value: listings.filter(l => l.stripe_payment_status === "paid").length },
            { label: "Pending", value: listings.filter(l => l.stripe_payment_status !== "paid").length },
            { label: "Live", value: listings.filter(l => l.status === "live").length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-gradient-card p-4 text-center">
              <p className="text-2xl font-heading font-extrabold">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Listings */}
        <h2 className="text-xl font-heading font-bold mb-4">My Listings</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 rounded-xl border border-border bg-gradient-card animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-2xl border border-border bg-gradient-card"
          >
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold mb-2">No listings yet</h3>
            <p className="text-muted-foreground font-body mb-6">
              Submit your first listing to get promoted.
            </p>
            <Button variant="hero" asChild>
              <Link to="/submit">Create Your First Listing</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {listings.map((listing, i) => {
              const status = getStatus(listing);
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-gradient-card p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm">{listing.name}</h3>
                      <p className="text-xs text-muted-foreground font-body">
                        {listing.category} · {listing.package} · {new Date(listing.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${status.className} border gap-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
