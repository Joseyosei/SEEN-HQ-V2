import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CATEGORIES, PACKAGES } from "@/lib/constants";
import { Check, ArrowLeft, ArrowRight, Upload } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

const STEPS = ["Category", "Package", "Details", "Review"];

const SubmitPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [pkg, setPkg] = useState(searchParams.get("package") || "");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    point1: "",
    point2: "",
    point3: "",
    website: "",
    notes: "",
  });
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (searchParams.get("category")) setStep(1);
    if (searchParams.get("package")) setStep(2);
  }, []);

  const selectedPkg = PACKAGES.find((p) => p.id === pkg);
  const selectedCat = CATEGORIES.find((c) => c.id === category);

  const canNext = () => {
    if (step === 0) return !!category;
    if (step === 1) return !!pkg;
    if (step === 2) return form.name && form.email && form.description;
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files).slice(0, 5));
    }
  };

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          packageId: pkg,
          category,
          form,
          origin: window.location.origin,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      toast({
        title: "Payment error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 pt-24 pb-16 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading font-bold transition-colors ${
                  i <= step
                    ? "bg-gradient-orange text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:inline text-xs font-body ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Category */}
            {step === 0 && (
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Choose a category</h2>
                <p className="text-muted-foreground font-body mb-8">What would you like to promote?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`group relative overflow-hidden flex flex-col items-end justify-end h-32 rounded-xl border transition-all duration-500 ${
                        category === cat.id
                          ? "border-primary ring-2 ring-primary shadow-lg shadow-primary/20"
                          : "border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                      }`}
                    >
                      <img src={cat.image} alt={cat.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500" />
                      <span className="relative z-10 text-xs font-heading font-semibold text-white p-3 text-center w-full">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Package */}
            {step === 1 && (
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Select a package</h2>
                <p className="text-muted-foreground font-body mb-8">Choose the promotion level that suits you.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {PACKAGES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPkg(p.id)}
                      className={`relative text-left p-6 rounded-xl border transition-all ${
                        pkg === p.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-gradient-card hover:border-primary/30"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full bg-gradient-orange text-primary-foreground text-[10px] font-heading font-bold uppercase">
                          Most Popular
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground mb-1">{p.tier}</p>
                      <h3 className="font-heading font-bold mb-1">{p.name}</h3>
                      <p className="text-2xl font-heading font-extrabold mb-3">£{p.price}</p>
                      <ul className="space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Listing details</h2>
                <p className="text-muted-foreground font-body mb-8">Tell us about what you're promoting.</p>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-heading text-xs">Full Name / Business Name *</Label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-card border-border" />
                    </div>
                    <div>
                      <Label className="font-heading text-xs">Contact Email *</Label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 bg-card border-border" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-heading text-xs">Phone Number</Label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 bg-card border-border" />
                    </div>
                    <div>
                      <Label className="font-heading text-xs">Location (City/Area)</Label>
                      <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1.5 bg-card border-border" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-heading text-xs">Short Description * (max 300 chars)</Label>
                    <Textarea
                      maxLength={300}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="mt-1.5 bg-card border-border"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{form.description.length}/300</p>
                  </div>
                  <div>
                    <Label className="font-heading text-xs">Key Selling Points (up to 3)</Label>
                    <div className="space-y-2 mt-1.5">
                      <Input placeholder="Selling point 1" value={form.point1} onChange={(e) => setForm({ ...form, point1: e.target.value })} className="bg-card border-border" />
                      <Input placeholder="Selling point 2" value={form.point2} onChange={(e) => setForm({ ...form, point2: e.target.value })} className="bg-card border-border" />
                      <Input placeholder="Selling point 3" value={form.point3} onChange={(e) => setForm({ ...form, point3: e.target.value })} className="bg-card border-border" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-heading text-xs">Upload Images (up to 5)</Label>
                    <label className="mt-1.5 flex items-center justify-center gap-2 p-6 rounded-xl border border-dashed border-border bg-card cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{images.length > 0 ? `${images.length} file(s) selected` : "Click to upload"}</span>
                      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                  <div>
                    <Label className="font-heading text-xs">Website or Social Media Link</Label>
                    <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="mt-1.5 bg-card border-border" placeholder="https://" />
                  </div>
                  <div>
                    <Label className="font-heading text-xs">Anything else you want us to know?</Label>
                    <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-1.5 bg-card border-border" rows={3} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Review & pay</h2>
                <p className="text-muted-foreground font-body mb-8">Check your details before proceeding to payment.</p>

                <div className="rounded-xl border border-border bg-gradient-card p-6 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="font-heading font-bold">{selectedCat?.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Package</p>
                      <p className="font-heading font-bold">{selectedPkg?.name} - £{selectedPkg?.price}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Name</p>
                      <p>{form.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Email</p>
                      <p>{form.email}</p>
                    </div>
                    {form.phone && (
                      <div>
                        <p className="text-muted-foreground text-xs">Phone</p>
                        <p>{form.phone}</p>
                      </div>
                    )}
                    {form.location && (
                      <div>
                        <p className="text-muted-foreground text-xs">Location</p>
                        <p>{form.location}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Description</p>
                    <p className="text-sm">{form.description}</p>
                  </div>
                  {(form.point1 || form.point2 || form.point3) && (
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Selling Points</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {[form.point1, form.point2, form.point3].filter(Boolean).map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {images.length > 0 && (
                    <div>
                      <p className="text-muted-foreground text-xs">{images.length} image(s) attached</p>
                    </div>
                  )}
                </div>

                <Button variant="hero" className="w-full mt-6 py-6 text-base" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Processing..." : `Pay £${selectedPkg?.price} & Submit Listing`}
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {step < 3 && (
            <Button
              variant="hero"
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
