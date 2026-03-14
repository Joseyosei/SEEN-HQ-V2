import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !WEBHOOK_SECRET) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const listingId = session.metadata?.listing_id;

      if (listingId) {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        await supabase
          .from("listings")
          .update({
            stripe_payment_status: "paid",
            status: "active",
          })
          .eq("id", listingId);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: unknown) {
    console.error("Webhook error:", err);
    return new Response("Webhook error", { status: 400 });
  }
});
