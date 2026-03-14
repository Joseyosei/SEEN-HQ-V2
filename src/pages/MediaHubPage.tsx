import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Upload, Trash2, LogIn, LogOut, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  category: string | null;
  created_at: string;
}

const MediaHubPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setVideos(data);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged in successfully" });
      setShowLogin(false);
      setEmail("");
      setPassword("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !title) return;
    setUploading(true);

    try {
      const ext = videoFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(path, videoFile);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(path);

      const { error: insertError } = await supabase.from("videos").insert({
        title,
        description: description || null,
        video_url: publicUrl,
        category: category || null,
      });
      if (insertError) throw insertError;

      toast({ title: "Video uploaded!" });
      setShowUpload(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setVideoFile(null);
      fetchVideos();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (video: Video) => {
    const filename = video.video_url.split("/").pop();
    if (filename) {
      await supabase.storage.from("videos").remove([filename]);
    }
    await supabase.from("videos").delete().eq("id", video.id);
    toast({ title: "Video deleted" });
    fetchVideos();
  };

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
            Media <span className="text-gradient-orange">Hub</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body mb-8">
            Watch our latest promotional videos and see what we can do for your business.
          </p>

          {/* Admin controls */}
          <div className="flex justify-center gap-3">
            {isAdmin ? (
              <>
                <Button variant="hero" onClick={() => setShowUpload(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Upload Video
                </Button>
                <Button variant="hero-ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <Button variant="hero-ghost" size="sm" onClick={() => setShowLogin(true)}>
                <LogIn className="w-4 h-4 mr-1" /> Admin
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-heading font-bold mb-6">Admin Login</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button variant="hero" className="w-full" type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md relative">
            <button onClick={() => setShowUpload(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-heading font-bold mb-6">Upload Video</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <Input
                placeholder="Video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <Input
                placeholder="Category (optional)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                />
                <Button
                  type="button"
                  variant="hero-ghost"
                  className="w-full"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  {videoFile ? videoFile.name : "Choose video file"}
                </Button>
              </div>
              <Button variant="hero" className="w-full" type="submit" disabled={uploading || !videoFile}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <section className="py-16">
        <div className="container px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-gradient-card aspect-video animate-pulse" />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <Play className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold mb-2">No videos yet</h3>
              <p className="text-muted-foreground font-body mb-6">
                Check back soon - new promotional content is added regularly.
              </p>
              <Button variant="hero" asChild>
                <Link to="/submit">Get Your Promo Made</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-gradient-card overflow-hidden group"
                >
                  <div className="aspect-video relative bg-muted">
                    {playing === video.id ? (
                      <video
                        src={video.video_url}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <button
                        onClick={() => setPlaying(video.id)}
                        className="w-full h-full flex items-center justify-center bg-muted/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-primary-foreground ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading font-bold text-lg">{video.title}</h3>
                        {video.category && (
                          <span className="text-xs text-primary font-body">{video.category}</span>
                        )}
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(video)}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {video.description && (
                      <p className="text-muted-foreground text-sm font-body mt-2 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Want content like <span className="text-gradient-orange">this?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 font-body">
            Get your business, property, or product professionally promoted on social media.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/submit">List Your Business</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MediaHubPage;
