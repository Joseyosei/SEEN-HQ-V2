import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, Video, TrendingUp } from "lucide-react";

interface Stats {
  listings: number;
  messages: number;
  videos: number;
  paidListings: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ listings: 0, messages: 0, videos: 0, paidListings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [listingsRes, messagesRes, videosRes, paidRes] = await Promise.all([
        supabase.from("listings").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("videos").select("id", { count: "exact", head: true }),
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("stripe_payment_status", "paid"),
      ]);
      setStats({
        listings: listingsRes.count ?? 0,
        messages: messagesRes.count ?? 0,
        videos: videosRes.count ?? 0,
        paidListings: paidRes.count ?? 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Listings", value: stats.listings, icon: FileText, color: "text-primary" },
    { label: "Paid Listings", value: stats.paidListings, icon: TrendingUp, color: "text-primary" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-primary" },
    { label: "Videos", value: stats.videos, icon: Video, color: "text-primary" },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-gradient-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground font-heading uppercase tracking-wider">{card.label}</span>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-3xl font-heading font-extrabold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
