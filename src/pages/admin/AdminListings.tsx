import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: string;
  created_at: string;
  category: string;
  package: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  description: string;
  stripe_payment_status: string | null;
  status: string | null;
}

const AdminListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setListings(data);
    setLoading(false);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Listing deleted" });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8">Listings</h1>
      {listings.length === 0 ? (
        <p className="text-muted-foreground font-body">No listings yet.</p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-heading font-semibold text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left p-3 font-heading font-semibold text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left p-3 font-heading font-semibold text-xs uppercase tracking-wider">Category</th>
                  <th className="text-left p-3 font-heading font-semibold text-xs uppercase tracking-wider">Package</th>
                  <th className="text-left p-3 font-heading font-semibold text-xs uppercase tracking-wider">Payment</th>
                  <th className="text-left p-3 font-heading font-semibold text-xs uppercase tracking-wider">Date</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/20">
                    <td className="p-3 font-medium">{l.name}</td>
                    <td className="p-3 text-muted-foreground">{l.email}</td>
                    <td className="p-3"><Badge variant="secondary" className="text-xs">{l.category}</Badge></td>
                    <td className="p-3"><Badge variant="outline" className="text-xs">{l.package}</Badge></td>
                    <td className="p-3">
                      <Badge variant={l.stripe_payment_status === "paid" ? "default" : "secondary"} className="text-xs">
                        {l.stripe_payment_status || "pending"}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(l.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListings;
