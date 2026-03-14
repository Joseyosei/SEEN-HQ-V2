import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status: string | null;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ status: "read" }).eq("id", id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "read" } : m));
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Message deleted" });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8">Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-muted-foreground font-body">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-heading font-bold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email} · {new Date(m.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={m.status === "read" ? "secondary" : "default"} className="text-xs">
                    {m.status || "new"}
                  </Badge>
                  {m.status !== "read" && (
                    <Button variant="ghost" size="icon" onClick={() => markRead(m.id)} className="text-muted-foreground hover:text-primary">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-foreground/80 font-body whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
