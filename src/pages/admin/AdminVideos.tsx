import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Upload, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoRow {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  category: string | null;
  created_at: string;
}

const AdminVideos = () => {
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);

  const fetchVideos = async () => {
    const { data } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
    if (data) setVideos(data);
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !videoFile) return;

    setUploading(true);
    try {
      const ts = Date.now();
      const videoPath = `${ts}-${videoFile.name}`;
      const { error: vErr } = await supabase.storage.from("videos").upload(videoPath, videoFile);
      if (vErr) throw vErr;

      const { data: { publicUrl: videoUrl } } = supabase.storage.from("videos").getPublicUrl(videoPath);

      let thumbnailUrl: string | null = null;
      if (thumbFile) {
        const thumbPath = `thumbs/${ts}-${thumbFile.name}`;
        const { error: tErr } = await supabase.storage.from("videos").upload(thumbPath, thumbFile);
        if (!tErr) {
          const { data: { publicUrl } } = supabase.storage.from("videos").getPublicUrl(thumbPath);
          thumbnailUrl = publicUrl;
        }
      }

      const { error: dbErr } = await supabase.from("videos").insert({
        title: form.title.trim(),
        description: form.description.trim() || null,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        category: form.category.trim() || null,
      });

      if (dbErr) throw dbErr;

      toast({ title: "Video uploaded" });
      setForm({ title: "", description: "", category: "" });
      setVideoFile(null);
      setThumbFile(null);
      setShowForm(false);
      fetchVideos();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast({ title: "Error", description: msg, variant: "destructive" });
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("videos").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      toast({ title: "Video deleted" });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Videos</h1>
        <Button variant="hero" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" /> Upload Video
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleUpload} className="rounded-xl border border-border bg-gradient-card p-6 mb-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="font-heading text-xs">Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5 bg-card border-border" maxLength={200} required />
            </div>
            <div>
              <Label className="font-heading text-xs">Category</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5 bg-card border-border" maxLength={100} />
            </div>
          </div>
          <div>
            <Label className="font-heading text-xs">Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5 bg-card border-border" rows={2} maxLength={500} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="font-heading text-xs">Video File *</Label>
              <label className="mt-1.5 flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border bg-card cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{videoFile ? videoFile.name : "Choose video"}</span>
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
            </div>
            <div>
              <Label className="font-heading text-xs">Thumbnail (optional)</Label>
              <label className="mt-1.5 flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border bg-card cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{thumbFile ? thumbFile.name : "Choose image"}</span>
                <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
            </div>
          </div>
          <Button variant="hero" disabled={uploading} className="w-full">
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      )}

      {videos.length === 0 ? (
        <p className="text-muted-foreground font-body">No videos uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div key={v.id} className="rounded-xl border border-border bg-gradient-card overflow-hidden">
              {v.thumbnail_url ? (
                <img src={v.thumbnail_url} alt={v.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">No thumbnail</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-heading font-bold text-sm truncate">{v.title}</h3>
                {v.category && <p className="text-xs text-muted-foreground mt-1">{v.category}</p>}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(v.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
