import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRICE_MAP: Record<string, string> = {
  basic: "price_1T8kWkBNi8MsqqSRjQPd7xP5",
  full: "price_1T8kWkBNi8MsqqSRySEHe4Ln",
  mega: "price_1T8kWlBNi8MsqqSRhasd7uTk",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.json();
    const { packageId, category, form, origin } = body;

    if (!packageId || !category || !form?.name || !form?.email || !form?.description) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const priceId = PRICE_MAP[packageId];
    if (!priceId) {
      return new Response(JSON.stringify({ error: "Invalid package" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert listing record
    const sellingPoints = [form.point1, form.point2, form.point3].filter(Boolean);
    const { data: listing, error: dbError } = await supabase
      .from("listings")
      .insert({
        category,
        package: packageId,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        location: form.location || null,
        description: form.description,
        selling_points: sellingPoints.length > 0 ? sellingPoints : null,
        website: form.website || null,
        notes: form.notes || null,
      })
      .select("id")
      .single();

    if (dbError) throw new Error(`DB error: ${dbError.message}`);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/submit?package=${packageId}&category=${category}`,
      customer_email: form.email,
      metadata: { listing_id: listing.id, package: packageId, category },
    });

    // Update listing with stripe session id
    await supabase
      .from("listings")
      .update({ stripe_session_id: session.id })
      .eq("id", listing.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
